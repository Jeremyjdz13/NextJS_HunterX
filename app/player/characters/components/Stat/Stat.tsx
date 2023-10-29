import StatLists from "./StatLists";
import Label from "./Label";
import Title from "./Title";
import { statStyles } from "./StatStyles";
import ClickableLabel from "./ClickableLabel";
import ClickableTitle from "./ClickableTitle";
import { StatData } from "@/app/context/CharacterTypes";

type StatProps = {
    stat: StatData
    groupName: string
    groupTitle?: string
}

function Stat(
    { 
        stat, 
        groupName, 
        groupTitle 
    }: StatProps) {

    // const { handleSetSelectedStat, handleSetCharacterStatGroupName } = useEdit()
    const isInventoryGroup = [
        "inventory", 
    ].includes(groupName);
    const isSkill = [
        "combat",
        "physical",
        "professional",
        "mental"
    ].includes(groupName);
    const isSingleStat = [
        "agility", 
        "endurance", 
        "reason", 
        "intuition", 
        "psyche",
        "strength",
        "experience",
        "karma",
        "fight",
        "lethal",
        "bashing",
        "initiative",
        "protonium",
        "usedProtonium",

    ].includes(groupName);
    const isBackgroundsFlawsGroup = [
        "backgrounds", 
        "flaws"
    ].includes(groupName);
    const isSpellbookGroup = [
        "spellbook"
    ].includes(groupName);
    const isPowersAndTalismansGroup = [
        "powers", 
        "talismans"
    ].includes(groupName);

    const isMeritsGroup = [
        "merits",  
    ].includes(groupName);

    function handleSkillsElement() {
        return (
            <div >
                <div style={statStyles.grid_2}>
                    <Label storedLabel={'Name'} />
                    <Label storedLabel={'Rank'} />
                </div>
                {
                    Array.isArray(stat) && stat.map((item: StatData) => (
                        <div key={item.id} style={statStyles.grid_2}>
                            <ClickableLabel id={item.id} name={item.name!} groupName={groupName} />
                            <div>{item.rank}</div>
                        </div>
                    ))
                }
            </div>
        )
    }

    function handleSingleStatElement() {
        return (
            
            <div>
                <ClickableLabel id={stat.id} name={stat.name!} groupName={groupName} />
                <div>{stat.rank}</div>
            </div>
            
        )
    }

    function handleBackgroundsFlawsElement() {
        if (isBackgroundsFlawsGroup) {
            return (
                <div >
                    <div style={statStyles.grid_3}>
                        <Label storedLabel={'Name'} />
                        <Label storedLabel={'Rank'} />
                        <Label storedLabel={'Description'} />
                    </div>
                    {
                        Array.isArray(stat) && stat.map((item) => (
                            <div key={item.id} style={statStyles.grid_3}>
                                <ClickableLabel id={item.id} name={item.name} groupName={groupName} />
                                <div>{item.rank}</div>
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
                    style={statStyles.grid_8}
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
                    Array.isArray(stat) && stat.map((item) => (
                        <div key={item.id} style={statStyles.grid_8}>
                            <ClickableLabel id={item.id} name={item.name} groupName={groupName} />
                            <div>{item.attempts}</div>
                            <div>{item.mastered ? "Aye": "Nay"}</div>
                            <div>{item.purchased ? "Aye" : "Nay"}</div>
                            <div>{item.casting}</div>
                            <div>{item.duration}</div>
                            <div>{item.description}</div>
                            {item.componentItem.map((component: any) => 
                                    
                                    <StatLists
                                        key={component.id}
                                        stat={component}
                                        groupName='spellComponents'
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
                    style={statStyles.grid_7}
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
                        Array.isArray(stat) && stat.map((item) => (
                            <div key={item.id} style={statStyles.grid_7}>
                                <ClickableLabel id={item.id} name={item.name} groupName={groupName} />
                                <div>{item.rank}</div>
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
                    style={statStyles.grid_4}
                >
                    <Label storedLabel='Name' />
                    <Label storedLabel='Rank' />
                    <Label storedLabel='Description' />
                    <Label storedLabel="Stunts" />
                </div>
                <div>
                    {
                        Array.isArray(stat) && stat.map((item) => (
                            <div key={item.id} style={statStyles.grid_4}>
                                <ClickableLabel id={item.id} name={item.name} groupName={groupName} />
                                <div>{item.rank}</div>
                                <div>{item.description}</div>
                                {item.stunt.map((stunt: any) => 
                                    
                                    <StatLists
                                        key={stunt.id}
                                        stat={stunt}
                                        groupName='stunt'
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
                    style={statStyles.grid_6}
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
                        Array.isArray(stat) && stat.map((item) => (
                            <div key={item.id} style={statStyles.grid_6}>
                                <ClickableLabel id={item.id} name={item.name} groupName={groupName} />
                                <div>{item.rank}</div>
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
        if(isSingleStat){
            return handleSingleStatElement()
        }
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
        <div>
            {/* {groupTitle ? <Title storedTitle={groupTitle} /> : null} */}
            {
                (
                    groupTitle === 'Bashing' ||
                    groupTitle === 'Lethal' ||
                    groupTitle === 'Name' ||
                    groupTitle === 'Alias' ||
                    groupTitle === 'Nature'
                ) ? 
                    <ClickableTitle groupTitle={groupTitle}/> : 
                (
                    groupTitle ? <Title storedTitle={groupTitle} /> : 
                    null 
                )
            }
            {handleStatElement()}
        </div>
    )
}

export default Stat