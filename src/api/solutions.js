// src/api/solutions.js
import senderRequest from "@/services/Http";

export const SolutionAPi = async (branchType = null) => {
  try {
    // Always populate all relations (type, category, card)
    let apiUrl = "solutions?populate=*";
    
    // 🔥 CRITICAL: Filter by type.name (singular, not plural "types")
    if (branchType) {
      // The field name in the API is "type" (singular), not "types"
      apiUrl += `&filters[type][name][$eqi]=${encodeURIComponent(branchType)}`;
    }
    
    console.log("🔍 SolutionAPi URL:", apiUrl);
    console.log("🔍 SolutionAPi filtering by branchType:", branchType || "all");
    
    const response = await senderRequest("get", apiUrl);
    
    console.log("✅ SolutionAPi response:", {
      found: response?.data?.length || 0,
      branchType: branchType || "all",
      solutions: response?.data?.map(s => ({
        id: s.id,
        ref: s.ref,
        type: s.type?.name,
        category: s.category?.name,
        cardsCount: s.card?.length || 0
      }))
    });
    
    // Log first solution for debugging
    if (response?.data?.length > 0) {
      console.log("📦 First solution sample:", {
        id: response.data[0].id,
        ref: response.data[0].ref,
        type: response.data[0].type,
        category: response.data[0].category
      });
    }
    
    return response;
  } catch (error) {
    console.error("❌ SolutionAPi error:", error);
    return { data: [] };
  }
};

// Get all solutions without type filter
export const getAllSolutions = async () => {
  return SolutionAPi(null);
};