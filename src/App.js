import React from "react";
import Noteboard from "./Noteboard";

function App() {
  return (
    <div>
      <div className="noteboard-header">
        <h1>Note-taking App</h1>
        <h3>by Jacky Lo</h3>
        <br />
        <div>Double-Click to create a note</div>
      </div>
      <Noteboard />
    </div>
  );
}

export default App;
