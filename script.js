/**
 * The gameboard represents the state of the tic-tac-toe board
 * 
 */

function GameBoard(size) {
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
        return getBoard().some(row => cellsMatch(row, player));
    };

    // Returns true if at least one col is in a winning position for the player, false otherwise
    const checkCols = (player) => {
        const boardReversed = [];

        for (let row = 0; row < size; row++) {
            boardReversed[row] = [];
            for (let col = 0; col < size; col++) {
                boardReversed[row][col] = getBoard()[col][row];
            }
        }

        return boardReversed.some(row => cellsMatch(row, player));
    };

    // Returns true if either diagonals on the baord is in a winning position for the player, false otherwise
    const checkDiagonal = (player) => {
        const mainDiagonal = [];
        const crossDiagonal = [];

        for (let i = 0; i < size; i++) {
            mainDiagonal.push(getBoard()[i][i]);
            crossDiagonal.push(getBoard()[i][size - i - 1])
        }

        return cellsMatch(mainDiagonal, player) || cellsMatch(crossDiagonal, player);
    };

    // Checks to see if the given player has a winning position on the board
    const isWinner = (player) => checkRows(player) || checkCols(player) || checkDiagonal(player);

    // Returns true if the current Player successfully marked the cell, false otherwise
    const markBoard = (row, col, player) => {
        if (!getBoard()[row][col].getValue()) {
            getBoard()[row][col].markCell(player);
            return true;
        }
        return false;
    }

    // Displays the board to the console, (probably) won't be used for the UI
    const displayBoard = () => {
        console.log(
            `${getBoard()[0][0].getValue()} | ${getBoard()[0][1].getValue()} | ${getBoard()[0][2].getValue()}\n----------\n${getBoard()[1][0].getValue()} | ${getBoard()[1][1].getValue()} | ${getBoard()[1][2].getValue()}\n----------\n${getBoard()[2][0].getValue()} | ${getBoard()[2][1].getValue()} | ${getBoard()[2][2].getValue()}`);
    }

    return { getBoard, markBoard, displayBoard, isWinner };
};

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

/**
 * 
 * @param {String} playerOneName 
 * @param {String} playerTwoName 
 */
const game = (function GameController(playerOneName = "Player 1", playerTwoName = "Player 2") {
    const board = GameBoard(3);

    const players = [
        {
            name: playerOneName,
            token: 1 
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0] // Default to the first player in rotation

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.displayBoard();
        console.log(`It's ${getActivePlayer().name}'s turn to go!`);
    }

    const playRound = (row, col) => {
        console.log(`Placing ${getActivePlayer().name}'s token into Row: ${row} Column: ${col}`);
        if (!board.markBoard(row, col, getActivePlayer().token)) {
            return;
        }

        // check for win condition
        if (board.isWinner(getActivePlayer().token)) {
            console.log(`${getActivePlayer().name} has won!`);
            return; // HANDLE THE WINNER
        }

        switchActivePlayer();
        printNewRound();
    }

    // Initialize the game
    printNewRound();

    return { playRound, getActivePlayer };
})();

