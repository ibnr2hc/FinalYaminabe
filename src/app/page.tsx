'use client'

import { BattleContentEnum, useStore } from '@/store/store'
import RandomRoleSavageRaidForm from './components/randomrole/savageraid/form'

export default function Home() {
  const { currentBattleContent } = useStore()

  return (
    <div className="xl:w-1/2">
      {currentBattleContent === BattleContentEnum.SavageRaid && <RandomRoleSavageRaidForm />}
    </div>
  )
}
