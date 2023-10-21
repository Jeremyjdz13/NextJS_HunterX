import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}
const GameMasterDashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex">
       <aside className="bg-slate-200 p-5 mr-5">Game Master Sidebar</aside>
       <div>{children}</div>
    </div>
  )
}

export default GameMasterDashboardLayout