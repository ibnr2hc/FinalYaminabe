import create from 'zustand';

export enum BattleContentEnum {  // RandomRoleの対象となるコンテンツ
    SavageRaid = 0,    // レイド(零式)
    NormalRaid = 1,    // レイド(ノーマル)
    AllianceRaid = 2,  // アライアンスレイド
    FourPlayer = 3,    // 4人コンテンツ
}

export type RoleType = {
    name: string;  // ロール名
    role: string;  // tank, healer, dpsなど
    buttonCss: string;  // ボタンのCSS
    selected: boolean;  // 選択状態
    sortPriority: number;  // 並び順
}

export type UserType = {
    id: number;
    name: string;
    roles: RoleType[];
};

export type DecidedUserAndRoleType = {
    userName: string;
    roleName: string;
    sortPriority: number;
}

type State = {
    users: UserType[];  // ユーザー一覧
    addUser: (user: UserType) => void;  // ユーザーを追加する
    resetUser: () => void;  // ユーザーをリセットする
    toggleRoleSelected: (id: number, roleName: string, selected: boolean, buttonCss: string) => void;  // ロールの選択状態を更新する
    updateUserName: (id: number, name: string) => void;  // ユーザー名を更新する
    decidedUserAndRoles: DecidedUserAndRoleType[];  // 決定済みのUserとRole一覧
    setDecidedUserAndRoles: (decidedUserAndRoles: DecidedUserAndRoleType[]) => void;  // 決定済みのUserとRoleをセットする
    currentBattleContent: BattleContentEnum;  // 戦闘コンテンツ
    setCurrentBattleContent: (currentBattleContent: BattleContentEnum) => void;  // 戦闘コンテンツをセットする
    performanceSkip: boolean;  // パフォーマンスをスキップするかどうか
    setPerformanceSkip: (performanceSkip: boolean) => void;  // パフォーマンスをスキップするかどうかをセットする
};

const useStore = create<State>((set) => ({
    users: [],
    decidedUserAndRoles: [],
    setDecidedUserAndRoles: (decidedUserAndRoles) => set({ decidedUserAndRoles }),
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    resetUser: () => set({ users: [] }),
    // users.idに一致し、かつ、roles.nameに一致するもののselectedとbuttonCssを更新する
    toggleRoleSelected: (id, roleName, selected, buttonCss) => set((state) => ({
        users: state.users.map((user) => {
            if (user.id === id) {
                return {
                    ...user,
                    roles: user.roles.map((role) => {
                        if (role.name === roleName) {
                            return {
                                ...role,
                                selected: selected,
                                buttonCss: buttonCss
                            };
                        }
                        return role;
                    })
                };
            }
            return user;
        })
    })),
    updateUserName: (id, name) => set((state) => ({
        users: state.users.map((user) => {
            if (user.id === id) {
                return { ...user, name };
            }
            return user;
        }
        )
    })),
    currentBattleContent: BattleContentEnum.SavageRaid,
    setCurrentBattleContent: (currentBattleContent) => set({ currentBattleContent }),
    performanceSkip: false,
    setPerformanceSkip: (performanceSkip) => set({ performanceSkip }),
}));

export {
    useStore
};
