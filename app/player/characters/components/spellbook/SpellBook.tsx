"use client"
import React from 'react'
import ClickableLabel from '../Stat/ClickableLabel'
import { Character } from '@/app/context/CharacterTypes'

type Props = {
    book: Book
    character: Character
}

type Book = {
    id: string
    spellIds: [],
    spellbookName: string
}
function Spellbook({ book, character }: Props) {

    const {
        spellbookName,
        spellIds,
        id
    } = book
  return (
    <div>
        <ClickableLabel 
            statKey='spellbooks' 
            statGroupTitle={spellbookName} 
            character={character}
            id={id}
            name={spellbookName}
        />
        <div className='p-1'>
            {spellIds && spellIds.length > 0 ? (
                spellIds
                    .sort() // Sort the IDs (adjust this based on sorting requirements)
                    .map((id) => (
                    <div key={id}>
                        <div>Spell Id</div>
                        <div>{id}</div>
                    </div>
                    ))
            ) : (
            <p>No spell found.</p>
            )}
        </div>
    </div>
  )
}

export default Spellbook