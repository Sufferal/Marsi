import React from "react";
import "../../css/lesson/LessonRoles.css";
import { useBetween } from "use-between";
import { useLessons } from "../../hooks/useLessons";

const LessonRoles = ({ onRoleChange }) => {
  const { role } = useBetween(useLessons);

  const handleRoleChange = (newRole) => {
    onRoleChange(newRole);
  };

  return (
    <div className="lesson-roles">
      <button
        id="admin-btn"
        className={`role-btn ${role === "admin" ? "active" : ""}`}
        type="button"
        onClick={() => handleRoleChange("admin")}
      >
        Admin
      </button>
      <button
        id="writer-btn"
        className={`role-btn ${role === "writer" ? "active" : ""}`}
        type="button"
        onClick={() => handleRoleChange("writer")}
      >
        Writer
      </button>
      <button
        id="visitor-btn"
        className={`role-btn ${role === "visitor" ? "active" : ""}`}
        type="button"
        onClick={() => handleRoleChange("visitor")}
      >
        Visitor
      </button>
    </div>
  );
};

export default LessonRoles;
