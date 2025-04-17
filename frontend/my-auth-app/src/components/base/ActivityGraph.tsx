"use client";

import { FiUser } from "react-icons/fi"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Lundi',
   uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Mardi',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mercredi',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Jeudi',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Vendredi',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Samedi',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Dimanche',
    uv: 3490,
    pv: 2345,
    amt: 2100,
  },
];

const ActivityGraph = () => {
  return (
    <div className="col-span-12 overflow-hidden rounded
    border border-stone-300 w-full">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
        <FiUser /> Activité journalière
        </h3>
      </div>
      <ResponsiveContainer className="mt-5" width="100%" height="80%">
        <LineChart
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
/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amt" stroke="#82cad" />

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ActivityGraph
