import React from "react";
import { Route, Link } from "react-router-dom";
import { Button, Board } from "./board.js";
import ToggleBtn from "./toggleButton.js"; //testing purposes

//Toggle button component
const ToggleButton = props => (
  <Button
    className="toggle-button"
    onClick={props.onClick}
    value={props.value}
  />
);

//Lost for list in history list
const List = props => (
  <li>
    <button style={props.style} onClick={props.onClick}>
      {props.description}
    </button>
    <p>{props.coordinateMsg}</p>
  </li>
);

//Route example for learning purposes
const RouteExample = props => (
  <div>
    <button>
      <Link to="/test">Click Here</Link>
    </button>
    <Route path="/test" component={ToggleBtn} />
  </div>
);

const AppTitle = props => (
  <div className="title">
    <h1>Tic Tac Toe</h1>
  </div>
);

//Gameboard for tictactoe
const GameBoard = props => (
  <div className="game-board">
    <Board
      winningLine={props.winningLine}
      squares={props.squares}
      onClick={props.onClick}
    />
  </div>
);

//Game info includes history lists and desc/asc toggle button
const GameInfo = props => (
  <div className="game-info">
    <div className="game-status">
      <h2>{props.status}</h2>
    </div>
    <ToggleButton onClick={props.onClick} value={props.value} />
    <hr />
    {props.historyList}
  </div>
);

//Game over status for game ending
const GameOverStatus = props => (
  <div className="game">
    <h1>{props.status}</h1>
    <GameBoard winningLine={props.winningLine} squares={props.squares} />
  </div>
);

//Components of full tictactoe game set
const Gameset = props => (
  <div className="game">
    <AppTitle />
    <GameBoard
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
    {/* <RouteExample /> */}
  </div>
);

export { Gameset, GameOverStatus, List };
