import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";
import picture from '../../assets/a.jpeg.jpg'
import { LuBot } from "react-icons/lu";
import { BsMoon, BsSun } from "react-icons/bs"; // Icônes pour le mode sombre/clair

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour, que puis-je faire pour vous?" },
  ]);
  const [input, setInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Gestion du mode sombre
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setInput("");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Bonjour Arimisa, voulez-vous que je vous aide à atteindre votre objectif du jour? 😊" },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex flex-col w-full h-[80vh] rounded shadow-md p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} transition duration-300`}>
      {/* Bouton pour changer de mode (Lune/Soleil) à côté de la notification */}
      <div className="flex justify-end items-center space-x-5 mb-2">
        {/* Bouton mode sombre/clair */}
        <motion.button
          onClick={() => setIsDarkMode(!isDarkMode)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-xl text-gray-600 dark:text-gray-300 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition duration-300"
        >
          {isDarkMode ? <BsSun className="text-yellow-500" /> : <BsMoon className="text-blue-500" />}
        </motion.button>
      </div>

      {/* Conteneur des messages */}
      <div className="flex-1 flex flex-col overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative flex my-2 max-w-xs ${
              msg.role === "user" ? "self-end mr-6" : "self-start ml-6"
            }`}
          >
            {/* Message avec fond stylé */}
            <div
              className={`p-3 ${
                msg.role === "user"
                  ? "bg-indigo-500 text-white rounded-s-md rounded-t-md mr-5"
                  : "bg-gray-300 text-black dark:bg-gray-600 dark:text-white rounded-e-md rounded-t-md ml-5"
              }`}
            >
              {msg.content}
            </div>
            
            {/* Icône du bot ou photo utilisateur positionnée en bas à gauche/droite */}
            {msg.role === "user" ? (
              <img
                src={picture}
                alt="User"
                className="absolute bottom-2 right-0 w-8 h-8 rounded-full translate-y-1/2 translate-x-1/2 border-2 border-indigo-500"
              />
            ) : (
              <LuBot className="absolute bottom-2 text-black dark:text-gray-300 w-8 h-8 translate-y-1/2 -translate-x-1/2" />
            )}
          </motion.div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input et bouton d'envoi */}
      <div className="flex">
        <input
          className={`flex-1 p-2 border rounded outline-none ${isDarkMode ? "bg-gray-800 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Votre message ici ..."
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`ml-2 px-4 py-2 ${isDarkMode ? "bg-indigo-600" : "bg-indigo-500"} text-white rounded hover:bg-blue-600 transition`}
          onClick={handleSend}
          type="submit"
        >
          <IoSend />
        </motion.button>
      </div>
    </div>
  );
};

export default Messages;
