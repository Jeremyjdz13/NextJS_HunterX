'use client'
import { CharacterData, StatData } from "@/app/context/CharacterTypes";
import { useRef, useState } from "react"
import DiceDropDownMenu from "./DiceDropDownMenu";
import EditStatModal from "./EditStatModal";
import Stat from "../Stat/Stat";


type DiceModalProps = {
    stat?: StatData | undefined
    id?: string | undefined
    name?: string | undefined
    rank?: number | undefined
    character: CharacterData | undefined
}
type D100 = {
    randomD100: number;
    D100Roll: number;
    score: string;
}

export default function DiceModal({ stat, id, name, rank, character } : DiceModalProps) {

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
        protonium,
        usedProtonium,
        merits
    } = character as CharacterData

    const protoniumGenerator = merits?.filter(item => (
            item.protoniumGenerator
        )
    )

  
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

    // let totalPool = 0
    // if (protonium?.rank && protoniumGenerator[0]?.rank) {
    //     console.log("Protonium")
    //     return totalPool = protonium?.rank + protoniumGenerator[0]?.rank
    // }

    // let protoniumCount = 0
    // if (usedProtonium?.rank) {
    //     console.log("usedProtonium")
    //     return protoniumCount = totalPool - usedProtonium?.rank
    // }

    // function handleProtoniumGeneratorElement(): JSX.Element {
    //     if(protoniumGenerator){
    //         return (
    //             <div>
    //                 <div>Generator</div>
    //                 <div>{protoniumGenerator[0]?.rank}</div>
    //             </div>
    //         )
    //     }
    //     return <></>
    // }

    return (
        <div>
            <div className="p-1 text-center">
                <div
                    onClick={handleOpenModal}
                    onContextMenu={handleContextMenuOpen}
                >
                    {name} 
                </div>
                <div>
                    {rank}
                </div>
            </div>
            <dialog 
                ref={modalRef}
            >
                <button 
                    onClick={handleCloseModal}

                >close</button>
                <div>{name} : {rank}</div>
                <div>Column Rank : {handleRank()}</div>
                <button
                    onClick={handleClickD100}
                >D: 100</button>
                <div>
                    <span>Base D100 Roll: {d100.D100Roll}</span><br />
                    <span>Total Results: {d100.successTotal}</span><br />
                    <span>Color: {d100.score}</span>
                </div>
                <div>
                    <DiceDropDownMenu
                        skillType="Combat"
                        skills={combat}
                    />
                     <DiceDropDownMenu
                        skillType="Physical"
                        skills={physical}
                    />
                     <DiceDropDownMenu
                        skillType="Professional"
                        skills={professional}
                    />
                     <DiceDropDownMenu
                        skillType="Mental"
                        skills={mental}
                    />
                </div>
                <div>
                    
                    <Stat
                        key={protonium.id}
                        rank={protonium.rank}
                        name={protonium.name}
                    />
                    {/* {
                        protoniumGenerator ? handleProtoniumGeneratorElement() : <></>
                    } */}
                    <Stat
                        key={usedProtonium.id}
                        rank={usedProtonium.rank}
                        name={usedProtonium.name}
                    />
                    {/* <div>
                        Total: <span>{protoniumCount}</span>
                    </div> */}
                </div>
            </dialog>
            <EditStatModal
                storedTitle={name!}
                isOpen={isEditOpen}
                onClose={handleContextMenuClose}
            />
        </div>
    )
}