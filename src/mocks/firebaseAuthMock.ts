const mockUser = {
    uid: '12345',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: null,
    updateProfile: async () => { },
    updatePassword: async () => { }
};

const auth = () => ({
    signInWithEmailAndPassword: async () => ({ user: mockUser }),
    createUserWithEmailAndPassword: async () => ({ user: mockUser }),
    signInAnonymously: async () => ({ user: mockUser }),
    signOut: async () => { },
    sendPasswordResetEmail: async () => { },
    currentUser: mockUser,
    onAuthStateChanged: (cb: any) => {
        cb(mockUser);
        return () => { };
    }
});

export declare namespace FirebaseAuthTypes {
    export interface User {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
        updateProfile: any;
        updatePassword: any;
    }
}

export default auth;
