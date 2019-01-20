import React from 'react';
import PropTypes from 'prop-types';

import { GameBoard } from './game.js';
import { ImageLink } from './footer.js';
import CloseIcon from '../res/images/close_icon.png';

//Game over status for game ending
const GameOver = props => (
  <div className="game-over">
    <h1>{props.status}</h1>
    <ImageLink
      className="game-over__imagelink"
      href="https://wnyao.github.io/tic-tac-toe/"
      src={CloseIcon}
      alt="Close"
    />
    <GameBoard
      className="game-over__board"
      winningLine={props.winningLine}
      squares={props.squares}
      onClick={props.onSquareClick}
    />
  </div>
);

GameOver.propTypes = {
  status: PropTypes.string,
  winningLine: PropTypes.arrayOf(PropTypes.number).isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};

export default GameOver;
