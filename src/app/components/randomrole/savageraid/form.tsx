'use client'

import { UserType, useStore } from "@/store/store"
import { ToastError } from "@/utils/toast"
import { useEffect } from "react"
import { UserInput } from "./user_input"



export default function RandomRoleSavageRaidForm() {
    const { users, addUser } = useStore()

    const addUserInput = () => {
        if (users.length >= 8) {
            ToastError("最大8人までです")
            return;
        }
        addUser({
            id: 1,
            name: "",
            roles: [
                {name: "MT", selected: true, buttonCss: "bg-blue-600 text-white p-1 px-2 text-lg"},
                {name: "ST", selected: true, buttonCss: "bg-blue-600 text-white p-1 px-2 text-lg"},
                {name: "H1", selected: true, buttonCss: "bg-green-600 text-white p-1 px-2 text-lg"},
                {name: "H2", selected: true, buttonCss: "bg-green-600 text-white p-1 px-2 text-lg"},
                {name: "D1", selected: true, buttonCss: "bg-red-600 text-white p-1 px-2 text-lg"},
                {name: "D2", selected: true, buttonCss: "bg-red-600 text-white p-1 px-2 text-lg"},
                {name: "D3", selected: true, buttonCss: "bg-red-600 text-white p-1 px-2 text-lg"},
                {name: "D4", selected: true, buttonCss: "bg-red-600 text-white p-1 px-2 text-lg"},
            ],
        })
    }

    const randomRole = () => {
        console.log(users)
    }

    useEffect(() => {
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
                className="w-full border border-green-600 mt-4 rounded p-1 text-lg font-bold text-green-600 hover:bg-green-600 hover:text-white"
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
