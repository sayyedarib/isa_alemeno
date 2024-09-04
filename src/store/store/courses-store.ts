import { makeAutoObservable } from "mobx";

import type { CourseCardProps } from "@/interface";

import { readCourses } from "@/db/queries";

export class CoursesStore {
  courses: CourseCardProps[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  fetch = async () => {
    console.log("fetching courses");
    this.courses = await readCourses();
    console.log("courses fetched", this.courses);
  };

  get allCourses() {
    return this.courses;
  }
}
