"use client"
import React, { useEffect, useState } from 'react'

const  useStatKeyCheck = (statKey: string): string => {

    const [checkResult, setCheckResult] = useState<string>('')
    
    useEffect(() => {
        const checkStatKey = () => {
            if (["inventory"].includes(statKey)) setCheckResult("isInventoryItem");
            else if (["combat", "physical", "professional", "mental"].includes(statKey)) setCheckResult("isSkill");
            else if (["stunts"].includes(statKey)) setCheckResult("isStunt");
            else if (["powers"].includes(statKey)) setCheckResult("isPower");
            else if (["spellbooks"].includes(statKey)) setCheckResult("isSpellbook");
            else if (["spells"].includes(statKey)) setCheckResult("isSpell");
            else if (["talismans"].includes(statKey)) setCheckResult("isTalisman");
            else if (["merits", "flaws", "backgrounds"].includes(statKey)) setCheckResult("isNameRankDescription");
            else if (["backgroundStory"].includes(statKey)) setCheckResult("isBackgroundStory");
            else setCheckResult('');
        };

        checkStatKey();
    }, [statKey]);

    return checkResult;
}
  
export default useStatKeyCheck
