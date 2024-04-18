import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/carreras.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';



const Carreras = () => {

  const { t, i18n } = useTranslation(); // Usa el hook useTranslation para obtener las traducciones y el objeto i18n
  const [initialized, setInitialized] = useState(false);

  // Carga el idioma almacenado al inicio
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
    setInitialized(true);
  }, [i18n]);

  // Guarda el idioma seleccionado cuando cambia
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  if (!initialized) return null;

  const carreras = [
    t('careers.careerNames.0'),
    t('careers.careerNames.1'),
    t('careers.careerNames.2'),
    t('careers.careerNames.3'),
    t('careers.careerNames.4'),
    t('careers.careerNames.5'),
    t('careers.careerNames.6'),
  ];

  return (
    <div>
      <h2>{t('careers.title')}</h2>
      <div className="carreras-grid">
        {carreras.map((carrera, index) => (
          <div key={index} className="carrera-item">
            <div className="carrera-item-overlay"></div>
            <Link to={`/certificados/${index}`}>{carrera}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carreras;
