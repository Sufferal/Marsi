import { useState, useEffect } from "react";

const useLessons = () => {
  const apiURL = "http://localhost:4000/lessons";
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => setLessons(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // ADD lesson
  const addLesson = (newLesson) => {
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLesson),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        setLessons([...lessons, newLesson]);
      })
      .catch((error) => console.error("Error:", error));
  };

  // UPDATE entire lesson
  const updateLesson = (updatedLesson) => {
    fetch(`${apiURL}/${updatedLesson.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLesson),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        const updatedLessons = lessons.map((lesson) =>
          lesson.id === updatedLesson.id ? updatedLesson : lesson
        );
        setLessons(updatedLessons);
      })
      .catch((error) => console.error("Error:", error));
  };

  // DELETE lesson
  const deleteLesson = (id) => {
    fetch(`${apiURL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        // If delete was successful, update state
        setLessons(lessons.filter((lesson) => lesson.id !== id));
      })
      .catch((error) => console.error("Error:", error));
  };

  return { lessons, addLesson, updateLesson, deleteLesson };
};

export { useLessons };
export default useLessons;
