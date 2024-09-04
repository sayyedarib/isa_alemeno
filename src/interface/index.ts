export interface CourseCardProps {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  duration: number;
  location: string;
  open: boolean;
}

// Define interfaces
export interface Course {
  thumbnail: string;
  name: string;
  description: string;
  duration: number;
  location: string;
  prerequisites?: string[];
}

export interface Instructor {
  name: string;
}

export interface Schedule {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Syllabus {
  week: number;
  topic: string;
  content: string;
}