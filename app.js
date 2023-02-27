const tiles = document.querySelectorAll('.tile');
const message = document.getElementById('msg');
const resetButton = document.querySelector('.reset');
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let currentPlayer = 'X';
let gameEnded = false;

tiles.forEach(tile => {
  tile.addEventListener('click', handleTileClick);
});

resetButton.addEventListener('click', resetGame);

function handleTileClick() {
  if (gameEnded) {
    return;
  }

  // check if the tile is already taken
  if (this.textContent !== '') {
    message.textContent = 'This tile is already taken!';
    return;
  }

  // mark the tile with the current player
  this.textContent = currentPlayer;

  // check if the current player has won
  if (checkWin()) {
    message.textContent = `Hooray! Player ${currentPlayer} has won!`;
    gameEnded = true;
    markWinningTiles();
    return;
  }

  // check if it's a tie
  if (checkTie()) {
    message.textContent = 'It\'s a tie!';
    gameEnded = true;
    return;
  }

  // switch to the other player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `It's Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return tiles[index].textContent === currentPlayer;
    });
  });
}

function checkTie() {
  return [...tiles].every(tile => {
    return tile.textContent !== '';
  });
}

function markWinningTiles() {
  winningCombinations.forEach(combination => {
    if (tiles[combination[0]].textContent === currentPlayer &&
        tiles[combination[1]].textContent === currentPlayer &&
        tiles[combination[2]].textContent === currentPlayer) {
      tiles[combination[0]].classList.add('winning');
      tiles[combination[1]].classList.add('winning');
      tiles[combination[2]].classList.add('winning');
    }
  });
}

function resetGame() {
  tiles.forEach(tile => {
    tile.textContent = '';
    tile.classList.remove('winning');
  });
  currentPlayer = 'X';
  gameEnded = false;
  message.textContent = `It's Player ${currentPlayer}'s turn`;
}
