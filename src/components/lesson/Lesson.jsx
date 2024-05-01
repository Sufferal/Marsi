import React from "react";
import { useState } from "react";
import "../../css/lesson/Lesson.css";
import LessonDialog from "./LessonDialog";

const Lesson = ({ index, lesson }) => {
  let scoreClass = "";
  if (lesson.score < 30) {
    scoreClass = "low";
  } else if (lesson.score < 70) {
    scoreClass = "medium";
  } else if (lesson.score >= 70) {
    scoreClass = "high";
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="lesson-wrapper">
      <div key={index} className="lesson" onClick={handleClickOpen}>
        <h3 className="lesson-title">{lesson.title}</h3>
        <p
          className={`lesson-level lesson-level-${lesson.level.toLowerCase()}`}
        >
          {lesson.level}
        </p>
        <p className="lesson-desc">{lesson.description}</p>
        <p className="lesson-score">
          Score:{" "}
          <span className={`lesson-score-${scoreClass}`}>{lesson.score}</span>
        </p>
      </div>

      <LessonDialog
        open={open}
        handleClose={handleClose}
        lesson={lesson}
        scoreClass={scoreClass}
      />
    </div>
  );
};

export default Lesson;
