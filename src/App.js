import About from "./components/section/About";
import Features from "./components/section/Features";
import Footer from "./components/section/Footer";
import Header from "./components/section/Header";
import LessonList from "./components/lesson/LessonList";
import Navbar from "./components/section/Navbar";
import Contact from "./components/section/Contact";
import { useBetween } from "use-between";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { isDark, toggleTheme } = useBetween(useTheme);

  return (
    <div data-theme={isDark ? "dark" : false}>
      <Navbar isClicked={isDark} handleChange={toggleTheme} />
      <Header />
      <Features />
      <LessonList />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
