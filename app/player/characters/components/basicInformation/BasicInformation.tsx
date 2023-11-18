'use client'
import React, { useState } from 'react'
import { CharacterData } from '@/app/context/CharacterTypes'
import ClickableTitle from '../Stat/ClickableTitle'
import EditStatModal from '../modals/EditStatModal'
import Name from '../Stat/Name'


type Props = {
    character: CharacterData
}
function BasicInformation({ character }: Props) {

    const {
        id,
        name,
        alias,
        nature,
    } = character

  return (
    <section
        className='flex flex-row p-4'
    >
         <ClickableTitle
            key={'name'}
            id={id} 
            statGroupTitle="Name"
            statKey='name'
            character={character}
            stat={name}
        />
        <ClickableTitle
            key={'alias'}
            id={id} 
            statGroupTitle="Alias"
            statKey='alias'
            character={character}
            stat={alias}
            />

        <ClickableTitle
            key={'nature'}
            id={id} 
            statGroupTitle="Nature"
            statKey='nature'
            character={character}
            stat={nature}
        />
    </section>
  )
}

export default BasicInformation