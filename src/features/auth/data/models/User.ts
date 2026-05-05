export interface User {
    id: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}
