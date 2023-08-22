import { UserInput } from "@/app/components/randomrole/parts/user_input"
import { UserType } from "@/store/store"

type UserInputProps = {
    users: UserType[],
}

export default function UserInputForm({users}: UserInputProps) {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-4">
                {users.map((user: UserType) => (
                    <>
                    <UserInput key={user.id} id={user.id} roles={user.roles} name={user.name} />
                    </>
                ))}
            </div>
        </div>
    )

}