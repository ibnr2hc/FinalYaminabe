
type AddUserButtonProps = {
    users_length: number,
    addUserInput: () => void,
    MAX_USER: number,
}

export default function AddUserButton({ users_length, addUserInput, MAX_USER }: AddUserButtonProps) {
    return (
        <button
            type="button"
            className={users_length >= MAX_USER ? "w-full border border-gray-400 mt-4 rounded p-1 text-lg font-bold text-gray-400" : "w-full border border-green-600 mt-4 rounded p-1 text-lg font-bold text-green-600 hover:bg-green-600 hover:text-white"}
            disabled={users_length >= MAX_USER}
            onClick={() => addUserInput()}
        >+</button>
    )
}