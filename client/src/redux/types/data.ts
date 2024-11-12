export type User = {
    username: string,
    email: string
};

export type PlayList = {

};

export type AuthState = {
    user: User | null;
    isLoading: boolean;
    error: string | null
};