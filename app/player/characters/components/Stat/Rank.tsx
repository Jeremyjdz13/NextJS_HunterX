'use client'
import React from 'react'

type Props = {
    rank: number | undefined
}
function Rank({ rank } : Props) {
  return (
    <div className='ml-1'>{rank}</div>
  )
}

export default Rank