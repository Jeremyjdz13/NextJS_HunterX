"use client"
import { Character, CharacterContextProps, Talisman } from "@/app/context/CharacterTypes"
import { useRef, useEffect } from "react"
import SpellBooks from "../spellbook/Spellbooks"
import CharacterStats from "../meritsflawsbackgrounds/CharacterStats"
import Title from "../Stat/Title"
import Tabs from "../tabs/Tabs"
import { useCharacter } from '@/app/context/CharacterContext'


type Props = {
    statGroupTitle: string
    statKey: keyof Character
    statType: string
    character: Character
}




export default function StatModal({ 
        statGroupTitle, 
        statKey,
        character  
    }: Props) {
    const { inventory } = character
    const { editCharacter } = useCharacter() as CharacterContextProps

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

    useEffect(() => {
        const talismansFromInventory: any = inventory.filter(item => item.isTalisman === true);
    
        const newTalismans = talismansFromInventory.filter((talisman: Talisman) => {
            // Check if the talisman from inventory already exists in character.talismans
            const isTalismanPresent = character.talismans.find(
                (item: Talisman) => item.id === talisman.id
            );
            
            return !isTalismanPresent; // Return only the new talismans not present in character.talismans
        });
    
        const updatedTalismans = [...character.talismans, ...newTalismans];
    
        const newCharacter = {
            ...character,
            talismans: updatedTalismans
        };
    
        console.log(newCharacter, "New Talismans");
        editCharacter(newCharacter);
    }, [character, inventory]);
    
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
                            {
                                power.stuntIds.length > 0 ? (
                                    power.stuntIds.map(stunt => (
                                        <div key={stunt.id}>
                                            {stunt.name}
                                        </div>
                                    ))
                                ) : (
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
                        {
                            talisman.stuntIds?.length > 0 ? (
                                talisman.stuntIds.map(stunt => (
                                    <div key={stunt.id}>
                                        {stunt.name}
                                    </div>
                                ))
                            ) : (
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