'use client'

import { DecidedUserAndRoleType, RoleType, UserType, useStore } from "@/store/store"
import { ButtonCssForRole } from "@/utils/role/color"
import { ToastError } from "@/utils/toast"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UserInput } from "./user_input"


export default function RandomRoleSavageRaidForm() {
    const { users, addUser, setDecidedUserAndRoles } = useStore()
    const router = useRouter()

    const MAX_USER = 8; // 最大人数
    const MAX_RETRY_RANDOM_ROLE = 1000;  // ランダムロールの最大試行回数

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

    const getSelectedRole = (roles: RoleType[]) => {
        /* 選択されているロールを返す */
        const selectedRoles: RoleType[] = []
        roles.forEach((role: RoleType) => {
            if (role.selected) {
                selectedRoles.push(role)
            }
        })
        return selectedRoles
    }

    const existsUndefinedRole = (userAndRoles: {userName: string, roleName: string}[]) => {
        /* ロールが未定義のユーザーがいる場合はtrueを返す */
        let isUndefinedRole = false
        userAndRoles.forEach((userAndRole: {userName: string, roleName: string}) => {
            if (userAndRole.roleName == undefined) {
                isUndefinedRole = true
            }
        })
        return isUndefinedRole
    }

    const randomRole = (): DecidedUserAndRoleType[] => {
        /* ランダムにロールを決める */

        // 各ユーザーがselected=trueのロールの中からランダムで1つ選ぶ
        for (let i = 0; i < MAX_RETRY_RANDOM_ROLE; i++) {
            let userAndRoles: DecidedUserAndRoleType[] = []
            let decidedRolesName: string[] = []
            users.forEach((user: UserType) => {
                const selectedRoles = getSelectedRole(user.roles)  // 選択されているロールを取得

                // 選択されているロールの中から、決定済みのロールを除いたものを取得する
                const candidateRoles = selectedRoles.filter((selectedRole: RoleType) => !decidedRolesName.includes(selectedRole.name))  // 候補のロール(決定済みのロールを除く)

                // 候補のロールからランダムに1つ選ぶ
                const randomRole = candidateRoles[Math.floor(Math.random() * candidateRoles.length)]

                // 選出されたユーザーとロールを保存し、そのユーザーとロールを決定済みとして扱う
                // この時、選択可能なロールがない場合は後続処理でエラーを出す
                // TODO: ロジックが汚いので修正する。候補のロールがない場合のエラーを最適化する。
                userAndRoles.push({userName: user?.name, roleName: randomRole?.name, sortPriority: randomRole?.sortPriority})  // 選ばれたユーザーとロール
                decidedRolesName.push(randomRole?.name)
            })

            // ロールが未定義のユーザーがいない場合は処理を終える
            if (!existsUndefinedRole(userAndRoles)) {
                return userAndRoles;
            }
        }

        // ロールが未定義のユーザーがいる場合はアラートを表示する
        ToastError("ユーザーとロール(重複なし)の数が一致しません")
        throw Error("ユーザーとロール(重複なし)の数が一致しません")
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // ランダムにロールを決め、storeに保存する
        const userAndRoles = randomRole()
        setDecidedUserAndRoles(userAndRoles)

        // ページを移動する
        router.push("/result")
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
                type="submit"
                className="w-full border border-blue-600 mt-8 rounded p-1 text-lg  text-blue-600 hover:bg-blue-600 hover:text-white"
            >Random Role!!</button>
        </form>
        </>
    )
}
