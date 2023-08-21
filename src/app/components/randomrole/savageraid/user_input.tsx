import { RoleType, UserType } from "@/store/store"
import React from "react"



export type UserInputType = {
    id: UserType["id"],
    roles: RoleType[]
}

const UserInput: React.FC<UserInputType> = ({id, roles}) => {
    return (
        <>
        <div>
            <input type="text" className="border-slate-400 border py-1 px-2 text-lg mr-1 rounded" placeholder="名前" required />
            {roles.map((role: RoleType) => (
                <button type="button" className={role.buttonCss}>{role.name}</button>
            ))}
        </div>
        </>
    )
}

export {
    UserInput
}

