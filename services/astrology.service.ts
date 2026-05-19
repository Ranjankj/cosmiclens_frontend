import api from "./api";

export const askAstrologyQuestion = async (question: string) => {
  const response = await api.post("/astrology/ask", {
    question,
  });

  return response.data;
};

export const getChatHistory = async () => {
  const response = await api.get("/astrology/history");

  return response.data;
};

export const getTodayUsage = async () => {
  const response = await api.get("/usage/today");

  return response.data;
};
