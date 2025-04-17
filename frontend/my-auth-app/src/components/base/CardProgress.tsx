import { FiTrendingUp , FiTrendingDown } from "react-icons/fi";

const CardProgress = () => {
  return (
    <>
      <Carte 
      titre="Exercices de relaxation effectués" 
      value="36"
      pillText="2.75%"
      trend="up"
      period="Depuis 2 Jan - 6 Jan "
      />
      <Carte 
      titre="Exercices de relaxation effectués" 
      value="39"
      pillText="2.75%"
      trend="down"
      period="Depuis 2 Jan - 6 Jan "
      />
      <Carte 
      titre="Exercices de relaxation effectués" 
      value="6"
      pillText="2.75%"
      trend="up"
      period="Depuis 2 Jan - 6 Jan "
      />
    </>
  )
}

const Carte = ({
    titre,
    value,
    pillText,
    trend,
    period,
}: {
    titre: string;
    value: string;
    pillText: string;
    trend: "up" | "down";
    period: string;
}) =>{
    return <div className="mt-5 flex flex-wrap col-span-4 p-4 rounded border border-stone-300">
        <div className="flex flex-wrap mb-8 items-start justify-between">
            <div>
                  <p className="text-stone-500 mb-2 text-sm md:text-base">{titre}</p>
                  <p className="text-sm md:text-lg font-semibold">{value}</p>
            </div>
            <div>
            <span className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
              trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}>
              {trend === "up" ? < FiTrendingUp/> : <FiTrendingDown />}
              {pillText}
            </span>
            </div>
        </div>
        <p className="text-xs text-stone-500">{period}</p>
    </div>
}

export default CardProgress
