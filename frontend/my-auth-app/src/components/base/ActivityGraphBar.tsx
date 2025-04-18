import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiUser } from 'react-icons/fi';
const data = [
    {
      name: 'Janvier',
      ExerciceEffectué: 200,
    },  
    {
      name: 'Fevrier',
      ExerciceEffectué: 3000,
    },
    {
      name: 'Mars',
      ExerciceEffectué: 2000,
    },
    {
      name: 'Avril',
      ExerciceEffectué: 2780,
    },
    {
      name: 'Mai',
      ExerciceEffectué: 1890,
    },
    {
      name: 'Juin',
      ExerciceEffectué: 2390,
    },
    {
      name: 'Juillet',
      ExerciceEffectué: 3490,
    },
    {
        name: 'Août',
        ExerciceEffectué: 2000,
      },
      {
        name: 'Septembre',
        ExerciceEffectué: 2780,
      },
      {
        name: 'Octobre',
        ExerciceEffectué: 1890,
      },
      {
        name: 'Novembre',
        ExerciceEffectué: 2390,
      },
      {
        name: 'Décembre',
        ExerciceEffectué: 3490,
      },
  ];

const ActivityGraphBar = () => {
  return (
     <div className="col-span-12 overflow-hidden rounded
       border border-stone-300 w-full dark:border-zinc-600">
         <div className="p-4">
           <h3 className="flex items-center gap-1.5 font-medium text-black dark:text-white">
           <FiUser /> Progression mensuelle
           </h3>
         </div>
         <ResponsiveContainer className="mt-5" width="100%" height="80%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis 
  domain={[0, 0]} 
  tickCount={12} 
  interval={0} 
  tickFormatter={(value) => value} 
/>          <Tooltip />
          <Legend />
          <Bar className='bg-indigo-400' dataKey="ExerciceEffectué" fill="#8884d8" activeBar={<Rectangle fill="#a5b4fc" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
       </div>
  )
}

export default ActivityGraphBar
