'use client'

import { BattleContentEnum, useStore } from '@/store/store'
import RandomRoleNormalRaidForm from './components/randomrole/normalraid/form'
import RandomRoleSavageRaidForm from './components/randomrole/savageraid/form'

export default function Home() {
  const { currentBattleContent } = useStore()

  return (
    <div className="xl:w-4/5 2xl:w-1/2">
      {currentBattleContent === BattleContentEnum.SavageRaid && <RandomRoleSavageRaidForm />}
      {currentBattleContent === BattleContentEnum.NormalRaid && <RandomRoleNormalRaidForm />}
    </div>
  )
}
