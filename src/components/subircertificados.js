import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Subircertificados() {
  const { user } = useAuth0();

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
  };

  // ...
}

export default Subircertificados;