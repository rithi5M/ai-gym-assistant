// frontend/src/api.js

// 🔗 Your Render backend URL:
const API_BASE = "https://ai-gym-backend-1.onrender.com"; // <-- paste your exact URL here

// 🧠 Chat with gym buddy (calls backend /chat)
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

  return await res.json(); // { reply: "..." }
};

// The rest can be simple dummy functions, just so imports work:

export const getHabitSummary = async () => ({
  workoutsThisWeek: 3,
  completedHabits: 5,
  streakDays: 4,
});

export const getHabitPrediction = async () => ({
  predictionText: "You’re likely to stay consistent this week 💪",
  confidence: 0.82,
});

export const logHabit = async (habit) => ({
  ok: true,
  savedHabit: habit,
  message: "Habit logged successfully!",
});

export const uploadWorkoutImage = async () => ({
  ok: true,
  detectedExercise: "Squats",
  repsEstimate: 10,
  message: "Workout image processed successfully (demo mode).",
});

export const getDietPlan = async () => ({
  goal: "Muscle gain",
  calories: 2200,
  meals: [
    { name: "Breakfast", items: ["Oats", "Banana", "Nuts"] },
    { name: "Lunch", items: ["Rice", "Dal", "Veg curry"] },
    { name: "Snack", items: ["Fruits", "Buttermilk"] },
    { name: "Dinner", items: ["Chapati", "Paneer gravy"] },
  ],
  note: "Stay hydrated ✨",
});
