import React from "react";
import styles from "./table.module.scss";
import checkRow from "../../utils/gameNumbers/checkRow";
import checkColumn from "../../utils/gameNumbers/checkColumn";
import checkWinner from "../../utils/gameNumbers/checkWinner";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setThead } from "../../utils/slices/theadSlice";
import { StateContext } from "../playingField/playingField";

export default function Tbody({
  numbersCheck,
  numbers,
  arrayNumbers,
}: TbodyProps) {
  const { state, setState } = React.useContext(StateContext);

  const thColumnFirst = useSelector((state: RootState) => state.thead);
  const dispatch = useDispatch();

  const arrayBoolean = useSelector(
    (state: RootState) => state.arrayNumbers.arrayBoolean,
  );

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
        ...prevState,
        cellStates: newCellStates,
        resultStates: newResultStates,
        rowIndex: rowIndex,
        cellIndex: cellIndex,
        win: checkWinner(arrayBoolean, newResultStates),
      };
    });
  };

  React.useEffect(() => {
    console.log(state);
    setState((prevState) => {
      const newStates = prevState.thRowFirstStates.map((value, index) => {
        return index === state.rowIndex
          ? checkRow({ arrayNumbers, numbers, state })
          : value;
      });

      return { ...prevState, thRowFirstStates: newStates };
    });
  }, [arrayNumbers, numbers, state.resultStates]);

  if (state.cellStates.length === 0 || state.resultStates.length === 0) {
    return null;
  }

  if (!arrayNumbers || !state.cellStates || !state.resultStates) {
    return null;
  }

  if (
    state.cellStates.length !== arrayNumbers.length ||
    state.resultStates.length !== arrayNumbers.length
  ) {
    return null;
  }

  return (
    <>
      <tbody>
        {arrayNumbers.map((elem, rowIndex) => (
          <tr key={`tr${rowIndex}_${elem}`}>
            <th
              className={`${styles.th_one} ${state.thRowFirstStates[rowIndex] ? styles.active : ""}`}
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
