import { Link } from "react-router-dom";
import { DarkModeToggle } from "./components/DarkModeToggle";
import logo from './assets/logogrand.png'

const App = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden transition-colors duration-500">
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
        <div className="flex items-center space-x-4 mr-9">
          <Link
            to="/register"
            className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Inscription
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
          >
            Connexion
          </Link>
          <DarkModeToggle />
        </div>
      </header>

      {/* Contenu principal centré */}
      <main className="flex justify-center items-center h-[calc(100vh-96px)]">
        <div className="transition-all duration-500 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-semibold text-center mb-4 transition-colors duration-500">
            Bienvenue dans l'application
          </h1>
        </div>
      </main>
    </div>
  );
};

export default App;
