import { useEffect, useState } from "react";
import Board from "./component/board";
import Main from "./component/main";
import back from "./assets/img/pngtree-back-arrow-backward-direction-previous-png-image_5198415.png"

export default function App() {
  const [gameMode, setGameMode] = useState<"computer" | "multiplayer" | null>(
    null
  );

  const handleBack = () => {
    setGameMode(null);
  };
  return (
    <div style={{height:"100px"}}>
      {gameMode && (
        <div onClick={handleBack} className="backBtn">
          <img src={back} alt="" className="backIcon"/>
          <p>Home</p>
        </div>
      )}

      {!gameMode ? (
        <Main onSelectMode={setGameMode} />
      ) : (
        <Board mode={gameMode} />
      )}
    </div>
  );
}
