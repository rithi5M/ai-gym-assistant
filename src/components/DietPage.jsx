import { useState } from "react";
import { getDietPlan } from "../api";

export default function DietPage() {
  const [form, setForm] = useState({
    weight_kg: "",
    height_cm: "",
    age: "",
    goal: "weight loss",
    preference: "veg",
  });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.weight_kg || !form.height_cm || !form.age) return;
    setLoading(true);
    const data = await getDietPlan({
      ...form,
      weight_kg: parseFloat(form.weight_kg),
      height_cm: parseFloat(form.height_cm),
      age: parseInt(form.age),
    });
    setPlan(data);
    setLoading(false);
  };

  const inputStyle = {
    padding: "6px 10px",
    borderRadius: 4,
    border: "1px solid #444",
    background: "#111",
    color: "white",
  };

  const labelStyle = { fontSize: 13, color: "#bbb" };

  return (
    <div>
      <h2>Diet Planner</h2>

      {/* Form */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
          marginBottom: 16,
          marginTop: 8,
          maxWidth: 520,
        }}
      >
        <div>
          <div style={labelStyle}>Weight (kg)</div>
          <input
            name="weight_kg"
            type="number"
            value={form.weight_kg}
            onChange={update}
            style={inputStyle}
          />
        </div>
        <div>
          <div style={labelStyle}>Height (cm)</div>
          <input
            name="height_cm"
            type="number"
            value={form.height_cm}
            onChange={update}
            style={inputStyle}
          />
        </div>
        <div>
          <div style={labelStyle}>Age</div>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={update}
            style={inputStyle}
          />
        </div>
        <div>
          <div style={labelStyle}>Goal</div>
          <input
            name="goal"
            value={form.goal}
            onChange={update}
            style={inputStyle}
            placeholder="weight loss / gain / muscle"
          />
        </div>
        <div>
          <div style={labelStyle}>Preference</div>
          <select
            name="preference"
            value={form.preference}
            onChange={update}
            style={inputStyle}
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-vegetarian</option>
          </select>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        style={{
          padding: "6px 14px",
          borderRadius: 4,
          border: "none",
          background: loading ? "#444" : "white",
          color: loading ? "#aaa" : "#000",
          cursor: loading ? "default" : "pointer",
          fontWeight: 600,
          marginBottom: 18,
        }}
      >
        {loading ? "Calculating..." : "Generate Plan"}
      </button>

      {/* Output */}
      {plan && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.4fr)",
            gap: 18,
            maxWidth: 720,
          }}
        >
          <div
            style={{
              background: "#111",
              borderRadius: 10,
              padding: "12px 16px",
              border: "1px solid #333",
            }}
          >
            <h3>Summary</h3>
            <p>BMI: <strong>{plan.bmi}</strong></p>
            <p>Maintenance Calories: <strong>{plan.maintenance_calories}</strong> kcal</p>
            <p>Target Calories: <strong>{plan.target_calories}</strong> kcal</p>
          </div>

          <div
            style={{
              background: "#111",
              borderRadius: 10,
              padding: "12px 16px",
              border: "1px solid #333",
            }}
          >
            <h3>Sample Meal Plan</h3>
            <ul style={{ paddingLeft: 18, fontSize: 14 }}>
              <li>
                <strong>Breakfast:</strong> {plan.plan.breakfast}
              </li>
              <li>
                <strong>Lunch:</strong> {plan.plan.lunch}
              </li>
              <li>
                <strong>Dinner:</strong> {plan.plan.dinner}
              </li>
              <li>
                <strong>Snacks:</strong> {plan.plan.snacks}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
