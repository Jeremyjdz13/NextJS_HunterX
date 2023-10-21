
import Link from 'next/link'
import React from 'react'

const NavBar = () => {

  const links = [
    { label: 'HunterX', href: '/'},
    { label: 'Player', href: '/player'},
    { label: 'GM', href: '/gameMaster'},
    { label: 'Sign Up', href: '/auth'},
    { label: 'Sign In', href: '/auth'},
  ]
  return (
    <nav className="flex bg-slate-200 p-3 space-x-3">
      <ul className='flex space-x-6'>
        {links.map(link => <Link
          key={link.href}
          href={link.href} 
          className="text-zinc-800 hover:text-zinc-400 transition-colors">{link.label}</Link> 
        )}
      </ul>
    </nav>
  )
}

export default NavBar