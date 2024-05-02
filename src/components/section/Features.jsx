import React from "react";
import "../../css/section/Features.css";
import icon_1 from "../../assets/img/features/idea.png";
import icon_2 from "../../assets/img/features/level.png";
import icon_3 from "../../assets/img/features/progress.png";
import roadmap from "../../assets/img/features/roadmap.jpg";

const Features = () => {
  const features = [
    {
      title: "Interactive Lessons",
      icon: icon_1,
    },
    {
      title: "Different Levels",
      icon: icon_2,
    },
    {
      title: "Progress Tracking",
      icon: icon_3,
    },
  ];

  return (
    <section id="get_started" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Features</h2>
          <p className="section-desc">
            Embark on an adventure through interactive lessons designed as
            engaging games, featuring varying levels of difficulty. Keep tabs on
            your progress and strive to reach the top spot!
          </p>
        </div>

        <div className="section-content">
          <div className="features">
            {features.map((feature, index) => (
              <div className="feature" key={index}>
                <img
                  className="feature-icon"
                  src={feature.icon}
                  alt={feature.title}
                />
                <h3 className="feature-title">{feature.title}</h3>
              </div>
            ))}
          </div>

          <div className="roadmap">
            <p className="section-desc">
              The roadmap for learning is simple. Start with the basics and
              gradually move on to more complex topics. The levels are designed
              to help you learn at your own pace.
            </p>
            <img className="roadmap-img" src={roadmap} alt="Roadmap" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
