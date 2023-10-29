import { StatData } from "@/app/context/CharacterTypes"
import React from "react"
import Stat from "../Stat/Stat"

type HealthProps = {
    stat: StatData
    groupName: string
    groupTitle: string
} 

export default function Health(
    {
        stat, 
        groupName,
        groupTitle, 
    } : HealthProps) {


    function handleBashingCount(stat: StatData): JSX.Element {
        const counts: number | undefined = stat.rank

        let count = 0

        if(counts) {
           count = Math.min(Math.max(counts), 10)  
        }
        
        if(count >= 4 && count <= 5){
            return <span>Slap fighting! -1</span>
        } else if(count >= 6 && count <= 8){
            return <span>No BITING! -3</span>
        } else if(count === 9){
            return <span>A chil les Heel! -5 </span>
        }else if(count === 10){
            return <span>Hello Darkness my old friend!</span>
        }
        else {
            return <span>No Penalty</span>
        }
    }

    function handleLethalCount(stat: StatData): JSX.Element {
        const counts: number | undefined = stat.rank
        let count = 0
        
        if(counts) {
        const count = Math.min(Math.max(counts), 10)
        }

        if(count >= 3 && count <=4){
            return <span>That really hurt! -1</span>
        } else if(count >= 5 && count <= 6){
            return <span>Is that blood?! -2</span>
        } else if(count >= 7 && count <=8){
            return <span>I ain&apos;t got time to bleed! -4</span>
        }else if(count === 9){
            return <span>To die or not to die? -6</span>
        }else if(count === 10){
            return <span>Let&apos;s weigh your sins!</span>
        }else {
            return <span>No Penalty</span>
        }
    }

    function handleBashingLethalElement() {
        if(groupTitle === 'Bashing'){
            return handleBashingCount(stat)
        } else if (groupTitle === "Lethal") {
            return handleLethalCount(stat)
        }
    }

    return (
        <React.Fragment>
            {groupTitle === 'Bashing' || groupTitle === 'Lethal' ? (
                <div>
                    <Stat 
                        stat={stat}
                        groupName={groupName}
                        groupTitle={groupTitle}
                    />
                {handleBashingLethalElement()}
                </div>
                ) : null}
        </React.Fragment>
    )
}