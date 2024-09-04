import { useEffect, useState } from "react";
import "../index.css";
import Square from "./square";

interface GameBoardProps {
  mode: "computer" | "multiplayer";
}

const Board: React.FC<GameBoardProps> = ({ mode }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState("X");
  const [draw, setDraw] = useState(false);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ xScore: 0, oScore: 0 });
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const handleHistory = (moveIndex: number) => {
    setSquares(history[moveIndex]);
    setCurrentMove(moveIndex % 2 === 0 ? "X" : "O");
    setHistory(history.slice(0, moveIndex + 1));
  };

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

  useEffect(() => {
    if (mode === "computer" && currentMove === "O" && !winner) {
      const emptySquares = squares
        .map((value, index) => (value === null ? index : null))
        .filter((v) => v !== null) as number[];

      const blockLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      const findBestMove = (x: string): number | null => {
        for (let i = 0; i < blockLines.length; i++) {
          const [a, b, c] = blockLines[i];
          if (squares[a] === x && squares[b] === x && squares[c] === null)
            return c;
          if (squares[a] === x && squares[c] === x && squares[b] === null)
            return b;
          if (squares[b] === x && squares[c] === x && squares[a] === null)
            return a;
        }
        return null;
      };

      const winningMove = findBestMove("O");
      const blockingMove = findBestMove("X");

      let move: number | null = null;
      if (winningMove !== null) {
        move = winningMove;
      } else if (blockingMove !== null) {
        move = blockingMove;
      } else {
        const cleverMoves = emptySquares.filter((index) => {
          return blockLines.some(([a, b, c]) => {
            const line = [squares[a], squares[b], squares[c]];
            return (
              (index === a || index === b || index === c) &&
              line.filter((val) => val === "O").length === 1 &&
              line.filter((val) => val === null).length === 2
            );
          });
        });

        if (cleverMoves.length > 0) {
          move = cleverMoves[Math.floor(Math.random() * cleverMoves.length)];
        } else {
          move = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
      }

      setTimeout(() => {
        if (move !== null) {
          handleClick(move);
        }
      }, 500);
    }
  }, [currentMove, squares, mode, winner]);

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
    if (checkScore) {
      if (checkScore.toLowerCase() === "o") {
        let { oScore } = score;
        oScore += 1;
        setScore({ ...score, oScore });
      } else {
        let { xScore } = score;
        xScore += 1;
        setScore({ ...score, xScore });
      }
    }
  }, [winner]);

  const handleClick = (index: number) => {
    const nextMove = Array.from(squares);

    if (nextMove[index] !== null) return;
    nextMove[index] = currentMove;
    setSquares(nextMove);
    setHistory(history.concat([nextMove]));

    setCurrentMove(currentMove === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setHistory([Array(9).fill(null)]);
    setCurrentMove("X");
    setDraw(false);
    setWinner(null);
    setScore({ oScore: 0, xScore: 0 });
  };
  const playAgain = () => {
    setSquares(Array(9).fill(null));
    setHistory([Array(9).fill(null)]);
    setCurrentMove("X");
    setDraw(false);
    setWinner(null);
  };

  return (
    <div className="container">
      {" "}
      <h1>Tic-Tac-Toe </h1>
      <div className="scoreBoard">
        <div>
          <h1>Score Board</h1>
        </div>
        <div className="scoresNum">
          <div>
            <p style={{ color: "#b61818" }}>O - {score.oScore}</p>
          </div>
          <div>
            <p style={{ color: "#2757bc" }}>X - {score.xScore}</p>
          </div>
        </div>
      </div>
      {winner ? (
        <div>
          <p className="endgame"> {winner} Player won the game!</p>
        </div>
      ) : draw ? (
        <p className="endgame">Match Draw</p>
      ) : (
        <>
          <div >
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
      <div className="history-div">
        <h4>History</h4>
        {history.map((_, move) => (
          <div
            key={move}
            className="history-move"
            onClick={() => {
              if (!winner) {
                handleHistory(move);
              }
            }}
          >
            {move <= 0 ? (
              <div className="startGame">
                <p>Start the game</p>
              </div>
            ) : (
              <div className="moveNum">
                <p>Go to move #{move} </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="resetBtn"
        onClick={() => {
          if (!winner && !draw) {
            handleReset();
          } else {
            playAgain();
          }
        }}
      >
        {winner || draw ? (
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
};

export default Board;
