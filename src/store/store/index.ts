import { CoursesStore } from "./courses-store";
import { StudentStore } from "./student-store";

export const RootStore = {
  coursesStore: new CoursesStore(),
  studentStore: new StudentStore(),
};
