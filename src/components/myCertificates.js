import React, { useEffect, useState } from "react"; // Importa React, useEffect y useState desde React
import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import PdfComp from "./PdfComp"; // Importa el componente PdfComp
import '../CSS/myCertificates.css'; // Importa los estilos CSS del componente MyCertificates

function MyCertificates() {
  // Definición de estados
  const [title, setTitle] = useState(""); // Estado para el título del certificado
  const [file, setFile] = useState(null); // Estado para el archivo de certificado
  const [allImage, setAllImage] = useState([]); // Estado para almacenar todas las imágenes (certificados)
  const [pdfFile, setPdfFile] = useState(null); // Estado para el archivo PDF a mostrar

  // Efecto para cargar los certificados al montar el componente
  useEffect(() => {
    getPdf(); // Llama a la función getPdf
  }, []); // Se ejecuta solo una vez al montar el componente

  // Función para obtener los certificados desde el servidor
  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:3001/get-files"); // Realiza una solicitud GET para obtener los certificados
      setAllImage(result.data.data); // Actualiza el estado con los certificados obtenidos
    } catch (error) {
      console.error("Error fetching PDFs:", error); // Maneja errores si la solicitud falla
    }
  };

  // Función para enviar un certificado al servidor
  const submitImage = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    const formData = new FormData(); // Crea un objeto FormData para enviar los datos del formulario

    // Agrega el título y el archivo seleccionado al objeto FormData
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post("http://localhost:3001/upload-files", formData, {
        headers: {
          "Content-Type": "multipart/form-data" // Configura el tipo de contenido en las cabeceras de la solicitud
        },
      });
      if (result.data.status === "ok") { // Verifica si el servidor devuelve un estado "ok"
        alert("¡Subido exitosamente!"); // Muestra una alerta de éxito
        getPdf(); // Vuelve a cargar los certificados después de subir uno nuevo
      }
    } catch (error) {
      console.error("Error uploading PDF:", error); // Maneja errores si la carga falla
    }
  };

  // Función para mostrar un certificado PDF seleccionado
  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:3001/files/${pdf}`); // Establece la URL del archivo PDF a mostrar
  };

  // Renderiza el componente MyCertificates
  return (
    <div className="Container">
      {/* Sección de carga de certificados */}
      <div className="upload-section">
        <form className="formStyle" onSubmit={submitImage}>
          <h4>Sube tus Certificaciones </h4>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            required
            onChange={(e) => setTitle(e.target.value)} // Actualiza el estado del título al cambiar
          />
          <br />
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])} // Actualiza el estado del archivo al cambiar
          />
          <br />
          <button className="btn btn-primary btn-upload" type="submit">
            Subir
          </button>
        </form>
      </div>

      {/* Sección de certificados subidos */}
      <div className="certificates-section">
        <div className="uploaded">
          <h4>Certificaciones Subidas</h4>
          <div className="output-div">
            {/* Mapea todos los certificados y los muestra con un botón para ver */}
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

      {/* Renderiza el componente PdfComp si hay un archivo PDF para mostrar */}
      {pdfFile && <PdfComp pdfFile={pdfFile} />}
    </div>
  );
}

export default MyCertificates; // Exporta el componente MyCertificates
