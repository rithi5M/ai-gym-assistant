import { useState } from "react";
import Dashboard from "./components/Dashboard";
import WorkoutPage from "./components/WorkoutPage";
import DietPage from "./components/DietPage";
import HabitPage from "./components/HabitPage";
import ChatPage from "./components/ChatPage";

export default function App() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h1>AI Gym & Fitness Assistant</h1>

      <nav style={{ marginBottom: "16px" }}>
        <button onClick={() => setTab("dashboard")}>Dashboard</button>
        <button onClick={() => setTab("workout")}>Workout</button>
        <button onClick={() => setTab("diet")}>Diet</button>
        <button onClick={() => setTab("habit")}>Habit</button>
        <button onClick={() => setTab("chat")}>Chat</button>
      </nav>

      {tab === "dashboard" && <Dashboard />}
      {tab === "workout" && <WorkoutPage />}
      {tab === "diet" && <DietPage />}
      {tab === "habit" && <HabitPage />}
      {tab === "chat" && <ChatPage />}
    </div>
  );
}
