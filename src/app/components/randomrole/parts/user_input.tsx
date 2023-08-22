import { RoleType, UserType, useStore } from "@/store/store"
import { ButtonCssForRole } from "@/utils/role/color"
import React from "react"

export type UserInputType = {
    id: UserType["id"],
    roles: RoleType[],
    name: UserType["name"]
}

const UserInput: React.FC<UserInputType> = ({id, roles, name}) => {
    const { toggleRoleSelected, updateUserName } = useStore()

    const toggleRole = (id: number, name: string, role: string, selected: boolean) => {
        /* ロールのselectedを変更し、ボタンの色を変更する */
        const roleType: keyof typeof ButtonCssForRole = role as keyof typeof ButtonCssForRole
        const css = ButtonCssForRole[roleType].selected[selected.toString() as "true" | "false"]
        toggleRoleSelected(id, name, selected, css)
    }

    return (
        <>
        <div className="grid grid-cols-5 gap-1 md:gap-2 min-w-full">
            <div className="col-span-5 lg:col-span-2 min-w-full">
                <input
                    type="text"
                    className="border-slate-400 border py-1 px-2 md:text-lg md:mr-1 rounded min-w-full"
                    placeholder="名前"
                    value={name}
                    onChange={(e) => {updateUserName(id, e.target.value)}}
                    required
                />
            </div>
            <div className="col-span-5 lg:col-span-3">
                {roles.map((role: RoleType) => (
                    <button
                        key={role.name}
                        type="button"
                        className={role.buttonCss}
                        onClick={()=>toggleRole(id, role.name, role.role.toLowerCase(), !role.selected)}
                    >{role.name}</button>
                ))}
            </div>
        </div>
        </>
    )
}

export {
    UserInput
}

