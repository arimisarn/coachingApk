import slide2 from '../assets/main-robot-touchant-main-humaine_23-2151015279-removebg-preview.png'
import slide1 from '../assets/logogrand.png'
import slide3 from '../assets/logopetit.png'
import { LuUser } from "react-icons/lu"
import { FiHome , FiLogOut, FiSettings} from "react-icons/fi"
import { FaChartBar, FaUserTie } from "react-icons/fa"
import { FaRobot } from "react-icons/fa"
export const slidesLogin = [
  {
    id: 1,
    content: 'Bonjour 👋 Bon retour parmi nous. Explorez les coaching de Tsinjool',
    bg: 'transparent',
    image: slide1
  },
  {
    id: 2,
    content: 'Nous vous accompagnons tout au long de votre parcours 🤖',
    bg: 'transparent',
    image: slide2
  },
  {
    id: 3,
    content: 'Slide 3: Hola 🌞',
    bg: 'transparent',
    image: slide3
  },
];

export const slidesRegister = [
  {
    id: 1,
    content: 'Bonjour 👋 Bienvenue sur Tsinjool, un plateforme de coaching en ligne alimentée par l\'IA',
    bg: 'transparent',
    image: slide1
  },
  {
    id: 2,
    content: 'Nous vous accompagnons tout au long de votre parcours 🤖',
    bg: 'transparent',
    image: slide2
  },
  {
    id: 3,
    content: 'Slide 3: Hola 🌞',
    bg: 'transparent',
    image: slide3
  },
];

 export const SIDEBAR_LINKS = [
        {id:1, path: "/home" , name: "Accueil", icon: FiHome},
        {id:2, path: "/profil", name: "Mon profil", icon: LuUser},
        {id:3, path: "/coaching", name: "Coaching", icon: FaUserTie},
        {id:4, path: "/progression", name: "Progression", icon: FaChartBar},
        {id:5, path: "/messages", name: "Discuter avec l'IA", icon: FaRobot},

    ]

export const objectifs = [
  {
    nom: "Exercice de relaxation",
    type: "Web",
    date: "2024-08-15",
    members: ["Alice", "Bob", "Charlie"],
    files: 4,
    progression: 79,
  },
  {
    nom: "Exercice de relaxation",
    type: "Web",
    date: "2024-08-15",
    members: ["Alice", "Bob", "Charlie"],
    files: 4,
    progression: 27,
  },
  {
    nom: "Exercice de relaxation",
    type: "Web",
    date: "2024-08-15",
    members: ["Alice", "Bob", "Charlie"],
    files: 4,
    progression: 67.0,
  },  
  {
    nom: "Exercice de relaxation",
    type: "Web",
    date: "2024-08-15",
    members: ["Alice", "Bob", "Charlie"],
    files: 4,
    progression: 62,
  }, 
]