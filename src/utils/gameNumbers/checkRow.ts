export default function checkRow({ arrayNumbers, numbers, state }: CheckArgs) {
  let sum = 0;
  arrayNumbers[state.rowIndex].forEach((elem, index) => {
    if (state.resultStates[state.rowIndex][index]) {
      sum += elem;
    }
  });
  return sum === numbers[state.rowIndex];
}

export function checkAllRows({
  arrayNumbers,
  numbers,
  resultStates,
}: CheckAllRowsArgs): boolean[] {
  return arrayNumbers.map((row, rowIndex) => {
    let sum = 0;
    row.forEach((elem, index) => {
      if (resultStates[rowIndex][index]) {
        sum += elem;
      }
    });
    return sum === numbers[rowIndex];
  });
}

interface CheckAllRowsArgs {
  arrayNumbers: number[][];
  numbers: number[];
  resultStates: boolean[][];
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
