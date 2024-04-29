import React from "react"; // Importa React y el hook useState
import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import { useAuth0 } from "@auth0/auth0-react"; // Importa el hook useAuth0 para acceder a la información del usuario autenticado
import { Link } from "react-router-dom"; // Importa Link para la navegación entre páginas
import '../CSS/profile.css'; // Importa el archivo de estilos CSS para el perfil
import { useTranslation } from 'react-i18next'; // Importa el hook useTranslation para manejar las traducciones
import { useEffect, useState } from 'react'; // Importa useEffect y useState desde React

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
  const { t, i18n } = useTranslation(); // Usa el hook useTranslation para obtener las traducciones y el objeto i18n
  const [initialized, setInitialized] = useState(false); // Estado para verificar si la inicialización ha ocurrido

  // Efecto para cargar el idioma almacenado al inicio
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language'); // Obtiene el idioma almacenado en el almacenamiento local
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage); // Cambia el idioma según el idioma almacenado
    }
    setInitialized(true); // Establece que la inicialización ha ocurrido
  }, [i18n]); // El efecto se ejecuta cada vez que cambia el objeto i18n

  // Función para cambiar el idioma seleccionado
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Cambia el idioma usando el objeto i18n
    localStorage.setItem('language', lng); // Almacena el idioma seleccionado en el almacenamiento local
  };

  // Si la inicialización no ha ocurrido, retorna null para evitar renderizado
  if (!initialized) return null;

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
      <h1>{t('Profile.title')}</h1>
      <form>
        {/* Campos de entrada para el nombre, apodo, correo electrónico y rol del usuario */}
        <div className="form-group">
          <input
            onChange={handleChange}
            name="name"
            value={user.name}
            autoComplete="off"
            className="form-control"
            placeholder={t('Profile.name')}
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
            placeholder={t('Profile.nickname')}
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
            placeholder={t('Profile.role')}
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
            placeholder={t('Profile.career')}
          />
        </div>
        {/* Botón para guardar los cambios en el perfil del usuario */}
        <button onClick={handleClick} className="btn btn-lg btn-info">
          {t('Profile.save')}
        </button>
      </form>
      {/* Enlace para ver las estadísticas del usuario */}
      <div className="mt-3">
        <Link to="/estadisticas" className="btn btn-lg btn-primary">
          {t('Profile.stats')}
        </Link>
      </div>
    </div>
  );
}

export default Profile; // Exporta el componente Profile
