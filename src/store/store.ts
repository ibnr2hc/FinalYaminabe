import create from 'zustand';

type RoleType = {
    mt: boolean;
    st: boolean;
    h1: boolean;
    h2: boolean;
    d1: boolean;
    d2: boolean;
    d3: boolean;
    d4: boolean;
}

export type UserType = {
    id: number;
    name: string;
    role: RoleType;
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
