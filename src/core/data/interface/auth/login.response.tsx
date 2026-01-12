export interface LoginResponseInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: null;
    createdAt: string;
    externalAuthProvider: string | null;
    passwordResetDate: string | null;
    updatedAt: string | null;
    fullName: string;
    access_token?: string;
}
