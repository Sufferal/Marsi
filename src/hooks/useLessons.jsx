import { useState, useEffect } from 'react';
import defaultLessons from '../assets/data/defaultLessons.json';

const useLessons = () => {
  const [lessons, setLessons] = useState(() => {
    const storedLessons = localStorage.getItem('lessons');
    return storedLessons ? JSON.parse(storedLessons) : defaultLessons;
  });

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

  // DELETE lesson
  const deleteLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  // Load lessons from local storage
  useEffect(() => {
    const storedLessons = localStorage.getItem('lessons');
    if (storedLessons) {
      setLessons(JSON.parse(storedLessons));
    }
  }, []);

  // Save lessons to local storage
  useEffect(() => {
    localStorage.setItem('lessons', JSON.stringify(lessons));
    setLessons(lessons);
  }, [lessons]);

  return { lessons, addLesson, updateLesson, deleteLesson };
};

export { useLessons }
export default useLessons;