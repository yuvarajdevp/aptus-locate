// src/api/layout.js
import senderRequest from "@/services/Http";

export const handleLayoutApi = async () => {
  const apiUrl = `layout?populate=*`;
  const response = await senderRequest("get", apiUrl);
  console.log(response,"responselayout");
  return response;
  
};

