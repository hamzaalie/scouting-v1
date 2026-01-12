export type tTransaction = {
    id?: string;
    ref: string;
    amount: number;
    paymentMode: tPaymentMode;
    clientId: string;
    status: tPaymentStatus;
    paymentToken?: string | null;
    paymentUrl?: string | null;
    createdAt: string;
};

export type tPaymentMode =
    | "MTN Money"
    | "MOMO"
    | "VISA"
    | "VISAM"
    | "Orange Money"
    | "OM"
    | "ALL"
    | "Moov Money"
    | "FLOOZ"
    | "Wave"
    | "WAVECI"
    | "Mastercard";

export type tPaymentStatus =
    | "succès"
    | "échec"
    | "ACCEPTED"
    | "Accepted"
    | "INITIALIZED"
    | "Initialized";

export const successStatus: Array<tPaymentStatus> = [
    "succès",
    "ACCEPTED",
    "Accepted",
    "INITIALIZED",
    "Initialized",
];

export const failedStatus: Array<tPaymentStatus> = ["échec"];

interface PaymentStatusStyles {
    label: string;
    color: string;
    bg: string;
    icon: string;
}

/**
 * Get styling properties for a payment status
 * @param status Payment status string
 * @returns Object with label, color, bg (background color), and icon name
 */
export function getPaymentStatus(status: tPaymentStatus): PaymentStatusStyles {
    switch (status) {
        case "succès":
        case "ACCEPTED":
        case "Accepted":
            return {
                label: "Réussi",
                color: "text-success",
                bg: "bg-success-custom",
                icon: "check-circle",
            };

        case "échec":
            return {
                label: "Échoué",
                color: "text-danger",
                bg: "bg-danger-custom",
                icon: "x-circle",
            };

        case "INITIALIZED":
        case "Initialized":
            return {
                label: "En cours",
                color: "text-warning",
                bg: "bg-warning-custom",
                icon: "clock",
            };

        default:
            return {
                label: "Inconnu",
                color: "text-secondary",
                bg: "bg-secondary-custom",
                icon: "help-circle",
            };
    }
}

// Define payment status types
export interface tPaymentStatusDetail {
    status: string;
    reason: string;
}

export interface tPaymentStatusMapping {
    [key: string]: tPaymentStatusDetail;
}

export const paymentStatusMap: tPaymentStatusMapping = {
    SUCCES: {status: "SUCCES", reason: "La transaction est un succès"},
    CREATED: {status: "CREATED", reason: "Transaction initialisée"},
    PAYMENT_FAILED: {status: "PAYMENT_FAILED", reason: "Le paiement a échoué"},
    INSUFFICIENT_BALANCE: {
        status: "INSUFFICIENT_BALANCE",
        reason: "Le solde du mobileMoney est inférieur au montant à payer",
    },
    OTP_CODE_ERROR: {status: "OTP_CODE_ERROR", reason: "Le code OTP saisi est incorrect"},
    MINIMUM_REQUIRED_FIELDS: {
        status: "MINIMUM_REQUIRED_FIELDS",
        reason: "Certains champs requis sont manquants",
    },
    INCORRECT_SETTINGS: {
        status: "INCORRECT_SETTINGS",
        reason: "Échec de paiement Orange Money. Causes possibles: code OTP incorrect, solde insuffisant, ou requête dupliquée",
    },
    AUTH_NOT_FOUND: {status: "AUTH_NOT_FOUND", reason: "Apikey introuvable"},
    WAITING_CUSTOMER_TO_VALIDATE: {
        status: "WAITING_CUSTOMER_TO_VALIDATE",
        reason: "Paiement en attente de confirmation",
    },
    ERROR_OCCURRED: {
        status: "ERROR_OCCURRED",
        reason: "Une erreur est survenue pendant le traitement de la requête",
    },
    ABONNEMENT_OR_TRANSACTIONS_EXPIRED: {
        status: "ABONNEMENT_OR_TRANSACTIONS_EXPIRED",
        reason: "Le service a expiré",
    },
    TRANSACTION_CANCEL: {status: "TRANSACTION_CANCEL", reason: "Transaction échouée"},
    WAITING_CUSTOMER_PAYMENT: {
        status: "WAITING_CUSTOMER_PAYMENT",
        reason: "Paiement en attente de confirmation",
    },
    WAITING_CUSTOMER_OTP_CODE: {
        status: "WAITING_CUSTOMER_OTP_CODE",
        reason: "Paiement en attente de confirmation",
    },
};

