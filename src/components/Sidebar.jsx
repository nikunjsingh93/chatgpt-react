import { useState, useEffect } from "react";
import { useChatContext } from "../contexts/ChatContext.jsx";
import { MessageSquareText, Trash, PanelsTopLeft } from "lucide-react";

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
      <button
        className={`absolute z-50 cursor-pointer m-5
           ${!open}`}
        onClick={() => setOpen(!open)}
      ><PanelsTopLeft size={25} color="#ffffff" /></button>

      <div className="relative">
        <div style={{backgroundColor: "#171710"}}
          className={` ${
            open ? "w-72 p-5" : "translate-x-0 w-0 p-0"
          } h-full pt-8 duration-300 absolute md:relative z-40`}
        >
          <div className="flex gap-x-4 items-center">
            
          </div>
          <div className="pt-6 flex gap-x-4 items-center">
            <div
              className={`flex text-white origin-left font-small text-lg duration-200 cursor-pointer pt-5 ${
                !open && "scale-0"
              }`}  onClick={onNewChatClick}
            >
            <div className="pr-3 pt-1"><MessageSquareText /></div> New Chat 
            </div>
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
                <Trash size={17} />
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