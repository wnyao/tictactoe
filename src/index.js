import React from 'react';
import ReactDOM from 'react-dom';
import {ToggleButton, Board} from './board.js';
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
            isDesc: true,
            xIsNext: true,
        };
    }

    //Click handler for each square component
    handleClick(i, coordinate) {
        const history = this.state.history.slice(); 
        const moves = this.state.moves.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.isDesc? history.length - 1: 0];
        const squares = current.squares.slice();

        //if calculateWinner() return or squares[i] == null
        if (calculateWinner(squares) || squares[i]) {
            return
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        //insert to front if in ascending order else push to back
        if (this.state.isDesc) { 
            moves.push(coordinate); 
        } else {
            moves.unshift(coordinate);
        }
        
        //set state
        this.setState({
            history: (this.state.isDesc ? 
                history.concat([{squares: squares}]): 
                [{squares: squares}].concat(history)),
            stepNumber: history.length,
            moves: moves,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(move) {
        //if in descending order from start to index, else from the index to end
        const from = this.state.isDesc ? 0: this.state.history.length - (move + 1);
        const to = this.state.isDesc ? (move + 1): this.state.history.length; 

        //new array containing extracted elements
        const history = this.state.history.slice(from, to);
        const moves = this.state.moves.slice(from, to);

        //set state
        this.setState({
            history: history,
            stepNumber: move,
            moves: moves,
            xIsNext: (move % 2) === 0
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
            const index = this.state.isDesc ? move: history.length - move - 1; //index order based according to sorting order
            const coor = this.state.moves[move];

            //Elements of history list
            const desc = index ?
                'Go to move #' + index:
                'Go to game start';
            const coorMsg = coor ? 
                ('Move #' + index + ': (' + coor[0] + ', ' + coor[1] + ')'):
                '';

            if (index === 0) {
                return (
                    <li key={index}>
                        <button onClick={() => this.jumpTo(0)}>{desc}</button>
                        <p>{'Board is clear!'}</p>
                    </li>
                );
            } else if (index !== stepNum) {
                return (
                    <li key={index}>
                        <button onClick={() => this.jumpTo(index)}>{desc}</button>
                        <p>{coorMsg}</p>
                    </li>
                    );
            } else {
                return (
                    <li key={index}>
                        <button style={{fontWeight: 'bold'}} onClick={() => this.jumpTo(index)}>{desc}</button>
                        <p>{coorMsg}</p>
                    </li>
                );
            }
        });

        return moves;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.isDesc? this.state.stepNumber: 0];
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
                    <ToggleButton 
                        onClick={() => this.changeOrder()}
                        value={this.state.isDesc ? 'Sort in ascending order': 'Sort in descending order'}
                    />
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)

//===================================

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
 - Add a toggle button that lets you sort the moves in either ascending or descending order. [DONE]
 - When someone wins, highlight the three squares that caused the win.
 - When no one wins, display a message about the result being a draw.
 - Set proptypes 
 */