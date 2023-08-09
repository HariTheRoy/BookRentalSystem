import React from "react";
import "./About.css";
import rakhi from "../assets/team_images/rakhi.jpeg";
import prince from "../assets/team_images/prince.jpg";
import haritheroy from "../assets/team_images/haritheroy.jpg";

const About = (props) => {
  return (
    <div id="about_id">
      <div class="about-section">
        <p style={{ fontFamily: "italic" }}>
        </p>
        <p style={{ fontSize: "200%" }}>
          Read Rise Reform!!
        </p>
      </div>
      <p style={{ textAlign: "center", color:"black"}}>This is the team of RRR!!! We the team have built this website for renting books and to sell second hand books.</p>
      <h2 style={{ textAlign: "center", color:"black"}}>Our Team</h2>
      <div class="row">
        <div class="column">
          <div class="card">
            <img
              src={rakhi}
              alt="Jane"
              style={{ width: "40%", height:"40%" }}
            />

            <div class="container">
              <h2>Rakesh Yata</h2>
              <p class="title" style={{ fontWeight: "bold", color: "black" }}>
                Backend Developer
              </p>
              <p>rakeshb171190@gmail.com</p>
              <p>
                <a href="https://in.linkedin.com/in/yata-rakesh-2112a81a3" target="blank">
                  <button class="button" style={{ backgroundColor: "blue" }}>
                    Linkedin
                  </button>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img src={prince} alt="Mike" style={{ width: "40%", height:"40%" }} />
            <div class="container">
              <h2>Rajashekar Chelimala</h2>
              <p class="title" style={{ fontWeight: "bold", color: "black" }}>
                Frontend Developer
              </p>
              <p>rajashekarchelimala1@gmail.com</p>
              <p>
                <a href="https://in.linkedin.com/in/rajashekar-chelimala-130a9a195" target="blank">
                <button class="button" style={{ backgroundColor: "blue" }}>
                  Linkedin
                </button>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img src={haritheroy} alt="John" style={{ width: "40%", height:"40%" }} />
            <div class="container">
              <h2>Harikrishna Badavath</h2>
              <p class="title" style={{ fontWeight: "bold", color: "black" }}>
                Frontend Developer
              </p>
              <p>haritheroy1133@gmail.com</p>
              <p>
                <a href="https://in.linkedin.com/in/badavath-harikrishna-784216230?original_referer=https%3A%2F%2Fwww.google.com%2F" target="blank">
                <button class="button" style={{ backgroundColor: "blue" }}>
                  Linkedin
                </button>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
