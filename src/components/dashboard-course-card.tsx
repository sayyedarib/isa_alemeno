"use client";

import Image from "next/image";
import React from "react";

import type { CourseCardProps, DashboardCourseCardProps } from "@/interface";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button"; // Import the Button component from ShadCN

interface ExtendDashboardCourseCardProps extends DashboardCourseCardProps {
  markAsCompleted: (id: number) => void;
  updateProgress: (id: number, progress: number) => void;
}

export function DashboardThreeDCourseCard(
  courseCardProps: ExtendDashboardCourseCardProps,
) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {courseCardProps.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {courseCardProps.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={courseCardProps.thumbnail}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem translateZ="110" className="w-full mt-4">
          <Progress
            value={courseCardProps.progress}
            max={courseCardProps.duration}
          />
        </CardItem>
        <CardItem translateZ="120" className="w-full mt-4">
          {courseCardProps.completed ? (
            <div className="text-green-500 font-bold">Course Completed</div>
          ) : (
            <Button
              onClick={() =>
                courseCardProps.markAsCompleted(courseCardProps.id)
              }
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Mark as Completed
            </Button>
          )}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
