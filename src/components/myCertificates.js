import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import '../CSS/myCertificates.css'; // Importa los estilos CSS del componente MyCertificates

function MyCertificates() {
  const { user, pdfs, addPdf, deletePdf } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNewFileNameChange = (e) => {
    setNewFileName(e.target.value);
  };

  const uploadFile = async () => {
    if (selectedFile && newFileName) {
      await addPdf(selectedFile, newFileName);
      setSelectedFile(null);
      setNewFileName('');
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        value={newFileName}
        onChange={handleNewFileNameChange}
        placeholder="Enter new file name"
      />
      <button onClick={uploadFile} disabled={!selectedFile || !newFileName}>
        Upload Certificate
      </button>

      <h2>My Uploads</h2>
      {pdfs.map((pdf, index) => (
        <div key={index}>
          {pdf.name}
          <button onClick={() => deletePdf(pdf)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default MyCertificates;
