import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../CSS/admin.css'; // Asegúrate de importar tus estilos CSS

const AdminPage = () => {
  const [pdfInfos, setPdfInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPdfs = async () => {
      try {
        // Step 1: Fetch all PDF files from the storage without specifying a directory
        const { data: files, error: fetchError } = await supabase.storage.from('pdf').list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });

        if (fetchError) {
          throw fetchError;
        }

        // Step 2: Fetch user info for each PDF
        const pdfInfos = await Promise.all(files.map(async (file) => {
          // Extract the user ID from the file path
          const userId = file.name.split('/')[0];
          const fileName = file.name.split('/')[1];

          // Fetch user information from the database
          const { data: userInfo, error: userError } = await supabase
            .from('userinfo')
            .select('name, lastname, career')
            .eq('userid', userId)
            .single();

          if (userError) {
            console.error('Error fetching user info:', userError);
            return null;
          }

          return {
            fileName,
            ...userInfo,
          };
        }));

        setPdfInfos(pdfInfos.filter(info => info !== null));
      } catch (error) {
        console.error('Error fetching PDFs and user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPdfs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>PDF Name</th>
            <th>User Name</th>
            <th>Career</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pdfInfos.map((pdf, index) => (
            <tr key={index}>
              <td>{pdf.fileName}</td>
              <td>{`${pdf.name} ${pdf.lastname}`}</td>
              <td>{pdf.career}</td>
              <td>
                <a href={`https://your-supabase-url.supabase.co/storage/v1/object/public/pdf/${pdf.fileName}`} target="_blank" rel="noopener noreferrer">
                  Open PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
    