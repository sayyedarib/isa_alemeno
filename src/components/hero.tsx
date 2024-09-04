"use client";

import { useState, useEffect } from "react";

import type { CourseCardProps } from "@/interface";

import { readCourses } from "@/db/queries";
import { ThreeDCourseCard } from "@/components/course-card";
import SearchBar from "./search-bar";

export default function Hero() {
  const [courses, setCourses] = useState<CourseCardProps[] | null>(null);

  useEffect(() => {
    readCourses().then((data) => {
      console.log(data);
      setCourses(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-16 items-center">
      <SearchBar />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-2" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <ThreeDCourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
