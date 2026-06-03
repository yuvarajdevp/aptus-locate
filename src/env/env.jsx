const REACT_APP_BASE_URL =
  process.env.REACT_APP_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "";
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || "";
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "";


export { REACT_APP_BASE_URL, API_TOKEN, STRAPI_URL };
