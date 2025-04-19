import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/clients/Home';
import Register from './pages/authentification/Register';
import Login from './pages/authentification/Login';
import Welcome from './pages/clients/Welcome';
import Messages from './pages/clients/Messages';
import Profil from './pages/clients/Profil';
import Coaching from './pages/clients/Coaching';
import Progression from './pages/clients/Progression';
import Layout from './layout/Layout';
import Parametres from './pages/clients/Parametres';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="home" element={<Home />} />
          <Route path="profil" element={<Profil />} />
          <Route path="messages" element={<Messages />} />
          <Route path="coaching" element={<Coaching />} />
          <Route path="progression" element={<Progression />} />
          <Route path="parametre" element={<Parametres />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
