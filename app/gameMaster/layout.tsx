import React, { ReactNode } from 'react'
import GameMasterNavBar from './NavSideBar';

interface Props {
    children: ReactNode;
}
const GameMasterDashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex">
       <aside className="bg-slate-200 p-5 mr-5">
        <GameMasterNavBar />
       </aside>
       <div>{children}</div>
    </div>
  )
}

export default GameMasterDashboardLayout