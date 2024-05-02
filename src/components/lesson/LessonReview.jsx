import React, { useState } from "react";
import LessonQuestion from "./LessonQuestion";
import "../../css/lesson/LessonReview.css";

const LessonReview = ({ id, tests, handleSubmitClick, handleClose, updateLessonScore }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(tests.length).fill(null)
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
      return answer === tests[index].answer ? count + 1 : count;
    }, 0);

    let score = (correctAnswersCount / tests.length) * 100;
    if(isNaN(score)) {
      score = 0;
    }
    updateLessonScore(id, Math.trunc(score));

    handleSubmitClick();
    handleClose();
  };

  return (
    <div className="dialog-tests-wrapper">
      <h3 className="dialog-tests-title">Review</h3>
      <div className="tests">
        {tests.length > 0 ? (
          tests.map((test, index) => (
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
