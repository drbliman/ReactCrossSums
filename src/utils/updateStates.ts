type Result = {
  resultStates: boolean[][];
  cellStates: string[][];
  isRow: boolean;
  index: number;
};

export default function updateStates(
  arrayBoolean: boolean[][],
  resultStates: boolean[][],
  cellStates: string[][],
): Result {
  const numRows = arrayBoolean.length;
  const numCols = arrayBoolean[0].length;

  let maxMismatches = -1;
  let rowOrColIndex = -1;
  let isRow = true;

  const countMismatchesRow = (row: number): number => {
    let mismatches = 0;
    for (let col = 0; col < numCols; col++) {
      if (arrayBoolean[row][col] !== resultStates[row][col]) {
        mismatches++;
      }
    }
    return mismatches;
  };

  const countMismatchesCol = (col: number): number => {
    let mismatches = 0;
    for (let row = 0; row < numRows; row++) {
      if (arrayBoolean[row][col] !== resultStates[row][col]) {
        mismatches++;
      }
    }
    return mismatches;
  };

  for (let row = 0; row < numRows; row++) {
    const mismatches = countMismatchesRow(row);
    if (mismatches > maxMismatches) {
      maxMismatches = mismatches;
      rowOrColIndex = row;
      isRow = true;
    }
  }

  for (let col = 0; col < numCols; col++) {
    const mismatches = countMismatchesCol(col);
    if (mismatches > maxMismatches) {
      maxMismatches = mismatches;
      rowOrColIndex = col;
      isRow = false;
    }
  }

  if (isRow) {
    for (let col = 0; col < numCols; col++) {
      resultStates[rowOrColIndex][col] = arrayBoolean[rowOrColIndex][col];
      cellStates[rowOrColIndex][col] = arrayBoolean[rowOrColIndex][col]
        ? "active"
        : "none";
    }
  } else {
    for (let row = 0; row < numRows; row++) {
      resultStates[row][rowOrColIndex] = arrayBoolean[row][rowOrColIndex];
      cellStates[row][rowOrColIndex] = arrayBoolean[row][rowOrColIndex]
        ? "active"
        : "none";
    }
  }

  return {
    resultStates,
    cellStates,
    isRow,
    index: rowOrColIndex,
  };
}
