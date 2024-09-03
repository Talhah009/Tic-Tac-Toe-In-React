import { useEffect, useState } from "react";
import "./index.css";
import Square from "./square";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState("X");
  const [draw, setDraw] = useState(false);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ xScore: 0, oScore: 0 });

  const checkWinner = () => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (
        squares[a] !== null &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      )
        return squares[a];
    }
    return null;
  };

  const checkTie = () => {
    return squares.every((square) => square !== null);
  };

  useEffect(() => {
    const newWinner = checkWinner();
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkTie()) {
      setDraw(true);
    }
  });

  useEffect(() => {
    const checkScore = checkWinner();
    console.log(checkScore);
    if (checkScore) {
      if (checkScore.toLowerCase() === "o") {
        let { oScore } = score;
        oScore += 1;
        setScore({ ...score, oScore });
        console.log("soooooo");
      } else {
        let { xScore } = score;
        xScore += 1;
        setScore({ ...score, xScore });
        console.log("xxxxxxxxx");
      }
      console.log(score);
    }
  }, [winner]);

  const handleClick = (index: number) => {
    const nextMove = Array.from(squares);
    if (nextMove[index] !== null) return;
    nextMove[index] = currentMove;
    setSquares(nextMove);

    setCurrentMove(currentMove === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setDraw(false);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe </h1>
      <div className="scoreBoard">
        <div><h1>Score Board</h1></div>
        <div className="scoresNum">
          <div style={{ color: score.oScore ? "#b61818" : "#2757bc" }}>
            <p>O - {score.oScore}</p>
          </div>
          <div style={{ color: score.xScore ? "#2757bc" : "#b61818" }}>
            <p>X - {score.xScore}</p>
          </div>
        </div>
      </div>

      {winner ? (
        <p className="endgame"> {winner} Player won the game!</p>
      ) : draw ? (
        <p className="endgame">Match Draw</p>
      ) : (
        <>
          <div>
            <div className="row">
              <div className="square">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
              </div>
              <div className="square">
                <Square value={squares[1]} onClick={() => handleClick(1)} />
              </div>
              <div className="square">
                <Square value={squares[2]} onClick={() => handleClick(2)} />
              </div>
            </div>
            <div className="row">
              <div className="square">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
              </div>
              <div className="square">
                <Square value={squares[4]} onClick={() => handleClick(4)} />
              </div>
              <div className="square">
                <Square value={squares[5]} onClick={() => handleClick(5)} />
              </div>
            </div>
            <div className="row">
              <div className="square">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
              </div>
              <div className="square">
                <Square value={squares[7]} onClick={() => handleClick(7)} />
              </div>
              <div className="square">
                <Square value={squares[8]} onClick={() => handleClick(8)} />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="resetBtn" onClick={() => handleReset()}>
        {winner ? (
          <>
            <p>Play Again</p>
          </>
        ) : (
          <>
            <p>Reset</p>
          </>
        )}
      </div>
    </div>
  );
}