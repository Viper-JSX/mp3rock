import { AuthState, User } from "./types/data";

export const authInitialState: AuthState = {
    user: null,
    error: null,
    isLoading: false
};