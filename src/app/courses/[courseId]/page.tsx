"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { Feedback } from "@/interface";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useStores } from "@/hooks/useStore";
import { readCourseFeedback } from "@/db/queries";
import LikeDislike from "@/components/like-dislike";

const CourseDetails = observer(
  ({ params }: { params: { courseId: string } }) => {
    const { coursesStore, studentStore } = useStores();
    const [openAccordion, setOpenAccordion] = useState("syllabus");
    const [feedback, setFeedback] = useState<Feedback>({
      likes: 0,
      dislikes: 0,
      feedback: [],
    });

    useEffect(() => {
      coursesStore.getCourseById(Number(params.courseId));
      fetchFeedback();
    }, [coursesStore, params.courseId]);

    const fetchFeedback = async () => {
      const fetchedFeedback = await readCourseFeedback(Number(params.courseId));
      setFeedback(fetchedFeedback);
    };

    const isEnrolled = studentStore.student?.courses.some(
      (enrolledCourse) =>
        enrolledCourse &&
        Number(enrolledCourse.courseId) === Number(params.courseId),
    );

    const course = coursesStore.courseDetail;

    if (!course) {
      return (
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      );
    }

    return (
      <Card className="mx-auto max-w-4xl w-full shadow-lg rounded-lg overflow-hidden m-5">
        <Button className="absolute top-2 left-2">
          <Link href="/">Home</Link>
        </Button>
        <CardHeader className="flex items-center space-x-4 p-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src={course.thumbnail} alt={course.name} />
            <AvatarFallback>{course.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-semibold">
              {course.name}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Instructor: {course.instructor?.name ?? "Not assigned"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-4">{course.description}</p>
          {isEnrolled && (
            <LikeDislike
              courseId={Number(params.courseId)}
              studentId={studentStore.student?.id}
              initialLikes={feedback.likes}
              initialDislikes={feedback.dislikes}
              initialFeedback={feedback.feedback}
            />
          )}
          <Accordion
            type="single"
            collapsible
            value={openAccordion}
            onValueChange={(value) => setOpenAccordion(value)}
          >
            {course.syllabus && course.syllabus.length > 0 && (
              <AccordionItem value="syllabus">
                <AccordionTrigger className="text-lg font-medium">
                  Syllabus
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                  {course.syllabus.map((week) => (
                    <div key={week.week} className="mb-4">
                      <h3 className="text-xl font-semibold">
                        Week {week.week}: {week.topic}
                      </h3>
                      <p className="text-gray-700">{week.content}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
            {course.schedule && (
              <AccordionItem value="schedule">
                <AccordionTrigger className="text-lg font-medium">
                  Schedule
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                  <Tabs defaultValue="monday">
                    <TabsList className="flex space-x-2">
                      {Object.keys(course.schedule).map((day) => (
                        <TabsTrigger
                          key={day}
                          value={day}
                          className="px-4 py-2 rounded-md hover:bg-black/50"
                        >
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {Object.entries(course.schedule).map(([day, schedule]) => (
                      <TabsContent key={day} value={day} className="mt-4">
                        {schedule ?? "No schedule for this day"}
                      </TabsContent>
                    ))}
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </CardContent>
        <CardFooter className="p-6 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700">Location:</span>
            <Badge className="bg-blue-100 text-blue-800">
              {course.location}
            </Badge>
          </div>
          {course.prerequisites && (
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Prerequisites:</span>
              {course.prerequisites.map((prerequisite, index) => (
                <Badge key={index} className="bg-green-100 text-green-800">
                  {prerequisite}
                </Badge>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    );
  },
);

export default CourseDetails;
