'use client'
import { CharacterData } from "@/app/context/CharacterTypes"
import React, { useEffect } from "react"
import ClickableLabel from "../Stat/ClickableLabel"
import { useCharacter } from "@/app/context/CharacterContext"
import Rank from "../Stat/Rank"

type HealthProps = {
    id: string
    rank: number | undefined
    name: string | undefined
    statKey: string
    statGroupTitle: string
    character: CharacterData
} 

export default function Health(
    {
        id,
        rank,
        name,
        statGroupTitle,
        character
    } : HealthProps) {
    const { death } = character

    

    function handleBashingCount(){
        const counts: number | undefined = rank
        
        let count = 0

        if(counts) {
           count = Math.min(Math.max(counts), 10)  
        }
        
        if(count >= 4 && count <= 5){
            return <Rank rank={-1} />
        } else if(count >= 6 && count <= 8){
            return <Rank rank={-3} />
        } else if(count === 9){
            return <Rank rank={-5} />
        }else if(count === 10){
            return <span>Shhh!</span>
        }
        else {
            return <></>
        }
    }
   
    function handleLethalCount(){
        const counts: number | undefined = rank
        let count = 0
        
        if(counts) {
            count = Math.min(Math.max(counts), 10)
        }

        if(count >= 3 && count <=4){
            return <Rank rank={-1} />
        } else if(count >= 5 && count <= 6){
            return <Rank rank={-2} />
        } else if(count >= 7 && count <=8){
            return <Rank rank={-4} />
        }else if(count === 9){
            return <Rank rank={-6}/>
        }else if(count === 10){
            return (
                <ClickableLabel 
                    id={death.id}
                    key={'Death'}
                    name={death.name}
                    rank={death.rank} 
                    statKey={"death"}
                    character={character}
                />
            )
        }else {
            return <></>
        }
    }
 
    return (
        <div className='border-l border-black p-1'>
            {statGroupTitle === 'Bashing' ? (
                <div>
                    <ClickableLabel
                        key={statGroupTitle}
                        id={id}
                        name={name}
                        rank={rank} 
                        statKey={"bashing"}
                        character={character}
                    />
                    <div className="border-t border-black text-center p-1">
                        {handleBashingCount()}
                    </div>
                
                </div>
                ) : (
                        <div>
                            <ClickableLabel
                                id={id}
                                key={statGroupTitle}
                                name={name}
                                rank={rank} 
                                statKey={"lethal"}
                                character={character}
                                />
                            <div className="border-t border-black text-center p-1">
                                {handleLethalCount()}
                            </div>
                            
                        </div>
                    )
                }
        </div>
    )
}