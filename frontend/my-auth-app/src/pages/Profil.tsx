import React from "react";
import Profile from "../components/base/ProfileComponent";
import profile from '../assets/a.jpeg.jpg'

const Profil: React.FC = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <Profile
        name="Arimisa Nathalie"
        role="Utilisateur"
        bio="Passionnée par le développement personnel et toujours prête à relever de nouveaux défis."
        avatar={profile} // Remplacez par une URL ou une image réelle
        goals={["Atteindre 10 000 pas par jour", "Lire 1 livre par mois", "Améliorer la gestion du temps"]}
        progress={7} // Progrès en pourcentage
      />
    </div>
  );
};
export default Profil;
