"use server";

import { eq } from "drizzle-orm";

import { db } from "./";
import type { CourseDetails } from "@/interface";

import {
  CourseTable,
  InstructorTable,
  ScheduleTable,
  StudentTable,
  SyllabusTable,
  EnrollmentTable,
  FeedbackTable,
} from "./schema";

export const readCourses = async () => {
  return await db
    .select({
      id: CourseTable.id,
      name: CourseTable.name,
      description: CourseTable.description,
      thumbnail: CourseTable.thumbnail,
      duration: CourseTable.duration,
      location: CourseTable.location,
      open: CourseTable.open,
    })
    .from(CourseTable);
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
