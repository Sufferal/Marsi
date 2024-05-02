import React, { useState } from "react";
import "../../css/lesson/LessonDialog.css";

import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import LessonContent from "./LessonContent";
import LessonReview from "./LessonReview";
import { ThemeContext } from "../../context/ThemeContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const LessonDialog = ({
  open,
  handleClose,
  lesson,
  scoreClass,
  updateLessonScore,
}) => {
  const [startClicked, setStartClicked] = useState(false);
  const { color } = React.useContext(ThemeContext);

  const handleStartClick = () => {
    setStartClicked(true);
  };

  const handleSubmitClick = () => {
    setStartClicked(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          backgroundColor: color,
        },
      }}
    >
      <Toolbar className="dialog-wrapper">
        <IconButton
          edge="start"
          color="inherit"
          size="large"
          onClick={handleClose}
          aria-label="close"
          className="dialog-close-button"
        >
          <CloseIcon className="dialog-close-icon" />
        </IconButton>
      </Toolbar>

      <div className="dialog-content">
        <h2 className="lesson-score">
          Score:{" "}
          <span className={`lesson-score-${scoreClass}`}>
            {lesson.score}/100
          </span>
        </h2>
        <div className="container">
          <h3 className="lesson-title">{lesson.title}</h3>
          <p
            className={`lesson-level lesson-level-${lesson.level.toLowerCase()}`}
          >
            {lesson.level}
          </p>
          <p className="lesson-desc">{lesson.description}</p>
          {!startClicked && (
            <LessonContent
              content={lesson.content}
              handleStartClick={handleStartClick}
            />
          )}

          {startClicked && (
            <LessonReview
              id={lesson.id}
              tests={lesson.tests}
              handleSubmitClick={handleSubmitClick}
              handleClose={handleClose}
              updateLessonScore={updateLessonScore}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default LessonDialog;
