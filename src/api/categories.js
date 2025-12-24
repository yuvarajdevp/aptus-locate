// src/api/categories.js
import senderRequest from "@/services/Http";

export const CategoriesApi = async (branchType = null) => {
  try {
    // Populate all relations
    let apiUrl = "categories?populate=*";
    
    // 🔥 Filter by type.name if branchType is provided
    if (branchType) {
      apiUrl += `&filters[type][name][$eqi]=${encodeURIComponent(branchType)}`;
    }
    
    console.log("CategoriesApi URL:", apiUrl);
    console.log("CategoriesApi filtering by branchType:", branchType || "all");
    
    const response = await senderRequest("get", apiUrl);
    
    console.log("CategoriesApi response:", {
      found: response?.data?.length || 0,
      branchType: branchType || "all",
      categories: response?.data?.map(c => ({
        id: c.id,
        name: c.name,
        type: c.type?.name
      }))
    });
    
    return response;
  } catch (error) {
    console.error("CategoriesApi error:", error);
    return { data: [] };
  }
};

// Get all categories without type filter
export const getAllCategories = async () => {
  return CategoriesApi(null);
};