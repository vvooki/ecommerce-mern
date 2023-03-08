import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="logo">
          <h2>LOGOTYPE</h2>
        </div>
        <div className="about">
          <p>About us</p>
          <p>Terms & Conditions</p>
          <p>Contact</p>
        </div>
        <div className="social-media">
          <p>
            <a href="facebook.com">
              <FaFacebookF /> Facebook
            </a>
          </p>
          <p>
            <a href="instagram.com">
              <FaInstagram /> Instagram
            </a>
          </p>
          <p>
            <a href="twitter.com">
              <FaTwitter /> Twitter
            </a>
          </p>
        </div>
        <div className="contact">
          <p>497 Evergreen Rd. Roseville, CA 95673</p>
          <p>+44 345 678 903</p>
          <p>info@ljarmors.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
