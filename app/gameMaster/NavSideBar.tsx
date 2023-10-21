'use client'

import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const GameMasterNavBar = () => {
  const currentPath = usePathname()
  const links = [
    { label: 'Players', href: '/gamemaster/players'},
    { label: 'Campaign', href: '/gamemaster/campaigns'},
    { label: 'NPCs', href: '/gamemaster/npcs'},
    { label: 'Villains', href: '/gamemaster/villains'},
    { label: 'Maps', href: '/gamemaster/maps'},
    { label: 'Portal', href: '/gamemaster/portal'},
    { label: 'Notes', href: '/gamemaster/notes'},
    { label: 'Rules', href: '/player/rules'},
  ]

  return (
    <nav>
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

export default GameMasterNavBar