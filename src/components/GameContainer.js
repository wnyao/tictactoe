import React, { Component } from 'react';
import { Game } from './Game.js';
import GameOver from './GameOver.js';
import List from './List.js';

import '../style/index.css';

function evalWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winnerInfo = {
        line: lines[i],
        player: squares[a],
      };
      return winnerInfo;
    }
  }
}

class GameContainer extends Component {
  state = {
    isDesc: true,
    xIsNext: true,
    stepNumber: 0,
    moves: [[]],
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
  };

  handleClick = (i, coordinate) => {
    let { history, moves, xIsNext, isDesc, stepNumber } = this.state;
    moves = moves.slice(0, stepNumber + 1);
    const current = history[isDesc ? history.length - 1 : 0];
    const squares = current.squares.slice();
    if (evalWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    if (isDesc) moves.push(coordinate);
    else moves.unshift(coordinate);

    this.setState({
      moves,
      stepNumber: history.length,
      xIsNext: !xIsNext,
      history: isDesc
        ? history.concat([{ squares: squares }])
        : [{ squares: squares }].concat(history),
    });
  };

  jumpTo = move => {
    let { isDesc, history, moves } = this.state;

    const from = isDesc ? 0 : history.length - (move + 1);
    const to = isDesc ? move + 1 : history.length;

    history = history.slice(from, to);
    moves = moves.slice(from, to);

    this.setState({
      history: history,
      stepNumber: move,
      moves: moves,
      xIsNext: move % 2 === 0,
    });
  };

  genGameOverStatus = (winnerInfo, moveNum) => {
    if (!winnerInfo && moveNum !== 10) return;
    if (winnerInfo) return `Winner: ${winnerInfo.player}`;
    return 'Draw';
  };

  changeOrder = () => {
    const { history, moves, isDesc } = this.state;
    this.setState({
      history: history.reverse(),
      moves: moves.reverse(),
      isDesc: !isDesc,
    });
  };

  // Generate block elements history list
  genHistoryList = stepNum => {
    const { history, isDesc } = this.state;
    const moves = history.map((step, move) => {
      const index = isDesc ? move : history.length - move - 1; // index order based according to sorting order
      const coor = this.state.moves[move];

      //Elements of history list
      const desc = index ? `Back to #${index}` : 'Go to game start';
      const coorMsg =
        index === 0
          ? 'Place your move on a number'
          : `Move #${index} at (${coor[0]}, ${coor[1]})`;

      return (
        <List
          key={index}
          description={desc}
          coordinateMsg={coorMsg}
          onClick={() => this.jumpTo(index)}
        />
      );
    });

    return <div>{moves}</div>;
  };

  render() {
    const { history, isDesc, stepNumber, xIsNext } = this.state;

    const current = history[isDesc ? stepNumber : 0];
    const winnerInfo = current && evalWinner(current.squares);
    const historyList = this.genHistoryList(stepNumber);
    const gameOverStatus = this.genGameOverStatus(winnerInfo, history.length);
    const playerStatus = `Player: ${xIsNext ? 'X' : 'O'}`;

    if (gameOverStatus) {
      return (
        <GameOver
          status={gameOverStatus}
          squares={current.squares}
          winningLine={winnerInfo ? winnerInfo.line : []}
          onSquareClick={this.handleClick}
        />
      );
    }

    return (
      <Game
        status={playerStatus}
        squares={current.squares}
        historyList={historyList}
        value={isDesc ? 'Sort ↓' : 'Sort ↑'}
        winningLine={winnerInfo ? winnerInfo.line : []}
        onSquareClick={this.handleClick}
        onToggleClick={this.changeOrder}
      />
    );
  }
}

export default GameContainer;
