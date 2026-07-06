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

export default API_BASE_URL;

