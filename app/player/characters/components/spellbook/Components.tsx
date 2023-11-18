'use client'
import React from 'react'
import { Component } from './SpellTypes'
import Name from '../Stat/Name'

type Props = {
    component: Component
}

const Components = ({ component }: Props) => {

    const {
        id,
        isArmor,
        isComponent,
        description,
        name,
        quantity,
        rank,
        spellAssignmentId
    } = component

  return (
          
    <div 
        className='p-1 grid grid-cols-[150px_50px_75px_150px]'
    >
        <div>{name}</div>
        <div>{rank}</div>
        <div>{quantity}</div>
        <div>{description}</div>
    </div>
  )
}

export default Components