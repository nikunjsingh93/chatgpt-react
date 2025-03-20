import { useState, useEffect } from "react";
import { useChatContext } from "../contexts/ChatContext.jsx";

function Sidebar() {
   // Function to determine if the window width is at least the 'md' breakpoint (768px)
   const isMediumScreen = () => window.innerWidth >= 768;

   // Initialize 'open' state based on the current window width
   const [open, setOpen] = useState(isMediumScreen());
   
  const { chatList, addToChatList, messages, clearMessages, getMessages, removeFromChatList } = useChatContext();

    // Effect to handle window resize events
  useEffect(() => {
    const handleResize = () => {
      if (!isMediumScreen()) {
        setOpen(false); // Close the drawer on small screens
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onNewChatClick() {
    //e.preventDefault();
    addToChatList(messages);
    clearMessages();
  }

  function onChatListClick(index) {
    //e.preventDefault();
    getMessages(index);
  }

  function onDeleteClick(index) {
    removeFromChatList(index);
  }

  return (
    <>
      <img
        src="./src/assets/menu.png"
        className={`absolute z-50 cursor-pointer w-9 m-3
           ${!open}`}
        onClick={() => setOpen(!open)}
      />

      <div className="relative">
        <div
          className={` ${
            open ? "w-72 p-5" : "translate-x-0 w-0 p-0"
          } bg-gray-900 h-full pt-8 duration-300 absolute md:relative z-40`}
        >
          <div className="flex gap-x-4 items-center">
            
          </div>
          <div className="pt-6 flex gap-x-4 items-center">
            <h4
              className={`text-white origin-left font-small text-lg duration-200 cursor-pointer ${
                !open && "scale-0"
              }`}  onClick={onNewChatClick}
            >
             New Chat
            </h4>
          </div>
          <ul className="pt-6">
            {chatList.map((chat, index) => (
              <li
                key={index}
                className="flex  rounded-md p-2 hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"
              >
                <span
                  className={`${!open && "hidden"} origin-left duration-200 cursor-pointer`} onClick={() => onChatListClick(index)}
                >
                  {chat[0]?.text} 
                </span>
                <span className={`${!open && "hidden"} ml-auto cursor-pointer`}   onClick={() => onDeleteClick(index)} >
                  Delete
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