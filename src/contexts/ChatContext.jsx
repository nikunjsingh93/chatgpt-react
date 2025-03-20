import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages"))
  );
  const [chatList, setChatList] = useState(
    JSON.parse(localStorage.getItem("chatList"))
  );

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

  //add message to message thread
  const addToMessages = (message) => {
    setMessages((prev) => [...prev, message]);
  };


  //get message thread
  const getMessages = (indexToGet) => {
    chatList.forEach((message, index) => {
      if (indexToGet === index) {
        setMessages(message);
      }
    });
  };

  //clear all messages in messages array
  const clearMessages = () => {
    setMessages([]);
  };

  //remove a message thread from chat list
  const removeFromChatList = (indexToRemove) => {
    chatList.forEach((message, index) => {
      if (indexToRemove === index) {
        setChatList((prev) =>
          prev.filter((_, index) => index !== indexToRemove)
        );

        if (JSON.stringify(message) === JSON.stringify(messages)) {
          setMessages([]);
        }
      }
    });
  };

  //add messages thread to chat list
  const addToChatList = (item) => {
    const messageExists = chatList.includes(item);

    if (!messageExists && item.length > 0) {
      setChatList((prev) => [item,...prev]);
    }
  };

  const value = {
    messages,
    addToMessages,
    chatList,
    addToChatList,
    removeFromChatList,
    clearMessages,
    getMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
