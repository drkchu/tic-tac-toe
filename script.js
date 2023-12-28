/**
 * The gameboard represents the state of the tic-tac-toe board
 * Since we only need a single instance of the GameBoard, wrap within an IIFE
 */

const gameBoard = (function GameBoard() {
    const size = 3;

    // Creating the 2D array (row-wise) to simulate the tic-tac-toe board

    const board = [];

    for (let row = 0; row < size; row++) {
        board[row] = [];
        for (let col = 0; col < size; col++) {
            board[row].push(Cell());
        }
    }

    // Getter for retrieving the board
    const getBoard = () => board;

    // Returns true if the all the cells have values equal to player, false otherwise
    const cellsMatch = (cells, player) => {
        return cells.every(cell => cell.getValue() === player);
    };

    // Returns true if at least one row is in a winning position for the player, false otherwise
    const checkRows = (player) => {
        return board.some(row => cellsMatch(row, player));
    };

    // Returns true if at least one col is in a winning position for the player, false otherwise
    const checkCols = (player) => {
        const boardReversed = [];

        for (let row = 0; row < size; row++) {
            boardReversed[row] = [];
            for (let col = 0; col < size; col++) {
                boardReversed[row][col] = board[col][row];
            }
        }

        return boardReversed.some(row => cellsMatch(row, player));
    };

    // Returns true if either diagonals on the baord is in a winning position for the player, false otherwise
    const checkDiagonal = (player) => {
        const mainDiagonal = [];
        const crossDiagonal = [];

        for (let i = 0; i < size; i++) {
            mainDiagonal.push(board[i][i]);
            crossDiagonal.push(board[i][size - i - 1])
        }

        return cellsMatch(mainDiagonal, player) || cellsMatch(crossDiagonal, player);
    };

    // Checks to see if the given player has a winning position on the board
    const isWinner = (player) => checkRows(player) || checkCols(player) || checkDiagonal(player);

    // Returns true if the current Player successfully marked the cell, false otherwise
    const markBoard = (row, col, player) => {
        if (!board[row][col].getValue()) {
            board[row][col].markCell(player);
            displayBoard();
            if (isWinner(player)) {
                console.log(`Player ${player} has won!`);
            }
            return true;
        }
        return false;
    }

    // Displays the board to the console, (probably) won't be used for the UI
    const displayBoard = () => {
        console.log(
            `${board[0][0].getValue()} | ${board[0][1].getValue()} | ${board[0][2].getValue()}\n----------\n${board[1][0].getValue()} | ${board[1][1].getValue()} | ${board[1][2].getValue()}\n----------\n${board[2][0].getValue()} | ${board[2][1].getValue()} | ${board[2][2].getValue()}`);
    }

    return { getBoard, markBoard, displayBoard, isWinner };

})();

/**
 * A cell in the tic-tac-toe board which can have one of the three following values
 * 0: No player has chosen this cell
 * 1: Player 1 has chosen this cell
 * 2: Player 2 has chosen this cell
 */
function Cell() {
    let value = 0;

    // Mark the cell as chosen by the current Player
    const markCell = (player) => {
        value = player;
    };

    // Getter to retrieve the current value in the Cell
    const getValue = () => value;

    return { markCell, getValue };
}

// Testing environment
gameBoard.markBoard(0, 2, 1);
gameBoard.markBoard(1, 1, 1);
gameBoard.markBoard(0, 0, 1);
gameBoard.markBoard(1, 0, 1);

