"use client"
import { CharacterData, StatData } from '@/app/context/CharacterTypes';
import { useState } from 'react'


type InitiativeProps = {
   character: CharacterData
}

export default function Initiative({ character }: InitiativeProps) {

    const {
        mental,
        intuition
    } = character


    const searchAlertness : any = Array.isArray(mental) && mental.filter(item => (
        item.name?.includes('Alertness') || item.name?.includes('alertness')
    ));
    
    const [initiativeRoll, setInitiativeRoll] = useState({randomD10: 0, D10Roll: 0})

    let alertnessCount = 0
    let initiative = 0
    
    if(searchAlertness[0]?.rank){
        alertnessCount = + searchAlertness[0].rank
    }
   
    if(intuition?.rank){
        initiative = + intuition.rank
    }

       const initiativeCount =  initiative + alertnessCount
    


    function handleClickD10(){
        
        let rTimer = setInterval(()=>{
     
            let roll = Math.floor((Math.random() * 10) +1)
            let total = roll + initiativeCount;
             setInitiativeRoll({ 
                 randomD10: total,
                 D10Roll: roll
             });
         }, 100)
 
         setTimeout(()=>{
             clearInterval(rTimer);
         }, 2000);
     }

    return (
         <div>
            <div>Initiative</div>  
            <div>Intuition: <span>{initiative}</span></div>
            <div>Alertness: <span>{alertnessCount}</span></div>
            <div>Bonus: <span>{initiativeCount}</span></div>
            <div>D10 result: <span>{initiativeRoll.D10Roll}</span></div>
            <div>
                <button 
                    onClick={() => handleClickD10()}
                >      
                    D*10 
                </button>
                <div 
                >{initiativeRoll.randomD10}</div>
            </div>
        </div>
    )
} 