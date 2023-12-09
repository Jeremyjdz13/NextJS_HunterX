import { StatData } from "@/app/context/CharacterTypes";
import { useState } from "react";
import Title from "../Stat/Title";


type SkillsMenuProps = {
    skills:  Skill[]
    styles: string
    renderSkill: any
    menuTitle: string
}

type Skill = {
    id: string
    name: string
    rank: number
}

export default function SkillsMenu({ menuTitle, styles, skills, renderSkill }: SkillsMenuProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    
    return (
        <div>
            <div className="text-center font-bold lg">{menuTitle}</div>
                
            <div 
                className={styles}
            >
               <div className="p-2">
                    {
                        skills.map((skill, index) => {
                                const isHighlighted = index === selectedIndex
                                return (
                                    <div 
                                        key={skill.id}
                                        onClick={() => setSelectedIndex(index)}
                                    >
                                        {renderSkill(skill, isHighlighted)}
                                    </div>
                                )
                            }
                        )
                    }
               </div>
            </div>
        </div>
    )
}
