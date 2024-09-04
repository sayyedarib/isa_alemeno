"use client";

import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import type { CourseCardProps } from "@/interface";

import { ThreeDCourseCard } from "@/components/course-card";
import SearchBar from "./search-bar";
import { useStores } from "@/hooks/useStore";

export const Hero = observer(() => {
  const { coursesStore } = useStores();

  useEffect(() => {
    coursesStore.fetch();
  }, [coursesStore]);

  const coursesData = coursesStore.courses.map((course) => ({
    id: course.id,
    name: course.name,
    description: course.description,
    thumbnail: course.thumbnail,
    duration: course.duration,
    location: course.location,
    open: course.open,
  }));

  return (
    <div className="flex flex-col gap-16 items-center">
      <SearchBar />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {coursesData.map((course) => (
          <ThreeDCourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
});
