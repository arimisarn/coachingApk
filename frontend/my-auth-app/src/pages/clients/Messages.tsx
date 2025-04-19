import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoSend } from "react-icons/io5";
import picture from '../../assets/a.jpeg.jpg';
import { LuBot } from "react-icons/lu";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Messages = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ✅ Auth: récupère nom d'utilisateur
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
    .then((response) => {
      setUsername(response.data.username);

      setMessages([
        {
          role: "assistant",
          content: `Bonjour ${response.data.username}, que puis-je faire pour vous ? 😊`,
        },
      ]);
    })
    .catch(() => {
      localStorage.removeItem('auth_token');
      navigate('/login');
    });
  }, [navigate]);

  // ✅ Scroll auto vers le bas
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // ✅ Requête vers Ollama local (TinyLLaMA)
      const response = await axios.post('http://localhost:11500/api/generate', {
        model: "tinyllama",
        prompt: input,
        stream: false
      }, {
        timeout: 60000, // 60 secondes
      });

      console.log("Réponse complète : ", response.data); // 🪵 pour debug

      const botResponse = response.data?.response?.trim();

      const assistantMessage = {
        role: "assistant" as const,
        content: botResponse || "Je n’ai pas compris, peux-tu reformuler ?",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erreur lors de l’appel à Ollama:", error);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Une erreur est survenue. Veuillez réessayer plus tard."
      }]);
    }
  };

  return (
    <div className="flex flex-col w-full h-[85vh] overflow-y-hidden pb-2 rounded shadow-md p-4 dark:bg-gray-800 dark:text-white bg-gray-100 text-black transition duration-300">
      {/* Messages */}
      <div className="flex-1 flex flex-col overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative flex my-2 max-w-xs ${msg.role === "user" ? "self-end mr-6" : "self-start ml-6"}`}
          >
            <div
              className={`p-3 ${
                msg.role === "user"
                  ? "bg-indigo-500 text-white rounded-s-md rounded-t-md mr-5"
                  : "bg-gray-300 text-black dark:bg-gray-600 dark:text-white rounded-e-md rounded-t-md ml-5"
              }`}
            >
              {msg.content}
            </div>

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

      {/* Input */}
      <div className="flex">
        <input
          className="flex-1 p-2 border rounded outline-none dark:bg-zinc-700 dark:text-white dark:border-gray-500 bg-white text-black border-gray-300"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Votre message ici ..."
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="ml-2 px-4 py-2 dark:bg-indigo-600 bg-indigo-500 text-white rounded hover:bg-blue-600 transition"
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
