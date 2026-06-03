'use server'

import axios from "axios";
import { REACT_APP_BASE_URL, API_TOKEN } from "../env/env";

const normalizeBaseUrl = (rawBaseUrl = "") => {
    const trimmed = rawBaseUrl.trim().replace(/\/$/, "");
    if (!trimmed) return "";
    return /\/api$/i.test(trimmed) ? trimmed : `${trimmed}/api`;
};

const createHeaders = (token) => {
    const headers = {
        "Content-Type": "application/json",
    };

    // Add auth header only when token is present.
    if (token?.trim()) {
        headers.Authorization = `Bearer ${token.trim()}`;
    }

    return headers;
};

// ✅ Build the request URL safely (no double slashes)
const apiUrlWithId = (apiurl, id) => {
    const base = normalizeBaseUrl(REACT_APP_BASE_URL);
    const endpoint = apiurl.replace(/^\//, "");          // remove leading slash
    const finalUrl = id?.length
        ? `${base}/${endpoint}/${id}`
        : `${base}/${endpoint}`;

    // console.log("URL Builder:", { id, apiurl, finalUrl });
    return finalUrl;
};

// ✅ Handle API success
const handleResponse = (response) => {
    if (response?.status === 200) {
        if (process.env.NODE_ENV === "development") {
            console.log("✔️ API Response:", JSON.stringify(response.data, null, 2));
        }
        return response.data;
    }
    console.warn("⚠️ Unexpected API status:", response?.status);
    return [];
};

// ✅ Handle API errors
const handleError = (error) => {
    // 💥 Server responded but with an error
    if (error?.response) {
        if (process.env.NODE_ENV === "development") {
            console.log("❌ Response Error:", JSON.stringify(error.response?.data ?? {}, null, 2));
        }

        return {
            error: true,
            ...(error.response?.data ?? {}),
            message: error.response?.data?.message ?? "Request failed"
        };
    }

    // 🌐 Server not reached
    if (error?.request) {
        if (process.env.NODE_ENV === "development") {
            console.log("❌ Request Error: No response received from server");
        }

        return {
            error: true,
            message: "No response received from server"
        };
    }

    // 🧨 Unexpected client or runtime error
    if (process.env.NODE_ENV === "development") {
        console.log("❌ Unexpected Error:", error?.message);
    }

    return {
        error: true,
        message: error?.message || "Unexpected request error"
    };
};

// ✅ Request sender
const senderRequest = async (
    method,
    apiUrl,
    id = "",
    token = API_TOKEN,
    body = {}
) => {
    const url = apiUrlWithId(apiUrl, id);
    // console.log("🔗 API Request:", method.toUpperCase(), url, body);

    try {
        let response;

        switch (method.toLowerCase()) {
            case "get":
                response = await axios.get(url, {
                    headers: createHeaders(token),
                });
                break;
            case "post":
                response = await axios.post(url, body, {
                    headers: createHeaders(token),
                });
                break;
            case "put":
                response = await axios.put(url, body, {
                    headers: createHeaders(token),
                });
                break;
            case "delete":
                response = await axios.delete(url, {
                    headers: createHeaders(token),
                });
                break;
            case "patch":
                response = await axios.patch(url, body, {
                    headers: createHeaders(token),
                });
                break;
            default:
                throw new Error("Method not allowed");
        }

        return handleResponse(response);
    } catch (error) {
        return handleError(error); // ⚠️ FIXED: Added return statement
    }
};

export default senderRequest;