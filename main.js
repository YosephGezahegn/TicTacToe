class TicTacToe {
  constructor() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.scores = { X: 0, O: 0 };
    this.boardElement = document.getElementById('board');
    this.resetBtn = document.getElementById('resetBtn');
    this.statusElement = document.getElementById('status');
    this.xScoreElement = document.querySelector('.x-score span');
    this.oScoreElement = document.querySelector('.o-score span');
    this.init();
  }

  init() {
    this.createBoard();
    this.resetBtn.addEventListener('click', () => this.resetGame());
    this.updateScoreboard();
  }

  createBoard() {
    this.boardElement.innerHTML = '';
    this.board.forEach((_, index) => {
      const cell = document.createElement('button');
      cell.classList.add('cell');
      cell.dataset.index = index;
      cell.addEventListener('click', () => this.handleCellClick(index));
      this.boardElement.appendChild(cell);
    });
  }

  handleCellClick(index) {
    const cells = document.querySelectorAll('.cell');
    if (this.board[index] === '' && this.gameActive) {
      this.board[index] = this.currentPlayer;
      cells[index].textContent = this.currentPlayer;
      cells[index].classList.add(this.currentPlayer.toLowerCase());
      
      const winningPattern = this.checkWin();
      if (winningPattern) {
        this.handleWin(winningPattern);
        return;
      }
      
      if (this.checkDraw()) {
        this.handleDraw();
        return;
      }
      
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.updateStatus(`Player ${this.currentPlayer}'s turn`);
    }
  }

  checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (this.board[a] && 
          this.board[a] === this.board[b] && 
          this.board[a] === this.board[c]) {
        return pattern;
      }
    }
    return null;
  }

  handleWin(winningPattern) {
    const cells = document.querySelectorAll('.cell');
    winningPattern.forEach(index => {
      cells[index].classList.add('winner');
    });
    
    this.scores[this.currentPlayer]++;
    this.updateScoreboard();
    this.updateStatus(`Player ${this.currentPlayer} wins!`);
    this.gameActive = false;
  }

  handleDraw() {
    this.updateStatus("It's a draw!");
    this.gameActive = false;
  }

  checkDraw() {
    return this.board.every(cell => cell !== '');
  }

  updateStatus(message) {
    this.statusElement.textContent = message;
  }

  updateScoreboard() {
    this.xScoreElement.textContent = this.scores.X;
    this.oScoreElement.textContent = this.scores.O;
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.createBoard();
    this.updateStatus(`Player ${this.currentPlayer}'s turn`);
  }
}

new TicTacToe();
