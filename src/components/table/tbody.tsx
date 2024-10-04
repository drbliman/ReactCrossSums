import React from "react";
import styles from "./table.module.scss";

export default function Tbody({ numbers, arrayNumbers }: TbodyProps) {
  const [cellStates, setCellStates] = React.useState<string[][]>(
    arrayNumbers.map((row) => row.map(() => "default")),
  );

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    setCellStates((prevState) => {
      const newStates = prevState.map((row) => [...row]);
      const currentClass = newStates[rowIndex][cellIndex];

      const newClass =
        currentClass === "default"
          ? "none"
          : currentClass === "none"
            ? "active"
            : "default";

      newStates[rowIndex][cellIndex] = newClass;

      return newStates;
    });
  };

  return (
    <>
      <tbody>
        {arrayNumbers.map((elem, rowIndex) => (
          <tr key={`tr${rowIndex}_${elem}`}>
            <th className={styles.th_one} key={`th${rowIndex}_${elem}`}>
              {numbers[rowIndex]}
            </th>
            {elem.map((e, cellIndex) => (
              <th
                className={`${styles.th} ${
                  cellStates[rowIndex][cellIndex] === "none"
                    ? styles.none
                    : cellStates[rowIndex][cellIndex] === "active"
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
  numbers: number[];
  arrayNumbers: number[][];
}
