'use client'
import React, { useState } from 'react'
import { CharacterData } from '@/app/context/CharacterTypes'
import ClickableTitle from '../Stat/ClickableTitle'
import EditStatModal from '../modals/EditStatModal'
import Name from '../Stat/Name'
import Title from '../Stat/Title'
import Initiative from '../initiative/Initiative'

type Props = {
    character: CharacterData
}
function BasicInformation({ character }: Props) {

    const {
        id,
        name,
        alias,
        nature,
        initiative
    } = character

  return (
    <section
        className='flex flex-row border-b border-black p-4'
    >
         <ClickableTitle
            key={'name'}
            id={id} 
            statGroupTitle="Name"
            character={character}
            stat={name}
        />
        <ClickableTitle
            key={'alias'}
            id={id} 
            statGroupTitle="Alias"
            character={character}
            stat={alias}
            />

        <ClickableTitle
            key={'nature'}
            id={id} 
            statGroupTitle="Nature"
            character={character}
            stat={nature}
        />
        <div>
        <Initiative
            key="initiative"
            character={character}
        />
        </div>
    </section>
  )
}

export default BasicInformation