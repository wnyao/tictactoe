import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board.js';
import './css/index.css';
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
            moves: [[]],
            xIsNext: true,
        };
    }

    //Click handler for each square component
    handleClick(i, coordinate) {
        const history = this.state.history.slice(); 
        const moves = this.state.moves.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); //use slice for immutability of initial object
        if (calculateWinner(squares) || squares[i]) { //if calculateWInner() return or auqres[i] == null
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        moves.push(coordinate); //push new coordinate to state
        this.setState({
            history: history.concat([
                {squares: squares}
            ]),
            stepNumber: history.length,
            moves: moves,
            xIsNext: !this.state.xIsNext
        }); //assign new state of variables
    }

    jumpTo(step) {
        const history = this.state.history.slice(0, step + 1);
        this.setState({
            history: history,
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
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
    genHistoryList(stepNum) {
        const history = this.state.history;
        const moves = history.map((step, move) => {
            const coor = this.state.moves[move];
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';

            const coorMsg = coor ? 
                ('Move #' + move + ': (' + coor[0] + ', ' + coor[1] + ')'):
                '';

            if (move === 0) {
                return (
                    <li key={0}>
                        <button onClick={() => this.jumpTo(0)}>{desc}</button>
                        <p>{'Board is clear!'}</p>
                    </li>
                );
            } else if (move !== stepNum) {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                        <p>{coorMsg}</p>
                    </li>
                    );
            } else {
                return (
                    <li key={move}>
                        <button style={{fontWeight: 'bold'}} onClick={() => this.jumpTo(move)}>{desc}</button>
                        <p>{coorMsg}</p>
                    </li>
                );
            }
        });

        return moves;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const status = this.genStatus(winner);
        const moves = this.genHistoryList(this.state.stepNumber);

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
TODO LIST:
 - Display the location for each move in the format(col, row) in the move history list. [DONE]
 - Bold the currently selected item in the move history list. [DONE]
 - Rewrite Board to use two loops to make the squares instead of hardcoding them. [DONE]
 - Add a toggle button that lets you sort the moves in either ascending or descending order. 
 - When someone wins, highlight the three squares that caused the win.
 - When no one wins, display a message about the result being a draw.
 - Set proptypes 
 */