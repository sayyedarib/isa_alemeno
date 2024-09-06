import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateCourseFeedback } from "@/db/queries";

const LikeDislike = ({
  courseId,
  studentId,
  initialLikes,
  initialDislikes,
  initialFeedback,
}: {
  courseId: number;
  studentId: number | undefined;
  initialLikes: number;
  initialDislikes: number;
  initialFeedback: { studentId: number; like: boolean; dislike: boolean }[];
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userFeedback, setUserFeedback] = useState(
    initialFeedback.find((f) => f.studentId === studentId) || {
      like: false,
      dislike: false,
    },
  );

  const handleFeedback = async (isLike: boolean) => {
    if (!studentId) return;

    const newFeedback = {
      like: isLike ? !userFeedback.like : false,
      dislike: !isLike ? !userFeedback.dislike : false,
    };

    const updatedFeedback = await updateCourseFeedback(
      courseId,
      studentId,
      newFeedback.like,
      newFeedback.dislike,
    );

    setLikes(updatedFeedback.likes);
    setDislikes(updatedFeedback.dislikes);
    setUserFeedback(newFeedback);
  };

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant={userFeedback.like ? "default" : "outline"}
        size="sm"
        onClick={() => handleFeedback(true)}
        disabled={!studentId}
      >
        <ThumbsUp className="mr-2 h-4 w-4" />
        Like ({likes})
      </Button>
      <Button
        variant={userFeedback.dislike ? "default" : "outline"}
        size="sm"
        onClick={() => handleFeedback(false)}
        disabled={!studentId}
      >
        <ThumbsDown className="mr-2 h-4 w-4" />
        Dislike ({dislikes})
      </Button>
    </div>
  );
};

export default LikeDislike;
