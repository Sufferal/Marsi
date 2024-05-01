import About from './components/section/About';
import Features from './components/section/Features';
import Footer from './components/section/Footer';
import Header from './components/section/Header';
import LessonList from './components/lesson/LessonList';
import Navbar from './components/section/Navbar';

function App() {

  return (
    <div>
      <Navbar />
      <Header />
      <Features />
      <LessonList />  
      <About />
      <Footer />
    </div>
  );
}

export default App;
