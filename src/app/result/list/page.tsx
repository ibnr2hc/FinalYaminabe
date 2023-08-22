'use client'

import { useStore } from "@/store/store"
import { useRouter } from "next/navigation"


export default function ResultPage() {
    const router = useRouter()

    const { decidedUserAndRoles } = useStore()
    const userAndRoles = decidedUserAndRoles
    // userAndRolesをsortPriorityの昇順に並び替える
    userAndRoles.sort((a, b) => {
        if (a.sortPriority < b.sortPriority) return -1
        if (a.sortPriority > b.sortPriority) return 1
        return 0
    })


    return (
        <div className="w-full flex justfiy-center items-center flex-col px-4 lg:px-10 py-4 lg:py-10">
            <div className="rounded shadow-md ring-1 ring-gray-300 w-full">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ロール</th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ポジション</th>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">名前</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAndRoles.map((userAndRole) => {
                            return (
                                <tr key={userAndRole.userName}>
                                    <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>{userAndRole.roleName}</td>
                                    <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>{userAndRole.roleName}</td>
                                    <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>{userAndRole.userName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-10">
                <button
                    className="border border-blue-700 text-blue-700 rounded-md shadow hover:bg-blue-700 hover:text-white px-12 py-2 mt-8"
                    onClick={() => router.push("/")}
                >
                    入力画面へ戻る
                </button>
            </div>
        </div>

    )
}