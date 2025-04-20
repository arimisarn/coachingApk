import React from "react";
import { motion } from "framer-motion";
import { ProfileProps } from "../../props/ProfileProps";
import { useState } from "react";


const Profile: React.FC<ProfileProps> = ({
  name,
  role,
  bio,
  avatar,
  goals,
  progress,
}) => {
    const [isModificationOpen, setisModificationOpen] = useState(false); // État pour afficher/cacher le input de modification
    const toggleModification= () => {
      setisModificationOpen(!isModificationOpen);
    };
  return (
    <div className="bg-white dark:bg-zinc-800 shadow-lg p-6 w-full transition-all duration-500">
      {/* Photo de l'utilisateur */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 mx-auto shadow-lg"
      >
        <img
          src={avatar}
          alt={name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Informations utilisateur */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-4"
      >
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{name}</h1>
        <h2 className="text-sm text-gray-500">{role}</h2>
        <p className="text-gray-700 mt-2 dark:text-stone-400">{bio}</p>
      </motion.div>

      {/* Objectifs */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-6"
      >
        <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">Objectifs :</h3>
        <ul className="space-y-2 text-gray-700 dark:text-stone-500">
          {goals.map((goal, index) => (
            <li key={index}>✅ {goal}</li>
          ))}
        </ul>
      </motion.div>


      {/* Progrès */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-6"
      >
        <h3 className="text-indigo-600 font-semibold mb-2 dark:text-indigo-400">Progrès :</h3>
        <div className="w-full bg-gray-200 dark:bg-zinc-600 rounded-full">
          <div
            className="bg-indigo-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </motion.div>
         {/* Montrer les input de modification */}
   <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{
                    opacity: isModificationOpen ? 1 : 0,
                    y: isModificationOpen ? 0 : -50,
                  }}
                  exit={{
                    opacity: 1,
                    y: -50,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ duration: 0.3 }}
                  className={`mt-5 bg-white dark:bg-zinc-600 shadow-md p-4 rounded-md ${
                    isModificationOpen ? "block" : "hidden"
                  }`}
                >hello</motion.div>
      {/* Boutons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-6 flex space-x-4 justify-center"
      >
        <button 
          onClick={toggleModification}
          className="bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600 transition">
             {isModificationOpen ? (
                      "Fermer"
                    ) : (
                      "Modifier"
                    )}
        </button>
         
        <button className="border border-indigo-500 text-indigo-500 px-4 py-2 rounded shadow hover:bg-indigo-500 hover:text-white transition">
          Atteindre Objectifs
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;
