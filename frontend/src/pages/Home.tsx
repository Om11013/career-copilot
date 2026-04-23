import { askAI } from "@/service/ai";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input) return;

    setLoading(true);
    try {
      const res = await askAI(input);
      setResponse(res);
    } catch (err) {
      setResponse("Error connecting to backend");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>AI Career Copilot</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        style={{ padding: 10, width: 300 }}
      />

      <button onClick={handleAsk} style={{ marginLeft: 10 }}>
        Ask
      </button>

      <div style={{ marginTop: 20 }}>
        {loading ? <p>Loading...</p> : <p>{response}</p>}
      </div>
    </div>
  );
}
