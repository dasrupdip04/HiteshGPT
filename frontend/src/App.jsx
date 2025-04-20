import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);

    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        message: input,
      });

      setMessages((prev) => [...prev, { role: "bot", text: response.data.reply }]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div className="w-full sm:w-[90%] md:w-[70%] flex flex-col border-x border-gray-700">
        <div className="text-center text-2xl font-bold p-4 bg-gray-800 border-b border-gray-700">
          HiteshGPT 💬
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] break-words ${
                msg.role === "user"
                  ? "ml-auto bg-blue-600 text-white text-right"
                  : "mr-auto bg-gray-700 text-white text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2">
          <input
            type="text"
            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-2 focus:outline-none"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
