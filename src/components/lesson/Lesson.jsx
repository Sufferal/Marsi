import React, { useState } from "react";
import "../../css/lesson/Lesson.css";
import LessonDialog from "./LessonDialog";
import LessonDelete from "./LessonDelete";
import LessonEdit from "./LessonEdit";

const Lesson = ({ lesson }) => {
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
      <div className="lesson">
        <h3 className="lesson-title">{lesson.title}</h3>
        <p
          className={`lesson-level lesson-level-${lesson.level.toLowerCase()}`}
        >
          {lesson.level}
        </p>
        <p className="lesson-desc">{lesson.description}</p>
        <p className="lesson-score">
          Score:{" "}
          <span className={`lesson-score-${scoreClass}`}>{lesson.score}/100</span>
        </p>
        <div className="lesson-operations-wrapper">
          <button className="start-lesson-btn" onClick={handleClickOpen}>Start lesson</button>
          <div className="lesson-operations">
            <LessonEdit lesson={lesson} />
            <LessonDelete lesson={lesson} />
          </div>
        </div>
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
