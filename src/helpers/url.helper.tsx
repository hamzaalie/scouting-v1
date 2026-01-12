import {API_URL} from "./axios.setup.helper";

const AUTH_ENDPOINT = "/auth";
const USER_ENDPOINT = "/clients";
const PACK_ENDPOINT = "/pack";
const TRANSACTIONS_ENDPOINT = "/transactions";
const ABONNEMENT_ENDPOINT = "/abonnement";
const PAYMENT_ENDPOINT = "/payment";
const ClAIM_ENDPOINT = "/claims";
const USERCODE_ENDPOINT = "usercode";
const facebook_url: any = API_URL + AUTH_ENDPOINT.replace("/", "") + "/facebook";
const google_url: any = API_URL + AUTH_ENDPOINT.replace("/", "") + "/google";

export const urlEndpoint = {
    auth: {
        LOGIN: AUTH_ENDPOINT + "/login",
        FACEBOOK: facebook_url,
        GOOGLE: google_url,
        LOGOUT: AUTH_ENDPOINT + "/logout",
        REGISTER: USER_ENDPOINT,
        RESET_PASSWORD: AUTH_ENDPOINT + "/resetPassword",
    },
    users: {
        allUsers: USER_ENDPOINT,
        oneUser: (id: string) => `${USER_ENDPOINT}/${id}`,
        createUser: USER_ENDPOINT,
        updateUser: (id: string) => `${USER_ENDPOINT}/${id}`,
        deleteUser: (id: string) => `${USER_ENDPOINT}/${id}`,
    },
    usercode: {
        sendResetCode: USERCODE_ENDPOINT + "/sendResetCode",
        verifyCode: USERCODE_ENDPOINT + "/verify",
    },
    packs: {
        allPacks: PACK_ENDPOINT,
        onePack: (id: string) => `${PACK_ENDPOINT}/${id}`,
    },
    transactions: {
        allTransactions: TRANSACTIONS_ENDPOINT,
        oneTransaction: (id: string) => `${TRANSACTIONS_ENDPOINT}/${id}`,
        createTransaction: TRANSACTIONS_ENDPOINT,
        updateTransaction: (id: string) => `${TRANSACTIONS_ENDPOINT}/${id}`,
        deleteTransaction: (id: string) => `${TRANSACTIONS_ENDPOINT}/${id}`,
    },
    abonnement: {
        allAbonnements: ABONNEMENT_ENDPOINT,
        oneAbonnement: (id: string) => `${ABONNEMENT_ENDPOINT}/${id}`,
        createAbonnement: ABONNEMENT_ENDPOINT,
        updateAbonnement: (id: string) => `${ABONNEMENT_ENDPOINT}/${id}`,
        deleteAbonnement: (id: string) => `${ABONNEMENT_ENDPOINT}/${id}`,
    },
    payment: {
        allPayments: PAYMENT_ENDPOINT,
        onePayment: (id: string) => `${PAYMENT_ENDPOINT}/${id}`,
        createPayment:  PAYMENT_ENDPOINT,
        updatePayment: (id: string) => `${PAYMENT_ENDPOINT}/${id}`,
        deletePayment: (id: string) => `${PAYMENT_ENDPOINT}/${id}`,
    },
    claims: {
        allClaims: ClAIM_ENDPOINT,
        allClaimsByClientId: (clientId: string) => `${ClAIM_ENDPOINT}/client/${clientId}/all`,
        oneClaim: (id: string) => `${ClAIM_ENDPOINT}/${id}`,
        createClaim: ClAIM_ENDPOINT,
        updateClaim: (id: string) => `${ClAIM_ENDPOINT}/${id}`,
        deleteClaim: (id: string) => `${ClAIM_ENDPOINT}/${id}`,
    },
};
