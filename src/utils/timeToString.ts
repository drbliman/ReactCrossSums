export default function timeToString(time: number) {
  let str = "";
  if (time % 60 < 1) {
    str = `0 : ${time}`;
  }
  if (time % 60 < 60) {
    str = `${time % 60} : ${time - (time % 60) * 60}`;
  }
  return str;
}
