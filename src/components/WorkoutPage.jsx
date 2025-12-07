import { useState } from "react";
import { uploadWorkoutImage } from "../api";

export default function WorkoutPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await uploadWorkoutImage(file);
      setResult(res);
    } catch (e) {
      setError("Could not analyze image. Check backend/server.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Workout Analyzer</h2>

      {/* Upload controls */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 320,
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0] || null)}
          style={{ fontSize: 14 }}
        />
        {file && (
          <span style={{ fontSize: 13, color: "#aaa" }}>
            Selected: {file.name}
          </span>
        )}
        <button
          onClick={analyze}
          disabled={loading}
          style={{
            padding: "6px 14px",
            borderRadius: 4,
            border: "none",
            background: loading ? "#444" : "white",
            color: loading ? "#aaa" : "#000",
            cursor: loading ? "default" : "pointer",
            fontWeight: 600,
            alignSelf: "flex-start",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Form"}
        </button>
        {error && (
          <span style={{ fontSize: 13, color: "#f97373" }}>{error}</span>
        )}
      </div>

      {/* Result */}
      {result && (
        <div
          style={{
            background: "#111",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid #333",
            maxWidth: 420,
          }}
        >
          <h3>Analysis Result</h3>
          {result.detected ? (
            <>
              <p>
                Exercise: <strong>{result.exercise}</strong>
              </p>
              <p>
                Estimated knee angle:{" "}
                <strong>{result.knee_angle}°</strong>
              </p>
              <p>
                Feedback:{" "}
                <span style={{ color: "#ddd" }}>{result.feedback}</span>
              </p>
            </>
          ) : (
            <p style={{ color: "#f97373" }}>
              No person detected. Try another image.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
