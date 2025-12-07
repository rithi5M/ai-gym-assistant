import axios from "axios";

const API = "http://127.0.0.1:8000";

export const uploadWorkoutImage = async (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return (await axios.post(`${API}/workout/analyze`, fd)).data;
};

export const getDietPlan = async (body) =>
  (await axios.post(`${API}/diet/plan`, body)).data;

export const logHabit = async (data) =>
  (await axios.post(`${API}/habit/log`, data)).data;

export const getHabitSummary = async () =>
  (await axios.get(`${API}/habit/summary`)).data;

export const getHabitPrediction = async () =>
  (await axios.get(`${API}/habit/predict`)).data;

export const sendChatMessage = async (msg) =>
  (await axios.post(`${API}/chat`, { message: msg })).data;
