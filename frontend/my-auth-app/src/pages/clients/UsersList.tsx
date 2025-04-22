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
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Utilisateurs inscrits</h2>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="bg-white shadow-md p-4 rounded-2xl border border-gray-200">
            <p className="text-lg font-semibold">{user.username}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
