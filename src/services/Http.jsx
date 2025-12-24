'use server'

import axios from "axios";
import { REACT_APP_BASE_URL, API_TOKEN } from "../env/env";

// ✅ Build the request URL safely (no double slashes)
const apiUrlWithId = (apiurl, id) => {
    const base = REACT_APP_BASE_URL.replace(/\/$/, "");  // remove trailing slash
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
        console.log("✔️ API Response:", response.data);
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
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                break;
            case "post":
                response = await axios.post(url, body, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                break;
            case "put":
                response = await axios.put(url, body, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                break;
            case "delete":
                response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                break;
            case "patch":
                response = await axios.patch(url, body, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
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