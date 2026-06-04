import senderRequest from "@/services/Http";

export const SolutionAPi = async (branchType = null) => {
  try {
    let apiUrl = "solutions?populate=*";

    if (branchType) {
      apiUrl += `&filters[type][name][$eqi]=${encodeURIComponent(branchType)}`;
    }

    return await senderRequest("get", apiUrl);
  } catch (error) {
    console.error("SolutionAPi error:", error);
    return { data: [] };
  }
};
