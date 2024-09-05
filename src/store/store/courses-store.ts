import { makeAutoObservable } from "mobx";

import type { CourseCardProps, CourseDetails } from "@/interface";

import { readCourses, readCourseDetails } from "@/db/queries";

export class CoursesStore {
  courses: CourseCardProps[] = [];
  courseDetail: CourseDetails | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  fetch = async () => {
    console.log("fetching courses");
    this.courses = await readCourses();
    console.log("courses fetched", this.courses);
  };

  getCourseById = async (id: number) => {
    this.courseDetail = await readCourseDetails(id);
  };

  get allCourses() {
    return this.courses;
  }
}
