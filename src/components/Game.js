import React from 'react';
import PropTypes from 'prop-types';

import { Button, Board } from './Board.js';
import { Footer } from './Footer.js';

const ToggleButton = props => (
  <Button
    className="game-info__field__button"
    onClick={props.onClick}
    value={props.value}
  />
);

const AppTitle = props => (
  <header className="header">
    <h1>Tic Tac Toe</h1>
  </header>
);

const GameBoard = props => (
  <div className={props.className}>
    <Board
      winningLine={props.winningLine}
      squares={props.squares}
      onClick={props.onClick}
    />
  </div>
);

const GameInfo = props => {
  const { onClick, value, historyList, status } = props;
  return (
    <div className="game-info">
      <div className="game-info__field">
        <div className="game-info__field__status">
          <h2>{status}</h2>
        </div>
        <ToggleButton onClick={onClick} value={value} />
        <hr />
        {historyList}
      </div>
    </div>
  );
};

const Game = props => {
  const {
    value,
    status,
    squares,
    winningLine,
    historyList,
    onSquareClick,
    onToggleClick,
  } = props;

  return (
    <div className="game">
      <AppTitle />
      <GameBoard
        className="game__board"
        squares={squares}
        onClick={onSquareClick}
        winningLine={winningLine} // If winnerInfo is undefined; else return []
      />
      <GameInfo
        value={value}
        status={status}
        onClick={onToggleClick}
        historyList={historyList}
      />
      <Footer />
    </div>
  );
};

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

GameBoard.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  winningLine: PropTypes.arrayOf(PropTypes.number).isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
};

GameInfo.propTypes = {
  status: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  historyList: PropTypes.element.isRequired,
};

Game.propTypes = {
  status: PropTypes.string,
  value: PropTypes.string.isRequired,
  onSquareClick: PropTypes.func.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  historyList: PropTypes.element.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string),
  winningLine: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export { Game, GameBoard };
