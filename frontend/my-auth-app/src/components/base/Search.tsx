import React from 'react'
import { FiSearch , FiCommand } from 'react-icons/fi'
import { CommandMenu } from './CommandMenu'

const Search = () => {
      const [open, setOpen] = React.useState(false)
    
  return (
    <>
     <div className="bg-stone-300 dark:text-stone-50 dark:bg-stone-500 mb-4 relative rounded sm:flex hidden items-center px-2 py-1.5 text-sm">
            <FiSearch className="mr-2" />
            <input
            onFocus={(e) =>{
                e.target.blur();
                setOpen(true)
            }}
              type="text"
              placeholder="Rechercher ..."
              className="bg-transparent dark:placeholder:text-stone-50 placeholder:text-stone-500 focus:outline-none"
            />
            <span className="p-1 text-xs flex gap-0.5 items-center shadow dark:bg-zinc-800 text-black dark:text-white bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2">
              <FiCommand />
              K
            </span>
          </div>
          <div className="flex sm:hidden items-center bg-stone-300 relative rounded px-1 mr-4 py-1 text-sm">
            <div>
              <FiSearch className="mr-2" />
            </div>
            <div>
              <span className="p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded right-1.5 mt-5 -translate-y-1/2">
                <FiCommand />
                K
              </span>
            </div>
          </div>
          <CommandMenu
          open={open} setOpen={setOpen}
          />
          </>
  )
}

export default Search
