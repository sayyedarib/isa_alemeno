"use server";

import { eq, like } from "drizzle-orm";

import { db } from "./";
import type { CourseCardProps, CourseDetails } from "@/interface";
import { createClient } from "@/utils/supabase/server";

import {
  CourseTable,
  InstructorTable,
  ScheduleTable,
  StudentTable,
  SyllabusTable,
  EnrollmentTable,
  FeedbackTable,
} from "./schema";

export const readCourses = async (): Promise<CourseCardProps[]> => {
  return await db
    .select({
      id: CourseTable.id,
      name: CourseTable.name,
      description: CourseTable.description,
      thumbnail: CourseTable.thumbnail,
      duration: CourseTable.duration,
      location: CourseTable.location,
      open: CourseTable.open,
      instructorName: InstructorTable.name,
    })
    .from(CourseTable)
    .leftJoin(
      InstructorTable,
      eq(CourseTable.instructorId, InstructorTable.id),
    );
};

export const readCourseDetails = async (
  courseId: number,
): Promise<CourseDetails | null> => {
  const result = await db
    .select({
      id: CourseTable.id,
      thumbnail: CourseTable.thumbnail,
      name: CourseTable.name,
      description: CourseTable.description,
      location: CourseTable.location,
      prerequisites: CourseTable.prerequisites,
      instructorName: InstructorTable.name,
      monday: ScheduleTable.monday,
      tuesday: ScheduleTable.tuesday,
      wednesday: ScheduleTable.wednesday,
      thursday: ScheduleTable.thursday,
      friday: ScheduleTable.friday,
      saturday: ScheduleTable.saturday,
      sunday: ScheduleTable.sunday,
    })
    .from(CourseTable)
    .leftJoin(InstructorTable, eq(CourseTable.instructorId, InstructorTable.id))
    .leftJoin(ScheduleTable, eq(CourseTable.id, ScheduleTable.courseId))
    .where(eq(CourseTable.id, courseId))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const course = result[0];

  const syllabus = await db
    .select({
      week: SyllabusTable.week,
      topic: SyllabusTable.topic,
      content: SyllabusTable.content,
    })
    .from(SyllabusTable)
    .where(eq(SyllabusTable.courseId, courseId))
    .orderBy(SyllabusTable.week);

  const courseDetails: CourseDetails = {
    thumbnail: course.thumbnail,
    name: course.name,
    description: course.description,
    duration: 0, // Set a default value or remove if not needed
    location: course.location,
    prerequisites: course.prerequisites,
    instructor: course.instructorName ? { name: course.instructorName } : null,
    schedule:
      course.monday ||
      course.tuesday ||
      course.wednesday ||
      course.thursday ||
      course.friday ||
      course.saturday ||
      course.sunday
        ? {
            monday: course.monday,
            tuesday: course.tuesday,
            wednesday: course.wednesday,
            thursday: course.thursday,
            friday: course.friday,
            saturday: course.saturday,
            sunday: course.sunday,
          }
        : null,
    syllabus: syllabus.length > 0 ? syllabus : null,
  };

  return courseDetails;
};

export const readCourseFeedback = async (courseId: number) => {
  const feedback = await db
    .select({
      like: FeedbackTable.like,
      dislike: FeedbackTable.dislike,
      studentId: FeedbackTable.studentId,
      courseId: FeedbackTable.courseId,
    })
    .from(FeedbackTable)
    .where(eq(FeedbackTable.courseId, courseId));

  return feedback;
};

export const readStudentId = async (email: string | undefined) => {
  if (!email) {
    // TODO: Add logging and error handling
    return null;
  }

  const studentId = await db
    .select({
      id: StudentTable.id,
    })
    .from(StudentTable)
    .where(like(StudentTable.email, email));

  return studentId[0].id;
};

export const readStudent = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  if (!data.user) {
    // TODO: Add logging and error handling
    return null;
  }

  const studentId = await readStudentId(data?.user?.email);

  if (!studentId) {
    // TODO: Add logging and error handling
    return null;
  }

  const studentData = await db
    .select({
      id: StudentTable.id,
      name: StudentTable.name,
      email: StudentTable.email,
      courseId: CourseTable.id,
      progress: EnrollmentTable.progress,
    })
    .from(StudentTable)
    .leftJoin(EnrollmentTable, eq(StudentTable.id, EnrollmentTable.studentId))
    .innerJoin(CourseTable, eq(EnrollmentTable.courseId, CourseTable.id))
    .where(eq(StudentTable.id, studentId));

  if (studentData.length === 0) {
    return null;
  }

  const { id, name, email } = studentData[0];
  const courses = studentData.map((row) => ({
    courseId: row.courseId,
    progress: row.progress,
  }));

  return {
    id,
    name,
    email,
    courses,
  };
};

export const enrollInCourse = async (courseId: number) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    // TODO: Add logging and error handling
    return null;
  }

  const studentId = await readStudentId(data?.user?.email);

  if (!studentId) {
    // TODO: Add logging and error handling
    return null;
  }

  // TODO: Add validation to check if the student is already enrolled in the course
  await db.insert(EnrollmentTable).values({
    courseId,
    studentId,
  });
};
