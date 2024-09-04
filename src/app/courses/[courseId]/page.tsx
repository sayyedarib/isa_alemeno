import { useState, useEffect } from "react";

import type { Course, Instructor, Schedule, Syllabus } from "@/interface";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function CourseDetails({
  params,
}: {
  params: { courseId: string };
}) {
  const [course, setCourse] = useState<Course | null>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [syllabus, setSyllabus] = useState<Syllabus[]>([]);

  if (!course || !instructor || !schedule) return null;

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <Avatar>
          <AvatarImage src={course.thumbnail} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{course.name}</CardTitle>
          <CardDescription>Instructor: {instructor.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p>{course.description}</p>
        <Accordion type="single" collapsible>
          <AccordionItem value="schedule">
            <AccordionTrigger>Schedule</AccordionTrigger>
            <AccordionContent>
              <Tabs defaultValue="monday">
                <TabsList>
                  <TabsTrigger value="monday">Monday</TabsTrigger>
                  <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                  <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                  <TabsTrigger value="thursday">Thursday</TabsTrigger>
                  <TabsTrigger value="friday">Friday</TabsTrigger>
                  <TabsTrigger value="saturday">Saturday</TabsTrigger>
                  <TabsTrigger value="sunday">Sunday</TabsTrigger>
                </TabsList>
                <TabsContent value="monday">{schedule.monday}</TabsContent>
                <TabsContent value="tuesday">{schedule.tuesday}</TabsContent>
                <TabsContent value="wednesday">
                  {schedule.wednesday}
                </TabsContent>
                <TabsContent value="thursday">{schedule.thursday}</TabsContent>
                <TabsContent value="friday">{schedule.friday}</TabsContent>
                <TabsContent value="saturday">{schedule.saturday}</TabsContent>
                <TabsContent value="sunday">{schedule.sunday}</TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="syllabus">
            <AccordionTrigger>Syllabus</AccordionTrigger>
            <AccordionContent>
              {syllabus.map((week) => (
                <div key={week.week}>
                  <h3>
                    Week {week.week}: {week.topic}
                  </h3>
                  <p>{week.content}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <div>Duration: {course.duration} weeks</div>
        <div>Location: {course.location}</div>
        <div>Prerequisites: {course.prerequisites?.join(", ")}</div>
      </CardFooter>
    </Card>
  );
}
