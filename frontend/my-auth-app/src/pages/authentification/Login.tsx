import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
    const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/auth/token/login/', { username, password });
      localStorage.setItem('auth_token', response.data.auth_token);
      navigate('/welcome');
    } catch (error: any) {
      if (error.response?.status === 400) {
        const detail = error.response?.data?.non_field_errors?.[0] || '';
        if (detail.includes('Invalid credentials')) {
          setError("Nom d'utilisateur ou mot de passe incorrect.");
        } else {
          setError("Erreur lors de la connexion.");
        }
      } else {
        setError("Erreur serveur, veuillez réessayer.");
      }
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full"
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Connexion</h2>
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
          type="submit" 
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
          disabled={loading}
          >
            Se connecter
            {loading && (
              <svg
                className="ml-2 h-4 w-4 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
