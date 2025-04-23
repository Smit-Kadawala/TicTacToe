import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

type BoardType = Array<string | null>;

const colors = {
  background: "#ECF0F1",
  primary: "#2C3E50",
  xColor: "#E74C3C",
  oColor: "#3498DB",
  textLight: "#FFFFFF",
};

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // winner function
  const gameOver = (squares: BoardType): string | null => {
    // check user win -------------
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    // draw game -------------
    if (squares.every((square) => square !== null)) {
      return "draw";
    }

    return null;
  };

  // Get current game status
  const winner = gameOver(board);

  const handleSquarePress = (index: number) => {
    // If there is data (x or o)
    if (board[index] || winner) return;

    // Update board
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check for winner after this move
    const gameResult = gameOver(newBoard);
    if (gameResult) {
      scoureCount(gameResult);
    }
  };

  // Update scores
  const scoureCount = (result: string) => {
    const newScores = { ...scores };
    if (result === "X") newScores.X += 1;
    else if (result === "O") newScores.O += 1;
    else if (result === "draw") newScores.draws += 1;
    setScores(newScores);
  };

  // let's start again
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // Get status text and color
  const getStatusText = (): string => {
    if (winner === "X" || winner === "O") {
      return `Player ${winner} wins!`;
    } else if (winner === "draw") {
      return "It's a draw!";
    } else {
      return `Player ${isXNext ? "X" : "O"}'s turn`;
    }
  };

  const getStatusColor = (): string => {
    if (winner === "X") return colors.xColor;
    if (winner === "O") return colors.oColor;
    return isXNext ? colors.xColor : colors.oColor;
  };

  const renderSquare = (index: number) => {
    const val = board[index];
    const textColor = val === "X" ? colors.xColor : colors.oColor;

    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handleSquarePress(index)}
        disabled={!!winner || !!val}
      >
        <Text style={[styles.squareText, { color: textColor }]}>{val}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>

      <Text style={[styles.status, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>

      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>X: {scores.X}</Text>
        <Text style={styles.scoreText}>Draws: {scores.draws}</Text>
        <Text style={styles.scoreText}>O: {scores.O}</Text>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  status: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  board: {
    width: 300,
    height: 300,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  square: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  squareText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  resetButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  resetButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
