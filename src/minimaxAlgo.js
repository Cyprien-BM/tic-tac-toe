import checkVictoryCondition from './checkVictory';

const nextMove = (board, iaSymbol, userSymbol) => {
  const depth = board.filter((value) => value === '-').length - 1;

  let results = [];

  const minimaxAlorithm = (boardSimulated, depth, maximizingPlayer) => {
    if (checkVictoryCondition(boardSimulated) && !maximizingPlayer) {
      return 1;
    } else if (checkVictoryCondition(boardSimulated) && maximizingPlayer) {
      return -1;
    } else if (depth === 0) {
      return 0;
    }

    if (maximizingPlayer) {
      let bestScore = -Infinity;
      for (const [index, value] of boardSimulated.entries()) {
        if (value === '-') {
          let newBoard = [...boardSimulated];
          newBoard[index] = iaSymbol;
          let score = minimaxAlorithm(newBoard, depth - 1, false) + depth;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const [index, value] of boardSimulated.entries()) {
        if (value === '-') {
          let newBoard = [...boardSimulated];
          newBoard[index] = userSymbol;
          let score = minimaxAlorithm(newBoard, depth - 1, true) - depth;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  board.forEach((value, index) => {
    if (value === '-') {
      let newBoard = [...board];
      newBoard[index] = iaSymbol;
      if (checkVictoryCondition(newBoard)) {
        results.push({
          index: index,
          resultValue: 1 + depth,
        });
      } else {
        newBoard.forEach((value, index) => {
          if (value === '-') {
            results.push({
              index: index,
              resultValue: minimaxAlorithm(newBoard, depth, false),
            });
          }
        });
      }
    }
  });

  let newResults = [];
  for (const result of results) {
    let index = newResults.findIndex(
      (newResult) => newResult.index === result.index
    );
    if (index === -1) {
      newResults.push(result);
    } else {
      newResults[index].resultValue += result.resultValue;
    }
  }

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  if (results.some((result) => result.resultValue >= 1)) {
    let allVictory = results
      .filter((result, index) => result.resultValue >= 1)
      .sort((a, b) => {
        return b.resultValue - a.resultValue;
      });
    return allVictory[0].index;
  } else if (results.some((result) => result.resultValue === 0)) {
    let allDraw = results.filter((result, index) => result.resultValue === 0);
    return allDraw[getRandomNumber(allDraw.length)].index;
  } else {
    for (const result of results) {
      let index = newResults.findIndex(
        (newResult) => newResult.index === result.index
      );
      if (index === -1) {
        newResults.push(result);
      } else {
        newResults[index].resultValue += result.resultValue;
      }
    }
    console.log(results);
    console.log(newResults);
    newResults.sort((a, b) => {
      return a.resultValue - b.resultValue;
    });
    return newResults[0].index;
  }
};

export default nextMove;
