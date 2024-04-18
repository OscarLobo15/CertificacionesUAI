import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import '../CSS/Navbar.css';

function NavBar() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const { t, i18n } = useTranslation(); // Usa el hook useTranslation para obtener las traducciones y el objeto i18n
  const [initialized, setInitialized] = useState(false);

  // Carga el idioma almacenado al inicio
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
    setInitialized(true);
  }, [i18n]);

  // Guarda el idioma seleccionado cuando cambia
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  if (!initialized) return null; // Espera hasta que se haya inicializado el estado

  return (
    <div className="navbar navbar-expand-lg bg-primary p-6 d-flex justify-content-between bg-ffc107">
      <div className="topnav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              {t('navbar.home')}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/carreras">
              {t('navbar.certificates')}
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <ul className="navbar-nav mx.auto justify-content">
          {isAuthenticated && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/miscertificados">
                {t('navbar.myCertificates')}
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            {isAuthenticated ? (
              <button
                className="nav-link"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                {t('navbar.logOut')}
              </button>
            ) : (
              <button className="nav-link" onClick={() => loginWithRedirect()}>
                {t('navbar.logIn')}
              </button>
            )}
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
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
                {t('navbar.account')}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;