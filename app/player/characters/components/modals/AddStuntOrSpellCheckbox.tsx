import { StatData } from '@/app/context/CharacterTypes'
import React from 'react'

type Props = {
    defaultValue: boolean
    stuntSpellId: string
    stat: StatData
    onChange: (statId: string, stuntSpellId: string, isAdding: boolean) => void
}
export default function AddStuntOrSpellCheckbox({defaultValue, stuntSpellId, stat, onChange }: Props) {

    
    

  return (
        
    <div className='border rounded-lg p-3'>
        <div key={stat.id} className='p-1 flex items-center justify-center'>
            <label className='flex-1'>{stat.name}</label>
            <input
                name={"stat"} 
                type="checkbox" 
                defaultChecked={defaultValue}
                onChange={() => onChange(stat.id, stuntSpellId, !defaultValue)}
                className=''
            />  
        </div>    
    </div>
  )
}
