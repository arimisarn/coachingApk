import ObjectifCard from "../../components/base/ObjectifCard"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { objectifs } from "../../constant";
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');
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
      .then((response) => setUsername(response.data.username))
      .catch(() => {
        // Si le token est invalide, on redirige vers login
        localStorage.removeItem('auth_token');
        navigate('/login');
      });
    }, [navigate]);
  return (
    <>
    <div className="min-h-[100vh] flex dark:bg-zinc-800 bg-white">
  <div className="p-5">
    <div className="flex justify-between items-center">
      <h1 className="text-lg font-semibold dark:text-white">
        Objectifs
      </h1>
      <p className="text-sm underline text-indigo-600">Voir tout</p>
    </div>
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
      {
        objectifs && objectifs.map((objectif) => <ObjectifCard objectif={objectif} />)
      }
    </div>
  </div>
  </div>
  </>
  )
}

export default Home
