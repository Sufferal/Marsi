import React from "react";
import "../../css/section/Header.css";

const Header = () => {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    const offsetTop = targetElement.offsetTop - 100;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <header id="header">
      <h2 className="header-title">
        Learn a <span className="highlight-primary">language</span> like a
        native
      </h2>
      <button className="header-btn">
        <a className="header-btn-link" href="#get_started" onClick={(e) => handleLinkClick(e, "get_started")}>
          Start now
        </a>
      </button>
    </header>
  );
};

export default Header;
