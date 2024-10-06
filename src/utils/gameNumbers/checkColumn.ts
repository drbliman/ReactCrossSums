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
