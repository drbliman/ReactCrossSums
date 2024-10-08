import randomInteger from "../randomInteger";

export default function createGameNumbers(
  fieldSize: number,
  max: number,
  negativeNumbers: boolean,
) {
  if (!negativeNumbers) {
    return new Array(fieldSize)
      .fill(null)
      .map(() => new Array(fieldSize).fill(0).map(() => randomInteger(1, max)));
  } else {
    return new Array(fieldSize)
      .fill(null)
      .map(() =>
        new Array(fieldSize).fill(0).map(() => randomInteger(-max, max)),
      );
  }
}
