import { DecidedUserAndRoleType, RoleType, UserType } from "@/store/store";
import { ToastError } from "@/utils/toast";

const randomRole = (users: UserType[]): DecidedUserAndRoleType[] => {
    /* ランダムにロールを決める */
    const MAX_RETRY_RANDOM_ROLE = 1000;  // ランダムロールの最大試行回数

    // 各ユーザーがselected=trueのロールの中からランダムで1つ選ぶ
    for (let i = 0; i < MAX_RETRY_RANDOM_ROLE; i++) {
        let userAndRoles: DecidedUserAndRoleType[] = []
        let decidedRolesName: string[] = []
        users.forEach((user: UserType) => {
            const selectedRoles = getSelectedRole(user.roles)  // 選択されているロールを取得

            // 選択されているロールの中から、決定済みのロールを除いたものを取得する
            const candidateRoles = selectedRoles.filter((selectedRole: RoleType) => !decidedRolesName.includes(selectedRole.name))  // 候補のロール(決定済みのロールを除く)

            // 候補のロールからランダムに1つ選ぶ
            const randomRole = candidateRoles[Math.floor(Math.random() * candidateRoles.length)]

            // 選出されたユーザーとロールを保存し、そのユーザーとロールを決定済みとして扱う
            // この時、選択可能なロールがない場合は後続処理でエラーを出す
            // TODO: ロジックが汚いので修正する。候補のロールがない場合のエラーを最適化する。
            userAndRoles.push({userName: user?.name, roleName: randomRole?.name, sortPriority: randomRole?.sortPriority})  // 選ばれたユーザーとロール
            decidedRolesName.push(randomRole?.name)
        })

        // ロールが未定義のユーザーがいない場合は処理を終える
        if (!existsUndefinedRole(userAndRoles)) {
            return userAndRoles;
        }
    }

    // ロールが未定義のユーザーがいる場合はアラートを表示する
    ToastError("ユーザーとロール(重複なし)の数が一致しません")
    throw Error("ユーザーとロール(重複なし)の数が一致しません")
}

const getSelectedRole = (roles: RoleType[]) => {
    /* 選択されているロールを返す */
    const selectedRoles: RoleType[] = []
    roles.forEach((role: RoleType) => {
        if (role.selected) {
            selectedRoles.push(role)
        }
    })
    return selectedRoles
}

const existsUndefinedRole = (userAndRoles: {userName: string, roleName: string}[]) => {
    /* ロールが未定義のユーザーがいる場合はtrueを返す */
    let isUndefinedRole = false
    userAndRoles.forEach((userAndRole: {userName: string, roleName: string}) => {
        if (userAndRole.roleName == undefined) {
            isUndefinedRole = true
        }
    })
    return isUndefinedRole
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export { classNames, existsUndefinedRole, getSelectedRole, randomRole };

