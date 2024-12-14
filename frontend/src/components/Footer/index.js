import React, { useContext } from "react";
import "./style.css";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { AppContext } from "../../App";

const Footer = () => {
  const { isDarkMode } = useContext(AppContext);

  return (
    <footer className={`footer-container ${isDarkMode ? "dark" : ""}`}>
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h4>Contact Information</h4>
          <p>
            Email:{" "}
            <a href="mailto:khaled.hkhateeb@gmale.com">
              khaled.hkhateeb@gmale.com
            </a>
          </p>
          <p>
            Phone: <a href="tel:+962772874494">+ (962) 77-2874-494</a>
          </p>
          <p>Address: Shoumer Street, Zarqa, Jordan</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/categories">Shop</a>
            </li>
            <li>
              <a href="/terms" title="Read our Terms of Service">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" title="Read our Privacy Policy">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/share/CvWrDCR3giQwBrCN/"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow us on Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/khaled.ktb96/profilecard/?igsh=eWU0dWVnOGg0ZXI2"
              target="_blank"
              rel="noopener noreferrer"
              title="Follow us on Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/AlKhateebKhaled"
              target="_blank"
              rel="noopener noreferrer"
              title="View our GitHub"
            >
              <FaGithub size={30} className="icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/khaled-al-khateeb-79a792170?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              title="Connect with us on LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Khaled Al-KHATEEB. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
