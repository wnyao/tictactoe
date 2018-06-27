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
        const squares = [];
        const boardRows = [];
        const rowBlock = (squares) => (<div className="board-row">{squares[0]}{squares[1]}{squares[2]}</div>);
        const div = (boardRows) => (<div>{boardRows[0]}{boardRows[1]}{boardRows[2]}</div>);

        let index = 0;
        for (var j = 3; j > 0; j--) {
            for (var i = 0; i < 3; i++) {
                const square = this.renderSquare(index++, [j, i + 1]);
                squares.push(square);
            }
            
            const boardRow = rowBlock(squares);
            boardRows.push(boardRow);
            squares.splice(0); //clear array to store squares of next board row
        }

        return(div(boardRows));
    }

    render() {
        const boardComponent = this.renderBoard();
        return(boardComponent);
    }
}

export default Board;