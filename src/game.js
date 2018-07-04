import React from "react";
import { Route, Link } from "react-router-dom";
import { Button, Board } from "./board.js";
import Toggle from "./test.js";
import "./css/index.css";

//Toggle button Container
const ToggleButton = props => (
  <Button className="button" onClick={props.onClick} value={props.value} />
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
    <Route path="/test" component={Toggle} />
  </div>
);

//Winner evaluation function
function evalWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winnerInfo = {
        line: lines[i],
        player: squares[a]
      };

      return winnerInfo;
    }
  }
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      moves: [[]],
      isDesc: true,
      xIsNext: true
    };
  }

  //Click handler for each square component
  handleClick(i, coordinate) {
    const history = this.state.history.slice();
    const moves = this.state.moves.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.isDesc ? history.length - 1 : 0];
    const squares = current.squares.slice();

    //if calculateWinner() return or squares[i] == null
    if (evalWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    //insert to front if in ascending order else push to back
    if (this.state.isDesc) {
      moves.push(coordinate);
    } else {
      moves.unshift(coordinate);
    }

    //set state
    this.setState({
      history: this.state.isDesc
        ? history.concat([{ squares: squares }])
        : [{ squares: squares }].concat(history),
      stepNumber: history.length,
      moves: moves,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(move) {
    //if in descending order from start to index, else from the index to end
    const from = this.state.isDesc ? 0 : this.state.history.length - (move + 1);
    const to = this.state.isDesc ? move + 1 : this.state.history.length;

    //new array containing extracted elements
    const history = this.state.history.slice(from, to);
    const moves = this.state.moves.slice(from, to);

    //set state
    this.setState({
      history: history,
      stepNumber: move,
      moves: moves,
      xIsNext: move % 2 === 0
    });
  }

  //Generate current game status
  genStatus(winnerInfo) {
    if (winnerInfo) {
      return "Winner: " + winnerInfo.player;
    } else {
      return "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }
  }

  //Change order of history and moves record when togglebutton triggered
  changeOrder() {
    this.setState({
      history: this.state.history.reverse(),
      moves: this.state.moves.reverse(),
      isDesc: !this.state.isDesc
    });
  }

  //return element of history list
  renderList(index, desc, coorMsg, style) {
    if (style.fontWeight === undefined) {
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
          <p>{coorMsg}</p>
        </li>
      );
    } else {
      return (
        <li key={index}>
          <button style={style} onClick={() => this.jumpTo(index)}>
            {desc}
          </button>
          <p>{coorMsg}</p>
        </li>
      );
    }
  }

  //Generate block elements history list
  genHistoryList(stepNum) {
    const history = this.state.history; //Array.prototype.reverse()
    const moves = history.map((step, move) => {
      const index = this.state.isDesc ? move : history.length - move - 1; //index order based according to sorting order
      const coor = this.state.moves[move];

      //Elements of history list
      const desc = index ? "Go to move #" + index : "Go to game start";
      const coorMsg = "Move #" + index + ": (" + coor[0] + ", " + coor[1] + ")";

      if (index === 0) {
        return this.renderList(0, desc, "Start of the game", {});
      } else if (index !== stepNum) {
        return this.renderList(index, desc, coorMsg, {});
      } else {
        return this.renderList(index, desc, coorMsg, { fontWeight: "bold" });
      }
    });

    const historyList = <ol>{moves}</ol>;
    return historyList;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.isDesc ? this.state.stepNumber : 0];
    const winnerInfo = evalWinner(current.squares);
    const status = this.genStatus(winnerInfo);
    const historyList = this.genHistoryList(this.state.stepNumber);

    //return hierachy
    return (
      <div className="game">
        <GameBoard
          winningLine={winnerInfo ? winnerInfo.line : []} //if winnerInfo is undefined; else return []
          squares={current.squares}
          onClick={(i, coordinate) => this.handleClick(i, coordinate)}
        />
        <GameInfo
          status={status}
          value={
            this.state.isDesc
              ? "Sort in ascending order"
              : "Sort in descending order"
          }
          onClick={() => this.changeOrder()}
          historyList={historyList}
        />
        <RouteExample />
      </div>
    );
  }
}

export default Game;

//===================================

/* 
TODO LIST:
 - Display the location for each move in the format(col, row) in the move history list. [DONE]
 - Bold the currently selected item in the move history list. [DONE]
 - Rewrite Board to use two loops to make the squares instead of hardcoding them. [DONE]
 - Add a toggle button that lets you sort the moves in either ascending or descending order. [DONE]
 - When someone wins, highlight the three squares that caused the win. [DONE]
 - When no one wins, display a message about the result being a draw.
 - Set proptypes 
 - styling 
 - make highlight bling
 */
