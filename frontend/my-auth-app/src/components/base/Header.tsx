import { GoBell } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import pic from '../../assets/avatar.jpg'
import { BiCalendar } from "react-icons/bi";
import { motion } from "framer-motion";
import ImageToggled from "./ImageToggled";
import { DarkModeToggleDash } from "../ui/DarkModeToggleDash";
import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from "./Search";
import axios from 'axios';
const Header: React.FC = () => {
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
  
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // État pour afficher/cacher les notifications
  const [isProfileOpen, setIsProfileOpen] = useState(false); // État pour afficher/cacher le contenu du profil

  const daty: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formatDate: string = daty.toLocaleDateString("fr-FR", options);

  const dateParts: string[] = formatDate.split(" ");
  const ordreDate: string = `${dateParts[0]}
  ${dateParts[1]}
  ${dateParts[2]}     
  ${dateParts[3]}`;

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="transition-all duration-500 rounded-t-xl dark:bg-zinc-800 border-b dark:border-zinc-600 flex justify-between items-center p-4 relative">
      {/* Informations de la date et de l'emplacement */}
      <div>
         <div className="flex items-center text-xs text-stone-500 dark:text-white">
          <div className="flex justify-around items-center">
            <div className="pr-2">
              <BiCalendar />
            </div>
            <div>{ordreDate}</div>
          </div>
        </div>

      </div>

      {/* Barre de recherche */}
     <Search />
      {/* Bouton et notifications */}
      <div className="flex items-center space-x-5">
      <DarkModeToggleDash />
        <button
          className="relative text-2xl text-gray-600 dark:text-stone-300"
          onClick={toggleNotification}
        >
          {isNotificationOpen ? (
            <IoCloseOutline size={22} />
          ) : (
            <GoBell size={22} />
          )}
          <span
            className={`absolute top-0 right-0 -mt-1 -mr-2 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 dark:border-zinc-800 border-white ${
              isNotificationOpen ? "hidden" : "block"
            }`}
          >
            9
          </span>
        </button>

        {/* Notifications avec animations */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: isNotificationOpen ? 1 : 0,
            y: isNotificationOpen ? 0 : -50,
          }}
          exit={{
            opacity: 0,
            y: -50,
            transition: { duration: 0.3 },
          }}
          transition={{ duration: 0.3 }}
          className={`absolute right-10 mt-20  bg-white dark:bg-zinc-600 shadow-md p-4 rounded-md ${
            isNotificationOpen ? "block" : "hidden"
          }`}
        >
          <p className="text-black dark:text-white  text-sm">Voici vos notifications ! 🎉</p>
        </motion.div>

        {/* Image utilisateur et interaction */}
        <motion.img
          onClick={toggleProfile}
          src={pic}
          className="w-8 h-8 rounded-full border-2 border-zinc-500 dark:bg-zinc-800 dark:border-zinc-100 cursor-pointer "
          alt="Profil utilisateur"
          whileHover={{ scale: 1.1 }}
        />
      </div>

      {/* Contenu du profil avec animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{
          opacity: isProfileOpen ? 1 : 0,
          y: isProfileOpen ? 0 : -30,
        }}
        exit={{
          opacity: 0,
          y: -30,
          transition: { duration: 0.3 },
        }}
        transition={{ duration: 0.3 }}
        className={`absolute right-0 top-16 bg-white dark:bg-gray-900 shadow-xl p-4 rounded-lg w-64 ${
          isProfileOpen ? "block" : "hidden"
        }`}
      >
        <ImageToggled
          name= {username}
          bio="Passionnée par le développement personnel et toujours prête à relever de nouveaux défis."
          goals={["Atteindre 10 000 pas par jour", "Lire 1 livre par mois", "Améliorer la gestion du temps"]}
          progress={50} // Progrès en pourcentage
        />
      </motion.div>
    </div>
  );
};

export default Header;
