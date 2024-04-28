import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-content">
          <div className="social-icons">
            {/* Iconos de redes sociales */}
            <a href="https://www.facebook.com/uai.universidad/?locale=es_LA" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com/UAI_CL?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/uai_cl/?hl=es" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
          <p>Todos los derechos reservados &copy; 2024 UAI</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;