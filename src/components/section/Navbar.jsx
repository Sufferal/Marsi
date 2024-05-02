import React  from "react";
import "../../css/section/Navbar.css";
import logo from "../../assets/img/logo.png";
import moon from "../../assets/img/moon.png";
import sun from "../../assets/img/sun.png";

const Navbar = ({ isClicked, handleChange }) => {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    const offsetTop = targetElement.offsetTop - 100;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  };
  
  return (
    <nav id="navbar" className="navbar">
      <div className="container navbar-wrapper">
        <a className="navbar-logo-wrapper" href="#header">
          <img className="navbar-logo" src={logo} alt="Marsi" />
          <h1 className="navbar-title">Marsi</h1>
        </a>

        <div className="navbar-links">
          <a className="navbar-link" href="#get_started" onClick={(e) => handleLinkClick(e, "get_started")}>
            Get started
          </a>
          <a className="navbar-link" href="#lessons" onClick={(e) => handleLinkClick(e, "lessons")}>
            Lessons
          </a>
          <a className="navbar-link" href="#about">
            About us
          </a>
          <button className="navbar-btn">
            <img
              className="navbar-icon"
              src={isClicked ? sun : moon}
              alt={isClicked ? 'dark_theme_icon' : 'light_theme_icon'}
              onClick={handleChange}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
