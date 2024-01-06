import React, { ReactNode } from 'react'
import PlayerNavBar from './NavSideBar';
import { CharacterProvider } from '../context/CharacterContext';

interface Props {
    children: ReactNode;
}
const PlayerDashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <CharacterProvider>
          <aside className="bg-slate-200 p-5 mr-5">
            <PlayerNavBar />
          </aside>
          <div>{children}</div>
      </CharacterProvider>
     
    </div>
  )
}

export default PlayerDashboardLayout