import React from 'react';
import Hero from './hero';

function Home() {
  return (
    <div>
      <Hero />
      <div className="info-section">
        <div className="info-content">
          <h2>Información Certificaciones</h2>
          <p>Aquí podrás encontrar certificados para tu especialidad y subir tus propias certificaciones.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;