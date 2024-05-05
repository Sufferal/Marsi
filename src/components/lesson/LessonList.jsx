import React, { useState } from "react";
import "../../css/lesson/LessonList.css";
import Lesson from "./Lesson";
import LessonAdd from "./LessonAdd";
import LessonFilter from "./LessonFilter";
import { useBetween } from "use-between";
import { useLessons } from "../../hooks/useLessons";

const LessonList = () => {
  const { lessons } = useBetween(useLessons);
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const filteredLessons = lessons.filter(
    (lesson) => filter === "all" || lesson.level === filter
  );

  const lessonWrapperClass =
    filteredLessons.length < 3
      ? "lessons-wrapper lessons-wrapper-small"
      : "lessons-wrapper";

  return (
    <section id="lessons" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Lessons</h2>
          <p className="section-desc">
            Discover lessons tailored to your language proficiency level and
            engage in an enjoyable and interactive learning experience.
          </p>
        </div>

        <div className={`section-content ${lessonWrapperClass}`}>
          <LessonAdd />
          <LessonFilter onFilterChange={handleFilterChange} />

          <div className="lesson-list">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson) => (
                <Lesson
                  key={lesson.id}
                  lesson={lesson}
                />
              ))
            ) : (
              <div className="no-lessons-info">
                <p className="no-lessons-list">
                  No {filter !== "all" ? filter : ""} lessons available
                </p>
                <p className="yes-lessons-list">
                  Add your first {filter !== "all" ? filter : ""} lesson!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonList;
