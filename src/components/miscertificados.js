// frontend/src/components/MyCertificates.js
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Miscertificados() {
  const { user } = useAuth0();
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const userId = user.sub; // Obtener el ID de usuario de Auth0

      // Llamada a la API personalizada para obtener los certificados del usuario
      const response = await fetch(`/api/certificates?userId=${userId}`);
      const data = await response.json();
      setCertificates(data);
    };

    fetchCertificates();
  }, [user]);

  const handleUploadCertificate = async (certificateData) => {
    const userId = user.sub; // Obtener el ID de usuario de Auth0

    // Llamada a la API personalizada para subir el certificado
    await fetch('/api/certificates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...certificateData, userId })
    });

    // Actualizar la lista de certificados después de subir un nuevo certificado
    const response = await fetch(`/api/certificates?userId=${userId}`);
    const data = await response.json();
    setCertificates(data);
  };

  return (
    <div>
      <h2>Mis Certificados</h2>
      {/* Formulario para subir un nuevo certificado */}
      <form onSubmit={(e) => {
        e.preventDefault();
        // Obtener los datos del formulario
        const certificateData = {
          // ...
        };
        handleUploadCertificate(certificateData);
      }}>
        {/* Campos del formulario para subir un certificado */}
        <button type="submit">Subir Certificado</button>
      </form>

      {/* Mostrar la lista de certificados */}
      {certificates.map((certificate) => (
        <div key={certificate._id}>
          {/* Mostrar detalles del certificado */}
        </div>
      ))}
    </div>
  );
}

export default Miscertificados;