import React, { Component } from 'react';
import { func, string, object } from 'prop-types';

const winningStyle = {
  backgroundColor: 'cyan',
  fontSize: '32px',
  color: 'white',
};

class Board extends Component {
  // Return square button component
  renderSquare(i, coordinate) {
    const { winningLine, squares, onClick } = this.props;
    const isMatch = winningLine.some(number => number === i);
    const squareVal = squares[i] || i;

    const textStyle = () => {
      if (typeof squareVal === 'number') return { color: 'black' };
      if (squareVal === 'X') return { color: '#a31919', fontSize: '32px' };
      return { color: '#ff3300', fontSize: '32px' };
    };

    return (
      <Button
        className="board-row__button-square"
        style={isMatch ? winningStyle : textStyle()}
        value={squares[i] || i.toString()}
        onClick={() => onClick(i, coordinate)}
      />
    );
  }

  renderBoard() {
    const length = 3;
    const rowBlock = (squares, key) => (
      <div key={key} className="board-row">
        {squares[0]}
        {squares[1]}
        {squares[2]}
      </div>
    );

    // outer & index: refer to index of the current element being processed in the array
    const boardRows = Array.from({ length }, (currentVal, outer) => {
      const row = 3 - outer;
      const boardRow = Array.from({ length }, (currentVal, index) =>
        this.renderSquare(outer * length + index, [row, index + 1])
      );
      return rowBlock(boardRow, outer + 1);
    });
    return boardRows;
  }

  render() {
    return this.renderBoard();
  }
}

const Button = props => <button {...props}>{props.value}</button>;

Button.propTypes = {
  className: string,
  onClick: func.isRequired,
  style: object,
  value: string.isRequired,
};

export { Button, Board };
