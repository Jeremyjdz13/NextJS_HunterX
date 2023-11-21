'use client'
import StatLists from "./StatLists";
import Label from "./Label";
import Title from "./Title";
import ClickableLabel from "./ClickableLabel";
import ClickableTitle from "./ClickableTitle";
import { Character, CharacterData, StatData } from "@/app/context/CharacterTypes";
import DiceModal from "../modals/DiceModal";
import { GiAbdominalArmor } from "react-icons/gi";
import { MdOutlineScience } from "react-icons/md";

import Tabs from "../tabs/Tabs";

type StatProps = {
    stat: StatData[] 
    statGroupTitle: string
    statKey: string
    statSubKey?: string
    character: Character
}

export default function StatArray(
    { 
        stat, 
        statGroupTitle, 
        statKey,
        statSubKey,
        character
    }: StatProps) {

    const isInventoryGroup = [
        "inventory", 
    ].includes(statKey);
    const isSkill = [
        "combat",
        "physical",
        "professional",
        "mental"
    ].includes(statKey);

    const isBackgroundsFlawsGroup = [
        "backgrounds", 
        "flaws"
    ].includes(statKey);
    const isSpellbookGroup = [
        "spellbook"
    ].includes(statKey);
    const isPowersAndTalismansGroup = [
        "powers", 
        "talismans"
    ].includes(statKey);

    const isMeritsGroup = [
        "merits",  
    ].includes(statKey);

    function handleSkillsElement() {
        return (
            <div className="p-1">
                {
                    
                    Array.isArray(stat) && stat.map((item: StatData) => (
                        <div key={item.id}>
                            <ClickableLabel 
                                id={item.id} 
                                name={item.name} 
                                rank={item.rank} 
                                statKey={statKey} 
                                character={character} 
                            />
                        </div>
                    ))
                }
            </div>
        )
    }

    function handleBackgroundsFlawsElement() {
        if (isBackgroundsFlawsGroup) {
            return (
                <div >
                    <div>
                        <Label storedLabel={'Name'} />
                        <Label storedLabel={'Rank'} />
                        <Label storedLabel={'Description'} />
                    </div>
                    {
                        Array.isArray(stat) && stat.map((item) => (
                            <div key={item.id}>
                                <ClickableLabel 
                                    id={item.id} 
                                    name={item.name} 
                                    rank={item.rank} 
                                    statKey={statKey} 
                                    character={character} 
                                />
                                <div>{item.description}</div>
                            </div>
                        ))
                    }
                </div>
            )
        }
    }

    // function handleSpellBookElement() {
    //     // const tabs = [
    //     //     {label: 'Attempts', content: }
                   
    //     // ]
    //     return (
    //         <div>
    //             <div
    //                 className='text-center grid grid-cols-[200px_100px_100px_100px]'
    //             >
    //                 <Label storedLabel='Name' />
    //                 <Label storedLabel='Attempts' />
    //                 <Label storedLabel='Casting' />
    //                 <Label storedLabel='Duration' />
                    
    //             </div>
    //             {
    //                 Array.isArray(stat) && stat.map((item) => (
    //                     <div 
    //                         key={item.id}
    //                         className='text-center grid grid-cols-[200px_100px_100px_100px]'
    //                     >
    //                         <ClickableLabel 
    //                             id={item.id} 
    //                             name={item.name} 
    //                             rank={item.rank} 
    //                             statKey={statKey} 
    //                             character={character} 
    //                         />
    //                         <div>{item.attempts}</div>
    //                         <div>{item.casting}</div>
    //                         <div>{item.duration}</div>

    //                         {item.componentItem?.map((component: any) => {
    //                              const tabs = [
    //                                     {label: "Name", content: <div>{component.name}</div>},
    //                                     {label: "Rank", content: <div>{component.rank}</div>},
    //                                     {label: "Description", content: <div>{component.description}</div>},

    //                                 ]
                                    
    //                                 return (
    //                                     <Tabs
    //                                         key={component.id}
    //                                         tabs={tabs}
    //                                     />
    //                                 )

    //                             })
    //                         }
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //     )
        
    // }

    function handlePowersTalismansElement() {
        return (
            <div className="flex flex-row" >
                <div
                    className="flex flex-col"
                >
                    <Label storedLabel='Name' />
                    <Label storedLabel='Rank' />
                    {/* <Label storedLabel='Description' /> */}
                    <Label storedLabel="Stunts" />
                </div>
                <div>
                    {
                        Array.isArray(stat) && stat.map((item) => (
                            <div key={item.id}>
                                
                                <DiceModal 
                                    key={item.name} 
                                    id={item.id} 
                                    name={item.name} 
                                    rank={item.rank} 
                                    character={character} 
                                    statKey={statKey} 
                                />
                                {/* <div>{item.description}</div> */}
                                {item.stunt?.map((stunt: any) => {
                                       return <StatLists
                                        key={stunt.id}
                                        stat={stunt}
                                        statGroupTitle='stunt'
                                        character={character}
                                        statSubKey={statSubKey}
                                        statKey={statKey}
                                        subId={stunt.id}
                                        id={item.id}
                                    /> 
                                    }
                                
                                )
                            }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    function handleMeritsElement() {
        return (
            <div>
                <div
                    className="flex flex-row"
                >
                    <Label storedLabel='Name' />
                    <Label storedLabel='Protonium Gen' />
                    <Label storedLabel='Talisman' />
                    <Label storedLabel="Armor" />
                    <Label storedLabel="Description" />
                </div>
                <div>
                    {
                        Array.isArray(stat) && stat.map((item) => (
                            <div key={item.id}
                                className="flex flex-row"
                            >
                                <ClickableLabel 
                                    id={item.id} 
                                    name={item.name} 
                                    rank={item.rank} 
                                    statKey={statKey}
                                    character={character}
                                />
                                <div>{item.protoniumGenerator}</div>
                                <div>{item.talisman}</div>
                                <div>{item.armor}</div>
                                <div>{item.description}</div>
                            </div>
                                
                        ))
                    }
                </div>
            </div>
        )
        
    }

    function handleStatElement() {
        if(isSkill){
            return handleSkillsElement()
        }
        if(isBackgroundsFlawsGroup){
            return handleBackgroundsFlawsElement()
        }
        if(isPowersAndTalismansGroup){
            return handlePowersTalismansElement()
        }
        if(isMeritsGroup){
            return handleMeritsElement()
        }
            
    }

    return (
        <div className="m-1">
            {
                (
                    statGroupTitle === 'Bashing' ||
                    statGroupTitle === 'Lethal' ||
                    statGroupTitle === 'Name' ||
                    statGroupTitle === 'Alias' ||
                    statGroupTitle === 'Nature'
                ) ? 
                    <ClickableTitle 
                        statGroupTitle={statGroupTitle}
                        id={character.id}
                        character={character}
                        
                    /> : 
                (
                    statGroupTitle ? 
                    <Title 
                        statGroupTitle={statGroupTitle}
                        statKey={statKey}
                        character={character}
                    /> : 
                    null 
                )
            }
            {handleStatElement()}
        </div>
    )
}

