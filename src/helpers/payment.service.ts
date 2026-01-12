import {tPack} from "../types/pack.type";
import {localStorageFunctions} from "../helpers/localStorage.helper";
import {toast} from "react-toastify";
import {all_routes} from "../feature-module/router/all_routes";

// Keys for storing data in localStorage
const SELECTED_PACK_KEY = "selectedPack";
const REDIRECT_AFTER_AUTH_KEY = "redirectAfterAuth";

export const paymentService = {
    /**
     * Store the selected pack and handle user authentication state
     * @param pack The selected pack
     * @returns The URL to redirect to
     */
    initiatePaymentProcess: (pack: tPack): string => {
        // Store the selected pack in localStorage
        localStorage.setItem(SELECTED_PACK_KEY, JSON.stringify(pack));

        if (localStorageFunctions.isUserLoggedIn()) {
            // User is logged in, redirect directly to payment
            return all_routes.userBookings;
        } else {
            // User is not logged in, set a flag to redirect after login
            localStorage.setItem(REDIRECT_AFTER_AUTH_KEY, "true");

            // Show toast to inform user
            toast.info("Veuillez vous connecter pour continuer votre achat", {
                toastId: "defaultToast",
                theme: "colored",
            });

            // Redirect to login page
            return all_routes.login;
        }
    },

    /**
     * Get the selected pack from localStorage
     * @returns The selected pack or null if not found
     */
    getSelectedPack: (): tPack | null => {
        const packData = localStorage.getItem(SELECTED_PACK_KEY);
        if (!packData) return null;

        try {
            return JSON.parse(packData) as tPack;
        } catch (e) {
            console.error("Error parsing selected pack:", e);
            return null;
        }
    },

    /**
     * Clear the selected pack from localStorage
     */
    clearSelectedPack: (): void => {
        localStorage.removeItem(SELECTED_PACK_KEY);
    },

    /**
     * Check if we should redirect after authentication
     * @returns True if redirect is needed
     */
    shouldRedirectAfterAuth: (): boolean => {
        return localStorage.getItem(REDIRECT_AFTER_AUTH_KEY) === "true";
    },

    /**
     * Clear the redirect flag
     */
    clearRedirectFlag: (): void => {
        localStorage.removeItem(REDIRECT_AFTER_AUTH_KEY);
    },
};
