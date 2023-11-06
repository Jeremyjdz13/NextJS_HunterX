"use client"
import { CharacterContextProps, CharacterData } from '@/app/context/CharacterTypes';
import { useState } from 'react'
import { useCharacter } from '@/app/context/CharacterContext';
import Title from '../Stat/Title';


type InitiativeProps = {
   character: CharacterData
}

export default function Initiative({ character }: InitiativeProps) {

    const {
        mental,
        intuition,
        initiative
    } = character

    const { editCharacter } = useCharacter() as CharacterContextProps
    const searchAlertness : any = Array.isArray(mental) && mental.filter(item => (
        item.name?.includes('Alertness') || item.name?.includes('alertness')
    ));
    
    const [initiativeRoll, setInitiativeRoll] = useState({randomD10: 0, D10Roll: 0})

    let alertnessCount = 0
    let initiativeBase = 0
    
    if(searchAlertness[0]?.rank){
        alertnessCount = + searchAlertness[0].rank
    }
   
    if(intuition?.rank){
        initiativeBase = + intuition.rank
    }

    const initiativeCount =  initiativeBase + alertnessCount
    


    function handleClickD10(){
        
        let newRoll: any = ''
        let rTimer = setInterval(()=>{
     
            let roll = Math.floor((Math.random() * 10) +1)
            let total = roll + initiativeCount;
             setInitiativeRoll({ 
                 randomD10: total,
                 D10Roll: roll
             });
            newRoll = {
                randomD10: total,
            }
         }, 100)
 
         setTimeout(()=>{
             clearInterval(rTimer);
            const newInitiative = newRoll.randomD10
             const newCharacter = {...character, ['initiative']: {
                id: character.initiative.id,
                name: character.initiative.name,
                rank: newInitiative
             }}

             editCharacter(newCharacter)
         }, 2000);
     }


    return (
         <div className='border border-l-black flex flex-row p-2'>
            <div className='flex flex-col p-1 border-r border-black' >
                <Title statGroupTitle='Initiative'/>
                <div>{initiative.rank}</div>
            </div>
            <div  className='flex flex-col p-1'>Bonus <div>{initiativeCount}</div></div>
            <div className='flex flex-col p-1'>D10   <div>{initiativeRoll.D10Roll}</div></div>
            
            <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                    onClick={() => handleClickD10()}
                >      
                    D*10 
            </button>
        </div>
    )
} 