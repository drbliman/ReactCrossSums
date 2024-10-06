import randomInteger from "../randomInteger";

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function createGameBoolean(fieldSize: number) {
  const totalCells = fieldSize * fieldSize;
  const halfCells = Math.floor(totalCells / 2);

  const booleanArray = new Array(halfCells)
    .fill(true)
    .concat(new Array(totalCells - halfCells).fill(false));

  const shuffledArray = shuffleArray(booleanArray);

  const gameField = [];
  for (let i = 0; i < fieldSize; i++) {
    gameField.push(shuffledArray.slice(i * fieldSize, (i + 1) * fieldSize));
  }

  for (let i = 0; i < fieldSize; i++) {
    if (!gameField[i].includes(true)) {
      const randomIndex = randomInteger(0, fieldSize - 1);
      gameField[i][randomIndex] = true;
    }
  }

  for (let j = 0; j < fieldSize; j++) {
    let hasTrueInColumn = false;
    for (let i = 0; i < fieldSize; i++) {
      if (gameField[i][j] === true) {
        hasTrueInColumn = true;
        break;
      }
    }

    if (!hasTrueInColumn) {
      const randomRow = randomInteger(0, fieldSize - 1);
      gameField[randomRow][j] = true;
    }
  }

  for (let i = 0; i < fieldSize; i++) {
    if (!gameField[i].includes(false)) {
      const randomIndex = randomInteger(0, fieldSize - 1);
      gameField[i][randomIndex] = false;
    }
  }

  for (let j = 0; j < fieldSize; j++) {
    let hasFalseInColumn = false;
    for (let i = 0; i < fieldSize; i++) {
      if (gameField[i][j] === false) {
        hasFalseInColumn = true;
        break;
      }
    }

    if (!hasFalseInColumn) {
      const randomRow = randomInteger(0, fieldSize - 1);
      gameField[randomRow][j] = false;
    }
  }

  return gameField;
}
