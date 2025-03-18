import React, { useState } from "react";
import { Send } from "lucide-react";
import { fetchChatCompletion } from "../services/api.js";
import MarkdownReader from './MarkdownReader';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSend = async () => {
    if (input.trim()) {
      // Add user's message
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput(""); // Clear the input field

      // Set loading to true to show the loading message
      setLoading(true);

      try {
        const result = await fetchChatCompletion(input);
        console.log("response", result);

        const chatResponse =
          result?.choices?.[0]?.message?.content ||
          "Looks like I can't think right now...";

        // Add the AI's response to the messages array
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: chatResponse, sender: "ai" },
        ]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error fetching response. Please try again.", sender: "ai" },
        ]);
      } finally {
        // Set loading to false once the API call is complete
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100%-4rem)] p-4 bg-gray-100 w-95 sm:w-100 md:w-120 lg:w-180 xl:w-200 mx-auto">
      <div className="h-[calc(100%-4rem)] overflow-y-auto mb-4 p-4 bg-white rounded-xl shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-xl  ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto max-w-xs"
                : "bg-gray-300 text-black self-start max-w-3xl"
            }`}
          >
            <MarkdownReader markdownContent={msg.text} />
          </div>
        ))}
        
        {loading && (
          <div className="my-2 p-3 rounded-xl bg-gray-200 text-black self-start max-w-3xl">
            <p>Thinking...</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 p-3 border rounded-xl focus:outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
