// Configuration de l'API et des Médias Malaika TV
const IS_PROD = import.meta.env.PROD;

// URL de base pour les appels API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (IS_PROD 
    ? 'https://malaika-tv.forka.org/api' 
    : '/api'); // Proxy Vite en développement ou via Vercel Rewrite

// URL de base pour les médias (images locales)
export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || (IS_PROD
    ? 'https://malaika-tv.forka.org' 
    : `http://${window.location.hostname}/malaika-tv-api`); // En dev

const ARRAY_KEYS = ['data', 'items', 'results', 'news', 'categories', 'videos', 'tags'];

export const getArrayPayload = <T = unknown>(payload: unknown): T[] => {
    if (Array.isArray(payload)) {
        return payload as T[];
    }

    if (payload && typeof payload === 'object') {
        const record = payload as Record<string, unknown>;

        for (const key of ARRAY_KEYS) {
            if (Array.isArray(record[key])) {
                return record[key] as T[];
            }
        }
    }

    return [];
};

export const getObjectPayload = <T = Record<string, unknown>>(payload: unknown): T | null => {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        return null;
    }

    const record = payload as Record<string, unknown>;
    if (record.data && typeof record.data === 'object' && !Array.isArray(record.data)) {
        return record.data as T;
    }

    return record as T;
};

export default API_BASE_URL;
