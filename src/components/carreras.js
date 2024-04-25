import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/carreras.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Carreras = () => {
  const { t, i18n } = useTranslation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
    setInitialized(true);
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  if (!initialized) return null;

  const carreras = [
    { id: 0, nombre: t('careers.careerNames.0') },
    { id: 1, nombre: t('careers.careerNames.1') },
    { id: 2, nombre: t('careers.careerNames.2') },
    { id: 3, nombre: t('careers.careerNames.3') },
    { id: 4, nombre: t('careers.careerNames.4') },
    { id: 5, nombre: t('careers.careerNames.5') },
    { id: 6, nombre: t('careers.careerNames.6') },
  ];

  return (
    <div>
      <h2>{t('careers.title')}</h2>
      <div className="carreras-grid">
        {carreras.map((carrera) => (
          <div key={carrera.id} className="carrera-item">
            <div className="carrera-item-overlay"></div>
            <Link to={`/certificados/${carrera.id}`}>{carrera.nombre}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carreras;
