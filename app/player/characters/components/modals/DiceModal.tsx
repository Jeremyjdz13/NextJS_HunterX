'use client'
import { Character } from "@/app/context/CharacterTypes";
import { useRef, useState } from "react"
import EditStatModal from "./EditStatModal";
import Title from "../Stat/Title";
import { GiDiceFire } from "react-icons/gi";
import SkillsMenu, { Skill, SkillsMenuProps } from "./SkillsMenu";
import Row from './Row'
import ProtoniumPool from "./ProtoniumPool";

type DiceModalProps = {
    id?: string 
    name?: string 
    rank?: number 
    character: Character
    statKey: string
}
type D100 = {
    randomD100: number;
    D100Roll: number;
    score: string;
}

export default function DiceModal({ statKey, id, name, rank, character } : DiceModalProps) {

    const modalRef = useRef<HTMLDialogElement | null>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [d100, setD100] = useState({successTotal: 0, D100Roll: 0, score: ''})
    // const [powerRank, setPowerRank] = useState('None Selected')
    // const [count, setCount] = useState(0)
    const {
        combat,
        physical,
        professional,
        mental,
    } = character as Character

    const isPowerAndTalisman = [
        'powers',
        'talismans'
    ].includes(statKey)
  
    function handleOpenModal() {
        (modalRef.current! as HTMLDialogElement).showModal()
    }

    function handleCloseModal() {
        (modalRef.current! as HTMLDialogElement).close()
    }

    function handleContextMenuOpen(e: { preventDefault: () => void}){
        e.preventDefault()
        console.log("Right Click")

        setIsEditOpen(true)
    }

    function handleContextMenuClose() {
        setIsEditOpen(false)
    }

    function handleRank(){
        
        if (rank === 0){
           return "Decrepit"
        } else if (rank === 1){
            return "Feeble"
        } else if (rank === 2){
            return "Poor"
        } else if (rank === 3){
            return "Typical"
        } else if (rank === 4){
            return "Good"
        } else if (rank === 5){
            return "Excellent"
        } else if (rank === 6){
            return "Remarkable"
        } else if (rank === 7){
            return "Incredible"
        } else if (rank === 8){
            return "Amazing"
        } else if (rank === 9){
            return "Monstrous"
        } else if (rank === 10){
            return "Unearthly"
        }
       
    }

    function handleClickD100(){
        let rTimer = setInterval(()=>{
            let modifiers: number = 0;
            let roll = Math.floor((Math.random() * 100) +1)
            let total = modifiers + roll;
            let success: string = '';
            if (rank === 0){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 55){
                    success = " failed"
                }
                if (total >= 56 && total <= 94){
                    success = " green";
                }
                if (total >= 95 && total <= 99){
                success = " yellow";
                }
                if (total >= 100){
                success = " red";
                }
            }

            if (rank === 1){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 50){
                    success = " failed"
                }
                if (total >= 51 && total <= 90){
                    success = " green";
                }
                if (total >= 91 && total <= 99){
                success = " yellow";
                }
                if (total >= 100){
                success = " red";
                }
            }

            if (rank === 2){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 45){
                    success = " failed"
                }
                if (total >= 46 && total <= 85){
                    success = " green";
                }
                if (total >= 86 && total <= 99){
                success = " yellow";
                }
                if (total >= 100){
                success = " red";
                }
            }

            if (rank === 3){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 40){
                    success = " failed"
                }
                if (total >= 41 && total <= 80){
                    success = " green";
                }
                if (total >= 81 && total <= 97){
                success = " yellow";
                }
                if (total >= 98){
                success = " red";
                }
            }

            if (rank === 4){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 35){
                    success = " failed"
                }
                if (total >= 36 && total <= 75){
                    success = " green";
                }
                if (total >= 76 && total <= 97){
                success = " yellow";
                }
                if (total >= 98){
                success = " red";
                }
            }

            if (rank === 5){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 30){
                    success = " failed"
                }
                if (total >= 31 && total <= 70){
                    success = " green";
                }
                if (total >= 71 && total <= 94){
                success = " yellow";
                }
                if (total >= 95){
                success = " red";
                }
            }

            if (rank === 6){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 25){
                    success = " failed"
                }
                if (total >= 26 && total <= 65){
                    success = " green";
                }
                if (total >= 66 && total <= 94){
                success = " yellow";
                }
                if (total >= 95){
                success = " red";
                }
            }

            if (rank === 7){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 20){
                    success = " failed"
                }
                if (total >= 25 && total <= 60){
                    success = " green";
                }
                if (total >= 61 && total <= 90){
                success = " yellow";
                }
                if (total >= 91){
                success = " red";
                }
            }

            if (rank === 8){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 15){
                    success = " failed"
                }
                if (total >= 16 && total <= 55){
                    success = " green";
                }
                if (total >= 56 && total <= 90){
                success = " yellow";
                }
                if (total >= 91){
                success = " red";
                }
            }

            if (rank === 9){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 10){
                    success = " failed"
                }
                if (total >= 11 && total <= 50){
                    success = " green";
                }
                if (total >= 51 && total <= 85){
                success = " yellow";
                }
                if (total >= 86){
                success = " red";
                }
            }

            if (rank === 10){
                if (total <= 1){
                 success = " botched";
                }
                if (total >= 2 && total <= 6){
                    success = " failed"
                }
                if (total >= 7 && total <= 45){
                    success = " green";
                }
                if (total >= 46 && total <= 85){
                success = " yellow";
                }
                if (total >= 86){
                success = " red";
                }
            }
          
            setD100({ 
                successTotal: total,
                D100Roll: roll,
                score: success,
            });

        }, 100)
   
        setTimeout(()=>{
            clearInterval(rTimer);
        }, 2000);
        
    }

    function createCustomShorthand(text: string) {
    const regexSpace = / /g
    let shorthand = '';

    if (text.match(regexSpace)) {
        const words = text.split(' ');
        if (words.length >= 1) {
            shorthand += words[0].substring(0, 2);
          }
        
        // For the second word, take the first two letters
        if (words.length >= 2) {
        shorthand += words[1].substring(0, 2);
        }
        
        for (let i = 2; i < words.length; i++) {
        shorthand += words[i].substring(0, 1);
        }
    } else {

        return shorthand = text.substring(0, 3) 
    }
  
    return shorthand
  }

    return (
        <div className='border border-black rounded p-1 m-1 w-22'>
            <div className="p-1 text-center">
                <div
                    onClick={handleOpenModal}
                    onContextMenu={handleContextMenuOpen}
                    className="cursor-pointer"
                >
                    {name} 
                </div>
                {!isPowerAndTalisman ? 
                    <div>
                        {rank}
                    </div> : 
                    null
                }
            </div>
            <dialog 
                ref={modalRef}
                className="p-2 border border-black rounded"
            >
                <button 
                    onClick={handleCloseModal}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-1"
                >close</button>
                <div className="p-1">
                    <Title statGroupTitle={`${handleRank()} ${name}`}/>
                    <div className="flex border p-2">
                        <div className="flex flex-col border-r">
                            <Title statGroupTitle="D 100" />
                            <div className="flex flex-row">
                                <button
                                    onClick={handleClickD100}
                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-4 border border-blue-500 hover:border-transparent rounded"
                                >
                                    <GiDiceFire />
                                </button>
                                <div className="mx-2">
                                    <div>Base: {d100.D100Roll}</div>
                                    <div>Bonus: </div>
                                    <div>Total Results: {d100.successTotal}</div>
                                    <div>Success? {d100.score}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ProtoniumPool character={character}/>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <SkillsMenu
                            skills={combat as Skill[]}
                            menuTitle={'Combat'}
                            styles="border-r border-black p-1 text-left"
                            renderSkill={(skill: Skill, isHighlighted: boolean) => <Row 
                                key={skill.id}
                                name={createCustomShorthand(skill.name)}
                                rank={skill.rank}
                                isHighlighted={isHighlighted}
                            />}
                        />
                        <SkillsMenu
                            styles="border-r border-black p-1 text-left"
                            menuTitle={'Physical'}
                            skills={physical as Skill[]}
                            renderSkill={(skill: Skill, isHighlighted:boolean) => <Row 
                                key={skill.id}
                                name={createCustomShorthand(skill.name)}
                                rank={skill.rank}
                                isHighlighted={isHighlighted}
                            />}
                        />
                        <SkillsMenu
                            styles="border-r border-black p-1 text-left"
                            menuTitle={'Professional'}
                            skills={professional as Skill[]}
                            renderSkill={(skill: Skill, isHighlighted: boolean) => <Row 
                                key={skill.id}
                                name={createCustomShorthand(skill.name)}
                                rank={skill.rank}
                                isHighlighted={isHighlighted}
                            />}
                        />
                        <SkillsMenu
                            styles="p-1 text-left"
                            menuTitle={'Mental'}
                            skills={mental as Skill[]}
                            renderSkill={(skill: Skill, isHighlighted: boolean) => <Row 
                                key={skill.id}
                                name={createCustomShorthand(skill.name)}
                                rank={skill.rank}
                                isHighlighted={isHighlighted}
                            />}
                        />
                    </div>
                </div>
            </dialog>
            <EditStatModal
                statGroupTitle={name!}
                statKey={statKey}
                isOpen={isEditOpen}
                character={character!}
                id={id!}
                onClose={handleContextMenuClose}
            />
        </div>
    )
}