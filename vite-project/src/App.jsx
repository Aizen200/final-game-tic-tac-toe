import { useState } from "react";
import "./App.css";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turnO, setTurnO] = useState(true);
  const [winner, setWinner] = useState(null);

  const winningCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (newBoard) => {
    for (let pattern of winningCases) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        return;
      }
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turnO ? "O" : "X";
    setBoard(newBoard);
    setTurnO(!turnO);
    checkWin(newBoard);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurnO(true);
    setWinner(null);
  };

  return (
    <div className="container">
      {winner && (
        <div id="winner-container">
          <p>Winner is {winner}</p>
          <button onClick={resetGame}>New Game</button>
        </div>
      )}
      <h1>Tic Tac Toe</h1>
      <div id="game">
        {board.map((value, index) => (
          <button
            key={index}
            className="box"
            onClick={() => handleClick(index)}
            disabled={!!value || winner}
          >
            {value}
          </button>
        ))}
      </div>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
}
