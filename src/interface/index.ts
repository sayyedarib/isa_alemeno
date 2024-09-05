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
