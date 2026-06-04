/**
 * Shared helpers for Strapi responses from senderRequest (Http.jsx).
 */

export function isApiError(response) {
    return Boolean(response?.error);
}

export function unwrapApiData(response, fallback = []) {
    if (isApiError(response)) return fallback;
    if (Array.isArray(response?.data)) return response.data;
    if (response?.data != null) return response.data;
    return fallback;
}

export function unwrapApiList(response) {
    const data = unwrapApiData(response, []);
    return Array.isArray(data) ? data : [];
}
