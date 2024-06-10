// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import {supabase} from '../supabaseClient';
import '../CSS/dashboard.css';

const Dashboard = () => {
  const [studentsPerCareer, setStudentsPerCareer] = useState([]);
  const [topCertificates, setTopCertificates] = useState([]);
  const [certificatesPerCareer, setCertificatesPerCareer] = useState([]);
  const [pdfInfoData, setPdfInfoData] = useState([]);

  useEffect(() => {
      const fetchStudentsPerCareer = async () => {
          const { data, error } = await supabase
              .from('userinfo')
              .select('career');

          if (error) {
              console.error(error);
          } else {
              const careerCount = data.reduce((acc, user) => {
                  acc[user.career] = (acc[user.career] || 0) + 1;
                  return acc;
              }, {});

              const careerCountArray = Object.entries(careerCount)
                  .map(([career, count]) => ({ career, count }));

              setStudentsPerCareer(careerCountArray);
          }
      };

      const fetchTopCertificates = async () => {
          const { data, error } = await supabase
              .from('pdfinfo')
              .select('verificate, pdfname');

          if (error) {
              console.error(error);
          } else {
              const certificateCount = data.reduce((acc, { pdfname }) => {
                  acc[pdfname] = (acc[pdfname] || 0) + 1;
                  return acc;
              }, {});

              const sortedCertificates = Object.entries(certificateCount)
                  .map(([pdfname, count]) => ({ pdfname, count }))
                  .sort((a, b) => b.count - a.count);

              setTopCertificates(sortedCertificates);
          }
      };

      const fetchCertificatesPerCareer = async () => {
          const { data, error } = await supabase
              .from('certificates')
              .select('*');

          if (error) {
              console.error(error);
          } else {
              const careerCertificates = data.reduce((acc, cert) => {
                  acc[cert.career] = (acc[cert.career] || 0) + 1;
                  return acc;
              }, {});

              const careerCertificatesArray = Object.entries(careerCertificates)
                  .map(([career, count]) => ({ career, count }));

              setCertificatesPerCareer(careerCertificatesArray);
          }
      };

      const fetchPdfInfoData = async () => {
          const { data, error } = await supabase
              .from('pdfInfo')
              .select('*');

          if (error) {
              console.error(error);
          } else {
              setPdfInfoData(data);
          }
      };

      fetchStudentsPerCareer();
      fetchTopCertificates();
      fetchCertificatesPerCareer();
      fetchPdfInfoData();
  }, []);

  return (
      <div className="dashboard-container">
          <h1>Analytics Dashboard</h1>

          <div className="chart-container">
            <div className='chart-wrapper'>
              <div className="chart">
                  <h2>Number of Students Per Career</h2>
                  <BarChart width={400} height={300} data={studentsPerCareer}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="career" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
              </div>
              </div>
              <div className='chart-wrapper'>
              <div className="chart">
                  <h2>Number of Certificates Per Career</h2>
                  <BarChart width={400} height={300} data={certificatesPerCareer}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="career" tick={false} />
                      <YAxis tick={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
              </div>
              </div>

         
          <div className="list-wrapper">
          <h2>Most Common Certificates</h2>
          <ol >
              {topCertificates.map((item, index) => (
                  <li key={index}>
                      {item.pdfname} (used by {item.count} users)
                  </li>
              ))}
          </ol>
          </div>
    
     </div>

      </div>
  );
};

export default Dashboard;