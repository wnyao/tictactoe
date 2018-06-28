import React from 'react';
import './css/index.css';

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

    renderBoard() {
        const rowBlock = (squares) => (<div className="board-row">{squares[0]}{squares[1]}{squares[2]}</div>);

        const length = 3;
        const boardRows = Array.from({length}, (currentVal, outer) => { //outer & index: index of the current element being processed in the array
            const row = 3 - outer;
            const boardRow = Array.from({length}, (currentVal, index) => ( //currentVal: current element being processed
                this.renderSquare(outer * length + index, [row, index + 1])
            ))

            return rowBlock(boardRow);
        });

        return (boardRows);
    }

    render() {
        const boardComponent = this.renderBoard();
        return(boardComponent);
    }
}

export {
    Board
}