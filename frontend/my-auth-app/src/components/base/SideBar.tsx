import { LuUser } from "react-icons/lu"
import { FiHome , FiLogOut, FiSettings} from "react-icons/fi"
import { FaChartBar, FaUserTie } from "react-icons/fa"
import { FaRobot } from "react-icons/fa"
import logoPetit from "../../assets/logopetit.png"
import logoGrand from "../../assets/logogrand.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion"

const SideBar = () => {
  const [isDeconnexionOpen, setisDeconnexionOpen] = useState(false); // État pour afficher/cacher le input de modification
    const toggleDeconnexion= () => {
      setisDeconnexionOpen(!isDeconnexionOpen);
    };



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

      const [activeLink, setActiveLink] = useState(0)
      const handleLinkClick= (index) =>{
          setActiveLink(index)
      }

    const SIDEBAR_LINKS = [
        {id:1, path: "/home" , name: "Accueil", icon: FiHome},
        {id:2, path: "/profil", name: "Mon profil", icon: LuUser},
        {id:3, path: "/coaching", name: "Coaching", icon: FaUserTie},
        {id:4, path: "/progression", name: "Progression", icon: FaChartBar},
        {id:5, path: "/messages", name: "Discuter avec l'IA", icon: FaRobot},

    ]

    const SIDEBAR_LINK = [
      {id:1, path: "/parametre" , name: "Paramètres", icon: FiSettings},
  ]
  const SIDEBAR_LINKe = [
    {id:1, name: "Se déconnecter", icon: FiLogOut},    
]
  return (
    <>
    
    <div className="w-16 md:w-56 fixed rounded-t-md left-0 top-4 bottom-4 z-10 h-screen border-r border-white dark:border-zinc-600 dark:bg-zinc-800 pt-8 px-4 bg-white">
      <div className="mb-8 pb-2 border-b dark:border-zinc-700 ">
       <div className="hidden md:flex md:justify-center md:items-center">
        <div>
        <img src={logoPetit} className="w-[50px] h-[50px]" alt="" />
        </div>
        <div className="text-indigo-500 mb-3 font-semibold">
          Tsinjool
        </div>
       </div>
       <div className="flex md:hidden">
       <img src={logoGrand} className="w-[70px] h-[50px]" alt="" />

       </div>
      </div>
      <ul className="mt-2 space-y-2 text-sm">
        {
            SIDEBAR_LINKS.map((link, index) =>(
                <li key={index} className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 dark:hover:bg-zinc-700 hover:text-indigo-500 ${
                    activeLink === index ? "bg-indigo-100 dark:bg-zinc-700" : ""
                }`}>
                    <Link 
                        to={link.path} 
                        className="flex items-center justify-center md:justify-start md:space-x-5"
                        onClick={() =>handleLinkClick(index)}>
                          
                        <span className="text-black dark:text-white">{link.icon()}</span>
                        <span className="transition-all dusration-500 text-sm text-gray-500 dark:text-gray-400 hidden md:flex">{link.name}</span>
                    </Link>
                </li>
            )) 
        }
      </ul>

      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center ">
      <ul className="mt-2 space-y-2 text-sm">
        {
            SIDEBAR_LINK.map((link, index) =>(
                <li key={index} className={`font-medium rounded-md py-2 px-5 dark:hover:bg-zinc-700 hover:bg-gray-100 hover:text-indigo-500 ${
                    activeLink === index ? "bg-indigo-100 dark:bg-zinc-800" : ""
                }`}>
                    <Link 
                        to={link.path} 
                        className="flex items-center justify-center md:justify-start md:space-x-5"
                        onClick={() =>handleLinkClick(index)}>
                        
                        <span className="text-black dark:text-white">{link.icon()}</span>
                        <span className="text-sm text-gray-500 hidden md:flex">{link.name}</span>
                    </Link>
                </li>
            )) 
        }
      </ul>
      <ul className="mt-2 space-y-2 text-sm">
        {
            SIDEBAR_LINKe.map((link, index) =>(
                <li key={index} className="dark:hover:bg-zinc-700 font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500">
                    <button 
                        className=" flex items-center justify-center md:justify-start md:space-x-5"
                        onClick={toggleDeconnexion}>
                        
                        <span className="text-black dark:text-white">{link.icon()}</span>
                        <span className="text-sm text-gray-500 hidden md:flex">{link.name}</span>
                    </button>
               </li>
            )) 
        }
      </ul>
      </div>
          {/* Montrer les input de modification */}
          <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{
                    opacity: isDeconnexionOpen ? 1 : 0,
                    y: isDeconnexionOpen ? 0 : -50,
                  }}
                  exit={{
                    opacity: 1,
                    y: -50,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center justify-center flex-col fixed inset-y-60 inset-x-[450px]
                     bg-stone-100 dark:text-white dark:bg-zinc-700 shadow-md rounded-md ${
                    isDeconnexionOpen ? "block" : "hidden"
                  }`}
                >
                  <p className="dark:text-indigo-400 text-indigo-600 font-semibold mt-4">Déconnexion ?</p>
                  <p className="my-3">Souhaitez-vous vraiment vous déconnecter ?</p>
                  <div className="my-4">
                    <button
                   onClick={toggleDeconnexion}
                    className="border px-7 py-1 mx-5 rounded-md text-white bg-zinc-500 border-zinc-500 ">
                      Non
                    </button>
                    <button 
                    className="border px-7 py-1 mx-5  rounded-md text-white bg-indigo-500 border-indigo-500 "
                    onClick={handleLogout}>
                      Oui
                    </button>
                  </div>
                </motion.div>
    </div>
  
    </>
  )
}

export default SideBar
