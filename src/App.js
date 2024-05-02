import { useState, useEffect } from "react";
import About from "./components/section/About";
import Features from "./components/section/Features";
import Footer from "./components/section/Footer";
import Header from "./components/section/Header";
import LessonList from "./components/lesson/LessonList";
import Navbar from "./components/section/Navbar";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("isDark");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
  });
  const color = isDark ? "#00ADB5" : "#fff";
  
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, color }}>
      <div data-theme={isDark ? "dark" : false}>
        <Navbar isClicked={isDark} handleChange={() => setIsDark(!isDark)} />
        <Header />
        <Features />
        <LessonList />
        <About />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
