import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Thead from "./theader";
import Tbody from "./tbody";

export default function Table() {
  const [loader, setLoader] = React.useState(true);
  // const fieldSize = useSelector((state: RootState) => state.field.size);
  const arrayNumbers = useSelector(
    (state: RootState) => state.arrayNumbers.arrayNumbers,
  );
  const arrayAnswers = useSelector(
    (state: RootState) => state.arrayNumbers.arrayAnswers,
  );

  React.useEffect(() => {
    if (arrayAnswers[1].length > 0) {
      setLoader(false);
    }
  }, [arrayAnswers]);

  //TODO: loader
  if (loader) {
    return <p>Загрузка игрового поля...</p>;
  }

  return (
    <>
      <table>
        <Thead numbers={arrayAnswers[0]}></Thead>
        <Tbody numbers={arrayAnswers[1]} arrayNumbers={arrayNumbers}></Tbody>
      </table>
    </>
  );
}
