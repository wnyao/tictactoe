import React from "react";
import { GameBoard } from "./gameComponent.js";

//Game over status for game ending
const GameOverStatus = props => (
  <div className="game">
    <h1>{props.status}</h1>
    <GameBoard
      className="game-board game-over"
      winningLine={props.winningLine}
      squares={props.squares}
      onClick={props.onSquareClick}
    />
  </div>
);

export default GameOverStatus;
