import React, { useState } from "react";
import "../../css/lesson/LessonFilter.css";

const LessonFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div className="lesson-filter">
      <button
        id="btn-filter-all"
        className={`btn-filter ${activeFilter === "all" ? "active" : ""}`}
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        id="btn-filter-beginner"
        className={`btn-filter ${activeFilter === "beginner" ? "active" : ""}`}
        onClick={() => handleFilterChange("beginner")}
      >
        Beginner
      </button>
      <button
        id="btn-filter-intermediate"
        className={`btn-filter ${activeFilter === "intermediate" ? "active" : ""}`}
        onClick={() => handleFilterChange("intermediate")}
      >
        Intermediate
      </button>
      <button
        id="btn-filter-advanced"
        className={`btn-filter ${activeFilter === "advanced" ? "active" : ""}`}
        onClick={() => handleFilterChange("advanced")}
      >
        Advanced
      </button>
    </div>
  );
};

export default LessonFilter;
