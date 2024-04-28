import React from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/certificates.css';

// Array of certificates grouped by career
const certificatesByCareer = [
  [
    { id: 1, title: 'Certified Reliability Engineer (CRE)', url: 'https://www.asq.org/cert/reliability-engineer' },
    { id: 2, title: 'Certified Maintenance and Reliability Professional (CMRP)', url: 'https://smrp.org/Certification/Certification-Recertification-Process/Study-Materials' },
    // Add more certificates for INDUSTRIAL ENGINEERING here
  ],
  [
    { id: 3, title: 'Project Management Professional (PMP)', url: 'https://www.pmi.org/certifications/project-management-pmp' },
    { id: 4, title: 'Certified Information Systems Security Professional (CISSP)', url: 'https://www.isc2.org/certifications/cissp' },
    // Add more certificates for COMPUTER ENGINEERING here
  ],
  [
     { id:5, title: 'Professional Certificate in Building Information Modeling (BIM)', url: 'https://www.academiccourses.mx/institutions/eit/certificado-profesional-de-competencia-en-modelado-de-informacion-de-construccion-bim' },
     { id:6, title: 'Certificate in Civil and Environmental Engineering', url: 'https://www.academiccourses.mx/institutions/tufts-university-school-of-engineering/certificate-in-civil-and-environmental-engineering'},  
  ],
  [
     { id:7, title: 'Certified SolidWorks Associate (CSWA)', url: 'https://www.intelligy.org'},
     { id:8, title: 'Manufacturing Engineering Technician', url: 'https://www.academiccourses.co/institutions/loyalist-college/tecnico-en-ingenieria-de-fabricacion'},
  ],
  [
     { id:9, title: 'Certified Renewable Energy Professional (REP™)', url: 'https://www.aeecenter.org/es/certified-renewable-energy-professional/'},
     { id:10, title: 'CEM - Certified Energy Manager', url: 'https://www.aeecenter.org/certified-energy-manager/'},
  ],
  [  
     { id:11, title: 'Certified Mine Safety Professional (CMSP)', url: 'https://www.miproximopaso.org/profile/certinfo/5390-A'},
     { id:12, title: 'WSO - Certified Safety Specialist (WSO-CSS)', url: 'https://www.miproximopaso.org/profile/certinfo/0997-C' },
  ],
];

// Certificate component
const Certificate = ({ title, url }) => {
  return (
    <div className="certificate">
      <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
    </div>
  );
};

// Certificates component
const Certificates = () => {
  const { id } = useParams();
  const career = certificatesByCareer[id];

  return (
    <div className="certificates-container">
      <h2>Certificates</h2>
      <div className="certificates-grid">
        {career.map((certificate) => (
          <Certificate key={certificate.id} title={certificate.title} url={certificate.url} />
        ))}
      </div>
    </div>
  );
};

export default Certificates;
