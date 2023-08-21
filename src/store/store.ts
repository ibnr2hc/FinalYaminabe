import create from 'zustand';

export type RoleType = {
    name: string;
    role: string;
    buttonCss: string;
    selected: boolean;
}

export type UserType = {
    id: number;
    name: string;
    roles: RoleType[];
};

type State = {
    users: UserType[];
    addUser: (user: UserType) => void;
    removeUser: (id: number) => void;
    toggleRoleSelected: (id: number, roleName: string, selected: boolean, buttonCss: string) => void;
    updateUserName: (id: number, name: string) => void;
    updateUser: (id: number, name: string) => void;
};

const useStore = create<State>((set) => ({
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
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
    removeUser: (id) => set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
    updateUserName: (id, name) => set((state) => ({
        users: state.users.map((user) => {
            if (user.id === id) {
                return { ...user, name };
            }
            return user;
        }
        )
    })),
    updateUser: (id, name) => set((state) => ({
        users: state.users.map((user) => {
            if (user.id === id) {
                return { ...user, name };
            }
            return user;
        }
        )
    }))
}));

export {
    useStore
};
