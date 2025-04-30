import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfileSetup: React.FC = () => {
  const [bio, setBio] = useState('');
  const [coachingType, setCoachingType] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string>(''); // Pour afficher une erreur si nécessaire
  const [loading, setLoading] = useState<boolean>(false); // Pour gérer le chargement
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Début du chargement

    // Validation des champs
    if (!bio || !coachingType) {
      setError('Tous les champs sont obligatoires.');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('auth_token');
    const formData = new FormData();
    formData.append('bio', bio);
    formData.append('coaching_type', coachingType);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      // Envoi des données au backend
      await axios.post('http://localhost:8000/accounts/profile/setup/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Marque l'utilisateur comme ayant complété sa configuration
      localStorage.setItem('hasCompletedProfile', 'true');

      // Redirection vers la page d'accueil après configuration du profil
      navigate('/home');
    } catch (error: any) {
      console.error('Erreur lors de la configuration du profil :', error);
      setError('Une erreur est survenue, veuillez réessayer.'); // Message d'erreur générique
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-indigo-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-indigo-600 text-center">Configuration du profil</h2>

        {error && <p className="text-red-600 text-center">{error}</p>} {/* Affiche l'erreur si elle existe */}

        <label htmlFor="photo" className="block text-gray-700">Photo de profil :</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          className="w-full"
        />

        <textarea
          placeholder="Votre bio..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        />

        <select
          value={coachingType}
          onChange={(e) => setCoachingType(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Type de coaching</option>
          <option value="nutrition">Nutrition</option>
          <option value="sport">Sport</option>
          <option value="mental">Mental</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-md py-2 font-semibold hover:bg-indigo-700"
          disabled={loading} // Désactive le bouton pendant le chargement
        >
          {loading ? 'Chargement...' : 'Sauvegarder et continuer'}
        </button>
      </form>
    </motion.div>
  );
};

export default ProfileSetup;
