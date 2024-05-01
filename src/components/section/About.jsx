import React from "react";
import "../../css/section/About.css";
import analytics from "../../assets/img/analytics.png";

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About us</h2>
          <p className="section-desc">
            We collaborate with top-tier instructors worldwide to craft our
            lessons, leveraging advanced analytics powered by AI to continuously
            enhance outcomes.
          </p>
        </div>
        <div className="section-content">
          <div className="about-img-wrapper">
            <img src={analytics} alt="analytics" className="about-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
