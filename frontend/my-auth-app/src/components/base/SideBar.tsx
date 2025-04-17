import { LuUser } from "react-icons/lu"
import { FiHome , FiLogOut, FiSettings} from "react-icons/fi"
import { FaChartBar, FaUserTie } from "react-icons/fa"
import { FaRobot } from "react-icons/fa"
import logoPetit from "../../assets/logopetit.png"
import logoGrand from "../../assets/logogrand.png"
import { Link } from "react-router-dom"
import { useState } from "react"

const SideBar = () => {
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
      {id:2, path: "/profil", name: "Se déconnecter", icon: FiLogOut},    
  ]
  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white">
      <div className="mb-8 pb-2 border-b">
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
                <li key={index} className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${
                    activeLink === index ? "bg-indigo-100" : ""
                }`}>
                    <Link 
                        to={link.path} 
                        className="flex items-center justify-center md:justify-start md:space-x-5"
                        onClick={() =>handleLinkClick(index)}>
                          
                        <span>{link.icon()}</span>
                        <span className="text-sm text-gray-500 hidden md:flex">{link.name}</span>
                    </Link>
                </li>
            )) 
        }
      </ul>

      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center ">
      <ul className="mt-2 space-y-2 text-sm">
        {
            SIDEBAR_LINK.map((link, index) =>(
                <li key={index} className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${
                    activeLink === index ? "bg-indigo-100" : ""
                }`}>
                    <Link 
                        to={link.path} 
                        className="flex items-center justify-center md:justify-start md:space-x-5"
                        onClick={() =>handleLinkClick(index)}>
                        
                        <span>{link.icon()}</span>
                        <span className="text-sm text-gray-500 hidden md:flex">{link.name}</span>
                    </Link>
                </li>
            )) 
        }
      </ul>

      </div>
    </div>
  )
}

export default SideBar
