import React, { useState } from "react";
import { Send } from "lucide-react";
import { fetchChatCompletion } from "../services/api.js";
import MarkdownReader from "./MarkdownReader";
import { useChatContext } from "../contexts/ChatContext.jsx";

const Chat = () => {
  const { messages, addToMessages } = useChatContext();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSend = async () => {
    if (input.trim()) {
      // Add user's message
      addToMessages({ text: input, sender: "user" });
      setInput(""); // Clear the input field

      // Set loading to true to show the loading message
      setLoading(true);

      try {
        const result = await fetchChatCompletion(input);
        //console.log("response", result);

        const chatResponse =
          result?.choices?.[0]?.message?.content ||
          "Looks like I can't think right now...";

        // Add the AI's response to the messages array

        addToMessages({ text: chatResponse, sender: "ai" });
      } catch (error) {
        // console.error("Error fetching AI response:", error);

        addToMessages({
          text: "Error fetching response. Please try again.",
          sender: "ai",
        });
      } finally {
        // Set loading to false once the API call is complete
        setLoading(false);
      }
    }
  };

  return (
    <div style={{backgroundColor: "#212121"}} className="flex flex-col h-[calc(100%-4rem)] p-4 w-95 sm:w-100 md:w-120 lg:w-180 xl:w-200 mx-auto">
      <div style={{backgroundColor: "#212121"}} className="h-[calc(100%-4rem)] overflow-y-auto mb-4 p-2 rounded-xl shadow-md">
      {messages.length === 0 ? (
    <div className="text-center text-gray-500">
      <p>Whats on your mind? Type your question.</p>
    </div>
  ) : (
    messages.map((msg, index) => (
      <div
        key={index}
        className={`my-2 p-3 rounded-xl  ${
          msg.sender === "user"
            ? "bg-[#2F2F2F]  text-[#ECECEC] self-end ml-auto max-w-xs"
            : "bg-[#212121] text-[#ECECEC] self-start max-w-3xl"
        }`}
      >
        <MarkdownReader markdownContent={msg.text} />
      </div>
    ))
  )}

        {loading && (
          <div className="my-2 p-3 rounded-xl bg-[#212121] text-[#ECECEC] self-start max-w-3xl">
            <p>Thinking...</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 p-3 rounded-xl focus:outline-none bg-[#303030] text-white"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-white text-black p-3 rounded-xl hover:bg-gray-300"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
