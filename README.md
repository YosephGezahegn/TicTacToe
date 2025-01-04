# Tic Tac Toe Game

A classic Tic Tac Toe game implemented in HTML, CSS, and JavaScript with an AI opponent.

## Features

- Play against an AI opponent
- Two difficulty levels:
  - **Easy**: AI makes random moves
  - **Hard**: AI uses minimax algorithm for optimal moves
- Score tracking
- Winning combination highlighting
- Responsive design
- Smooth animations

## How to Play

1. You play as **X**, the AI plays as **O**
2. Click on any empty cell to make your move
3. The AI will automatically make its move after you
4. Try to get three in a row horizontally, vertically, or diagonally
5. Click "New Game" to start over
6. Toggle between Easy and Hard modes using the "AI: Hard" button

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Vite (development server)

## Project Structure

```
tic-tac-toe/
├── index.html        # Main HTML file
├── style.css         # Stylesheet
├── main.js           # Game logic and AI implementation
├── package.json      # Project dependencies
└── README.md         # This file
```

## AI Implementation

The AI uses two strategies:

1. **Easy Mode**:
   - Randomly selects an available move

2. **Hard Mode**:
   - Uses the minimax algorithm with alpha-beta pruning
   - Always makes the optimal move
   - Impossible to beat (best you can do is a draw)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classic Tic Tac Toe games
- Minimax algorithm based on Artificial Intelligence principles
- Thanks to all open source contributors

## Screenshots

![Game Screenshot](screenshot.png)
