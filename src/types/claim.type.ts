import {tPack} from "./pack.type";

export type tClaim = {
    id: string;
    title: string;
    description: string;
    type?: "claim" | "contact";
    status: tClaimStatus;
    clientId: string;
    createdAt: string;
    docs: Array<any>;
    treatedBy?: string | null;
    updatedAt?: string | null;
    pack?: tPack;
};

export type tClaimStatus = "traité" | "rejeté" | "envoyé" | "ouvert";

export const getClaimStatus = (status: tClaimStatus): {label: string; badge: string} => {
    switch (status) {
        case "traité":
            return {label: "Traité", badge: "bg-success-custom"}; // Green
        case "rejeté":
            return {label: "Rejeté", badge: "bg-danger-custom"}; // Red
        case "envoyé":
            return {label: "Envoyé", badge: "bg-warning-custom"}; // Yellow
        case "ouvert":
            return {label: "Ouvert", badge: "bg-primary-custom"}; // Blue
        default:
            return {label: "Statut inconnu", badge: "bg-secondary-custom"}; // Gray
    }
};

export type tAllClaims = Array<tClaim>;