/**
 * Map CinetPay status codes to readable status information
 * @param statusCode CinetPay status code
 * @returns PaymentStatusStyles object with styling information
 */
export function getCinetPayStatusInfo(statusCode: tPaymentStatusDetail): PaymentStatusStyles {
    // Success cases
    if (statusCode.status === "SUCCES") {
        return {
            label: "Réussi",
            color: "text-success",
            bg: "bg-success-custom",
            icon: "check-circle",
        };
    }

    // Pending cases
    if (
        [
            "CREATED",
            "WAITING_CUSTOMER_TO_VALIDATE",
            "WAITING_CUSTOMER_PAYMENT",
            "WAITING_CUSTOMER_OTP_CODE",
        ].includes(statusCode.status)
    ) {
        return {
            label: "En attente",
            color: "text-warning",
            bg: "bg-warning-custom",
            icon: "clock",
        };
    }

    // Failed cases - all other codes
    return {
        label: "Échoué",
        color: "text-danger",
        bg: "bg-danger-custom",
        icon: "x-circle",
    };
}

/**
 * Get the appropriate badge styling for payment status
 * @param status Payment status
 * @returns CSS class string for badge styling
 */
export function getPaymentStatusBadgeClass(status: tPaymentStatus): string {
    const statusStyles = getPaymentStatus(status);
    return `badge ${statusStyles.bg} text-white`;
}

/**
 * Check if a payment was successful
 * @param statusCode CinetPay status code
 * @returns boolean indicating success
 */
export function isPaymentSuccessful(statusCode: tPaymentStatusDetail): boolean {
    return statusCode.status === "SUCCESS";
}

/**
 * Check if a payment is still pending
 * @param statusCode CinetPay status code
 * @returns boolean indicating pending status
 */
export function isPaymentPending(statusCode: tPaymentStatusDetail): boolean {
    return [
        "CREATED",
        "WAITING_CUSTOMER_TO_VALIDATE",
        "WAITING_CUSTOMER_PAYMENT",
        "WAITING_CUSTOMER_OTP_CODE",
    ].includes(statusCode.status);
}

export const getPaymentMode = (
    mode: tPaymentMode
): {label: string; color: string; badge: string} => {
    switch (mode) {
        case "Moov Money":
        case "FLOOZ":
            return {label: "Moov Money", color: "#FFCC00", badge: "bg-moov"};
        case "ALL":
            return {label: "CINETPAY", color: "#FFA500", badge: "bg-cinetpay"};
        case "MTN Money":
        case "MOMO":
            return {label: "MTN Money", color: "#FF0000", badge: "bg-mtn"};
        case "Orange Money":
        case "OM":
            return {label: "Orange Money", color: "#FFA500", badge: "bg-orange"};
        case "Wave":
        case "WAVECI":
            return {label: "Wave", color: "#00BFFF", badge: "bg-wave"};
        case "VISA":
        case "VISAM":
            return {label: "VISA", color: "#0033CC", badge: "bg-visa"};
        case "Mastercard":
            return {label: "Mastercard", color: "#EB001B", badge: "bg-mastercard"};
        default:
            return {label: "Unknown payment mode", color: "#808080", badge: "bg-default"};
    }
};

export type tAllTransactions = tTransaction[];
