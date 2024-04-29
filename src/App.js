import About from './components/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import './css/App.css';

function App() {

  return (
    <div className="app-wrapper">
      <Navbar />
      <Header />
      <About />
      <Footer />
    </div>
  );
}

export default App;
