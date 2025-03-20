import { useState } from "react";
import "./App.css";
import Sidebar from "../src/components/Sidebar";
import Navbar from "../src/components/Navbar";
import Chat from "../src/components/Chat";
import About from "../src/pages/About";
import { Route, Routes } from "react-router-dom";
import { ChatProvider } from "./contexts/ChatContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ChatProvider>
      <div style={{backgroundColor: "#212121"}} className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;
