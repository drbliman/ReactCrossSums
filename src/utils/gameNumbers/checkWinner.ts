export default function checkWinner(
  arrayBoolean: boolean[][],
  resultState: boolean[][],
) {
  for (let i = 0; i < arrayBoolean.length; i += 1) {
    for (let j = 0; j < arrayBoolean[i].length; j += 1) {
      if (arrayBoolean[i][j] !== resultState[i][j]) {
        return false;
      }
    }
  }
  return true;
}
