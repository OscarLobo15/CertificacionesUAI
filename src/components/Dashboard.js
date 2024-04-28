import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import '../CSS/dashboard.css';

const Dashboard = () => {
  const [certificadosPorCarrera, setCertificadosPorCarrera] = useState({
    "Ing Industrial": 10,
    "Ing Informática": 8,
    "Ing en Minas": 5,
    "Ing Mecánica": 12,
    "Ing en Energía": 7,
    "Ing en obras civiles": 9,
    "Bioingeniería": 6
  });

  const [porcentajeCertificados, setPorcentajeCertificados] = useState({
    "Ing Industrial": 70,
    "Ing Informática": 65,
    "Ing en Minas": 50,
    "Ing Mecánica": 80,
    "Ing en Energía": 60,
    "Ing en obras civiles": 75,
    "Bioingeniería": 55
  });

  const [tendenciaCertificados, setTendenciaCertificados] = useState({
    "2019": 120,
    "2020": 150,
    "2021": 180,
    "2022": 210,
    "2023": 240
  });

  // Variables para mantener las instancias de los gráficos
  let barChart;
  let pieChart;
  let lineChart;

  useEffect(() => {
    // Configuración del gráfico de barras
    const ctxBar = document.getElementById('chartCertificadosPorCarrera');
    if (barChart) barChart.destroy(); // Destruye el gráfico anterior si existe
    barChart = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: Object.keys(certificadosPorCarrera),
        datasets: [{
          label: 'Certificados por carrera',
          data: Object.values(certificadosPorCarrera),
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

    // Configuración del gráfico circular
    const ctxPie = document.getElementById('chartPorcentajeCertificados');
    if (pieChart) pieChart.destroy(); // Destruye el gráfico anterior si existe
    pieChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: Object.keys(porcentajeCertificados),
        datasets: [{
          label: 'Porcentaje de Certificados',
          data: Object.values(porcentajeCertificados),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            // ... colores para cada segmento
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            // ... bordes para cada segmento
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false // Ajusta esta opción para controlar el tamaño del gráfico
      }
    });

    // Configuración del gráfico de líneas
    const ctxLine = document.getElementById('chartTendenciaCertificados');
    if (lineChart) lineChart.destroy(); // Destruye el gráfico anterior si existe
    lineChart = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: Object.keys(tendenciaCertificados),
        datasets: [{
          label: 'Tendencia de Certificados',
          data: Object.values(tendenciaCertificados),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });

    // Devuelve una función de limpieza para destruir los gráficos al desmontar el componente
    return () => {
      if (barChart) barChart.destroy();
      if (pieChart) pieChart.destroy();
      if (lineChart) lineChart.destroy();
    };
  }, [certificadosPorCarrera, porcentajeCertificados, tendenciaCertificados]); // Asegúrate de incluir todas las dependencias aquí

  return (
    <div>
      <div>
        <h2>Certificados por carrera</h2>
        <canvas id="chartCertificadosPorCarrera" width="600" height="100"></canvas>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ width: '50%' }}>
          <h2>Porcentaje de estudiantes con certificados</h2>
          <canvas id="chartPorcentajeCertificados" style={{ maxWidth: '400px', maxHeight: '400px' }}></canvas>
        </div>
        <div style={{ width: '50%' }}>
          <h2>Tendencia de Certificados (2019-2023)</h2>
          <canvas id="chartTendenciaCertificados" style={{ maxWidth: '600px', maxHeight: '600px' }}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
