// src/api/branches.js
import senderRequest from "@/services/Http";

// ✅ Get all states with their cities
export const StateFilterApi = async () => {
  try {
    const apiUrl = `states?populate[cities][fields][0]=city&fields[0]=state`;
    const response = await senderRequest("get", apiUrl);
    console.log("StateFilterApi response:", response);
    return response;
  } catch (error) {
    console.error("StateFilterApi error:", error);
    return { data: [] };
  }
};

// ✅ Get cities for a specific state
export const CitiesFilterApi = async (state) => {
  try {
    if (!state) {
      console.log("CitiesFilterApi: No state provided");
      return { data: [] };
    }
    
    // Use case-insensitive filter and get cities
    const apiUrl = `states?filters[state][$eqi]=${encodeURIComponent(state)}&populate[cities][fields][0]=city`;
    const response = await senderRequest("get", apiUrl);
    console.log("CitiesFilterApi response for state:", state, response);
    
    // Extract cities from the state object
    if (response?.data?.length > 0 && response.data[0].cities) {
      return { data: response.data[0].cities };
    }
    
    return { data: [] };
  } catch (error) {
    console.error("CitiesFilterApi error:", error);
    return { data: [] };
  }
};

// ✅ Get localities for a specific city (from branches)
export const LocalitiesFilterApi = async (city) => {
  try {
    if (!city) {
      console.log("LocalitiesFilterApi: No city provided");
      return { data: [] };
    }
    
    // Get all branches for the city and extract unique localities
    const apiUrl = `branches?filters[city][city][$eqi]=${encodeURIComponent(city)}&fields[0]=locality`;
    const response = await senderRequest("get", apiUrl);
    console.log("LocalitiesFilterApi response for city:", city, response);
    
    // Extract unique localities
    if (response?.data?.length > 0) {
      const uniqueLocalities = [...new Set(
        response.data
          .map(branch => branch.locality)
          .filter(locality => locality) // Remove null/undefined
      )];
      
      return { 
        data: uniqueLocalities.map(locality => ({ locality }))
      };
    }
    
    return { data: [] };
  } catch (error) {
    console.error("LocalitiesFilterApi error:", error);
    return { data: [] };
  }
};

// ✅ Get available branch types
export const BranchTypesApi = async () => {
  try {
    // Get all branches and extract unique types
    const apiUrl = `branches?fields[0]=type`;
    const response = await senderRequest("get", apiUrl);
    console.log("BranchTypesApi response:", response);
    
    if (response?.data?.length > 0) {
      const uniqueTypes = [...new Set(
        response.data
          .map(branch => branch.type)
          .filter(type => type) // Remove null/undefined
      )];
      
      return { 
        data: uniqueTypes.map(type => ({ type }))
      };
    }
    
    return { data: [] };
  } catch (error) {
    console.error("BranchTypesApi error:", error);
    return { data: [] };
  }
};

// ✅ Get branches with optional filters
export const BranchesApi = async (filters = {}) => {
  try {
    let apiUrl = "branches?populate=*";

    const filterParts = [];

    // 🔥 Case-insensitive search by storeCode
    if (filters.storeCode) {
      filterParts.push(`filters[storeCode][$containsi]=${encodeURIComponent(filters.storeCode)}`);
    }

    // 🔥 Case-insensitive search by type
    if (filters.type) {
      filterParts.push(`filters[type][$eqi]=${encodeURIComponent(filters.type)}`);
    }
    
    // 🔥 Filter by state
    if (filters.state) {
      filterParts.push(`filters[state][state][$eqi]=${encodeURIComponent(filters.state)}`);
    }

    // 🔥 Filter by city
    if (filters.city) {
      filterParts.push(`filters[city][city][$eqi]=${encodeURIComponent(filters.city)}`);
    }

    // 🔥 Filter by locality
    if (filters.locality) {
      filterParts.push(`filters[locality][$eqi]=${encodeURIComponent(filters.locality)}`);
    }

    if (filterParts.length > 0) {
      apiUrl += `&${filterParts.join("&")}`;
    }

    console.log("BranchesApi URL:", apiUrl);
    console.log("BranchesApi filters:", filters);
    
    const response = await senderRequest("get", apiUrl);
    
    console.log("BranchesApi response:", {
      found: response?.data?.length || 0,
      firstBranch: response?.data?.[0]?.storeCode,
      type: response?.data?.[0]?.type
    });
    
    return response;
  } catch (error) {
    console.error("BranchesApi error:", error);
    return { data: [] };
  }
};