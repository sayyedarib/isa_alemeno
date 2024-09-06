"use client";

import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { EllipsisVertical, SearchIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { enrollInCourse } from "@/db/queries";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDCourseCard } from "@/components/course-card";
import { useStores } from "@/hooks/useStore";

const SearchHero = observer(() => {
  const { coursesStore, studentStore } = useStores();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("course_name");

  useEffect(() => {
    coursesStore.fetch();
    studentStore.fetch();
  }, [coursesStore]);

  const filteredCourses = coursesStore.courses.filter((course) => {
    if (searchBy === "course_name") {
      return course.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === "instructor_name") {
      return course.instructorName
        ? course.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
        : "";
    }
    return true;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEnroll = async (courseId: number) => {
    if (studentStore.student) {
      studentStore.enroll(courseId);
      await enrollInCourse(courseId);
    }
  };

  return (
    <div className="flex flex-col gap-16 items-center p-5">
      {studentStore.student ? (
        <Button className="absolute top-6 right-4">
          <Link href="/student-dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button className="absolute top-6 right-4">
          <Link href="/sign-in">Login</Link>
        </Button>
      )}
      <div className="flex items-center w-full max-w-2xl space-x-2 rounded-lg border px-3.5 py-2">
        <SearchIcon />
        <Input
          type="search"
          placeholder={`Search by ${searchBy === "course_name" ? "course" : "instructor"} name`}
          className="w-full border-0 h-8 font-semibold"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Search by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={searchBy}
              onValueChange={setSearchBy}
            >
              <DropdownMenuRadioItem value="course_name">
                Course Name
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="instructor_name">
                Instructor Name
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <ThreeDCourseCard
            key={course.id}
            id={course.id}
            name={course.name}
            description={course.description}
            thumbnail={course.thumbnail}
            duration={course.duration}
            location={course.location}
            open={course.open}
            instructorName={course.instructorName}
            enrolled={studentStore.student?.courses.some(
              (enrolledCourse) =>
                enrolledCourse && enrolledCourse.courseId === course.id,
            )}
            handleEnroll={handleEnroll}
          />
        ))}
      </div>
    </div>
  );
});

export default SearchHero;
