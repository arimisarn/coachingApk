import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from "../../components/base/ProfileComponent";
import axios from "axios";
import profile from '../../assets/avatar.jpg'

const Profil: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

      const navigate = useNavigate();
    
      useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          navigate('/login');
          return;
        }
    
        axios.get('http://localhost:8000/auth/users/me/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          setUsername(response.data.username);  
          setEmail(response.data.email);     
        })
        .catch(() => {
          // Si le token est invalide, on redirige vers login
          localStorage.removeItem('auth_token');
          navigate('/login');
        });
      }, [navigate]);
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <Profile
        name={username}
        role={email}
        bio="Passionnée par le développement personnel et toujours prête à relever de nouveaux défis."
        avatar={profile} // Remplacez par une URL ou une image réelle
        goals={["Atteindre 10 000 pas par jour", "Lire 1 livre par mois", "Améliorer la gestion du temps"]}
        progress={7} // Progrès en pourcentage
      />
    </div>
  );
};
export default Profil;
