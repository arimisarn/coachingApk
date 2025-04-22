import { Command } from 'cmdk'
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    email: string;
  }
  
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


    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
      axios.get('http://localhost:8000/api/accounts/users/')
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }, []);
    const filteredUsers = value
    ? users.filter(user =>
        user.username.toLowerCase().includes(value.toLowerCase())
      )
    : [];
      

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
            <span className='text-indigo-500 font-semibold'>"{value}"</span>
        </Command.Empty>

        <Command.Group className='dark:text-white' heading="Letters">
        <ul className="space-y-4">
        {filteredUsers.map(user => (
          <li
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
            className="p-4 hover:bg-indigo-50 cursor-pointer"
          >
            <Command.Item>
                {user.username}
            </Command.Item>
          </li>
        ))}
      </ul>
          {/* <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item> */}
        </Command.Group>

        <Command.Item className='dark:text-white'>Apple</Command.Item>
      </Command.List>
      </div>
    </Command.Dialog>
  )
}