const MainContent = ({ isOpen }) => {
    return (
      <div className={`flex-1 p-6 transition-all ${isOpen ? "ml-64" : "ml-64"}`}>
        <h1 className="text-xl">Main Content</h1>
        <p>Here is the main content area that adjusts based on sidebar width.</p>
      </div>
    );
  };
  
  export default MainContent;