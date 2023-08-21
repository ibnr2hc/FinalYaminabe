import create from 'zustand';

export type RoleType = {
    name: string;
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
    updateUser: (id: number, name: string) => void;
};

const useStore = create<State>((set) => ({
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    removeUser: (id) => set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
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
