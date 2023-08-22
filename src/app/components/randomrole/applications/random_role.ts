import { DecidedUserAndRoleType, RoleType, UserType } from "@/store/store";
import { ToastError } from "@/utils/toast";

// TODO: ロジックが汚いのでリファクタリングする
const randomRoleForAllianceRaid = (users: UserType[]): DecidedUserAndRoleType[] => {
    /* ランダムにロールを決める */
    const MAX_RETRY_RANDOM_ROLE = 1000;  // ランダムロールの最大試行回数

    // 各ロールごとの上限人数
    const LIMIT_ROLE = {
        TANK: 1,
        HEALER: 2,
        DPS: 5,
    }

    // 各ユーザーがselected=trueのロールの中からランダムで1つ選ぶ
    for (let i = 0; i < MAX_RETRY_RANDOM_ROLE; i++) {
        let userAndRoles: DecidedUserAndRoleType[] = []
        let decidedRolesName: string[] = []
        let decidedRoleCount = {  // 各ロールの振り分け済み人数
            TANK: 0,
            HEALER: 0,
            DPS: 0,
        }
        users.forEach((user: UserType) => {
            // 選択されているロールを取得する
            const selectedRoles = getSelectedRole(user.roles)  // 選択されているロールを取得

            // 既に上限を超えているロールを排除する
            const candidateRoles = selectedRoles.filter((selectedRole: RoleType) => {
                if (selectedRole.role == "TANK" && decidedRoleCount.TANK >= LIMIT_ROLE.TANK) {
                    return false
                } else if (selectedRole.role == "HEALER" && decidedRoleCount.HEALER >= LIMIT_ROLE.HEALER) {
                    return false
                } else if (selectedRole.role == "DPS" && decidedRoleCount.DPS >= LIMIT_ROLE.DPS) {
                    return false
                }
                return true
            })

            // 候補のロールからランダムに1つ選ぶ
            const randomRole = candidateRoles[Math.floor(Math.random() * candidateRoles.length)]

            // TODO: 関数化する
            // TODO: 処理をリファクタリングする
            let role: string;
            let sortPriority: number;
            if (randomRole?.role == "TANK") {  // TankであればMTに振り分ける
                role = "MT"
                sortPriority = 1
                decidedRoleCount.TANK += 1
            } else if (randomRole?.role == "HEALER") {  // HEALERであればPH/BHを振り分ける
                role = Math.random() < 0.5 ? "PH" : "BH"
                sortPriority = role == "PH" ? 2 : 3
                decidedRoleCount.HEALER += 1
            } else {  // DPSはそのままロール(Melee/Range/Caster)で振り分ける
                role = randomRole?.name
                if (role == "Melee") {
                    sortPriority = 4 
                } else if (role == "Range") {
                    sortPriority = 5 
                } else {
                    sortPriority = 6
                }
                decidedRoleCount.DPS += 1
            }
            decidedRolesName.push(role)

            // 選出されたユーザーとロールを保存し、そのユーザーとロールを決定済みとして扱う
            // この時、選択可能なロールがない場合は後続処理でエラーを出す
            // TODO: ロジックが汚いので修正する。候補のロールがない場合のエラーを最適化する。
            userAndRoles.push({userName: user?.name, roleName: role, sortPriority: sortPriority})  // 選ばれたユーザーとロール
        })

        // ロールが未定義のユーザーがいない場合は処理を終える
        if (!existsUndefinedRole(userAndRoles)) {
            return userAndRoles;
        }
    }

    // ロールが未定義のユーザーがいる場合はアラートを表示する
    ToastError("ユーザーとロールの数が一致しません")
    throw Error("ユーザーとロールの数が一致しません")
}

