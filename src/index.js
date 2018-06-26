import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

//Functional component
function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i, coordinate) {
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i, coordinate)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0, [1, 1])} 
                    {this.renderSquare(1, [1, 2])}
                    {this.renderSquare(2, [1, 3])}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, [2, 1])}
                    {this.renderSquare(4, [2, 2])}
                    {this.renderSquare(5, [2, 3])}
                </div>
                <div className="board-row">
                    {this.renderSquare(6, [3, 1])}
                    {this.renderSquare(7, [3, 2])}
                    {this.renderSquare(8, [3, 3])}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                squares: Array(9).fill(null),
                }
            ],
            stepNumber: 0,
            moves: [],
            xIsNext: true,
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    //Click handler for each square component
    handleClick(i, coordinate) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1); 
        const moves = this.state.moves.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); //copy a new array
        if (calculateWinner(squares) || squares[i]) { //if calculateWInner() return or auqres[i] == null
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        moves.push(coordinate);
        this.setState({
            history: history.concat([
                {squares: squares}
            ]),
            stepNumber: history.length,
            moves: moves,
            xIsNext: !this.state.xIsNext
        }); //assign new state of variables
    }

    //Generate current game status
    genStatus(winner) {
        if (winner) {
            return 'Winner: ' + winner;
        } else {
            return ('Next Player: ' + (this.state.xIsNext ? 'X' : 'O'));
        }
    }

    //Generate block elements history list 
    genHistoryList() {
        const history = this.state.history;
        const moves = history.map((step, move) => {
            const coor = this.state.moves[move];
            console.log(coor); //****** */
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    <p>{coor ? ('Move: (' + coor[0] + ', ' + coor[1] + ')') : ''}</p>
                </li>
            );
        });
        return moves;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const status = this.genStatus(winner);
        const moves = this.genHistoryList();

        //return hierachy
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i, coordinate) => this.handleClick(i, coordinate)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
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
            return squares[a];
        }
    }
}

// ===========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)

/* Game.propTypes = {
    status: PropTypes.String, 
    moves: PropTypes.Array,
    squares: PropTypes.Array
};

Board.propTypes = {
    onClick: PropTypes.function,
    squares: PropTypes.Array
};

Square.propTypes = {
    value: PropTypes.String,
    onClick: PropTypes.func
}; */


/* 
 - Display the location for each move in the format(col, row) in the move history list. [DONE]
 - Bold the currently selected item in the move list.
 - Rewrite Board to use two loops to make the squares instead of hardcoding them.
 - Add a toggle button that lets you sort the moves in either ascending or descending order. 
 - When someone wins, highlight the three squares that caused the win.
 - When no one wins, display a message about the result being a draw. */