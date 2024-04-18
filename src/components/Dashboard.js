import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  // Aquí deberías tener los datos de certificados por carrera
  const [certificadosPorCarrera, setCertificadosPorCarrera] = useState({
    "Ing Industrial": 10,
    "Ing Informática": 8,
    "Ing en Minas": 5,
    "Ing Mecánica": 12,
    "Ing en Energía": 7,
    "Ing en obras civiles": 9,
    "Bioingeniería": 6
  });

  useEffect(() => {
    // Configurar el gráfico al cargar el componente
    const ctx = document.getElementById('chartCertificadosPorCarrera');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(certificadosPorCarrera), // Nombres de las carreras
        datasets: [{
          label: 'Certificados por carrera',
          data: Object.values(certificadosPorCarrera), // Cantidad de certificados por carrera
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Devolver una función de limpieza para destruir el gráfico al desmontar el componente
    return () => {
      chart.destroy();
    };
  }, [certificadosPorCarrera]);

  return (
    <div>
      <h2>Certificados por carrera</h2>
      <canvas id="chartCertificadosPorCarrera" width="300" height="50"></canvas>
    </div>
  );
};

export default Dashboard;
