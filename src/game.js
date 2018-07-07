import React from "react";
import "./css/index.css";
import { Gameset, GameOverStatus, List } from "./gameComponent.js";

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

  //Generate game over status
  genGameOverStatus(winnerInfo, moveNum) {
    if (winnerInfo === undefined && moveNum !== 10) {
      return;
    } else if (winnerInfo) {
      return "Winner: " + winnerInfo.player;
    } else {
      return "Draw";
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
        return (
          <List
            key={0}
            style={null}
            onClick={() => this.jumpTo(0)}
            description={desc}
            coordinateMsg={"Place your move on a number"}
          />
        );
      } else if (index !== stepNum) {
        return (
          <List
            key={index}
            style={null}
            onClick={() => this.jumpTo(index)}
            description={desc}
            coordinateMsg={coorMsg}
          />
        );
      } else {
        return (
          <List
            key={index}
            style={{ fontWeight: "bold" }}
            onClick={() => this.jumpTo(index)}
            description={desc}
            coordinateMsg={coorMsg}
          />
        );
      }
    });

    const historyList = <ol>{moves}</ol>;
    return historyList;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.isDesc ? this.state.stepNumber : 0];
    const winnerInfo = evalWinner(current.squares);
    const playerStatus = "Player: " + (this.state.xIsNext ? "X" : "O");
    const historyList = this.genHistoryList(this.state.stepNumber);
    const gameOverStatus = this.genGameOverStatus(winnerInfo, history.length);

    //Return gameover status when winner or draw is evaluated
    if (gameOverStatus !== undefined) {
      return (
        <GameOverStatus
          status={gameOverStatus}
          winningLine={winnerInfo ? winnerInfo.line : []}
          squares={current.squares}
        />
      );
    }

    //Return gameset
    return (
      <Gameset
        winningLine={winnerInfo ? winnerInfo.line : []}
        squares={current.squares}
        onSquareClick={(i, coordinate) => this.handleClick(i, coordinate)}
        status={playerStatus}
        value={
          this.state.isDesc
            ? "Sort in ascending order"
            : "Sort in descending order"
        }
        onToggleClick={() => this.changeOrder()}
        historyList={historyList}
      />
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
 - When no one wins, display a message about the result being a draw. [DONE]
 - Set proptypes 
 - styling 
 - make highlight bling
 */
