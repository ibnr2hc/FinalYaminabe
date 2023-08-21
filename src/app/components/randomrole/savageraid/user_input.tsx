import React from "react"

export type UserInputType = {
    id: number,
}

const UserInput: React.FC<UserInputType> = ({id}) => {
    return (
        <>
        <div>
            <input type="text" className="border-slate-400 border py-1 px-2 text-lg mr-1 rounded" placeholder="名前" required />
            <button type="button" className="bg-blue-600 text-white p-1 px-2 text-lg">MT</button>
            <button type="button" className="bg-blue-600 text-white p-1 px-2 text-lg">ST</button>
            <button type="button" className="bg-green-600 text-white p-1 px-2 text-lg">H1</button>
            <button type="button" className="bg-green-600 text-white p-1 px-2 text-lg">H2</button>
            <button type="button" className="bg-red-600 text-white p-1 px-2 text-lg">D1</button>
            <button type="button" className="bg-red-600 text-white p-1 px-2 text-lg">D2</button>
            <button type="button" className="bg-red-600 text-white p-1 px-2 text-lg">D3</button>
            <button type="button" className="bg-red-600 text-white p-1 px-2 text-lg">D4</button>
        </div>
        </>
    )
}

export {
    UserInput
}

