import React from "react";
// import {LinkX} from "react-scroll";
import About2 from "./images/About2.jpg";
import BreadCrumbs from "./BreadCrumbs";

const About = () => {
  return (
    <>
    <BreadCrumbs />
    <div className="containter-fluid">
      <div className="has-bg-img">
        <div className="image-container">
          <img
            style={{ height: "100vh" }}
            className="bg-img mx-auto img-fluid"
            src={About2}
            alt={About2}
          />
          <div className="text-container">
            <h4>About</h4>
            <p>
              Demeure is from The Bronx, NY. With a strong focus on simple yet
              powerful design, we are driven to create timeless work by
              portraying an aesthetic that is uniquely our own.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;

const styles = `
  .image-container {
    display: flex;
    align-items: center;
  }

  .text-container {
    margin-left: 20px;
  }
`;

const styleTag = document.createElement("style");
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);
