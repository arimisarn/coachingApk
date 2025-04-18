import photo from '../../assets/a.jpeg.jpg'
import { TiAttachment } from 'react-icons/ti'
const ObjectifCard = ({objectif}) => {
  return (
    <div className='p-6 rounded-xl border border-stone-300 dark:border-zinc-600 space-y-5'>
      <div>
        <h1 className='text-xl font-semibold text-gray-700 dark:text-gray-300'>{objectif.nom}</h1>
        <p className='text-sm text-gray-500 dark:text-gray-100'>{objectif.type}</p>
      </div>
      <p><span className='text-xs p-2 rounded bg-gray-200 dark:bg-zinc-700 dark:text-gray-300'>{objectif.date}</span></p>
      <div className='w-full bg-gray-200 rounded-full h-2'>
        <div className='w-[40%] bg-indigo-500 rounded-full h-2'></div>
      </div>

      <div className='flex justify-between items-center'>
        <div className='relative'>
            <img src={photo} alt="" className='w-8 h-8 rounded-full border-4 border-white'/>
            <img src={photo} alt="" className='w-8 h-8 rounded-full border-4 border-white absolute top-0 left-4'/>     
            <img src={photo} alt="" className='w-8 h-8 rounded-full border-4 border-white absolute top-0 left-8'/>
        </div>
        <p className='flex space-x-1 items-center text-gray-400'>
       <TiAttachment/><span>{objectif.files} files</span>
        </p>
      </div>
    </div>
  )
}

export default ObjectifCard
