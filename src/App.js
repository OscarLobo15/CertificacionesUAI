// frontend/app.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import NavBar from './components/Navbar';
import Home from './components/home';
import Certificados from './components/certificados';
import Miscertificados from './components/miscertificados';
import Profile from './components/profile';
import Carreras from './components/carreras';
import LanguageSwitcher from './components/languageSwitcher';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import './App.css';
import './i18n';

function App() {
  const { loginWithRedirect, getAccessTokenSilently, user } = useAuth0();

  const handleLogin = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      // Remove this line: axios.post('/api/auth/login', { authToken: accessToken });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <LanguageSwitcher />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/carreras" element={<Carreras />} />
          <Route exact path="/miscertificados" element={<Dashboard />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/certificados/:id" element={<Certificados />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;