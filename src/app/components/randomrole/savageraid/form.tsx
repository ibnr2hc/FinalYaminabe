'use client'

import { UserType, useStore } from "@/store/store"
import { ButtonCssForRole } from "@/utils/role/color"
import { useEffect } from "react"
import { UserInput } from "./user_input"


export default function RandomRoleSavageRaidForm() {
    const { users, addUser, toggleRoleSelected } = useStore()

    const MAX_USER = 8; // 最大人数

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

    const randomRole = () => {
        console.log(users[0].roles[0])
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
                    <UserInput key={user.id} id={user.id} roles={user.roles} />
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
