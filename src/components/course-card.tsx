"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { CourseCardProps } from "@/interface";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/components/ui/badge"; // Import the Badge component from ShadCN

interface ExtendedCourseCardProps extends CourseCardProps {
  enrolled: boolean | undefined;
  handleEnroll: (courseId: number) => Promise<void>;
}

export function ThreeDCourseCard(courseCardProps: ExtendedCourseCardProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (data.user) {
      // TOOD: Add logging and error handling
      // TODO: Add toast
      await courseCardProps.handleEnroll(courseCardProps.id);
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        {courseCardProps.open ? (
          <Badge>Open for Admission</Badge>
        ) : (
          <Badge variant={"destructive"}>Closed for Admission</Badge>
        )}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {courseCardProps.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 font-semibold py-1 px-2 bg-gray-100 dark:bg-gray-800 rounded-md"
        >
          by {courseCardProps.instructorName}
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
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href={`/courses/${courseCardProps.id}`}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            See Details →
          </CardItem>
          <CardItem
            onClick={handleClick}
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            disabled={courseCardProps.enrolled}
          >
            {courseCardProps.enrolled ? "Enrolled" : "Enroll Now"}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
