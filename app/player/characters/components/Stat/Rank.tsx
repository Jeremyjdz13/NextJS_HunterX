'use client'
import React from 'react'

type Props = {
    rank: number | undefined
}
function Rank({ rank } : Props) {
  return (
    <div>{rank}</div>
  )
}

export default Rank