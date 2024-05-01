import React from 'react';

const LessonContent = ({ content, handleStartClick }) => {
  return (
    <div className="dialog-content-wrapper">
      {content.length > 0 ? (
        content.map((item, index) => (
          <p key={index} className={`lesson-content ${item.split(" ").length === 1 ? "single-word" : ""}`}>
            {item.split(" ").length === 1 ? <b>{item}</b> : item}
          </p>
        ))
      ) : (
        <p>This lesson has no content.</p>
      )}
      <button className="dialog-btn-start" onClick={handleStartClick}>
        Start review
      </button>
    </div>
  );
};

export default LessonContent;