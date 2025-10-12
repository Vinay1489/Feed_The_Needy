import React, { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "NGO", text: "Pickup confirmed at 2pm." },
    { from: "You", text: "On my way!" },
  ]);
  const [text, setText] = useState("");
  const send = () => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "You", text }]);
    setText("");
    setTimeout(
      () => setMessages((m) => [...m, { from: "NGO", text: "Thank you!" }]),
      800
    );
  };
  return (
    <div className="flex flex-col h-72">
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-3 py-2 rounded-xl border ${
              m.from === "You"
                ? "ml-auto bg-emerald-600 text-white border-emerald-700"
                : "bg-emerald-50 text-emerald-900 border-emerald-100"
            }`}
          >
            <div className="text-xs opacity-80 mb-0.5">{m.from}</div>
            <div className="text-sm leading-snug">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message NGO/Donor"
          className="flex-1 px-3 py-2 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />
        <button
          onClick={send}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
