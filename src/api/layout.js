// src/api/layout.js
import senderRequest from "@/services/Http";

export const handleLayoutApi = async () => {
  const apiUrl =
    "layout?populate[tags]=true&populate[topbanner][populate][img]=true&populate[topbanner][populate][mobImg]=true";
  const response = await senderRequest("get", apiUrl);
  return response;
};

