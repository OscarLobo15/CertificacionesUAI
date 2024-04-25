import React from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/certificados.css';

const certificadosPorCarrera = [
  [
    { id: 1, titulo: 'Ingeniero de confiabilidad certificado (CRE)', url: 'https://www.asq.org/cert/reliability-engineer' },
    { id: 2, titulo: 'Profesional Certificado en Mantenimiento y Confiabilidad (CMRP)', url: 'https://smrp.org/Certification/Certification-Recertification-Process/Study-Materials' },
    // Agrega aquí los demás certificados para ING INDUSTRIAL
  ],
  [
    { id: 3, titulo: 'Project Management Professional (PMP)', url: 'https://www.pmi.org/certifications/project-management-pmp' },
    { id: 4, titulo: 'Certified Information Systems Security Professional (CISSP)', url: 'https://www.isc2.org/certifications/cissp' },
    // Agrega aquí los demás certificados para ING INFORMATICA
  ],
  [
     { id:5, titulo: 'Certificado Profesional de Competencia en Modelado de Información de Construcción (BIM)', url: 'https://www.academiccourses.mx/institutions/eit/certificado-profesional-de-competencia-en-modelado-de-informacion-de-construccion-bim' },
     { id:6, titulo: 'Certificate in Civil and Environmental Engineering', url: 'https://www.academiccourses.mx/institutions/tufts-university-school-of-engineering/certificate-in-civil-and-environmental-engineering'},  
  ],
  [
     { id:7, titulo: 'CSWA (Certified SolidWorks Associate)', url: 'https://www.intelligy.org'},
     { id:8, titulo: 'Técnico en Ingeniería de Fabricación', url: 'https://www.academiccourses.co/institutions/loyalist-college/tecnico-en-ingenieria-de-fabricacion'},
  ],
  [
     { id:9, titulo: 'Profesional Certificado en Energías Renovables - REP™', url: 'https://www.aeecenter.org/es/certified-renewable-energy-professional/'},
     { id:10, titulo: 'CEM  Certified Energy Manager', url: 'https://www.aeecenter.org/certified-energy-manager/'},
  ],
  [  
     { id:11, titulo: 'Certified Mine Safety Professional (CMSP)', url: 'https://www.miproximopaso.org/profile/certinfo/5390-A'},
     { id:12, titulo: 'WSO - Certified Safety Specialist (WSO-CSS)', url: 'https://www.miproximopaso.org/profile/certinfo/0997-C' },
  ],
];

const Certificado = ({ titulo, url }) => {
  return (
    <div className="certificado">
      <a href={url} target="_blank" rel="noopener noreferrer">{titulo}</a>
    </div>
  );
};

const Certificados = () => {
  const { id } = useParams();
  const carrera = certificadosPorCarrera[id];

  return (
    <div className="certificados-container">
      <h2>Certificados</h2>
      <div className="certificados-grid">
        {carrera.map((certificado) => (
          <Certificado key={certificado.id} titulo={certificado.titulo} url={certificado.url} />
        ))}
      </div>
    </div>
  );
};

export default Certificados;
