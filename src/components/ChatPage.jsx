import { useState } from "react";
import { sendChatMessage } from "../api";

export default function ChatPage() {
  const [txt, setTxt] = useState("");
  const [chat, setChat] = useState([]);
  const [sending, setSending] = useState(false);

  const send = async () => {
    const message = txt.trim();
    if (!message) return;
    setSending(true);
    const res = await sendChatMessage(message);
    setChat((prev) => [
      ...prev,
      { from: "you", text: message },
      { from: "bot", text: res.reply },
    ]);
    setTxt("");
    setSending(false);
  };

  const bubble = (from) => ({
    alignSelf: from === "you" ? "flex-end" : "flex-start",
    background: from === "you" ? "#2563eb" : "#111",
    color: "white",
    padding: "8px 12px",
    borderRadius:
      from === "you" ? "14px 14px 0 14px" : "14px 14px 14px 0",
    maxWidth: "70%",
    marginBottom: 6,
    fontSize: 14,
    border: "1px solid #333",
  });

  return (
    <div>
      <h2>Gym Buddy Chat</h2>

      <div
        style={{
          borderRadius: 10,
          border: "1px solid #333",
          background: "#050505",
          padding: 10,
          height: 260,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          marginBottom: 10,
          marginTop: 8,
        }}
      >
        {chat.length === 0 && (
          <p style={{ color: "#888", fontSize: 14 }}>
            Tell your gym buddy how you feel today. Example:{" "}
            <em>&quot;I feel tired but want to be consistent&quot;</em>.
          </p>
        )}
        {chat.map((msg, i) => (
          <div key={i} style={bubble(msg.from)}>
            <strong style={{ fontSize: 11, opacity: 0.8 }}>
              {msg.from === "you" ? "You" : "Buddy"}
            </strong>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #444",
            background: "#111",
            color: "white",
          }}
        />
        <button
          onClick={send}
          disabled={sending}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: "none",
            background: sending ? "#444" : "white",
            color: sending ? "#aaa" : "#000",
            cursor: sending ? "default" : "pointer",
            fontWeight: 600,
          }}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
