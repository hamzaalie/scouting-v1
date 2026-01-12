import {tPack} from "./pack.type";

export type tAbonnement = {
    id?: string;
    clientId: string;
    packId: string;
    packValidityDate: string;
    state: "réabonnement" | "nouveau";
    status: "actifs" | "inactifs";
    isValidTill?: string | null;
    transactionId?: string | null;
    createdAt: string;
    updatedAt?: string | null;
    pack?: tPack;
};

export type tAllAbonnements = tAbonnement[];
