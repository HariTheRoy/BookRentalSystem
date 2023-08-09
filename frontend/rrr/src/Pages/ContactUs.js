import React from "react";
import "./ContactUs.css";
import linkedIn from "../assets/images/linkedin.png";
import email from "../assets/images/email.png";
import gitHub from "../assets/images/github.png";
import whatsapp from "../assets/images/whatsapp.png";
const ContactUs = (props) => {
  return (
    <div id="contact_us">
      <section id="contact">
        <div class="contact-box">
          <div class="contact-links">
            <h2>CONTACT</h2>
          </div>
          <div class="contact-form-wrapper">
            <form>
              <div class="form-item">
                <input type="text" name="sender" required />
                <label>Name:</label>
              </div>
              <div class="form-item">
                <input type="text" name="email" required />
                <label>Email:</label>
              </div>
              <div class="form-item">
                <textarea class="" name="message" required></textarea>
                <label>Message:</label>
              </div>
              <button class="submit-btn">Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
