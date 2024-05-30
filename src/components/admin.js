import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../context/UserContext';

const CDNURL = "https://hvcusyfentyezvuopvzd.supabase.co/storage/v1/object/public/pdf/";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [initialized, setInitialized] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
    setInitialized(true);
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    const fetchAllPdfs = async () => {
      try {
        const { data: files, error: fetchError } = await supabase.storage
          .from('pdf')
          .list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
          });

        if (fetchError) {
          throw fetchError;
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching PDFs and user info:', error);
        setLoading(false);
      }
    };

    fetchAllPdfs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container align="center" className="container-sm mt-4">
      <h1>Admin Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>PDF Name</th>
            <th>User Name</th>
            <th>Career</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.files.map((file, index) => (
            <tr key={index}>
              <td>{file.name.split('/')[1]}</td>
              <td>{`${user.name} ${user.lastname}`}</td>
              <td>{t(user.career)}</td>
              <td>
                <a
                  href={`${CDNURL}${user.id}/${file.name.split('/')[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPage;