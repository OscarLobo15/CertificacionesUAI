import React from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/certificados.css';

const certificadosPorCarrera = [
  [
    { id: 1, titulo: 'Certificado HTML' },
    { id: 2, titulo: 'Certificado CSS' },
    { id: 3, titulo: 'Certificado JavaScript' },
  ],
  [
    { id: 4, titulo: 'Certificado Photoshop' },
    { id: 5, titulo: 'Certificado Illustrator' },
    { id: 6, titulo: 'Certificado InDesign' },
  ],
  [
    { id: 7, titulo: 'Certificado Finanzas' },
    { id: 8, titulo: 'Certificado Recursos Humanos' },
    { id: 9, titulo: 'Certificado Marketing' },
  ],
];

const Certificado = ({ titulo }) => {
  return <div className="certificado">{titulo}</div>;
};

const Certificados = () => {
  const { id } = useParams();
  const carrera = certificadosPorCarrera[id];

  return (
    <div className="certificados-container">
      <h2>Certificados</h2>
      <div className="certificados-grid">
        {carrera.map((certificado) => (
          <Certificado key={certificado.id} titulo={certificado.titulo} />
        ))}
      </div>
    </div>
  );
};

export default Certificados;
