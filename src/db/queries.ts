"use server";

import { db } from "./";

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
