import React from "react";
import PropTypes from "prop-types";

import { Button, Board } from "./board.js";
import { Footer } from "./footer.js";

//Toggle button component
const ToggleButton = props => (
  <Button
    className="toggle-button"
    onClick={props.onClick}
    value={props.value}
  />
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

//Title of the app
const AppTitle = props => (
  <div className="title">
    <h1>Tic Tac Toe</h1>
  </div>
);

//Gameboard for tictactoe
const GameBoard = props => (
  <div className={props.className}>
    <Board
      winningLine={props.winningLine}
      squares={props.squares}
      onClick={props.onClick}
    />
  </div>
);

GameBoard.propTypes = {
  className: PropTypes.string.isRequired,
  winningLine: PropTypes.arrayOf(PropTypes.number).isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
};

//Game info includes history lists and desc/asc toggle button
const GameInfo = props => (
  <div className="outer-game-div">
    <div className="game-info">
      <div className="game-status">
        <h2>{props.status}</h2>
      </div>
      <ToggleButton onClick={props.onClick} value={props.value} />
      <hr />
      {props.historyList}
    </div>
  </div>
);

GameInfo.propTypes = {
  status: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  historyList: PropTypes.element.isRequired
};

//Components of full tictactoe game set
const Game = props => (
  <div className="game">
    <AppTitle />
    <GameBoard
      className="game-board"
      winningLine={props.winningLine} //if winnerInfo is undefined; else return []
      squares={props.squares}
      onClick={props.onSquareClick}
    />
    <GameInfo
      status={props.status}
      value={props.value}
      onClick={props.onToggleClick}
      historyList={props.historyList}
    />
    <Footer />
  </div>
);

Game.propTypes = {
  winningLine: PropTypes.arrayOf(PropTypes.number).isRequired,
  squares: PropTypes.arrayOf(PropTypes.string),
  onSquareClick: PropTypes.func.isRequired,
  status: PropTypes.string,
  value: PropTypes.string.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  historyList: PropTypes.element.isRequired
};

export { Game, GameBoard };
