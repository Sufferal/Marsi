import React, { useEffect, useState } from "react";
import "../../css/lesson/LessonList.css";
import Lesson from "./Lesson";
import LessonAdd from "./LessonAdd";
import defaultLessons from "../../assets/data/defaultLessons.json";
import LessonFilter from "./LessonFilter";

const LessonList = () => {
  const storedLessons = localStorage.getItem("lessons");
  const initialLessons = storedLessons
    ? JSON.parse(storedLessons)
    : defaultLessons;
  const [lessons, setLessons] = useState(initialLessons);
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const filteredLessons = lessons.filter(
    (lesson) => filter === "all" || lesson.level === filter
  );

  // ADD lesson
  const addLesson = (newLesson) => {
    setLessons([...lessons, newLesson]);
  };

  // UPDATE entire lesson
  const updateLesson = (updatedLesson) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === updatedLesson.id ? updatedLesson : lesson
    );
    setLessons(updatedLessons);
  };

  // UPDATE lesson score
  const updateLessonScore = (lessonId, newScore) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, score: newScore } : lesson
    );
    setLessons(updatedLessons);
  };

  // DELETE lesson
  const deleteLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  // Load lessons from local storage
  useEffect(() => {
    const storedLessons = localStorage.getItem("lessons");
    if (storedLessons) {
      setLessons(JSON.parse(storedLessons));
    }
  }, []);

  // Save lessons to local storage
  useEffect(() => {
    localStorage.setItem("lessons", JSON.stringify(lessons));
  }, [lessons]);

  const lessonWrapperClass = filteredLessons.length < 3 ? 'lessons-wrapper lessons-wrapper-small' : 'lessons-wrapper';

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
          <LessonAdd addLesson={addLesson} />
          <LessonFilter onFilterChange={handleFilterChange} />

          <div className="lesson-list">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((lesson) => (
                <Lesson
                  key={lesson.id}
                  lesson={lesson}
                  updateLesson={updateLesson}
                  updateLessonScore={updateLessonScore}
                  deleteLesson={deleteLesson}
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
