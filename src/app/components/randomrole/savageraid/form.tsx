'use client'

import { RoleType, UserType, useStore } from "@/store/store"
import { ButtonCssForRole } from "@/utils/role/color"
import { ToastError } from "@/utils/toast"
import { useEffect } from "react"
import { UserInput } from "./user_input"


export default function RandomRoleSavageRaidForm() {
    const { users, addUser, toggleRoleSelected } = useStore()

    const MAX_USER = 8; // 最大人数
    const MAX_RETRY_RANDOM_ROLE = 100;  // ランダムロールの最大試行回数

    const addUserInput = () => {
        /* ユーザー入力欄を追加する */
        addUser({
            id: users.length + 1,
            name: "",
            roles: [
                {name: "MT", selected: true, buttonCss: ButtonCssForRole.tank.selected.true, role: "tank"},
                {name: "ST", selected: true, buttonCss: ButtonCssForRole.tank.selected.true, role: "tank"},
                {name: "H1", selected: true, buttonCss: ButtonCssForRole.healer.selected.true, role: "healer"},
                {name: "H2", selected: true, buttonCss: ButtonCssForRole.healer.selected.true, role: "healer"},
                {name: "D1", selected: true, buttonCss: ButtonCssForRole.dps.selected.true, role: "dps"},
                {name: "D2", selected: true, buttonCss: ButtonCssForRole.dps.selected.true, role: "dps"},
                {name: "D3", selected: true, buttonCss: ButtonCssForRole.dps.selected.true, role: "dps"},
                {name: "D4", selected: true, buttonCss: ButtonCssForRole.dps.selected.true, role: "dps"},
            ],
        })
    }

    const getSelectedRole = (roles: RoleType[]) => {
        /* 選択されているロールを返す */
        const selectedRoles: string[] = []
        roles.forEach((role: RoleType) => {
            if (role.selected) {
                selectedRoles.push(role.name)
            }
        })
        return selectedRoles
    }

    const existsUndefinedRole = (userAndRoles: {user: UserType, roleName: string}[]) => {
        /* ロールが未定義のユーザーがいる場合はtrueを返す */
        let isUndefinedRole = false
        userAndRoles.forEach((userAndRole: {user: UserType, roleName: string}) => {
            if (userAndRole.roleName == undefined) {
                isUndefinedRole = true
            }
        })
        return isUndefinedRole
    }

    const randomRole = () => {
        /* ランダムにロールを決める */

        // 各ユーザーがselected=trueのロールの中からランダムで1つ選ぶ
        for (let i = 0; i < MAX_RETRY_RANDOM_ROLE; i++) {
            let userAndRoles: {user: UserType, roleName: string}[] = []
            let decidedRolesName: string[] = []
            users.forEach((user: UserType) => {
                const selectedRolesName = getSelectedRole(user.roles)  // 選択されているロールを取得
                const candidateRolesName = selectedRolesName.filter((roleName: string) => !decidedRolesName.includes(roleName))  // 候補のロール(決定済みのロールを除く)

                // 候補のロールからランダムに1つ選ぶ
                const randomRole = candidateRolesName[Math.floor(Math.random() * candidateRolesName.length)]
                userAndRoles.push({user: user, roleName: randomRole})  // 選ばれたユーザーとロール
                decidedRolesName.push(randomRole)
            })

            // ロールが未定義のユーザーがいない場合は処理を終える
            if (!existsUndefinedRole(userAndRoles)) {
                return userAndRoles;
            }
        }

        // ロールが未定義のユーザーがいる場合はアラートを表示する
        ToastError("ユーザーとロール(重複なし)の数が一致しません")
    }

    useEffect(() => {
        // 初期化: 1人分の入力欄を作成
        addUserInput()
    }, [])

    return (
        <>
        <form>
            <div className="grid grid-cols-1 gap-4">
                {users.map((user: UserType) => (
                    <>
                    <UserInput key={user.id} id={user.id} roles={user.roles} name={user.name} />
                    </>
                ))}
            </div>
            <button
                type="button"
                className={users.length >= MAX_USER ? "w-full border border-gray-400 mt-4 rounded p-1 text-lg font-bold text-gray-400" : "w-full border border-green-600 mt-4 rounded p-1 text-lg font-bold text-green-600 hover:bg-green-600 hover:text-white"}
                disabled={users.length >= MAX_USER}
                onClick={() => addUserInput()}
            >+</button>
            <button
                type="button"
                className="w-full border border-blue-600 mt-8 rounded p-1 text-lg  text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => randomRole()}
            >Random Role!!</button>
        </form>
        </>
    )
}
