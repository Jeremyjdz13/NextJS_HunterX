'use client'
import StatLists from "./StatLists";
import Label from "./Label";
import Title from "./Title";
import { statStyles } from "./StatStyles";
import ClickableLabel from "./ClickableLabel";
import ClickableTitle from "./ClickableTitle";
import { CharacterData, StatData } from "@/app/context/CharacterTypes";
import DiceModal from "../modals/DiceModal";

type StatProps = {
    statArray: StatData[] 
    statGroupTitle: string
    statKey: string
    character: CharacterData
}

export default function StatArray(
    { 
        statArray, 
        statGroupTitle, 
        statKey,
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
            <div className="border-l  border-black p-1">
                {
                    Array.isArray(statArray) && statArray.map((item: StatData) => (
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
                        Array.isArray(statArray) && statArray.map((item) => (
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

    function handleSpellBookElement() {
        return (
            <div>
                <div 
                >
                    <Label storedLabel='Name' />
                    <Label storedLabel='Attempts' />
                    <Label storedLabel='Mastered' />
                    <Label storedLabel='Purchased' />
                    <Label storedLabel='Casting' />
                    <Label storedLabel='Duration' />
                    <Label storedLabel='Description' />
                    <Label storedLabel="Components" />
                </div>
                {
                    Array.isArray(statArray) && statArray.map((item) => (
                        <div key={item.id}>
                            <ClickableLabel 
                                id={item.id} 
                                name={item.name} 
                                rank={item.rank} 
                                statKey={statKey} 
                                character={character} 
                            />
                            <div>{item.attempts}</div>
                            <div>{item.mastered ? "Aye": "Nay"}</div>
                            <div>{item.purchased ? "Aye" : "Nay"}</div>
                            <div>{item.casting}</div>
                            <div>{item.duration}</div>
                            <div>{item.description}</div>
                            {item.componentItem?.map((component: any) => 
                                    
                                    <StatLists
                                        key={component.id}
                                        stat={component}
                                        statGroupTitle='spellComponents'
                                        character={character}
                                    />
                               
                                )
                            }
                        </div>
                    ))
                }
            </div>
        )
        
    }

    function handleInventoryElement() {
        return (
            <div>
                <div 
                >
                    <Label storedLabel='Name' />
                    <Label storedLabel='Rank' />
                    <Label storedLabel='Description' />
                    <Label storedLabel="Armor" />
                    <Label storedLabel="Component" />
                    <Label storedLabel="Quantity" />
                    <Label storedLabel="Spell" />
                </div>
                <div>
                    {
                        Array.isArray(statArray) && statArray.map((item) => (
                            <div key={item.id}>
                                <ClickableLabel 
                                    id={item.id} 
                                    name={item.name} 
                                    rank={item.rank} 
                                    statKey={statKey} 
                                    character={character} 
                                />
                                <div>{item.description}</div>
                                <div>{item.armor ? "Aye" : "Nay"}</div>
                                <div>{item.component ? "Aye" : "Nay"}</div>
                                <div>{item.quantity}</div>
                                {item.component ? <div>Spell Name goes here</div> : "No Spell Assignment"}
                            </div>
                                
                        ))
                    }
                </div>
            </div>
        )
        
    }

    function handlePowersTalismansElement() {
        return (
            <div>
                <div 
                >
                    <Label storedLabel='Name' />
                    <Label storedLabel='Rank' />
                    <Label storedLabel='Description' />
                    <Label storedLabel="Stunts" />
                </div>
                <div>
                    {
                        Array.isArray(statArray) && statArray.map((item) => (
                            <div key={item.id}>
                                
                                <DiceModal 
                                    key={item.name} 
                                    id={item.id} 
                                    name={item.name} 
                                    rank={item.rank} 
                                    character={character} 
                                    statKey={statKey} 
                                />
                                <div>{item.description}</div>
                                {item.stunt?.map((stunt: any) => 
                                    
                                    <StatLists
                                        key={stunt.id}
                                        stat={stunt}
                                        statGroupTitle='stunt'
                                        character={character}
                                    />
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
                >
                    <Label storedLabel='Name' />
                    <Label storedLabel='Rank' />
                    <Label storedLabel='Protonioum Generator' />
                    <Label storedLabel='Talisman' />
                    <Label storedLabel="Armor" />
                    <Label storedLabel="Description" />
                </div>
                <div>
                    {
                        Array.isArray(statArray) && statArray.map((item) => (
                            <div key={item.id} style={statStyles.grid_6}>
                                <ClickableLabel 
                                    id={item.id} 
                                    name={item.name} 
                                    rank={item.rank} 
                                    statKey={statKey}
                                    character={character}
                                />
                                <div>{item.protoniumGenerator ? "Aye" : "Nay"}</div>
                                <div>{item.talisman ? "Aye" : "Nay"}</div>
                                <div>{item.armor ? "Aye" : "Nay"}</div>
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
        if(isSpellbookGroup){
            return handleSpellBookElement()
        }
        if(isInventoryGroup){
            return handleInventoryElement()
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
                    statGroupTitle ? <Title statGroupTitle={statGroupTitle} /> : 
                    null 
                )
            }
            {handleStatElement()}
        </div>
    )
}

