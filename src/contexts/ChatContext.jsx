import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages"))
  );
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

  const removeFromMessages = (index) => {
   // setMessages((prev) => prev.filter((message) => message.id !== index));

    setMessages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const getMessages = (indexToGet) => {
    chatList.forEach((message, index) => {
      if (indexToGet === index) {
        setMessages(message);
      }
    });
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const removeFromChatList = (indexToRemove) => {
    chatList.forEach((message, index) => {
        if (indexToRemove === index) {
            setChatList((prev) => prev.filter((_, index) => index !== indexToRemove));
        }
      });
  };

  const addToChatList = (item) => {
    setChatList((prev) => [...prev, item]);
  };

  const value = {
    messages,
    addToMessages,
    removeFromMessages,
    chatList,
    addToChatList,
    removeFromChatList,
    clearMessages,
    getMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
