'use client'
import React from 'react'
import Name from './Name'
import Rank from './Rank'

type Props = {
    name: string | undefined
    rank: number | undefined
}

export default function Stat({ name, rank } : Props) {
  return (
    <div className='flex flex-col border border-black'>
        <Name name={name} />
        <Rank rank={rank} />
    </div>
  )
}
