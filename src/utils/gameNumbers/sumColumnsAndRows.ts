export default function sumColumnsAndRows(
  arrayNumbers: number[][],
  arrayBoolean: boolean[][],
): [number[], number[]] {
  if (arrayNumbers.length > 0 && arrayBoolean.length > 0) {
    const rowSums: number[] = [];
    const colSums: number[] = new Array(arrayNumbers[0].length).fill(0);

    for (let i = 0; i < arrayNumbers.length; i++) {
      let rowSum = 0;
      for (let j = 0; j < arrayNumbers[i].length; j++) {
        if (arrayBoolean[i][j]) {
          rowSum += arrayNumbers[i][j];
          colSums[j] += arrayNumbers[i][j];
        }
      }
      rowSums.push(rowSum);
    }

    return [colSums, rowSums];
  } else {
    return [[], []];
  }
}
