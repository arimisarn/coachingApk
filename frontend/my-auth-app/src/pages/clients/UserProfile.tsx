import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
}

export default function UserProfile() {
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
  
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/accounts/users/${id}/`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <p className="text-center mt-10">Chargement du profil...</p>;

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-2xl shadow text-center">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">{user.username}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}
