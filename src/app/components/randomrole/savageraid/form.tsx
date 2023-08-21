'use client'

import { useEffect, useState } from "react"
import { UserInput, UserInputType } from "./user_input"


export default function RandomRoleSavageRaidForm() {
    const [userInputs, setUserInputs] = useState<UserInputType[]>([])

    useEffect(() => {
        setUserInputs([{id: 1}, {id:2}])
    }, [])

    return (
        <>
        <form>
            <div className="grid grid-cols-1 gap-4">
                {userInputs.map((userInput) => (
                    <>
                    <UserInput key={userInput.id} id={userInput.id} />
                    </>
                ))}
            </div>
        </form>
        </>
    )
}
