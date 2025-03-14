import { useState } from 'react'

function Sidebar() {
      const [open, setOpen] = useState(true);
      const Menus = [
        { title: "Dashboard" },
        { title: "Inbox"},
        { title: "Files ", gap: true },
        { title: "Setting" },
      ];
    return(
        <>
        <img
          src="./src/assets/control.png"
          className={`absolute z-40 cursor-pointer  w-7 border-dark-purple
           border-2 rounded-full  ${!open}`}
          onClick={() => setOpen(!open)}
        />
        <div
        className={` ${
          open ? "w-72 p-5" : "opacity-0 invisible absolute w-0 p-0"
        } bg-gray-900 h-screen pt-8 relative duration-300`}
      >
        
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      </>
    )
}

export default Sidebar;