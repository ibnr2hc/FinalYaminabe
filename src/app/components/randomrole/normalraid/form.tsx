'use client'

import { randomRole } from "@/app/components/randomrole/applications/random_role"
import { useStore } from "@/store/store"
import { ButtonCssForRole } from "@/utils/role/color"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AddUserButton from "../parts/add_user"
import SkipPerformance from "../parts/skip_performance"
import SubmitRandomRole from "../parts/submit_random_role"
import UserInputForm from "../parts/user_input_form"


export default function RandomRoleNormalRaidForm() {
    const { users, addUser, setDecidedUserAndRoles } = useStore()
    const router = useRouter()

    const [performanceSkip, setPerformanceSkip] = useState(false)

    const MAX_USER = 8; // 最大人数

    const addUserInput = () => {
        /* ユーザー入力欄を追加する */
        addUser({
            id: users.length + 1,
            name: "",
            roles: [
                {name: "MT", selected: true, buttonCss: ButtonCssForRole.tank.selected.true, role: "tank", sortPriority: 1},
                {name: "ST", selected: true, buttonCss: ButtonCssForRole.tank.selected.true, role: "tank", sortPriority: 2},
                {name: "H1", selected: true, buttonCss: ButtonCssForRole.healer.selected.true, role: "healer", sortPriority: 3},
                {name: "H2", selected: true, buttonCss: ButtonCssForRole.healer.selected.true, role: "healer", sortPriority: 4},
                {name: "D1", selected: true, buttonCss: ButtonCssForRole.dps.selected.true, role: "dps", sortPriority: 5},
                {name: "D2", selected: true, buttonCss: ButtonCssForRole.dps.selected.true, role: "dps", sortPriority: 6},
                {name: "D3", selected: true, buttonCss: ButtonCssForRole.dps.selected.true, role: "dps", sortPriority: 7},
                {name: "D4", selected: true, buttonCss: ButtonCssForRole.dps.selected.true, role: "dps", sortPriority: 8},
            ],
        })
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // ランダムにロールを決め、storeに保存する
        const userAndRoles = randomRole(users)
        setDecidedUserAndRoles(userAndRoles)

        // ページを移動する
        if (performanceSkip) {
            router.push("/result/list")  // 演出をスキップして結果一覧表示画面へ
        } else {
            router.push("/result")  // 演出ありで結果表示画面へ
        }
    }

    useEffect(() => {
        // 初期化: 1人分の入力欄を作成
        if (users.length == 0) {
            addUserInput()
        }
    }, [])

    return (
        <>
        <form onSubmit={submitHandler}>
            {/* ユーザー情報入力欄 */}
            <UserInputForm users={users} />

            {/* ユーザー追加ボタン */}
            <AddUserButton users_length={users.length} addUserInput={addUserInput} MAX_USER={MAX_USER} />

            {/* RandomRole実行ボタン */}
            <SubmitRandomRole />

            {/* 演出スキップボタン */}
            <SkipPerformance performanceSkip={performanceSkip} setPerformanceSkip={setPerformanceSkip} />
        </form>
        </>
    )
}
