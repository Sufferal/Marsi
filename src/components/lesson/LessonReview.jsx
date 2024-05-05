import React, { useState } from "react";
import LessonQuestion from "./LessonQuestion";
import "../../css/lesson/LessonReview.css";
import { useBetween } from "use-between";
import { useLessons } from "../../hooks/useLessons";

const LessonReview = ({ lesson, handleSubmitClick, handleClose }) => {
  const { updateLesson } = useBetween(useLessons);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(lesson.tests.length).fill(null)
  );

  const handleOptionChange = (id, selectedOption) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[id] = selectedOption;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleFinishClick = () => {
    const allAnswered = selectedAnswers.every((answer) => answer !== null);
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Assuming tests[i].correctAnswer holds the correct answer for each test
    const correctAnswersCount = selectedAnswers.reduce((count, answer, index) => {
      return answer === lesson.tests[index].answer ? count + 1 : count;
    }, 0);

    let score = (correctAnswersCount / lesson.tests.length) * 100;
    if(isNaN(score)) {
      score = 0;
    }
    let updatedLesson = {
      ...lesson,
      score: Math.trunc(score),
    };
    updateLesson(updatedLesson);

    handleSubmitClick();
    handleClose();
  };

  return (
    <div className="dialog-tests-wrapper">
      <h3 className="dialog-tests-title">Review</h3>
      <div className="tests">
        {lesson.tests.length > 0 ? (
          lesson.tests.map((test, index) => (
            <div key={index} className="dialog-test">
              <LessonQuestion
                question={test.question}
                options={test.options}
                opOptionChange={(selectedOption) =>
                  handleOptionChange(index, selectedOption)
                }
              />
            </div>
          ))
        ) : (
          <p className="no-tests">This lesson has no tests.</p>
        )}
      </div>
      <button className="dialog-btn-submit" onClick={handleFinishClick}>
        Submit
      </button>
    </div>
  );
};

export default LessonReview;
