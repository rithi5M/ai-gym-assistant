import { useEffect, useState } from "react";
import { logHabit, getHabitSummary, getHabitPrediction } from "../api";

export default function HabitPage() {
  const [did, setDid] = useState(true);
  const [mood, setMood] = useState("okay");
  const [summary, setSummary] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    const s = await getHabitSummary();
    const p = await getHabitPrediction();
    setSummary(s);
    setPrediction(p);
  };

  useEffect(() => {
    refresh();
  }, []);

  const submit = async () => {
    setLoading(true);
    await logHabit({ did_workout: did, mood });
    await refresh();
    setLoading(false);
  };

  const cardStyle = {
    background: "#111",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #333",
    minWidth: "150px",
  };

  const labelStyle = { fontSize: "13px", color: "#aaa" };
  const valueStyle = { fontSize: "20px", fontWeight: "bold" };

  return (
    <div>
      <h2>Habit Tracker</h2>

      {/* Controls */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <select
          value={did ? "yes" : "no"}
          onChange={(e) => setDid(e.target.value === "yes")}
          style={{ padding: "6px 10px", borderRadius: "4px" }}
        >
          <option value="yes">Did workout</option>
          <option value="no">Skipped workout</option>
        </select>

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: "4px" }}
        >
          <option value="happy">happy</option>
          <option value="tired">tired</option>
          <option value="lazy">lazy</option>
          <option value="sad">sad</option>
          <option value="okay">okay</option>
        </select>

        <button
          onClick={submit}
          disabled={loading}
          style={{
            padding: "6px 14px",
            borderRadius: "4px",
            border: "none",
            background: loading ? "#444" : "white",
            color: loading ? "#aaa" : "black",
            cursor: loading ? "default" : "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Saving..." : "Save Today"}
        </button>
      </div>

      {/* Summary cards */}
      {summary && (
        <>
          <h3>Summary</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div style={cardStyle}>
              <div style={labelStyle}>Days Logged</div>
              <div style={valueStyle}>{summary.total_days_logged}</div>
            </div>
            <div style={cardStyle}>
              <div style={labelStyle}>Workouts Done</div>
              <div style={valueStyle}>{summary.workouts_done}</div>
            </div>
            <div style={cardStyle}>
              <div style={labelStyle}>Workouts Skipped</div>
              <div style={valueStyle}>{summary.workouts_skipped}</div>
            </div>
            <div style={cardStyle}>
              <div style={labelStyle}>Completion Rate</div>
              <div style={valueStyle}>{summary.completion_rate_percent}%</div>
            </div>
          </div>

          {/* Recent logs */}
          <h3>Recent Logs</h3>
          {summary.logs.length === 0 ? (
            <p style={{ color: "#aaa" }}>No logs yet. Start tracking today!</p>
          ) : (
            <ul style={{ listStyle: "none", paddingLeft: 0, marginBottom: 16 }}>
              {summary.logs
                .slice()
                .reverse()
                .map((log, i) => (
                  <li
                    key={i}
                    style={{
                      padding: "8px 10px",
                      marginBottom: "6px",
                      background: "#111",
                      borderRadius: "6px",
                      border: "1px solid #222",
                      fontSize: "14px",
                    }}
                  >
                    <strong>{log.date}</strong> –{" "}
                    {log.did_workout ? "✅ Worked out" : "❌ Skipped"},{" "}
                    <span style={{ color: "#ccc" }}>mood: {log.mood}</span>
                  </li>
                ))}
            </ul>
          )}
        </>
      )}

      {/* Prediction / Coach message */}
      {prediction && (
        <div style={{ marginTop: "8px" }}>
          <h3>Coach Insight</h3>
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              background:
                prediction.risk === "high" ? "#331111" : "#112f11",
              border:
                prediction.risk === "high" ? "1px solid #aa4444" : "1px solid #3aa35a",
              color: "white",
              maxWidth: "400px",
              fontSize: "14px",
            }}
          >
            <div style={{ marginBottom: "4px", fontWeight: "bold" }}>
              Risk:{" "}
              <span style={{ textTransform: "uppercase" }}>
                {prediction.risk}
              </span>
            </div>
            <div>{prediction.coach_message}</div>
          </div>
        </div>
      )}
    </div>
  );
}
