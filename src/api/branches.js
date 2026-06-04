import senderRequest from "@/services/Http";

export const StateFilterApi = async () => {
  try {
    const apiUrl = `states?populate[cities][fields][0]=city&fields[0]=state`;
    return await senderRequest("get", apiUrl);
  } catch (error) {
    console.error("StateFilterApi error:", error);
    return { data: [] };
  }
};

export const CitiesFilterApi = async (state) => {
  try {
    if (!state) return { data: [] };

    const apiUrl = `states?filters[state][$eqi]=${encodeURIComponent(state)}&populate[cities][fields][0]=city`;
    const response = await senderRequest("get", apiUrl);

    if (response?.data?.length > 0 && response.data[0].cities) {
      return { data: response.data[0].cities };
    }

    return { data: [] };
  } catch (error) {
    console.error("CitiesFilterApi error:", error);
    return { data: [] };
  }
};

export const BranchesApi = async (filters = {}) => {
  try {
    let apiUrl = "branches?populate=*";
    const filterParts = [];

    if (filters.storeCode) {
      filterParts.push(
        `filters[storeCode][$containsi]=${encodeURIComponent(filters.storeCode)}`
      );
    }
    if (filters.type) {
      filterParts.push(`filters[type][$eqi]=${encodeURIComponent(filters.type)}`);
    }
    if (filters.state) {
      filterParts.push(
        `filters[state][state][$eqi]=${encodeURIComponent(filters.state)}`
      );
    }
    if (filters.city) {
      filterParts.push(
        `filters[city][city][$eqi]=${encodeURIComponent(filters.city)}`
      );
    }
    if (filters.locality) {
      filterParts.push(
        `filters[locality][$eqi]=${encodeURIComponent(filters.locality)}`
      );
    }

    if (filterParts.length > 0) {
      apiUrl += `&${filterParts.join("&")}`;
    }

    return await senderRequest("get", apiUrl);
  } catch (error) {
    console.error("BranchesApi error:", error);
    return { data: [] };
  }
};
