import React, { useState } from "react"; // Importa React y el hook useState
import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import { useAuth0 } from "@auth0/auth0-react"; // Importa el hook useAuth0 para acceder a la información del usuario autenticado
import { Link } from "react-router-dom"; // Importa Link para la navegación entre páginas
import '../CSS/profile.css'; // Importa el archivo de estilos CSS para el perfil

function Profile() {
  const { user } = useAuth0(); // Obtiene el usuario autenticado del hook useAuth0
  const [input, setInput] = useState({ // Define el estado para los datos del formulario
    name: user.name, // Nombre del usuario
    nickname: user.nickname, // Apodo del usuario
    email: user.email, // Correo electrónico del usuario
    auth0Id: user.sub, // ID del usuario generado por Auth0
    role: "Estudiante", // Rol del usuario
    career: "", // Carrera del usuario
  });

  // Función para manejar el cambio en los campos del formulario
  function handleChange(event) {
    const { name, value } = event.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }

  // Función para manejar el clic en el botón de guardar
  async function handleClick(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const newUser = { // Crea un nuevo objeto con los datos del usuario actualizados
      name: input.name,
      nickname: input.nickname,
      email: input.email,
      auth0Id: user.sub,
      role: input.role,
      career: input.career,
    };

    await axios.post("http://localhost:3001/profile", newUser); // Realiza una solicitud POST para actualizar el perfil del usuario
  }

  // Renderiza el componente de perfil
  return (
    <div className="container">
      <h1>Formulario de usuario</h1>
      <form>
        {/* Campos de entrada para el nombre, apodo, correo electrónico y rol del usuario */}
        <div className="form-group">
          <input
            onChange={handleChange}
            name="name"
            value={user.name}
            autoComplete="off"
            className="form-control"
            placeholder="Nombre"
            disabled
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="nickname"
            value={user.nickname}
            autoComplete="off"
            className="form-control"
            placeholder="Apodo"
            disabled
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="email"
            value={user.email}
            autoComplete="off"
            className="form-control"
            placeholder="Email"
            disabled
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="role"
            value="Estudiante"
            autoComplete="off"
            className="form-control"
            placeholder="Rol"
            disabled
          />
        </div>
        {/* Campo de entrada para la carrera del usuario */}
        <div className="form-group">
          <input
            onChange={handleChange}
            name="career"
            value={input.career}
            autoComplete="off"
            className="form-control"
            placeholder="Carrera"
          />
        </div>
        {/* Botón para guardar los cambios en el perfil del usuario */}
        <button onClick={handleClick} className="btn btn-lg btn-info">
          Guardar
        </button>
      </form>
      {/* Enlace para ver las estadísticas del usuario */}
      <div className="mt-3">
        <Link to="/estadisticas" className="btn btn-lg btn-primary">
          Ver Estadísticas
        </Link>
      </div>
    </div>
  );
}

export default Profile; // Exporta el componente Profile
