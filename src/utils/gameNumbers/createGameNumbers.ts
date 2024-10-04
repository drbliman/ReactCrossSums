import randomInteger from "../randomInteger";

export default function createGameNumbers(fieldSize: number) {
  return new Array(fieldSize)
    .fill(null)
    .map(() => new Array(fieldSize).fill(0).map(() => randomInteger(1, 10)));
}
