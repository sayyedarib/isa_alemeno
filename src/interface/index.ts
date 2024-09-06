export interface CourseCardProps {
  // TODO: id should always be a number, it should not be nullable
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  duration: number;
  location: string;
  open: boolean;
  instructorName: string | null;
}

export interface DashboardCourseCardProps {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  duration: number;
  progress: number;
  completed: boolean;
}

// Define interfaces
export interface CourseDetails {
  thumbnail: string;
  name: string;
  description: string;
  duration: number;
  location: string;
  prerequisites?: string[] | null;
  instructor: Instructor | null;
  schedule: Schedule | null;
  syllabus: Syllabus[] | null;
}

export interface Instructor {
  name: string;
}

export interface Schedule {
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
  sunday: string | null;
}

export interface Syllabus {
  week: number;
  topic: string;
  content: string | null;
}

export interface Student {
  id: number;
  name: string;
  email: string | null; // email should not be nullable
  courses: {
    courseId: number | null; // courseId should always be a number
    progress: number | null;
    completed: boolean;
  }[];
}

export interface Feedback {
  likes: number;
  dislikes: number;
  feedback: {
    like: boolean;
    dislike: boolean;
    studentId: number;
    courseId: number;
  }[];
}