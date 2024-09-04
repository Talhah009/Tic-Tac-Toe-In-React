import React, { useState } from "react";

type GameMode = "computer" | "multiplayer";

const Main: React.FC<{ onSelectMode: (mode: GameMode) => void }> = ({
  onSelectMode,
}) => {
  return (
    <div className="main-containner">
      <div>
        <h1>Tic Tac Toe</h1>
      </div>

      <div className="typeBtn">
        <div className="mainScrBtn" onClick={() => onSelectMode("computer")}>
          Play with Computer
        </div>
        <div className="mainScrBtn" onClick={() => onSelectMode("multiplayer")}>
          Multiplayer
        </div>
      </div>
    </div>
  );
};

export default Main;
