import React from "react";
import "../../css/lesson/LessonList.css";
import Lesson from "./Lesson";

const LessonList = () => {
  let lessons = [
    {
      title: "Lesson 1: Greetings",
      level: "Beginner",
      description:
        "Learn how to greet people in different situations and contexts.",
      score: 0,
      content: [
        "Greetings are an important way to start a conversation and show respect and courtesy towards others. Here are some common greetings you can use:",
        "Ciao",
        "It's the most common informal greeting. It can be used to say both hello and goodbye. For example: Ciao, how are you? or Ciao, see you later!",
        "Buongiorno",
        "It means good morning and is used in the morning until midday. It can be shortened to Buon giorno. For example: Buongiorno, how are you today?",
        "Buonasera",
        "This means good evening and is used in the late afternoon and evening. For example: Buonasera, how was your day?",
        "Buonanotte",
        "It means goodnight and is used when saying goodbye in the evening or before going to bed. For example: Buonanotte, sleep well!",
        "Salve",
        "This is a neutral and formal greeting that can be used at any time of the day. It's a bit like saying hello. For example: Salve, nice to meet you.",
      ],
      tests: [
        {
          question: "What does 'Ciao' mean?",
          options: ["Good morning", "Hello", "Good afternoon", "Good evening"],
          answer: "Hello",
        },
        {
          question: "When can you use 'Buongiorno'?",
          options: [
            "In the morning",
            "In the afternoon",
            "In the evening",
            "At night",
          ],
          answer: "In the morning",
        },
        {
          question: "What is 'Salve' similar to?",
          options: ["Good morning", "Hello", "Good afternoon", "Good evening"],
          answer: "Hello",
        },
      ],
    },
    {
      title: "Lesson 15: Travel",
      level: "Intermediate",
      description:
        "Learn how to ask for directions and order food at a restaurant.",
      score: 40,
      content: [],
      tests: [],
    },
    {
      title: "Lesson 30: Business",
      level: "Advanced",
      description:
        "Learn how to write a professional email and give a presentation.",
      score: 100,
      content: [
        "Dear Sir/Madam,",
        "I am writing to enquire about the job vacancy.",
      ],
      tests: [],
    },
  ];

  console.log(lessons);

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

        <div className="section-content">
          <div className="lesson-list">
            {lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <Lesson key={index} lesson={lesson} />
              ))
            ) : (
              <p>No lessons available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonList;
