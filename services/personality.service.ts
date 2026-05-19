import api from "./api";

export const getQuestions = async () => {
  const response = await api.get("/personality/questions");

  return response.data;
};

export const submitAnswers = async (
  answers: {
    question: string;
    answer: string;
  }[],
) => {
  const response = await api.post("/personality/submit", {
    answers,
  });

  return response.data;
};
