'use client'
import React from 'react'

type Props = {
    name: string | undefined
}

function Name({ name }: Props) {

  
  return (
    <div>{name}</div>
  )
}

export default Name