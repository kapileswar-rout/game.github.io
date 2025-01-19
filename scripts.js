// Script for handling game logic and interactions

let currentPlayer = 'X';
let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

// Check if a player has won
function checkWinner() {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][1] === gameBoard[i][2] &&
      gameBoard[i][0] !== ''
    ) {
      highlightWinningLine([i * 3, i * 3 + 1, i * 3 + 2]); // Row win
      return gameBoard[i][0];
    }

    if (
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[1][i] === gameBoard[2][i] &&
      gameBoard[0][i] !== ''
    ) {
      highlightWinningLine([i, i + 3, i + 6]); // Column win
      return gameBoard[0][i];
    }
  }

  if (
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][2] &&
    gameBoard[0][0] !== ''
  ) {
    highlightWinningLine([0, 4, 8]); // Diagonal win
    return gameBoard[0][0];
  }

  if (
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][0] &&
    gameBoard[0][2] !== ''
  ) {
    highlightWinningLine([2, 4, 6]); // Diagonal win
    return gameBoard[0][2];
  }

  return null;
}

// Highlight the winning line
function highlightWinningLine(indices) {
  indices.forEach(index => {
    cells[index].classList.add('winning-line');
  });
}

// Handle a move
function handleMove(row, col) {
  if (gameBoard[row][col] !== '') return; // Cell already occupied

  gameBoard[row][col] = currentPlayer;
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  // Check for winner
  const winner = checkWinner();
  if (winner) {
    status.textContent = `Player ${winner} wins!`;
    return;
  }

  // Check for draw
  if (gameBoard.flat().every(cell => cell !== '')) {
    status.textContent = "It's a draw!";
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'winning-line');
  });
  currentPlayer = 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    handleMove(row, col);
  });
});

// Add reset button event listener
resetButton.addEventListener('click', resetGame);
