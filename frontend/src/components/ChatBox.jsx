import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Lưu message của user
    setMessages((prev) => [...prev, { from: "user", text: message }]);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // Lưu message của AI
    setMessages((prev) => [
      ...prev,
      { from: "ai", text: data.reply },
    ]);

    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg">
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              m.from === "user"
                ? "bg-blue-500 text-white text-right"
                : "bg-gray-200"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập câu hỏi..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
