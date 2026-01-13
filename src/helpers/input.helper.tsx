/* eslint-disable */
export const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const cleanData = (obj: any): Object => {
    Object.keys(obj).forEach(
        (key) => (obj[key] === undefined || obj[key] === null || obj[key] === "") && delete obj[key]
    );
    return obj;
};

export const formatPrice = (
    locales: Intl.LocalesArgument,
    amount: number,
    currency: string
): string => {
    return Intl.NumberFormat(locales, {
        currency: currency,
    }).format(amount);
};

export const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

/**
 * Format a date string to a readable format
 * @param dateString Date string to format
 * @param locale Locale to use for formatting (defaults to French)
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string = "fr-FR"): string {
    try {
        const date = new Date(dateString);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return locale === "en-US" ? "Invalid date" : "Date invalide";
        }

        // Format the date using Intl formatter
        return new Intl.DateTimeFormat(locale, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Date invalide";
    }
}

/**
 * Get relative time (e.g. "il y a 2 jours")
 * @param dateString Date string to get relative time for
 * @param locale Locale to use for formatting (defaults to French)
 * @returns Relative time string
 */
export function getRelativeTime(dateString: string, locale: string = "fr-FR"): string {
    try {
        const date = new Date(dateString);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return "";
        }

        // Use Intl.RelativeTimeFormat to format relative time
        const rtf = new Intl.RelativeTimeFormat(locale, {numeric: "auto"});
        const now = new Date();
        const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

        // Convert to appropriate unit
        if (Math.abs(diffInSeconds) < 60) {
            return rtf.format(diffInSeconds, "second");
        } else if (Math.abs(diffInSeconds) < 3600) {
            return rtf.format(Math.floor(diffInSeconds / 60), "minute");
        } else if (Math.abs(diffInSeconds) < 86400) {
            return rtf.format(Math.floor(diffInSeconds / 3600), "hour");
        } else if (Math.abs(diffInSeconds) < 2592000) {
            return rtf.format(Math.floor(diffInSeconds / 86400), "day");
        } else if (Math.abs(diffInSeconds) < 31536000) {
            return rtf.format(Math.floor(diffInSeconds / 2592000), "month");
        } else {
            return rtf.format(Math.floor(diffInSeconds / 31536000), "year");
        }
    } catch (error) {
        console.error("Error calculating relative time:", error);
        return "";
    }
}

/**
 * Format a date as a time ago string (e.g. "2h ago")
 * @param dateString Date string to format
 * @returns Time ago string
 */
export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Array of time intervals in seconds and their corresponding labels
    const intervals = [
        {seconds: 31536000, label: "an"},
        {seconds: 2592000, label: "mois"},
        {seconds: 86400, label: "j"},
        {seconds: 3600, label: "h"},
        {seconds: 60, label: "min"},
        {seconds: 1, label: "s"},
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 0) {
            return `${count}${interval.label}`;
        }
    }

    return "à l'instant";
}
