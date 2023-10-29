import { StatData } from "@/app/context/CharacterTypes";
import { useState } from "react";


type DiceDropDownMenuProps = {
    skillType: string
    skills:  StatData[]
}

export default function DiceDropDownMenu({ skillType, skills }: DiceDropDownMenuProps) {
    const [isContentVisible, setIsContentVisible] = useState(false);
    function handleClick() {
        setIsContentVisible((prevState) => !prevState);
    }

    function handleMouseEnter() {
        setIsContentVisible(true);
    }
    
    function handleMouseLeave() {
    setIsContentVisible(false);
    }

   

    return (
        <div>
            <button 
            
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
            >
                {skillType}
            </button>
            <div 
                onMouseLeave={handleMouseLeave}
            >
                {
                    skills.map(skill => (
                        <button
                            key={skill.id}
                        >
                            {skill.name} : {skill.rank}
                        </button>
                    )
                    )
                }
            </div>
        </div>
    )
}