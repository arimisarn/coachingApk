import { Command } from 'cmdk'
import React, { Dispatch, SetStateAction, useState } from 'react'

export const CommandMenu = ({
    open, 
    setOpen,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [value, setValue] = useState("")

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <Command.Dialog 
    open={open} 
    onOpenChange={setOpen} 
    label="Global Command Menu"
    className='fixed inset-0 bg-stone-950/50'
    onClick={() => setOpen(false)}
    >
      <div 
      onClick={(e) => e.stopPropagation()}
      className='dark:bg-zinc-700 bg-white rounded-lg shadow-xl dark:border-stone-800 border-stone-300 border
      overflow-hidden w-full max-w-lg mx-auto mt-12'
      >
      <Command.Input 
      value={value}
      onValueChange={setValue}
      placeholder='Que voulez-vous?'
      className='dark:text-white relative border-b border-stone-300 p-3 text-md w-full
      placeholder:text-stone-400 focus:outline-none dark:bg-zinc-700 dark:border-stone-500'
      />
      <Command.List>
        <Command.Empty className='dark:text-white'>
            Pas de résultat trouvé pour {" "}
            <span className='text-indigo-500'>{value}</span>
        </Command.Empty>

        <Command.Group className='dark:text-white' heading="Letters">
          <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item>
        </Command.Group>

        <Command.Item className='dark:text-white'>Apple</Command.Item>
      </Command.List>
      </div>
    </Command.Dialog>
  )
}