import React from "react";
import styles from "./table.module.scss";
import checkRow from "../../utils/gameNumbers/checkRow";
import checkColumn from "../../utils/gameNumbers/checkColumn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setThead } from "../../utils/slices/theadSlice";

export default function Tbody({
  numbersCheck,
  numbers,
  arrayNumbers,
}: TbodyProps) {
  const [state, setState] = React.useState({
    cellStates: arrayNumbers.map((row) => row.map(() => "default")),
    resultStates: arrayNumbers.map((row) => row.map(() => true)),
    rowIndex: 0,
    cellIndex: 0,
  });

  const [firstStates, setThStates] = React.useState({
    thRowFirstStates: arrayNumbers.map(() => false),
    thColumnFirstStates: arrayNumbers.map(() => false),
  });

  const thColumnFirst = useSelector((state: RootState) => state.thead);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setThead(arrayNumbers.map(() => false)));
  }, [arrayNumbers]);

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    setState((prevState) => {
      const newCellStates = prevState.cellStates.map((row) => [...row]);
      const newResultStates = prevState.resultStates.map((row) => [...row]);

      const currentClass = newCellStates[rowIndex][cellIndex];

      const newClass =
        currentClass === "default"
          ? "none"
          : currentClass === "none"
            ? "active"
            : "default";

      newCellStates[rowIndex][cellIndex] = newClass;

      newResultStates[rowIndex][cellIndex] = !(newClass === "none");

      setTimeout(() => {
        dispatch(
          setThead(
            thColumnFirst.thead.map((value, index) => {
              return index === cellIndex
                ? checkColumn({
                    arrayNumbers,
                    numbersCheck,
                    state: {
                      ...prevState,
                      resultStates: newResultStates,
                      cellIndex: cellIndex,
                    },
                  })
                : value;
            }),
          ),
        );
      }, 0);

      return {
        cellStates: newCellStates,
        resultStates: newResultStates,
        rowIndex: rowIndex,
        cellIndex: cellIndex,
      };
    });
  };

  React.useEffect(() => {
    setThStates((prevState) => {
      const newStates = prevState.thRowFirstStates.map((value, index) => {
        return index === state.rowIndex
          ? checkRow({ arrayNumbers, numbers, state })
          : value;
      });

      return { ...prevState, thRowFirstStates: newStates };
    });
  }, [arrayNumbers, numbers, state]);

  return (
    <>
      <tbody>
        {arrayNumbers.map((elem, rowIndex) => (
          <tr key={`tr${rowIndex}_${elem}`}>
            <th
              className={`${styles.th_one} ${firstStates.thRowFirstStates[rowIndex] ? styles.active : ""}`}
              key={`th${rowIndex}_${elem}`}
            >
              {numbers[rowIndex]}
            </th>
            {elem.map((e, cellIndex) => (
              <th
                className={`${styles.th} ${
                  state.cellStates[rowIndex][cellIndex] === "none"
                    ? styles.none
                    : state.cellStates[rowIndex][cellIndex] === "active"
                      ? styles.active
                      : ""
                }`}
                key={`${cellIndex}_${e}`}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                {e}
              </th>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
}

interface TbodyProps {
  numbersCheck: number[];
  numbers: number[];
  arrayNumbers: number[][];
}
