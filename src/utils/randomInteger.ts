export default function randomInteger(min: number, max: number) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand) === 0 ? Math.floor(rand) + 1 : Math.floor(rand);
}
