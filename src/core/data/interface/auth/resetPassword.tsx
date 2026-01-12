export interface ResetPasswordDto {
    code: string;
    newPassword: string;
    email: string;
}
