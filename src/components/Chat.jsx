import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      // Simulating AI response
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: 'This is a simulated AI response.', sender: 'ai' }]);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-white rounded-xl shadow-md">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-3 rounded-xl max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 p-3 border rounded-xl focus:outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
