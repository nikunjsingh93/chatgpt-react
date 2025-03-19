import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")));
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) setMessages(JSON.parse(storedMessages));

    const storedChatList = localStorage.getItem("chatList");
    if (storedChatList) setChatList(JSON.parse(storedChatList));
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatList", JSON.stringify(chatList));
  }, [chatList]);

  const addToMessages = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeFromMessages = (messageId) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  };

  const addToChatList = (item) => {
    setChatList((prev) => [...prev, item]);
  };

//   const isFavorite = (movieId) => {
//     return favorites.some((movie) => movie.id === movieId);
//   };

  const value = {
    messages,
    addToMessages,
    removeFromMessages,
    chatList,
    addToChatList,
  };

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
};