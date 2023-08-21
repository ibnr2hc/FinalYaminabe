import { RoleType, UserType, useStore } from "@/store/store"
import { ButtonCssForRole } from "@/utils/role/color"
import React from "react"

export type UserInputType = {
    id: UserType["id"],
    roles: RoleType[]
}

const UserInput: React.FC<UserInputType> = ({id, roles}) => {
    const { toggleRoleSelected } = useStore()

    const toggleRole = (id: number, name: string, role: string, selected: boolean) => {
        /* ロールのselectedを変更し、ボタンの色を変更する */
        const roleType: keyof typeof ButtonCssForRole = role as keyof typeof ButtonCssForRole
        const css = ButtonCssForRole[roleType].selected[selected.toString() as "true" | "false"]
        toggleRoleSelected(id, name, selected, css)
    }

    return (
        <>
        <div>
            <input type="text" className="border-slate-400 border py-1 px-2 text-lg mr-1 rounded" placeholder="名前" required />
            {roles.map((role: RoleType) => (
                <button type="button" className={role.buttonCss} onClick={()=>toggleRole(id, role.name, role.role, !role.selected)}>{role.name}</button>
            ))}
        </div>
        </>
    )
}

export {
    UserInput
}

