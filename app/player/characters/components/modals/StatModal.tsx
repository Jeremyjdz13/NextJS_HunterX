"use client"
import { Character, CharacterContextProps, Talisman } from "@/app/context/CharacterTypes"
import { useRef, useEffect } from "react"
import SpellBooks from "../spellbook/Spellbooks"
import CharacterStats from "../Stat/CharacterStats"
import Title from "../Stat/Title"
import Tabs from "../tabs/Tabs"
import { useCharacter } from '@/app/context/CharacterContext'
import { FaGraduationCap } from "react-icons/fa6"
import useTalismanDiscovery from "../hooks/UseTalismanDiscovery"

type Props = {
    statGroupTitle: string
    statKey: keyof Character
    character: Character
}




export default function StatModal({ 
        statGroupTitle, 
        statKey,
        character  
    }: Props) {
    
    const { editCharacter } = useCharacter() as CharacterContextProps

    useTalismanDiscovery({character, editCharacter})

    const modalRef = useRef(null)
    const isPowers = [
        'powers',
    ].includes(statKey)

    const isSpellbook = [
        'spellbooks'
    ].includes(statKey)

    const isTalisman = [
        "talismans"
    ].includes(statKey)

    function handleOpenModal() {
        (modalRef.current! as HTMLDialogElement).showModal()
    }

    function handleCloseModal() {
        (modalRef.current! as HTMLDialogElement).close()
    }

    
    
    function handleStatGroupModal() {
        if (isSpellbook) {
            return <SpellBooks 
                    key="Spell Books"
                    character={character}
                />
        }

       if (isPowers) {
            const tabs = [
                {
                    label: 'Powers',
                    content: <CharacterStats 
                            character={character} 
                            statKey={'powers'} 
                            statType={'Power'} 
                        />
                },
                ...character.powers.map((power: any) => ({
                    label: power.name,
                    content: (
                        <div>
                            <Title statGroupTitle={"Power Stunts"} />
                            <div>
                                <div 
                                    className="flex flex-row justify-center text-center  border-b border-black/80"
                                >
                                    <div className="flex-1" >Title</div>
                                    <div className="flex-1">Attempts</div>
                                    <div className="flex-1">Description</div>
                                </div>
                            {
                                power.stuntIds.length > 0 ? (  character.stunts
                                    .filter(stunt => power.stuntIds.includes(stunt.id))
                                    .map(filteredStunt => (
                                       <div 
                                            key={filteredStunt.id}
                                            className="flex flex-row justify-center text-center "
                                        >
                                            <div className="flex-1" >{filteredStunt.name}</div>
                                            <div className="flex-1">
                                                { filteredStunt.isMastered === true ? 
                                                   "Mastered": 
                                                    filteredStunt.rank
                                                }
                                            </div>
                                            <div className="flex-1">{filteredStunt.description}</div>
                                       </div>
                                    ))): (
                                    <div>No assigned stunts.</div>
                                )
                            }
                            </div>
                        </div>
                    )
                })),
               {label: "Power Stunts",
                content: <CharacterStats character={character} statKey={'stunts'} statType="Stunt" />
                }
            ]

            return <Tabs tabs={tabs}/>
       }
       if (isTalisman) {
        const tabs = [
            {
                label: 'Talismans',
                content: <CharacterStats 
                        character={character} 
                        statKey={'talismans'} 
                        statType={'Talisman'} 
                    />
            },
            ...character.talismans.map((talisman: any) => ({
                label: talisman.name,
                content: (
                    <div>
                        <Title statGroupTitle={"Power Stunts"} />
                        <div>
                                <div 
                                    className="flex flex-row justify-center text-center  border-b border-black/80"
                                >
                                    <div className="flex-1" >Title</div>
                                    <div className="flex-1">Attempts</div>
                                    <div className="flex-1">Description</div>
                                </div>
                            {
                                talisman.stuntIds.length > 0 ? (  character.stunts
                                    .filter(stunt => talisman.stuntIds.includes(stunt.id))
                                    .map(filteredStunt => (
                                       <div 
                                            key={filteredStunt.id}
                                            className="flex flex-row justify-center text-center "
                                        >
                                            <div className="flex-1" >{filteredStunt.name}</div>
                                            <div className="flex-1">
                                                { filteredStunt.isMastered === true ? 
                                                   "Mastered": 
                                                    filteredStunt.rank
                                                }
                                            </div>
                                            <div className="flex-1">{filteredStunt.description}</div>
                                       </div>
                                    ))): (
                                    <div>No assigned stunts.</div>
                                )
                            }
                            </div>
                    </div>
                )
            })),
           {label: "Power Stunts",
            content: <CharacterStats character={character} statKey={'stunts'} statType="Stunt" />
            }
        ]

        return <Tabs tabs={tabs}/>
   }
    }
    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="w-24 my-1  bg-transparent hover:bg-black text-blue-700 font-semibold hover:text-white py-4 px-4 border border-black hover:border-transparent rounded"
            >
                {statGroupTitle}
            </button>
            <dialog 
                ref={modalRef}
                className="border border-black p-3 rounded min-h-3/4 w-3/4 min-w-3/4 backdrop:bg-black-60" 
            >
                <button 
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleCloseModal}
                >
                    Close
                </button>
                <Title statGroupTitle={statGroupTitle} />
                {handleStatGroupModal()}
            </dialog>
        </div>
    )
}