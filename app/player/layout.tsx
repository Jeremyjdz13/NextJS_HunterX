import React, { ReactNode } from 'react'
import PlayerNavBar from './NavSideBar';

interface Props {
    children: ReactNode;
}
const PlayerDashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex">
       <aside className="bg-slate-200 p-5 mr-5">
            <PlayerNavBar />
        </aside>
       <div>{children}</div>
    </div>
  )
}

export default PlayerDashboardLayout