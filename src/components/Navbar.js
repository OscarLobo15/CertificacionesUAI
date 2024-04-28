import React, { useEffect, useState } from 'react'; // Importa React, useEffect y useState desde React
import { NavLink } from 'react-router-dom'; // Importa NavLink desde react-router-dom para la navegación
import { useAuth0 } from '@auth0/auth0-react'; // Importa useAuth0 para manejar la autenticación con Auth0
import { useTranslation } from 'react-i18next'; // Importa useTranslation para manejar las traducciones
import '../CSS/Navbar.css'; // Importa los estilos CSS del componente NavBar

function NavBar() {
  // Obtiene funciones y estados de autenticación de Auth0
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const { t, i18n } = useTranslation(); // Obtiene las traducciones y el objeto i18n con useTranslation
  const [initialized, setInitialized] = useState(false); // Estado para verificar si la inicialización ha ocurrido

  // Efecto para cargar el idioma almacenado al iniciar
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language'); // Obtiene el idioma almacenado en localStorage
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage); // Cambia el idioma a partir del almacenado
    }
    setInitialized(true); // Marca la inicialización como completada
  }, [i18n]); // Se ejecuta cada vez que cambia el objeto i18n

  // Función para cambiar el idioma
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Cambia el idioma utilizando i18n
    localStorage.setItem('language', lng); // Guarda el idioma seleccionado en localStorage
  };

  if (!initialized) return null; // Si la inicialización no ha ocurrido, no renderiza nada

  // Renderiza el componente NavBar
  return (
    <div className="navbar navbar-expand-lg bg-primary p-6 d-flex justify-content-between bg-ffc107">
      <div className="topnav">
        <ul className="navbar-nav mx-auto">
          {/* Enlaces de navegación */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              {t('navbar.home')} {/* Traducción del texto para 'home' */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/carreras">
              {t('navbar.certificates')} {/* Traducción del texto para 'certificates' */}
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <ul className="navbar-nav mx.auto justify-content">
          {/* Renderiza el enlace a 'Mis Certificados' si el usuario está autenticado */}
          {isAuthenticated && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/miscertificados">
                {t('navbar.myCertificates')} {/* Traducción del texto para 'myCertificates' */}
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            {/* Renderiza el botón de inicio de sesión o cierre de sesión según el estado de autenticación */}
            {isAuthenticated ? (
              <button
                className="nav-link"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                {t('navbar.logOut')} {/* Traducción del texto para 'logOut' */}
              </button>
            ) : (
              <button className="nav-link" onClick={() => loginWithRedirect()}>
                {t('navbar.logIn')} {/* Traducción del texto para 'logIn' */}
              </button>
            )}
          </li>
          {/* Renderiza el enlace al perfil del usuario si está autenticado */}
          {isAuthenticated && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                {/* Icono y texto para 'account' */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-user-circle"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                </svg>
                {t('navbar.account')} {/* Traducción del texto para 'account' */}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar; // Exporta el componente NavBar
