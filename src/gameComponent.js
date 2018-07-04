import React from "react";
import { Route, Link } from "react-router-dom";
import { Button, Board } from "./board.js";
import ToggleBtn from "./toggleButton.js"; //testing purposes

//Toggle button component
const ToggleButton = props => (
  <Button className="button" onClick={props.onClick} value={props.value} />
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
    <div>{props.status}</div>
    <ToggleButton onClick={props.onClick} value={props.value} />
    {props.historyList}
  </div>
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

//Game over status for game ending
const GameOverStatus = props => (
  <div>
    <h1>{props.status}</h1>
    <GameBoard winningLine={props.winningLine} squares={props.squares} />
  </div>
);

//Components of full tictactoe game set
const Gameset = props => (
  <div className="game">
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
    <RouteExample />
  </div>
);

export { Gameset, GameOverStatus, List };
