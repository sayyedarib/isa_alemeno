import { makeAutoObservable } from "mobx";

import type { Student } from "@/interface";
import {
  markCourseAsCompleted,
  readStudent,
  updateCourseProgress,
} from "@/db/queries";

export class StudentStore {
  student: Student | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetch = async () => {
    this.student = await readStudent();
  };

  markCompleted = async (courseId: number) => {
    console.log("updating course as completed: ", courseId);
    if (this.student) {
      const course = this.student.courses.find(
        (enrolledCourse) =>
          enrolledCourse !== null && enrolledCourse.courseId === courseId,
      );
      if (course) {
        course.completed = true;
        course.progress = 100;
        await markCourseAsCompleted(courseId);
      }
    }
  };

  updateProgress = async (courseId: number, progress: number) => {
    if (this.student) {
      const course = this.student.courses.find(
        (enrolledCourse) =>
          enrolledCourse !== null && enrolledCourse.courseId === courseId,
      );
      if (course) {
        course.progress = progress;
        await updateCourseProgress(courseId, progress);
      }
    }
  };

  enroll = async (courseId: number) => {
    if (this.student) {
      this.student.courses.push({ courseId, progress: 0, completed: false });
    }
  };
}
