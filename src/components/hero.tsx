"use client";

import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { EllipsisVertical, SearchIcon } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { enrollInCourse } from "@/db/queries";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDCourseCard } from "@/components/course-card";
import { signOutAction } from "@/app/actions";
import { useStores } from "@/hooks/useStore";

const SearchHero = observer(() => {
  const { coursesStore, studentStore } = useStores();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("course_name");

  useEffect(() => {
    coursesStore.fetch();
    studentStore.fetch();
  }, [coursesStore, studentStore]);

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
    <div className="flex flex-col gap-16 items-center justify-center p-5">
      <div className="flex w-full gap-3 items-center">
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
            <DropdownMenuContent className="w-20 md:w-56">
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
        {studentStore.student ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/student-dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOutAction}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button>
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
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
                enrolledCourse && enrolledCourse.courseId === course.id
            )}
            handleEnroll={handleEnroll}
          />
        ))}
      </div>
    </div>
  );
});

export default SearchHero;
