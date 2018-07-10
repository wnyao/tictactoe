import React from "react";
import { GameBoard } from "./gameComponent.js";
import { ImageLink } from "./footer.js";
import CloseIcon from "../res/images/close_icon.png";

//Game over status for game ending
const GameOver = props => (
  <div className="game">
    <h1>{props.status}</h1>
    <ImageLink
      className="close-icon"
      href="https://wnyao.github.io/tic-tac-toe/"
      src={CloseIcon}
      alt="Close"
    />
    <GameBoard
      className="game-over-board"
      winningLine={props.winningLine}
      squares={props.squares}
      onClick={props.onSquareClick}
    />
  </div>
);

export default GameOver;
