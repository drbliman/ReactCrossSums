export default function checkColumn({
  arrayNumbers,
  numbersCheck,
  state,
}: CheckArgs) {
  let sum = 0;
  for (let i = 0; i < arrayNumbers.length; i += 1) {
    if (state.resultStates[i][state.cellIndex]) {
      sum += arrayNumbers[i][state.cellIndex];
    }
  }
  return sum === numbersCheck[state.cellIndex];
}

export function checkAllColumns({
  arrayNumbers,
  numbersCheck,
  resultStates,
}: CheckAllColumnsArgs): boolean[] {
  const columnCount = arrayNumbers[0].length;

  return Array.from({ length: columnCount }, (_, colIndex) => {
    let sum = 0;
    for (let rowIndex = 0; rowIndex < arrayNumbers.length; rowIndex += 1) {
      if (resultStates[rowIndex][colIndex]) {
        sum += arrayNumbers[rowIndex][colIndex];
      }
    }
    return sum === numbersCheck[colIndex];
  });
}

interface CheckAllColumnsArgs {
  arrayNumbers: number[][];
  numbersCheck: number[];
  resultStates: boolean[][];
}

interface CheckArgs {
  arrayNumbers: number[][];
  numbersCheck: number[];
  state: {
    cellStates: string[][];
    resultStates: boolean[][];
    rowIndex: number;
    cellIndex: number;
  };
}
