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
        addUser({id: 1, name: "", role: {mt: false, st: false, h1: false, h2: false, d1: false, d2: false, d3: false, d4: false}})
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
                    <UserInput key={user.id} id={user.id} />
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
