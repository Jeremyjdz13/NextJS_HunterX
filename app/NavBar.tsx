'use client'
//Note: You can only access browser API in client component
import Link from 'next/link'
import React from 'react'
import { usePathname, redirect } from 'next/navigation'
import classnames from 'classnames'
import { useAuth } from './context/AuthContext'
import { useUserData } from './context/UserContext'

export default function NavBar() {
  
  const { currentUser, signOut } = useAuth()
  const { user } = useUserData()
  const currentPath = usePathname()
  const links = [
    { label: 'HunterX', href: '/'},
    { label: `${(currentUser && user?.player) ? currentUser.displayName : ''}`, href: '/player'},
    { label: `${(currentUser && user?.gameMaster) ? currentUser.displayName : ''}`, href: '/gamemaster'},
    { label: `${currentUser ? '' : 'Sign In'}`, href: '/signin'},
    { label: `${currentUser ? '' : 'Sign Up'}`, href: '/signup'},
    { label: `${!currentUser ? '' : 'Account Settings'}`, href: '/accountsettings'}
  ]

  // if (!currentUser) {
  //   redirect('/home')
  // }
  return (
    <nav className="flex bg-slate-700 p-3 space-x-3">
      <ul className='flex space-x-6'>
        {links.map(link => <Link
          key={link.href}
          href={link.href} 
          className={
            classnames({
              'text-zinc-50': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-400': true
            })
          }>
            {link.label}
            </Link> 
        )}
       {!currentUser ? '' :  <button 
        className='text-zinc-50'
        onClick={() => signOut()}
        >Log Out</button>}
      </ul>
    </nav>
  )
}

