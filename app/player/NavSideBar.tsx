'use client'

import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const PlayerNavBar = () => {
  const currentPath = usePathname()
  const links = [
    { label: 'Characters', href: '/player/characters'},
    { label: 'Campaign', href: '/player/campaigns'},
    { label: 'NPCs', href: '/player/npcs'},
    { label: 'Villains', href: '/player/villains'},
    { label: 'Maps', href: '/player/maps'},
    { label: 'Portal', href: '/player/portal'},
    { label: 'Notes', href: '/player/notes'},
    { label: 'Rules', href: '/player/rules'},
  ]

  return (
    <nav className='flex flex-col'>
      <ul className='flex flex-col'>
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

export default PlayerNavBar