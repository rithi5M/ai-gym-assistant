// frontend/src/api.js

// ⬇️ your Render backend URL
const API_BASE = "https://ai-gym-backend-1.onrender.com";

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
 * Example habit prediction API (optional)
 * You can remove this if not used.
 */
export const getHabitPrediction = async () => {
  const res = await fetch(`${API_BASE}/habit-prediction`);

  if (!res.ok) {
    throw new Error("Failed to get habit prediction");
  }

  const data = await res.json();
  return data;
};
