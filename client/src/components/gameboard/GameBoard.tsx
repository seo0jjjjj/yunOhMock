import React, { useState } from "react";
import "./gameBoard.css"

const boardSize = 15;

export const GameBoard: React.FC = () => {
  const [currentDot, setCurrentDot] = useState<string>("");

  const handlePlaceDot = (e: React.MouseEvent<HTMLElement>) => {
    setCurrentDot((e.target as HTMLElement).id);
  }

  return (
    <div className="board-backgorund">
      <div className="board">
        <div className="fake-board">
          {Array((boardSize - 1) * (boardSize - 1)).fill(0).map(_ => <div className="fake-cell"></div>)}
        </div>
        <div className="real-board">
          {
            Array(boardSize).fill(0).map((_, i) => {
              return < div key={i} className="row" >
                {
                  Array(boardSize).fill(0).map((_, j) => {
                    return <div key={j} className="cell" id={`(${i},${j})`} onClick={handlePlaceDot} ><div className="dot"></div></div>
                  })
                }
              </div>
            })
          }
        </div>
      </div>
    </div >
  )
}