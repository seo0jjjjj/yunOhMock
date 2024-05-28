import React from 'react'
import "./gameBoard.css"

export default function GameBoard() {
  const handleOnclick = (e) => {
    const cell = e.target;
    const dot = document.createElement('img');
    dot.src = "circle.png"
    dot.style.width = "100%";
    dot.style.height = "100%";
    cell.appendChild(dot);
    console.log(e.target.id);
  }


  return (
    <>
    <h1>helloBoard</h1>
    <table className='game-board' onClick={handleOnclick}>
      <tr id="0">
        <td id="(0,0)"></td>
        <td id="(0,1)"></td>
        <td id="(0,2)"></td>
        <td id="(0,3)"></td>
        <td id="(0,4)"></td>
        <td id="(0,5)"></td>
        <td id="(0,6)"></td>
        <td id="(0,7)"></td>
        <td id="(0,8)"></td>
      </tr>
      <tr id="1">
        <td id="(1,0)"></td>
        <td id="(1,1)"></td>
        <td id="(1,2)"></td>
        <td id="(1,3)"></td>
        <td id="(1,4)"></td>
        <td id="(1,5)"></td>
        <td id="(1,6)"></td>
        <td id="(1,7)"></td>
        <td id="(1,8)"></td>
      </tr>
      <tr id="2">
        <td id="(2,0)"></td>
        <td id="(2,1)"></td>
        <td id="(2,2)"></td>
        <td id="(2,3)"></td>
        <td id="(2,4)"></td>
        <td id="(2,5)"></td>
        <td id="(2,6)"></td>
        <td id="(2,7)"></td>
        <td id="(2,8)"></td>
      </tr>
      <tr id="3">
        <td id="(3,0)"></td>
        <td id="(3,1)"></td>
        <td id="(3,2)"></td>
        <td id="(3,3)"></td>
        <td id="(3,4)"></td>
        <td id="(3,5)"></td>
        <td id="(3,6)"></td>
        <td id="(3,7)"></td>
        <td id="(3,8)"></td>
      </tr>
      <tr id="4">
        <td id="(4,0)"></td>
        <td id="(4,1)"></td>
        <td id="(4,2)"></td>
        <td id="(4,3)"></td>
        <td id="(4,4)"></td>
        <td id="(4,5)"></td>
        <td id="(4,6)"></td>
        <td id="(4,7)"></td>
        <td id="(4,8)"></td>
      </tr>
      <tr id="5">
        <td id="(5,0)"></td>
        <td id="(5,1)"></td>
        <td id="(5,2)"></td>
        <td id="(5,3)"></td>
        <td id="(5,4)"></td>
        <td id="(5,5)"></td>
        <td id="(5,6)"></td>
        <td id="(5,7)"></td>
        <td id="(5,8)"></td>
      </tr>
      <tr id="6">
        <td id="(6,0)"></td>
        <td id="(6,1)"></td>
        <td id="(6,2)"></td>
        <td id="(6,3)"></td>
        <td id="(6,4)"></td>
        <td id="(6,5)"></td>
        <td id="(6,6)"></td>
        <td id="(6,7)"></td>
        <td id="(6,8)"></td>
      </tr>
      <tr id="7">
        <td id="(7,0)"></td>
        <td id="(7,1)"></td>
        <td id="(7,2)"></td>
        <td id="(7,3)"></td>
        <td id="(7,4)"></td>
        <td id="(7,5)"></td>
        <td id="(7,6)"></td>
        <td id="(7,7)"></td>
        <td id="(7,8)"></td>
      </tr>
      <tr id="8">
        <td id="(8,0)"></td>
        <td id="(8,1)"></td>
        <td id="(8,2)"></td>
        <td id="(8,3)"></td>
        <td id="(8,4)"></td>
        <td id="(8,5)"></td>
        <td id="(8,6)"></td>
        <td id="(8,7)"></td>
        <td id="(8,8)"></td>
      </tr>
    </table>
    </>
  )
}