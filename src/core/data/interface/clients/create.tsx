export interface CreateClientDto {
    firstName: string;
    lastName: string;
    email: string;
    pwd: string;
    picture?: string | null;
    externalAuthProvider?: string | null;
    passwordResetDate?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
}
