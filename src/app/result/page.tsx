'use client'

import { useStore } from "@/store/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function ResultPage() {
    const router = useRouter()
    const [resultMessage, setResultMessage] = useState("")  // ユーザーとロールの結果を表示するメッセージ
    const [resultRoleImgSrc, setResultRoleImgSrc] = useState("")  // ロールの画像のパス
    const [finishedPeformance, setFinishedPerformance] = useState(false)  // 結果表示パフォーマンスが終わったかどうか
    const [endShowResult, setEndShowResult] = useState(false)  // ユーザーとロールを全て表示し終わったかどうか

    const { decidedUserAndRoles } = useStore()
    const userAndRoles = decidedUserAndRoles

    const getRandomUserAndRole = () => {
        /* userAndRolesからランダムで1人選ぶ */
        // 選ばれた行をdecidedUserAndRolesから削除する
        const randomIndex = Math.floor(Math.random() * userAndRoles.length)
        const userAndRole = userAndRoles[randomIndex]
        userAndRoles.splice(randomIndex, 1)
        return userAndRole
    }

    const showRandomUserAndRole = () => {
        /*
        * userAndRolesからランダムで1人選んで表示する
        * 結果表示は一人ずつ演出をつけて表示する
        * 結果表示の演出が終わったら次のユーザーへ進むボタンを表示する
        *
        * 全てのユーザーとロールを表示し終わったら結果一覧へのボタンを表示する
        */

        if (!userAndRoles.length) {
            // ユーザーとロールが決定していない場合はトップページにリダイレクトする
            router.push("/")
            return;
        }

        // ユーザーとロールを表示する
        setResultMessage("")
        setResultRoleImgSrc("")
        setFinishedPerformance(false)
        setEndShowResult(false)
        const userAndRole = getRandomUserAndRole()
        setTimeout(() => setResultMessage(`${userAndRole.userName}さんは`), 0)
        setTimeout(() => setResultMessage(`${userAndRole.userName}さんは.`), 800)
        setTimeout(() => setResultMessage(`${userAndRole.userName}さんは..`), 1600)
        setTimeout(() => setResultMessage(`${userAndRole.userName}さんは...`), 2400)
        setTimeout(() => setResultMessage(`${userAndRole.userName}さんは...${userAndRole.roleName}!!`), 3200)
        setTimeout(() => setResultRoleImgSrc(`${userAndRole.roleName}`), 3200)
        setTimeout(() => setFinishedPerformance(true), 3200)
        setTimeout(() => {if(!userAndRoles.length) setEndShowResult(true), 3200})  // 全てのユーザーとロールを表示し終わったら結果一覧へのボタンを表示する
    }


    useEffect(() => {
        // ユーザーとロールが決定していない場合はトップページにリダイレクトする
        if (!userAndRoles.length) {
            router.push("/")
            return;
        }

        showRandomUserAndRole()
    }, [])

    return (
        <div className="w-full flex justfiy-center items-center flex-col">
            <div className="text-3xl text-slate-700">{resultMessage}</div>
            {/* {resultRoleImgSrc && (
                <>
                    <img src={resultRoleImgSrc} />
                </>
            )} */}
            {/* 全ての結果表示が終わっていない & 結果表示演出が終わった場合は次の結果表示ボタンを表示する */}
            {(finishedPeformance && !endShowResult) && (
                <button
                    className="border border-blue-700 text-blue-700 rounded-md shadow hover:bg-blue-700 hover:text-white px-12 py-2 mt-8"
                    onClick={showRandomUserAndRole}
                >次へ</button>
            )}
            {/* 全ての結果表示が終わった & 結果表示演出が終わった場合は結果一覧表示ボタンを表示する */}
            {(finishedPeformance && endShowResult) && (
                <button
                    className="border border-blue-700 text-blue-700 rounded-md shadow hover:bg-blue-700 hover:text-white px-12 py-2 mt-8"
                    onClick={() => router.push("/result/list")}
                >結果一覧表示へ</button>
            )}
        </div>

    )
}