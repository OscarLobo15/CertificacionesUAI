import { useState } from "react"; // Importa el hook useState desde React para manejar el estado
import { Document, Page } from "react-pdf"; // Importa Document y Page desde react-pdf para mostrar el PDF
import pdf from "./1.pdf"; // Importa el archivo PDF

function PdfComp(props) {
  // Estado para almacenar el número total de páginas del PDF y el número de la página actual
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  // Función que se ejecuta cuando el documento PDF se carga con éxito, actualiza el estado con el número total de páginas
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Renderiza el componente
  return (
    <div className="pdf-div">
      {/* Muestra el número de la página actual y el número total de páginas */}
      <p>
        Page {pageNumber} of {numPages}
      </p>
      {/* Renderiza el documento PDF */}
      <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {/* Mapea y renderiza cada página del PDF */}
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                key={page} // Propiedad key única para cada página
                pageNumber={page} // Número de la página que se va a renderizar
                renderTextLayer={false} // No renderizar la capa de texto
                renderAnnotationLayer={false} // No renderizar la capa de anotaciones
              />
            );
          })}
      </Document>
    </div>
  );
}

export default PdfComp; // Exporta el componente PdfComp
