import {
  pgTable,
  serial,
  timestamp,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

// course table
export const CourseTable = pgTable("course", {
  id: serial("id").primaryKey(),
  instructorId: integer("instructor_id")
    .notNull()
    .references(() => InstructorTable.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  thumbnail: text("thumbnail").notNull().default(""),
  duration: integer("duration").notNull(), // in weeks
  location: text("location").notNull().default("online"),
  prerequisites: text("prerequisites").array(),
  open: boolean("open").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const InstructorTable = pgTable("instructor", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  experience: text("experience"),
  bio: text("bio"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// This table will store the syllabus for each course, week by week.
export const SyllabusTable = pgTable("syllabus", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id")
    .notNull()
    .references(() => CourseTable.id),
  topic: text("topic").notNull(),
  content: text("content"),
  week: integer("week").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const ScheduleTable = pgTable("schedule", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id")
    .notNull()
    .references(() => CourseTable.id),
  monday: text("monday"),
  tuesday: text("tuesday"),
  wednesday: text("wednesday"),
  thursday: text("thursday"),
  friday: text("friday"),
  saturday: text("saturday"),
  sunday: text("sunday"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const StudentTable = pgTable("student", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  bio: text("bio"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const EnrollmentTable = pgTable("enrollment", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id")
    .notNull()
    .references(() => CourseTable.id),
  studentId: integer("student_id")
    .notNull()
    .references(() => StudentTable.id),
  progress: integer("progress").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const FeedbackTable = pgTable("feedback", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id")
    .notNull()
    .references(() => CourseTable.id),
  studentId: integer("student_id")
    .notNull()
    .references(() => StudentTable.id),
  like: boolean("like").notNull().default(false),
  dislike: boolean("dislike").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
