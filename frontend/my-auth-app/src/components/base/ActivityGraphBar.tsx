import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiUser } from 'react-icons/fi';
const data = [
    {
      name: 'Janvier',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },  
    {
      name: 'Fevrier',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Mars',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Avril',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Mai',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Juin',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Juillet',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
        name: 'Août',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Septembre',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Octobre',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Novembre',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Décembre',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
  ];

const ActivityGraphBar = () => {
  return (
     <div className="col-span-12 overflow-hidden rounded
       border border-stone-300 w-full">
         <div className="p-4">
           <h3 className="flex items-center gap-1.5 font-medium">
           <FiUser /> Activité mensuelle
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
  domain={[0, 100]} 
  tickCount={11} 
  interval={0} 
  tickFormatter={(value) => value / 100} 
/>          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
       </div>
  )
}

export default ActivityGraphBar
