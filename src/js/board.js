import React from "react";
import "../css/index.css";

//Presentational Component
const Button = props => (
  <button
    className={props.className}
    onClick={props.onClick}
    style={props.style}
  >
    {props.value}
  </button>
);

class Board extends React.Component {
  //Return a single button component
  renderSquare(i, coordinate) {
    const winningStyle = {
      backgroundColor: "cyan",
      fontSize: "32px",
      color: "white"
    };
    const winningLine = this.props.winningLine;
    const isMatch = winningLine.some(number => number === i);
    const value = this.props.squares[i] === null ? i : this.props.squares[i];

    const textStyle = () => {
      if (typeof value === "number") {
        return { color: "black" };
      } else if (value === "X") {
        return { color: "#a31919", fontSize: "32px" };
      } else {
        return { color: "#ff3300", fontSize: "32px" };
      }
    };

    return (
      <Button
        className={"square"}
        style={isMatch ? winningStyle : textStyle()}
        value={this.props.squares[i] === null ? i : this.props.squares[i]}
        onClick={() => this.props.onClick(i, coordinate)}
      />
    );
  }

  //Render board of tictactoe
  renderBoard() {
    const rowBlock = (squares, key) => (
      <div key={key} className="board-row">
        {squares[0]}
        {squares[1]}
        {squares[2]}
      </div>
    );
    const length = 3;

    const boardRows = Array.from({ length }, (currentVal, outer) => {
      //outer & index: index of the current element being processed in the array
      const row = 3 - outer;
      const boardRow = Array.from({ length }, (
        currentVal,
        index //currentVal: current element being processed
      ) => this.renderSquare(outer * length + index, [row, index + 1]));

      return rowBlock(boardRow, outer + 1);
    });
    return boardRows;
  }

  render() {
    const boardComponent = this.renderBoard();
    return boardComponent;
  }
}

export { Button, Board };
