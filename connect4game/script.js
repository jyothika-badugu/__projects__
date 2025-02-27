var playerred = "R";
var playeryellow = "Y";
var currplayer = playerred;
var lastplayer = null;  // Track the last player who made a move
var gameover = false;
var board;
var currcolumns;
var rows = 6;
var columns = 7;

window.onload = function () {
    setgame();
};

function setgame() {
    board = [];
    currcolumns = [5, 5, 5, 5, 5, 5, 5]; // Tracks the current available row for each column

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' '); // Empty cell
            let title = document.createElement("div");
            title.id = r.toString() + "-" + c.toString();
            title.classList.add("title");
            title.addEventListener("click", setpiece);
            document.getElementById("board").append(title);
        }
        board.push(row);
    }
}

function setpiece() {
    if (gameover) {
        return; // Stop the game if it's over
    }

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);

    // Get the current available row in the clicked column
    let r = currcolumns[c];

    if (r < 0) {
        return; // Column is full, no more moves possible
    }

    // Place the piece on the board
    board[r][c] = currplayer;
    let title = document.getElementById(r.toString() + "-" + c.toString());

    // Add the respective piece class
    if (currplayer === playerred) {
        title.classList.add("red-piece");
        lastplayer = playerred;  // Track the last player before switching
        currplayer = playeryellow; // Switch to yellow player
    } else {
        title.classList.add("yellow-piece");
        lastplayer = playeryellow;  // Track the last player before switching
        currplayer = playerred; // Switch to red player
    }

    // Update the available row for this column (move it up one row)
    currcolumns[c] -= 1;

    checkwinner(); // Check for the winner after placing the piece
}

function checkwinner() {
    // Check horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r][c + 1] && board[r][c] === board[r][c + 2] && board[r][c] === board[r][c + 3]) {
                setwinner(r, c);
                return;
            }
        }
    }

    // Check vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r + 1][c] && board[r][c] === board[r + 2][c] && board[r][c] === board[r + 3][c]) {
                setwinner(r, c);
                return;
            }
        }
    }

    // Diagonal (bottom-left to top-right)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r + 1][c + 1] && board[r][c] === board[r + 2][c + 2] && board[r][c] === board[r + 3][c + 3]) {
                setwinner(r, c);
                return;
            }
        }
    }

    // Diagonal (top-left to bottom-right)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r - 1][c + 1] && board[r][c] === board[r - 2][c + 2] && board[r][c] === board[r - 3][c + 3]) {
                setwinner(r, c);
                return;
            }
        }
    }
}

function setwinner(r, c) {
    gameover = true; // End the game once there's a winner
    let winner = document.getElementById("winner");
    if (lastplayer === playerred) {
        winner.innerText = "RED WINS";
    } else {
        winner.innerText = "YELLOW WINS";
    }
}
