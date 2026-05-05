import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { BaseRepository } from '../../../core/baseRepository';
import { User } from './models/User';

export class AuthRepository extends BaseRepository {
    private get auth() {
        return auth();
    }

    async login(email: string, password: string): Promise<User> {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email.trim(), password);
            return this.mapFirebaseUser(userCredential.user);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async signUp(email: string, password: string): Promise<User> {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email.trim(), password);
            return this.mapFirebaseUser(userCredential.user);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async loginWithName(name: string): Promise<User> {
        try {
            const userCredential = await this.auth.signInAnonymously();
            await userCredential.user.updateProfile({
                displayName: name,
            });
            return this.mapFirebaseUser(userCredential.user);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async logout(): Promise<void> {
        try {
            await this.auth.signOut();
        } catch (error) {
            return this.handleError(error);
        }
    }

    async sendPasswordResetEmail(email: string): Promise<void> {
        try {
            await this.auth.sendPasswordResetEmail(email.trim());
        } catch (error) {
            return this.handleError(error);
        }
    }

    getCurrentUser(): User | null {
        const user = this.auth.currentUser;
        return user ? this.mapFirebaseUser(user) : null;
    }

    onAuthStateChanged(callback: (user: User | null) => void) {
        return this.auth.onAuthStateChanged((user) => {
            callback(user ? this.mapFirebaseUser(user) : null);
        });
    }

    async updatePassword(newPassword: string): Promise<void> {
        try {
            const user = this.auth.currentUser;
            if (user) {
                await user.updatePassword(newPassword);
            } else {
                throw new Error('No user logged in');
            }
        } catch (error) {
            return this.handleError(error);
        }
    }


    private mapFirebaseUser(user: FirebaseAuthTypes.User): User {
        return {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        };
    }

    protected handleError(error: any): never {
        let message = error.message || 'An unexpected error occurred during authentication.';

        if (error.code) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = 'This email address is already in use by another account.';
                    break;
                case 'auth/invalid-email':
                    message = 'The email address is invalid.';
                    break;
                case 'auth/operation-not-allowed':
                    message = 'Authentication operation not allowed.';
                    break;
                case 'auth/weak-password':
                    message = 'The password is too weak. Please use a stronger password.';
                    break;
                case 'auth/user-disabled':
                    message = 'This user account has been disabled.';
                    break;
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                case 'auth/user-not-found':
                    message = 'Incorrect email or password. Please try again.';
                    break;
                case 'auth/network-request-failed':
                    message = 'Network error. Please check your internet connection.';
                    break;
                case 'auth/too-many-requests':
                    message = 'Too many unsuccessful attempts. Please try again later.';
                    break;
                default:
                    // Keep the original error message if it's a known Firebase error but not specifically handled
                    if (error.message) {
                        message = error.message;
                    }
                    break;
            }
        }

        const enhancedError = new Error(message);
        (enhancedError as any).code = error.code || 'unknown';

        return super.handleError(enhancedError);
    }
}

export const authRepository = new AuthRepository();
