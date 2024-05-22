import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import NavBar from './components/Navbar';
import Home from './components/home';
import Certificates from './components/certificates';
import Profile from './components/profile';
import Careers from './components/careers';
import LanguageSwitcher from './components/languageSwitcher';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import './App.css';
import './i18n';
import MyCertificates from './components/myCertificates';
import Login from './components/login';
import SignUp from './components/signup';
import { UserProvider as UserContextProvider } from "./context/UserContext";
import UserProfileForm from './components/newuser';
import AdminPage from './components/admin';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        // No hay sesión activa
      } else {
        // Hay una sesión activa
      }
    });
  }, [navigate]);

  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  return (
    <UserContextProvider>
      <div className="App">
        <LanguageSwitcher />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/carreras" element={<Careers />} />
          <Route exact path="/miscertificados" element={<MyCertificates />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/certificates/:id" element={<Certificates />} />
          <Route exact path="/estadisticas" element={<Dashboard />} />
          <Route path={'/signup'} element={<SignUp />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path={'/crearcuenta'} element={<UserProfileForm />} />
          <Route path={'/administracion'} element={< AdminPage/>} />

        </Routes>
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default App;