import React, { useEffect, useState } from "react";
import axios from "axios";
import PdfComp from "./PdfComp";
import '../CSS/myCertificates.css';

function MyCertificates() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allImage, setAllImage] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:3001/get-files");
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:3001/upload-files", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      if (result.data.status === "ok") {
        alert("¡Subido exitosamente!");
        getPdf();
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:3001/files/${pdf}`);
  };

  return (
    <div className="Container">
      <div className="upload-section">
        <form className="formStyle" onSubmit={submitImage}>
          <h4>Sube tus Certificaciones </h4>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <button className="btn btn-primary btn-upload" type="submit">
            Subir
          </button>
        </form>
      </div>

      <div className="certificates-section">
        <div className="uploaded">
          <h4>Certificaciones Subidas</h4>
          <div className="output-div">
            {allImage.map((data, index) => (
              <div className="inner-div" key={index}>
                <h6>Título: {data.title}</h6>
                <button className="btn btn-primary" onClick={() => showPdf(data.pdf)}>
                  Mostrar Certificación
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {pdfFile && <PdfComp pdfFile={pdfFile} />}
    </div>
  );
}

export default MyCertificates;
