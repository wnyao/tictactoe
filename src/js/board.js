import React from "react";
import { func, string, object } from "prop-types";

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

Button.propTypes = {
  className: string,
  onClick: func.isRequired,
  style: object,
  value: string.isRequired
};
class Board extends React.Component {
  //Return a single button component
  renderSquare(i, coordinate) {
    const { winningLine, squares, onClick } = this.props; //Destructure props for readability
    const winningStyle = {
      backgroundColor: "cyan",
      fontSize: "32px",
      color: "white"
    };
    const isMatch = winningLine.some(number => number === i);
    const squareVal = squares[i] === null ? i : squares[i];

    const textStyle = () => {
      if (typeof squareVal === "number") {
        return { color: "black" };
      } else if (squareVal === "X") {
        return { color: "#a31919", fontSize: "32px" };
      } else {
        return { color: "#ff3300", fontSize: "32px" };
      }
    };

    return (
      <Button
        className={"board-row__button-square"}
        style={isMatch ? winningStyle : textStyle()}
        value={squares[i] === null ? i.toString() : squares[i]}
        onClick={() => onClick(i, coordinate)}
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
      //outer & index: refer to index of the current element being processed in the array
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
