export type tPack = {
    id?: string;
    title: string;
    shortDesc?: string;
    description: string;
    currency: "XOF" | "EUR" | "USD" | "$";
    period: "mois" | "année";
    roleId: string | number;
    price: number;
    option: "local" | "international";
    target?: string;
    features?: string[];
    createdAt?: string;
    updatedAt?: string;
};

export type tPaymentPack = {
    amount: string;
    description?: string;
    paymentMode?: string
    clientId: string;
    period: "mois" | "année";
    packId: string;
    returnUrl?: string;
};

export type tAllPacks = tPack[];
