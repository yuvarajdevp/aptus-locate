import senderRequest from "@/services/Http";

export const handleBlogsApi = async () => {
  try {
    const apiUrl = `blogs?populate=*`;
    return await senderRequest("get", apiUrl);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { data: [] };
  }
};
