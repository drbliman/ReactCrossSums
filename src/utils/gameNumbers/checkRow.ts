export default function checkRow({ arrayNumbers, numbers, state }: CheckArgs) {
  let sum = 0;
  arrayNumbers[state.rowIndex].forEach((elem, index) => {
    if (state.resultStates[state.rowIndex][index]) {
      sum += elem;
    }
  });
  return sum === numbers[state.rowIndex];
}

interface CheckArgs {
  arrayNumbers: number[][];
  numbers: number[];
  state: {
    cellStates: string[][];
    resultStates: boolean[][];
    rowIndex: number;
    cellIndex: number;
  };
}
