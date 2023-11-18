import classNames from 'classnames';
import React, { useState } from 'react'

type Tab = {
    label: string;
    content: React.ReactNode
}

type Props = {
    tabs: Tab[]
}

function Tabs({tabs}: Props) {
    const [activeTab, setActiveTab] = useState<number>(0)
    
    const handleTabClick = (index: number) => {
        setActiveTab(index)
    }

    const tabClasses = (index: any) => classNames(
        'p-1 m-1 cursor-pointer tab-label',
        {
          'active border-b border-black': index === activeTab,
        }
      );


    return (
        <div className='border border-black rounded'>
          <div className="tab-header flex flex-row">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleTabClick(index)}
                className={tabClasses(index)}
              >
                {tab.label}
              </div>
            ))}
          </div>
          <div className="">{tabs[activeTab].content}</div>
        </div>
      );
}

export default Tabs