'use client'

import { BattleContentEnum, useStore } from '@/store/store'
import Image from 'next/image'


export default function Navigation() {
    const { currentBattleContent, setCurrentBattleContent, resetUser } = useStore()

    const contents = [
        {
            name: "SAVAGE RAID",
            src: "/bg-savage-raid.jpeg",
            disabled: currentBattleContent == BattleContentEnum.SavageRaid,
            battleContent: BattleContentEnum.SavageRaid,
            isImplemented: true,
        },
        {
            name: "NORMAL RAID",
            src: "/bg-normal-raid.jpeg",
            disabled: currentBattleContent == BattleContentEnum.NormalRaid,
            battleContent: BattleContentEnum.NormalRaid,
            isImplemented: true,
        },
        {
            name: "ALLIANCE RAID",
            src: "/bg-alliance-raid.jpeg",
            disabled: currentBattleContent == BattleContentEnum.AllianceRaid,
            battleContent: BattleContentEnum.AllianceRaid,
            isImplemented: true,
        },
        {
            name: "4 PLAYER",
            src: "/bg-4player.jpeg",
            disabled: currentBattleContent == BattleContentEnum.FourPlayer,
            battleContent: BattleContentEnum.FourPlayer,
            isImplemented: false,
        }
    ]

    const changeBattleContent = (battleContent: BattleContentEnum) => {
        /* 戦闘コンテンツを変更し、ユーザー情報をリセットする */
        setCurrentBattleContent(battleContent)
        resetUser()
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 w-full pb-12 md:pb-0">
                {contents.map((content) => (
                    <div
                        key={content.name}
                        className={`${content.battleContent == currentBattleContent && "ring-4"}  flex justify-center border rounded-md bg-slate-50 shadow-md text-gray-700 font-semibold relative w-64 lg:w-30 h-20 md:h-32`}
                        onClick={() => content.isImplemented && !content.disabled && changeBattleContent(content.battleContent)}
                    >
                        <Image className="shadow-md rounded-md" src={content.src} objectFit="cover" layout="fill" alt="Background Normal Raid" />
                        <div className={`${content.isImplemented ? "bg-opacity-20":"bg-opacity-90"} relative rounded-md shadow-md flex justify-center items-center w-full bg-slate-700 text-white`}>{content.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}