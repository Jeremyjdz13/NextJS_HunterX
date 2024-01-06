'use client'
import React from 'react'
import { Character } from '@/app/context/CharacterTypes'
import ClickableTitle from '../Stat/ClickableTitle'
import ClickableLabel from '../Stat/ClickableLabel'
import Initiative from '../initiative/Initiative'


type Props = {
    character: Character
}
function BasicInformation({ character }: Props) {

    const {
        id,
        name,
        alias,
        nature,
        experience,
        karma,
    } = character

  return (
    <section
        className='flex flex-row p-4'
    >
      <div className='flex  flex-row p-1 w-1/2'>
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
        </div>
        <div className='border border-black rounded p-1 m-1 text-center'>
            <ClickableLabel
                key={experience.id} 
                id={experience.id} 
                rank={experience.rank}
                name={experience.name}
                character={character}
                statKey="experience" 
            />
        </div>
        <div className='border border-black rounded p-1 m-1 text-center'>
            <ClickableLabel 
                key={karma.id}
                id={karma.id}
                rank={karma.rank}
                name={karma.name}
                character={character}
                statKey="karma"
            />
        </div>
        <div className='border border-black rounded p-1 m-1 text-center'>
            <Initiative character={character} />
        </div>
    </section>
  )
}

export default BasicInformation