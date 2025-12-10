// frontend/src/api.js

const API_BASE = "https://ai-gym-backend-1.onrender.com"; 
// 👆 if your Render URL is slightly different, paste it here exactly.

/**
 * Chat with gym buddy
 */
export const sendChatMessage = async (message) => {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error("Failed to send chat message");
  }

  const data = await res.json();
  return data; // { reply: "..." }
};

/**
 * Example habit prediction API (optional, for your Habit tab)
 * Change the endpoint if your backend uses a different route.
 */
export const getHabitPrediction = async () => {
  const res = await fetch(`${API_BASE}/habit-prediction`);

  if (!res.ok) {
    throw new Error("Failed to get habit prediction");
  }

  const data = await res.json();
  return data;
};
