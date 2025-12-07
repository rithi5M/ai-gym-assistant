import { useEffect, useState } from "react";
import { getHabitSummary, getHabitPrediction } from "../api";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    (async () => {
      const s = await getHabitSummary();
      const p = await getHabitPrediction();
      setSummary(s);
      setPrediction(p);
    })();
  }, []);

  const card = {
    background: "#111",
    padding: "14px 18px",
    borderRadius: "10px",
    border: "1px solid #333",
    minWidth: "180px",
  };

  const label = { fontSize: 13, color: "#aaa" };
  const value = { fontSize: 26, fontWeight: "bold" };

  return (
    <div>
      <h2>Dashboard</h2>
      {!summary ? (
        <p style={{ color: "#aaa" }}>No data yet. Log your first workout in the Habit tab.</p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: 18,
              marginTop: 8,
            }}
          >
            <div style={card}>
              <div style={label}>Days Logged</div>
              <div style={value}>{summary.total_days_logged}</div>
            </div>
            <div style={card}>
              <div style={label}>Completion Rate</div>
              <div style={value}>{summary.completion_rate_percent}%</div>
            </div>
            <div style={card}>
              <div style={label}>Workouts Done</div>
              <div style={value}>{summary.workouts_done}</div>
            </div>
            <div style={card}>
              <div style={label}>Workouts Skipped</div>
              <div style={value}>{summary.workouts_skipped}</div>
            </div>
          </div>

          {prediction && (
            <div style={{ marginTop: 4 }}>
              <h3>Today&apos;s Coach Insight</h3>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  background:
                    prediction.risk === "high" ? "#331111" : "#112f11",
                  border:
                    prediction.risk === "high"
                      ? "1px solid #aa4444"
                      : "1px solid #3aa35a",
                  maxWidth: 420,
                  fontSize: 14,
                }}
              >
                <div style={{ marginBottom: 4, fontWeight: "bold" }}>
                  Risk:{" "}
                  <span style={{ textTransform: "uppercase" }}>
                    {prediction.risk}
                  </span>
                </div>
                <div>{prediction.coach_message}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
