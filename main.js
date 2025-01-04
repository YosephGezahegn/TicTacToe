class TicTacToe {
  constructor() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.scores = { X: 0, O: 0 };
    this.isHardMode = true;
    this.boardElement = document.getElementById('board');
    this.resetBtn = document.getElementById('resetBtn');
    this.difficultyBtn = document.getElementById('difficultyBtn');
    this.statusElement = document.getElementById('status');
    this.xScoreElement = document.querySelector('.x-score span');
    this.oScoreElement = document.querySelector('.o-score span');
    this.init();
  }

  init() {
    this.createBoard();
    this.resetBtn.addEventListener('click', () => this.resetGame());
    this.difficultyBtn.addEventListener('click', () => this.toggleDifficulty());
    this.updateScoreboard();
    this.updateStatus("Your turn (X)");
  }

  toggleDifficulty() {
    this.isHardMode = !this.isHardMode;
    this.difficultyBtn.textContent = `AI: ${this.isHardMode ? 'Hard' : 'Easy'}`;
    this.resetGame();
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
    if (this.board[index] === '' && this.gameActive && this.currentPlayer === 'X') {
      this.makeMove(index);
      
      if (this.gameActive) {
        this.updateStatus("AI is thinking...");
        setTimeout(() => this.makeAIMove(), 500);
      }
    }
  }

  makeMove(index) {
    const cells = document.querySelectorAll('.cell');
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
    this.updateStatus(this.currentPlayer === 'X' ? "Your turn (X)" : "AI's turn (O)");
  }

  makeAIMove() {
    if (!this.gameActive) return;
    
    const index = this.isHardMode ? 
      this.getBestMove() : 
      this.getRandomMove();
    
    this.makeMove(index);
  }

  getBestMove() {
    let bestScore = -Infinity;
    let bestMove = 0;
    
    for (let i = 0; i < 9; i++) {
      if (this.board[i] === '') {
        this.board[i] = 'O';
        let score = this.minimax(this.board, 0, false);
        this.board[i] = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    
    return bestMove;
  }

  minimax(board, depth, isMaximizing) {
    const winner = this.checkWinningPlayer();
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (this.checkDraw()) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'O';
          bestScore = Math.max(bestScore, this.minimax(board, depth + 1, false));
          board[i] = '';
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'X';
          bestScore = Math.min(bestScore, this.minimax(board, depth + 1, true));
          board[i] = '';
        }
      }
      return bestScore;
    }
  }

  getRandomMove() {
    const emptyCells = this.board
      .map((cell, index) => cell === '' ? index : null)
      .filter(cell => cell !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  checkWin() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
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

  checkWinningPlayer() {
    const winningPattern = this.checkWin();
    if (winningPattern) {
      return this.board[winningPattern[0]];
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
    this.updateStatus(this.currentPlayer === 'X' ? "You win!" : "AI wins!");
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
    this.updateStatus("Your turn (X)");
  }
}

new TicTacToe();
