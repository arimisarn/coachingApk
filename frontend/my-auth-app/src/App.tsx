import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DarkModeToggle } from "./components/ui/DarkModeToggle";
import FloattingBubles from "./components/ui/FloattingBubles";
import logo from './assets/logogrand.png'




const App = () => {
  return (
    <div className="h-screen w-screen  relative transition-colors duration-500">
      <FloattingBubles />
      {/* Fond animé */}
      <div
        className="absolute inset-0 -z-10 h-full w-full transition-all duration-500
        bg-white dark:bg-black
        [background:radial-gradient(125%_125%_at_50%_10%,theme(colors.white)_40%,#63e_100%)]
        dark:[background:radial-gradient(125%_125%_at_50%_10%,theme(colors.black)_40%,#63e_100%)]"
      />

      {/* Header avec logo et boutons */}
      <header className="flex justify-between items-center px-6 py-4">
        {/* Logo à gauche */}
          <img src={logo} alt="" className="w-[90px]" />

        {/* Liens + bouton mode sombre */}
        <div className="flex items-center space-x-4 mr-11">
          <Link
            to="/register"
            className="px-4 py-2 rounded-3xl text-white font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Inscription
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-3xl text-white font-bold bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
          >
            Connexion
          </Link>
          <DarkModeToggle />
        </div>
      </header>
    

      {/* Contenu principal centré */}
    <center>
    <motion.div 
    	initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 2 }}className="mt-12 transition-all duration-500 text-black dark:text-white p-8 w-full">
          <h1 className="md:w-[800px] text-5xl font-bold 
                      bg-gradient-to-r from-pink-500 via-blue-500 to-blue-900 
                      dark:from-pink-300 dark:via-blue-300 dark:to-blue-500 
                      bg-clip-text text-transparent mb-4 transition-colors duration-500">
          Atteignez vos objectifs avec un coach IA sur mesure 
          </h1>
          <motion.p 
          initial={{ y: 100, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{
													type: "spring",
													stiffness: 150,
													damping: 25,
												}}
          className="md:w-[500px] mb-4 mt-5 transition-colors duration-500">
 🎯 Un accompagnement personnalisé selon vos besoins 📊 Des recommandations précises grâce à l’IA 🚀 Des résultats concrets, à votre rythme
 
    <div className="m-4">
    	<button
  className="rounded-full px-5 py-2 mt-6 text-lg font-semibold backdrop-blur-md
    bg-white/80 hover:bg-white/90 hover:shadow-blue-900/30 dark:bg-black/80 dark:hover:bg-black/90
    text-blue-600 border-blue-600/50 dark:text-blue-300 transition-all duration-300
    border dark:border-blue-700/50 hover:shadow-md
    dark:hover:shadow-blue-900/30 flex items-center group"
>
  <span className="opacity-90 transition-opacity">Commencez</span>

  <span
    className="ml-3 opacity-70 group-hover:translate-x-2 transition-transform duration-300"
  >
    →
  </span>
</button>

    </div>
</motion.p>
        </motion.div>
    </center>
    </div>
    
  );
};

export default App;
