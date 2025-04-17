import ObjectifCard from "../../components/base/ObjectifCard"
import SideBar from "../../components/base/SideBar"
const objectifs = [
  {
    nom: "Exercice de relaxation",
    type: "Web",
    date: "2024-08-15",
    members: ["Alice", "Bob", "Charlie"],
    files: 4,
    progression: 20,
  },
  {
    nom: "Exercice de relaxation",
    type: "Web",
    date: "2024-08-15",
    members: ["Alice", "Bob", "Charlie"],
    files: 4,
    progression: 20,
  },
  {
    nom: "Exercice de relaxation",
    type: "Web",
    date: "2024-08-15",
    members: ["Alice", "Bob", "Charlie"],
    files: 4,
    progression: 20,
  },  
  {
    nom: "Exercice de relaxation",
    type: "Web",
    date: "2024-08-15",
    members: ["Alice", "Bob", "Charlie"],
    files: 4,
    progression: 20,
  }, 
]
const Home = () => {

  return (
    <>
     <div className="flex">
      <SideBar/>
      </div>
    <div>
  <div className="p-5">
    <div className="flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        Objectifs
      </h1>
      <p className="text-sm underline text-indigo-600">Voir tout</p>
    </div>
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
      {
        objectifs && objectifs.map((objectif) => <ObjectifCard objectif={objectif} />)
      }
    </div>
  </div>
  </div>
  </>
  )
}

export default Home
