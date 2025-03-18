import Chat from "./Chat";

function MainContent() {
  return (
    <div className="mx-auto flex flex-col">
      <h1 className="text-xl ">Main Content</h1>
      <p>Here is the main content area that adjusts based on sidebar width.</p>
      <Chat />
    </div>
  );
}

export default MainContent;
