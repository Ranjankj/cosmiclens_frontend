import api from "./api";

interface ProfilePayload {
  fullName: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export const createProfile = async (payload: ProfilePayload) => {
  const response = await api.post("/profile", payload);

  return response.data;
};
