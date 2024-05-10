import React, { useState } from "react";
import "../../css/lesson/LessonList.css";
import Lesson from "./Lesson";
import LessonAdd from "./LessonAdd";
import LessonFilter from "./LessonFilter";
import LessonRoles from "./LessonRoles";
import { useBetween } from "use-between";
import { useLessons } from "../../hooks/useLessons";
import { Pagination } from "@mui/material";

const LessonList = () => {
  const { fetchToken, lessons, role, setRole } = useBetween(useLessons);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    fetchToken(newRole);
  }; 

  const filteredLessons = lessons.filter(
    (lesson) => filter === "all" || lesson.level === filter
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const lessonsPerPage = 9;
  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = filteredLessons.slice(
    indexOfFirstLesson,
    indexOfLastLesson
  );

  const lessonWrapperClass =
    currentLessons.length < 3
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
          <LessonRoles onRoleChange={handleRoleChange} />
          <LessonFilter onFilterChange={handleFilterChange} />

          <div className="pagination-wrapper pagination-wrapper-top">
            <Pagination
              count={Math.ceil(filteredLessons.length / lessonsPerPage)}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>

          {(role === "admin" || role === "writer") && <LessonAdd />}

          <div className="lesson-list">
            {currentLessons.length > 0 ? (
              currentLessons.map((lesson) => (
                <Lesson key={lesson.id} lesson={lesson} role={role} />
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

          <div className="pagination-wrapper">
            <Pagination
              count={Math.ceil(filteredLessons.length / lessonsPerPage)}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonList;
