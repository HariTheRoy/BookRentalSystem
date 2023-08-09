import React from "react";
import "./Footer.css";

const Footer = (props) => {
  return (
    <footer id="footer">
      <div>
        <p className="footer-text">Project RRR is made for your services.</p>
      </div>
      <ul>
        <div id="icon-container">
          <a href="#">
            <div className="icon">
              <li>
                <i className="fab fa-twitter"></i>
              </li>
            </div>
          </a>
          <a href="#">
            <div className="icon">
              <li>
                <i className="fab fa-instagram"></i>
              </li>
            </div>
          </a>
          <a href="#">
            <div className="icon">
              <li>
                <i className="fab fa-facebook-f"></i>
              </li>
            </div>
          </a>
          <a href="#">
            <div className="icon">
              <li>
                <i className="far fa-envelope"></i>
              </li>
            </div>
          </a>
        </div>
      </ul>
      <p>&copy; 2022, RRR Read Rise Reform</p>
    </footer>
  );
};
export default Footer;