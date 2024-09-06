import { makeAutoObservable } from "mobx";

import type { Student } from "@/interface";
import { readStudent } from "@/db/queries";

export class StudentStore {
  student: Student | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetch = async () => {
    this.student = await readStudent();
  };

  enroll = async (courseId: number) => {
    if (this.student) {
      this.student.courses.push({ courseId, progress: null });
    }
  };
}
