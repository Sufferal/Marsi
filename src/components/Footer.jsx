import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <h2 className="footer-title">Copyright Marsi &copy;, 2024</h2>
      <h3 className="footer-subtitle">
        Made by <span className="highlight-default">
          <a
            className="footer-link"
            href="https://github.com/Sufferal"
            target="_blank"
            rel="noreferrer"
          >
            Sufferal
          </a>
        </span>
      </h3>
    </footer>
  );
};

export default Footer;
