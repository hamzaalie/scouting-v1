import {LoginResponseInterface} from "../core/data/interface/auth/login.response";

const STORAGE_TOKEN = "bci_token";
const STORAGE_USER = "bci_user";
const STORAGE_USERCODE = "bci_user_code";

export const localStorageFunctions = {
    setToken: (token: string) => localStorage.setItem(STORAGE_TOKEN, token),
    getToken: () => localStorage.getItem(STORAGE_TOKEN),
    removeToken: () => localStorage.removeItem(STORAGE_TOKEN),

    setUser: (userDetails: LoginResponseInterface) =>
        localStorage.setItem(STORAGE_USER, JSON.stringify(userDetails)),
    getUser: (): LoginResponseInterface =>
        JSON.parse(localStorage.getItem(STORAGE_USER)?.toString() || "{}"),
    removeUser: () => localStorage.removeItem(STORAGE_USER),

    setUserCode: (userCodeDetails: LoginResponseInterface) =>
        localStorage.setItem(STORAGE_USERCODE, JSON.stringify(userCodeDetails)),
    getUserCode: () => JSON.parse(JSON.stringify(localStorage.getItem(STORAGE_USERCODE))),
    removeUserCode: () => localStorage.removeItem(STORAGE_USERCODE),

    // New methods for our payment service
    /**
     * Check if a user is currently logged in
     * @returns True if the user is logged in (has token and user data)
     */
    isUserLoggedIn: () => {
        return !!localStorage.getItem(STORAGE_TOKEN) && !!localStorage.getItem(STORAGE_USER);
    },

    /**
     * Clear all authentication data
     */
    clearAuth: () => {
        localStorage.removeItem(STORAGE_TOKEN);
        localStorage.removeItem(STORAGE_USER);
    },
};
