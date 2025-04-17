import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slides } from '../../constant';




function Register() {
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:8000/auth/users/', { email, username, password });
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      if (error.response?.data?.username) {
        setError("Ce nom d'utilisateur est déjà pris.");
      } else if (error.response?.data?.email) {
        setError("Cette adresse email est déjà utilisée.");
      } else {
        setError("Une erreur est survenue lors de l'inscription.");
      }
      setShake(true);
      setLoading(false);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-around transition-colors duration-500">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 h-full w-full transition-all duration-500
        bg-white dark:bg-black
        [background:radial-gradient(125%_125%_at_50%_10%,theme(colors.white)_40%,#63e_100%)]
        dark:[background:radial-gradient(125%_125%_at_50%_10%,theme(colors.black)_40%,#63e_100%)]"
      />

      {/* Carousel */}
      <div className="w-1/2 h-[400px] flex items-center justify-center">
        <div className="relative w-[80%] h-full overflow-hidden rounded-xl shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold ${slides[index].bg}`}
            >
              <img src={slides[index].image} alt={slides[index].content} className="w-48 h-48 object-cover rounded-lg mb-4 shadow-lg" />
             <p className="text-xl font-semibold">
              {slides[index].content}
              </p> 
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Formulaire */}
      <div className="flex items-center w-1/2 justify-center">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full dark:bg-zinc-900"
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-center mb-4 text-zinc-800 dark:text-white">Inscription</h2>
          {error && <p className="text-red-600 text-center mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md dark:bg-zinc-800 dark:text-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md dark:bg-zinc-800 dark:text-white"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md dark:bg-zinc-800 dark:text-white"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
              disabled={loading}
            >
              S'inscrire
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
          <p className='mt-3 text-md font-[Arial]'>Vous avez déja un compte? </p>
          <Link to="/login" className='underline text-green-600 hover:font-semibold transition-all duration-500 hover:text-md'> Se connecter maitenant</Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
