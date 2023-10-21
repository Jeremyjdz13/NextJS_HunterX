'use client'
//Note: You can only access browser API in client component
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'

const NavBar = () => {

  const currentPath = usePathname()
  const links = [
    { label: 'HunterX', href: '/'},
    { label: 'Player', href: '/player'},
    { label: 'GM', href: '/gameMaster'},
    { label: 'Sign Up', href: '/auth'},
    { label: 'Sign In', href: '/auth'},
  ]
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
      </ul>
    </nav>
  )
}

export default NavBar