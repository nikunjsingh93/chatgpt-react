import Chat from "./Chat";
import Navbar from "./Navbar";

function MainContent() {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <Chat />
    </div>
  );
}

export default MainContent;
