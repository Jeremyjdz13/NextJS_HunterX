'use client'
import React from 'react'

type Props = {
    id: string
    name: string
    rank: number
}
function SkillCard({ id, name, rank } : Props) {
  return (
    <div className='flex flex-row p-1 w-20'>
        <div>{name}</div>
        <div>{rank}</div>
    </div>
  )
}

export default SkillCard