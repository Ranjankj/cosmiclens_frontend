import api from "./api";

export const getMyProfile = async () => {
  const response = await api.get("/home/me");

  return response.data;
};
