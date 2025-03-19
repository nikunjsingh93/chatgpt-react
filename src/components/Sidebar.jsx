import { useState } from "react";
import { useChatContext } from "../contexts/ChatContext.jsx";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const { chatList, addToChatList, messages } = useChatContext();

  function onNewChatClick(e) {
    //e.preventDefault();
    addToChatList(messages)
    
  }

  return (
    <>
      <img
        src="./src/assets/control.png"
        className={`absolute z-50 cursor-pointer  w-7 border-dark-purple
           border-2 rounded-full  ${!open}`}
        onClick={() => setOpen(!open)}
      />

      <div className="relative">
        <div
          className={` ${
            open ? "w-72 p-5" : "translate-x-0 w-0 p-0"
          } bg-gray-900 h-full pt-8 duration-300 absolute md:relative z-40`}
        >
          <div className="flex gap-x-4 items-center">
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Nik GPT
            </h1>
          </div>
          <div className="pt-6 flex gap-x-4 items-center">
            <h4
              className={`text-white origin-left font-small text-lg duration-200 ${
                !open && "scale-0"
              }`}  onClick={onNewChatClick}
            >
             New Chat
            </h4>
          </div>
          <ul className="pt-6">
          {console.log("chat list", chatList)}
            {chatList.map((chat, index) => (
              <li
                key={index}
                className="flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
              >
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {chat[0].text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;