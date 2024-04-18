import React from 'react';
import '../CSS/hero.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';


const Hero = () => {
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
  return (
    <section className="hero">
      <div className="contenido-hero">
        <h2>{t('hero.title')}</h2>
      </div>
    </section>
  );
};

export default Hero;