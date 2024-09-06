"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

import { Button } from "@/components/ui/button";
import { DashboardThreeDCourseCard } from "@/components/dashboard-course-card";
import { useStores } from "@/hooks/useStore";

const EnrolledCoursesPage = observer(() => {
  const router = useRouter();

  const { coursesStore, studentStore } = useStores();

  useEffect(() => {
    coursesStore.fetch();
    studentStore.fetch();
  }, [coursesStore]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Enrolled Courses</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {studentStore.student?.courses.length == 0 ? (
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You are not enrolled in any courses
            </h3>
            <p className="text-sm text-muted-foreground">
              You can enroll in courses to get started
            </p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Enroll Now
            </Button>
          </div>
        ) : (
          <div className="flex items-start gap-1 text-center">
            {studentStore.student?.courses.map((enrolledCourse) => {
              const course = coursesStore.courses.find(
                (course) => course.id === enrolledCourse?.courseId,
              );
              if (course) {
                return (
                  <DashboardThreeDCourseCard
                    key={course.id}
                    id={course.id}
                    name={course.name}
                    description={course.description}
                    thumbnail={course.thumbnail}
                    duration={course.duration}
                    progress={enrolledCourse?.progress || 1}
                    completed={enrolledCourse?.completed || false}
                    markAsCompleted={async (id: number) => {
                      await studentStore.markCompleted(id);
                    }}
                    updateProgress={async (id: number, progress: number) => {
                      await studentStore.updateProgress(id, progress);
                    }}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    </main>
  );
});

export default EnrolledCoursesPage;
