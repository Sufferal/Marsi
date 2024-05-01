import React from 'react';
import LessonQuestion from './LessonQuestion';
import '../../css/lesson/LessonReview.css';

const LessonReview = ({ tests, handleSubmitClick, handleClose }) => {
 const handleFinishClick = () => {
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
              />
            </div>
          ))
        ) : (
          <p className="no-tests">This lesson has no tests.</p>
        )}
      </div>
      <button className="dialog-btn-submit" onClick={handleFinishClick}>Submit</button>
    </div>
  );
};

export default LessonReview;