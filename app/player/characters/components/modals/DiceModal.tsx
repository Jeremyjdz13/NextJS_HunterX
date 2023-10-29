import { useCharacter } from "@/app/context/CharacterContext";
import { StatData } from "@/app/context/CharacterTypes";
import { useRef, useState } from "react"
import DiceDropDownMenu from "./DiceDropDownMenu";
import StatLists from "../Stat/StatLists";
import EditStatModal from "./EditStatModal";


type DiceModalProps = {
    stat: StatData
}
type D100 = {
    randomD100: number;
    D100Roll: number;
    score: string;
}

export default function DiceModal({ stat } : DiceModalProps) {

    const modalRef = useRef<HTMLDialogElement | null>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [d100, setD100] = useState({successTotal: 0, D100Roll: 0, score: ''})
    const { selectedCharacter } = useCharacter()
    // const [powerRank, setPowerRank] = useState('None Selected')
    // const [count, setCount] = useState(0)  
    const combat = selectedCharacter?.combat
    const physical = selectedCharacter?.physical
    const professional = selectedCharacter?.professional
    const mental = selectedCharacter?.mental
    const protonium = selectedCharacter?.protonium
    const usedProtonium = selectedCharacter?.usedProtonium
    const protoniumGenerator = selectedCharacter?.merits?.filter(item => (
            item.protoniumGenerator
        )
    )
        console.log(protoniumGenerator, "Protonium Gen")
    // console.log(baseProtonium, "protonium")
    // console.log(spentProtonium, "Spent Proton")
    // console.log(protoniumGenerator[0], "Protonium Gen")


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
        let value = stat.rank
        let name = stat.name

        if (value === 0){
           return "Decrepit"
        } else if (value === 1){
            return "Feeble"
        } else if (value === 2){
            return "Poor"
        } else if (value === 3){
            return "Typical"
        } else if (value === 4){
            return "Good"
        } else if (value === 5){
            return "Excellent"
        } else if (value === 6){
            return "Remarkable"
        } else if (value === 7){
            return "Incredible"
        } else if (value === 8){
            return "Amazing"
        } else if (value === 9){
            return "Monstrous"
        } else if (value === 10){
            return "Unearthly"
        }
       
    }

    function handleClickD100(){
        let rTimer = setInterval(()=>{
            let modifiers: number = 0;
            let roll = Math.floor((Math.random() * 100) +1)
            let total = modifiers + roll;
            let rank = stat.rank;
            let success: string = '';
            // console.log(success, rank, total)
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

 
    const totalPool = protonium.rank + protoniumGenerator[0]?.rank
    const protoniumCount = totalPool - usedProtonium.rank 


    function handleProtoniumGeneratorElement(): JSX.Element {
        if(protoniumGenerator){
            return (
                <div>
                    <div>Generator</div>
                    <div>{protoniumGenerator[0]?.rank}</div>
                </div>
            )
        }
        return <></>
    }

    return (
        <div>
            <div
                onClick={handleOpenModal}
                onContextMenu={handleContextMenuOpen}
            >
                {stat.name}
            </div>
            <dialog 
                ref={modalRef}
            >
                <button 
                    onClick={handleCloseModal}

                >close</button>
                <div>{stat?.name} : {stat.rank}</div>
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
                    
                    <StatLists
                        key={protonium.id}
                        {...protonium}
                        groupName="protonium"
                    />
                    {
                        protoniumGenerator ? handleProtoniumGeneratorElement() : <></>
                    }
                    <StatLists
                        id={usedProtonium.id}
                        {...usedProtonium}
                        groupTitle='Protonium'
                    />
                    <div>
                        Total: <span>{protoniumCount}</span>
                    </div>
                </div>
            </dialog>
            <EditStatModal
                storedTitle={stat.name}
                isOpen={isEditOpen}
                onClose={handleContextMenuClose}
            />
        </div>
    )
}