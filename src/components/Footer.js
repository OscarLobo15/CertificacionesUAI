import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importa los iconos de las redes sociales
import '../CSS/Footer.css'; // Importa los estilos CSS del footer

const Footer = () => {
  return (
    <div className="footer-container">
      {/* Contenedor del footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* Contenido del footer */}
          <div className="social-icons">
            {/* Iconos de redes sociales con enlaces */}
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
          {/* Texto de derechos reservados */}
          <p>Todos los derechos reservados &copy; 2024 UAI</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
