import React from "react";
import { motion } from "framer-motion";

interface ImageToggledProps {
  name: string;
  bio: string;
  goals: string[];
  progress: number;
}

const ImageToggled: React.FC<ImageToggledProps> = ({
  name,
  bio,
  goals,
  progress,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full">

      {/* Informations utilisateur */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-4"
      >
        <h1 className="text-lg font-bold dark:text-indigo-400 text-indigo-600">{name}</h1>
        <p className="text-sm dark:text-gray-500  text-gray-700 mt-2">{bio}</p>
      </motion.div>

      {/* Objectifs */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-6"
      >
        <h5 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">Objectifs :</h5>
        <ul className="space-y-2 text-gray-700 dark:text-gray-500 text-sm">
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
        <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">Progrès :</h3>
        <div className="w-full bg-gray-200 dark:bg-gray-300 rounded-full">
          <div
            className="bg-indigo-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageToggled;