// TODO: ロジックが汚いのでリファクタリングする
const randomRoleForNormalRaid = (users: UserType[]): DecidedUserAndRoleType[] => {
    /* ランダムにロールを決める */
    const MAX_RETRY_RANDOM_ROLE = 1000;  // ランダムロールの最大試行回数

    // 各ロールごとの上限人数
    const LIMIT_ROLE = {
        TANK: 2,
        HEALER: 2,
        DPS: 4,
    }

    // 各ユーザーがselected=trueのロールの中からランダムで1つ選ぶ
    for (let i = 0; i < MAX_RETRY_RANDOM_ROLE; i++) {
        let userAndRoles: DecidedUserAndRoleType[] = []
        let decidedRolesName: string[] = []
        let decidedRoleCount = {  // 各ロールの振り分け済み人数
            TANK: 0,
            HEALER: 0,
            DPS: 0,
        }
        users.forEach((user: UserType) => {
            // 選択されているロールを取得する
            const selectedRoles = getSelectedRole(user.roles)  // 選択されているロールを取得

            // 既に上限を超えているロールを排除する
            const candidateRoles = selectedRoles.filter((selectedRole: RoleType) => {
                if (selectedRole.role == "TANK" && decidedRoleCount.TANK >= LIMIT_ROLE.TANK) {
                    return false
                } else if (selectedRole.role == "HEALER" && decidedRoleCount.HEALER >= LIMIT_ROLE.HEALER) {
                    return false
                } else if (selectedRole.role == "DPS" && decidedRoleCount.DPS >= LIMIT_ROLE.DPS) {
                    return false
                }
                return true
            })

            // 候補のロールからランダムに1つ選ぶ
            const randomRole = candidateRoles[Math.floor(Math.random() * candidateRoles.length)]

            // TODO: 関数化する
            // TODO: 処理をリファクタリングする
            // TANKであればMT/STを振り分ける
            let role: string;
            let sortPriority: number;
            if (randomRole?.role == "TANK") {  // TankであればMT/STを振り分ける
                if (decidedRoleCount.TANK == 0) {
                    role = Math.random() < 0.5 ? "MT" : "ST"
                    sortPriority = role == "MT" ? 1 : 2
                } else if (decidedRolesName.includes("ST")) {
                    role = "MT"  // 既にSTが決まっている場合はMTを選ぶ
                    sortPriority = 1
                } else {
                    role = "ST"  // 既にMTが決まっている場合はSTを選ぶ
                    sortPriority = 2
                }
                decidedRoleCount.TANK += 1
            } else if (randomRole?.role == "HEALER") {  // HEALERであればPH/BHを振り分ける
                role = Math.random() < 0.5 ? "PH" : "BH"
                sortPriority = role == "PH" ? 3 : 4
                decidedRoleCount.HEALER += 1
            } else {  // DPSはそのままロール(Melee/Range/Caster)で振り分ける
                role = randomRole?.name
                if (role == "Melee") {
                    sortPriority = 5
                } else if (role == "Range") {
                    sortPriority = 6
                } else {
                    sortPriority = 7
                }
                decidedRoleCount.DPS += 1
            }
            decidedRolesName.push(role)

            // 選出されたユーザーとロールを保存し、そのユーザーとロールを決定済みとして扱う
            // この時、選択可能なロールがない場合は後続処理でエラーを出す
            // TODO: ロジックが汚いので修正する。候補のロールがない場合のエラーを最適化する。
            userAndRoles.push({userName: user?.name, roleName: role, sortPriority: sortPriority})  // 選ばれたユーザーとロール
        })

        // ロールが未定義のユーザーがいない場合は処理を終える
        if (!existsUndefinedRole(userAndRoles)) {
            return userAndRoles;
        }
    }

    // ロールが未定義のユーザーがいる場合はアラートを表示する
    ToastError("ユーザーとロールの数が一致しません")
    throw Error("ユーザーとロールの数が一致しません")
}

// TODO: ロジックが汚いのでリファクタリングする
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

export { classNames, existsUndefinedRole, getSelectedRole, randomRole, randomRoleForAllianceRaid, randomRoleForNormalRaid };

