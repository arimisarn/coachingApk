import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
}

export default function UsersList() {
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

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/accounts/users/')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Liste des utilisateurs</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
            className="p-4 bg-white rounded-2xl shadow hover:bg-indigo-50 cursor-pointer border"
          >
            <p className="font-semibold text-lg">{user.username}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
