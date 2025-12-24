import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Tailwind + clsx merge helper
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ✅ Convert text to URL-friendly slug
export function slugify(str) {
  if (!str) return "";
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")         // spaces → dash
    .replace(/-+/g, "-")          // collapse multiple dashes
    .replace(/^-+|-+$/g, "");     // trim leading/trailing dashes
}

// ✅ Convert slug back to readable text (Title Case)
export function unslugify(str) {
  if (!str) return "";
  return str
    .toString()
    .replace(/-/g, " ")        // dashes → spaces
    .trim()                     // remove extra spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize each word
}

// ✅ Parse branch detail URL to extract components
// Example: /aptus-finance-home-loan-in-anna-nagar-chennai-ch001/overview
export function parseBranchSlug(slug) {
  if (!slug) return { storeCode: "", locality: "", city: "" };
  
  const brandPrefix = "aptus-finance-home-loan-in-";
  let remaining = slug;
  
  if (slug.startsWith(brandPrefix)) {
    remaining = slug.substring(brandPrefix.length);
  }
  
  const parts = remaining.split("-").filter(Boolean);
  
  if (parts.length === 0) {
    return { storeCode: "", locality: "", city: "" };
  }
  
  // Last part is store code, second-last is city, rest is locality
  const storeCode = parts[parts.length - 1];
  const city = parts.length > 1 ? parts[parts.length - 2] : "";
  const locality = parts.length > 2 ? parts.slice(0, -2).join("-") : "";
  
  return {
    storeCode,
    locality,
    city,
    localityDisplay: locality ? unslugify(locality) : "",
    cityDisplay: city ? unslugify(city) : ""
  };
}

// ✅ Build branch detail URL from components
// Example: buildBranchUrl("Anna Nagar", "Chennai", "CH001") 
// → "aptus-finance-home-loan-in-anna-nagar-chennai-ch001"
export function buildBranchUrl(locality, city, storeCode) {
  const parts = [];
  
  if (locality) parts.push(slugify(locality));
  if (city) parts.push(slugify(city));
  if (storeCode) parts.push(storeCode.toLowerCase());
  
  return `aptus-finance-home-loan-in-${parts.join("-")}`;
}

// ✅ Build location page URL from components
// Example: buildLocationUrl("Tamil Nadu", "Chennai", "Anna Nagar")
// → "/location/tamil-nadu/chennai/anna-nagar"
export function buildLocationUrl(state, city, locality) {
  const parts = ["/location"];
  
  if (state) parts.push(slugify(state));
  if (city) parts.push(slugify(city));
  if (locality) parts.push(slugify(locality));
  
  return parts.join("/");
}

// ✅ Format date to readable string
export function formatDate(date, format = "long") {
  if (!date) return "";
  
  const d = new Date(date);
  
  if (isNaN(d.getTime())) return "";
  
  const options = {
    short: { year: "numeric", month: "short", day: "numeric" },
    long: { year: "numeric", month: "long", day: "numeric" },
    full: { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  };
  
  return d.toLocaleDateString("en-US", options[format] || options.long);
}

// ✅ Truncate text with ellipsis
export function truncate(str, maxLength = 100, suffix = "...") {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  
  return str.substring(0, maxLength).trim() + suffix;
}

// ✅ Validate and clean phone number
export function formatPhoneNumber(phone) {
  if (!phone) return "";
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Indian phone number (10 digits)
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  // Already has country code (12 digits: 91 + 10)
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if format doesn't match
}

// ✅ Extract initials from name
export function getInitials(name) {
  if (!name) return "";
  
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join("");
}

// ✅ Generate random ID
export function generateId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ✅ Check if string is valid URL
export function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

// ✅ Deep clone object (simple version)
export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  return JSON.parse(JSON.stringify(obj));
}

// ✅ Remove duplicates from array by key
export function uniqueBy(arr, key) {
  if (!Array.isArray(arr)) return [];
  
  const seen = new Set();
  return arr.filter(item => {
    const value = typeof key === "function" ? key(item) : item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

// ✅ Group array items by key
export function groupBy(arr, key) {
  if (!Array.isArray(arr)) return {};
  
  return arr.reduce((groups, item) => {
    const value = typeof key === "function" ? key(item) : item[key];
    groups[value] = groups[value] || [];
    groups[value].push(item);
    return groups;
  }, {});
}

// ✅ Sort array by key
export function sortBy(arr, key, order = "asc") {
  if (!Array.isArray(arr)) return [];
  
  return [...arr].sort((a, b) => {
    const aVal = typeof key === "function" ? key(a) : a[key];
    const bVal = typeof key === "function" ? key(b) : b[key];
    
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}

// ✅ Debounce function
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ✅ Format number with commas (Indian format)
export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return "0";
  
  // Indian number system (lakhs, crores)
  const numStr = Math.abs(num).toString();
  const lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  
  const formatted = otherNumbers !== "" 
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;
  
  return num < 0 ? "-" + formatted : formatted;
}

// ✅ Format currency (INR)
export function formatCurrency(amount, showSymbol = true) {
  if (amount === null || amount === undefined || isNaN(amount)) return showSymbol ? "₹0" : "0";
  
  const formatted = formatNumber(amount);
  return showSymbol ? `₹${formatted}` : formatted;
}