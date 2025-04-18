import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Welcome() {
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

  const handleLogout = async () => {
    const token = localStorage.getItem('auth_token');

    try {
      await axios.post('http://localhost:8000/auth/token/logout/', {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      localStorage.removeItem('auth_token');
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
      <div className="absolute inset-0 -z-10 h-full w-full transition-all duration-500
      bg-white dark:bg-black
      [background:radial-gradient(125%_125%_at_50%_10%,theme(colors.white)_40%,#63e_100%)]
      dark:[background:radial-gradient(125%_125%_at_50%_10%,theme(colors.black)_40%,#63e_100%)]"  >
      <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-sm w-full text-center text-white">
        <h1 className="text-2xl font-semibold mb-4">Bienvenue, {username}!</h1>
        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-2 bg-white text-pink-600 font-semibold rounded-full shadow-md hover:bg-pink-100 transition"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default Welcome;
