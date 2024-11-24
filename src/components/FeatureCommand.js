import React, { useState } from "react";

const FeatureCommand = ({ onCommand }) => {
  const [command, setCommand] = useState("");

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (command.trim() !== "") {
      onCommand(command);
      setCommand(""); // Clear input after submission
    }
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <form onSubmit={handleCommandSubmit}>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command (e.g., Add round eyes)"
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <button type="submit" style={{ padding: "10px", fontSize: "16px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeatureCommand;
