import React from 'react'
import Title from '../Stat/Title'
import ClickableLabel from '../Stat/ClickableLabel'
import { CharacterData } from '@/app/context/CharacterTypes'

type Props = {
    character: CharacterData
}
function BasicInformation({ character }: Props) {

    const {
        id,
        name,
        alias,
        nature 
    } = character
  return (
    <section
        className='flex flex-row border-b border-black p-5'
    >
        <ClickableLabel
            key={'name'}
            id={id} 
            name={name}
            title="Name"
            groupName='characterName'
        />
        <ClickableLabel
            key={'alias'}
            id={id} 
            name={alias}
            title="Alias"
            groupName='characterAlias'
            />

        <ClickableLabel
            key={'nature'}
            id={id} 
            name={nature}
            title="Nature"
            groupName='characterNature'
        />
    </section>
  )
}

export default BasicInformation