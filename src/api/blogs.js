
// // src/api/layout.js
// import senderRequest from "@/services/Http";

// export const handleBlogsApi = async () => {
//   const apiUrl = `Blogs?populate=*`;
//   const response = await senderRequest("get", apiUrl);
//   console.log(response,"responselayout");
//   return response;
  
// };


// src/api/blogs.js
import senderRequest from "@/services/Http";

export const handleBlogsApi = async () => {
  try {
    const apiUrl = `Blogs?populate=*`;
    const response = await senderRequest("get", apiUrl);
    console.log(response, "blogs API response");
    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { data: [] };
  }
};

// Optional: Add function to get single blog by slug or ID
export const getBlogBySlug = async (slug) => {
  try {
    const apiUrl = `Blogs?filters[slug][$eq]=${slug}&populate=*`;
    const response = await senderRequest("get", apiUrl);
    return response?.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
};

// Optional: Add function to filter blogs by type
export const getBlogsByType = async (type) => {
  try {
    const apiUrl = `Blogs?filters[type][$eq]=${type}&populate=*`;
    const response = await senderRequest("get", apiUrl);
    return response;
  } catch (error) {
    console.error("Error fetching blogs by type:", error);
    return { data: [] };
  }
};