import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")));

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");

    if (storedMessages) setMessages(JSON.parse(storedMessages));
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const addToMessages = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeFromMessages = (messageId) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  };

//   const isFavorite = (movieId) => {
//     return favorites.some((movie) => movie.id === movieId);
//   };

  const value = {
    messages,
    addToMessages,
    removeFromMessages,
  };

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
};