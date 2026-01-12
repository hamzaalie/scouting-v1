import {LoginDto} from "../core/data/interface/auth/login";
import {ResetPasswordDto} from "../core/data/interface/auth/resetPassword";
import {SendResetCodeDto} from "../core/data/interface/auth/sendResetCode";
import {verifyCodeDto} from "../core/data/interface/auth/VerifyCode";
import {tPaymentPack} from "../types/pack.type";
import {tTransaction} from "../types/transaction.type";
import {del, get, patch, post} from "./axios.setup.helper";
import {urlEndpoint} from "./url.helper";
import {authAPI} from "../services/api.service";

export const backendFunctions = {
    auth: {
        logIn: async (data: LoginDto, userAgent: string) => {
            // Use new central backend
            const response = await authAPI.login(data.email, data.password);
            // The tokens are already stored by authAPI.login
            // Return user data with access_token for legacy compatibility
            return {
                access_token: localStorage.getItem('access_token') || '',
                ...response.user
            };
        },
        register: async (data: any) => {
            // Use new central backend - use pwd field from form
            const response = await authAPI.register(data.email, data.pwd);
            return response;
        },
        verifyEmail: async (token: string) => {
            // Use new central backend
            return await authAPI.verifyEmail(token);
        },
        logOut: async () => {
            // Use new central backend
            await authAPI.logout();
        },
        forgotPassword: {
            sendResetCode: async (data: SendResetCodeDto) => {
                // Use new central backend
                return await authAPI.forgotPassword(data.email);
            },
            verifyCode: (data: verifyCodeDto) => post(urlEndpoint.usercode.verifyCode, data),
        },
        resetPassword: async (data: ResetPasswordDto) => {
            // Use new central backend
            return await authAPI.resetPassword(data.token || '', data.newPassword);
        },
    },

    packs: {
        getAllPacks: () => get(urlEndpoint.packs.allPacks),
        getOnePack: (id: string) => get(urlEndpoint.packs.onePack(id)),
    },

    transactions: {
        getAllTransactions: (token: string | null) =>
            get(urlEndpoint.transactions.allTransactions, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        getOneTransaction: (id: string) => get(urlEndpoint.transactions.oneTransaction(id)),
        createTransaction: (data: tTransaction) =>
            post(urlEndpoint.transactions.createTransaction, data),
        updateTransaction: (id: string, data: tTransaction) =>
            post(urlEndpoint.transactions.updateTransaction(id), data),
        deleteTransaction: (id: string) => del(urlEndpoint.transactions.deleteTransaction(id)),
    },
    abonnement: {
        getAllAbonnements: (token: string | null) =>
            get(urlEndpoint.abonnement.allAbonnements, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        getOneAbonnement: (id: string) => get(urlEndpoint.abonnement.oneAbonnement(id)),
        createAbonnement: (data: any) => post(urlEndpoint.abonnement.createAbonnement, data),
        updateAbonnement: (id: string, data: any) =>
            post(urlEndpoint.abonnement.updateAbonnement(id), data),
        deleteAbonnement: (id: string) => del(urlEndpoint.abonnement.deleteAbonnement(id)),
    },
    payment: {
        getAllPayments: (token: string | null) =>
            get(urlEndpoint.payment.allPayments, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        getOnePayment: (id: string) => get(urlEndpoint.payment.onePayment(id)),
        createPayment: (data: tPaymentPack | undefined): Promise<{paymentUrl: string}> =>
            post(urlEndpoint.payment.createPayment, data),
        updatePayment: (id: string, data: tPaymentPack) =>
            post(urlEndpoint.payment.updatePayment(id), data),
        deletePayment: (id: string) => del(urlEndpoint.payment.deletePayment(id)),
    },
    clients: {
        getAllClients: (token: string | null) =>
            get(urlEndpoint.users.allUsers, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        getOneClient: (id: string) => get(urlEndpoint.users.oneUser(id)),
        createClient: (data: any) => post(urlEndpoint.users.createUser, data),
        updateClient: (id: string, data: any, token: string | null) =>
            patch(urlEndpoint.users.updateUser(id), data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        deleteClient: (id: string) => del(urlEndpoint.users.deleteUser(id)),
    },
    claims: {
        getAllClaims: (token: string | null) =>
            get(urlEndpoint.claims.allClaims, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        getClaimsByClientId: (clientId: string, token: string | null) =>
            get(urlEndpoint.claims.allClaimsByClientId(clientId), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        getOneClaim: (id: string) => get(urlEndpoint.claims.oneClaim(id)),
        createClaim: (data: any, token: string | null) =>
            post(urlEndpoint.claims.createClaim, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        updateClaim: (id: string, data: any) => post(urlEndpoint.claims.updateClaim(id), data),
        deleteClaim: (id: string) => del(urlEndpoint.claims.deleteClaim(id)),
    },
};
