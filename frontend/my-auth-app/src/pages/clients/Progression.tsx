import React from 'react'
import Card from '../../components/base/CardProgress'
import ActivityGraph from '../../components/base/ActivityGraph'
import ActivityGraphBar from '../../components/base/ActivityGraphBar'
const Progression = () => {
  return (
    <div className='bg-white dark:bg-zinc-800'>
       <div className="px-4 grid gap-3 grid-cols-12">
    <Card/>
    <ActivityGraph />
    <ActivityGraphBar />
  </div>
    </div>
  )
}

export default Progression
