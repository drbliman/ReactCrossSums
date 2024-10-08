import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayingField } from "../../utils/slices/playingFieldSlice";
import {
  setArrayNumbers,
  setArrayBoolean,
  setArrayAnswers,
} from "../../utils/slices/arrayNumbersSlice";
import { RootState } from "../../store";
import { SVG_SRC } from "../../utils/constants";
import { LIMITATION_NUMBERS } from "../../utils/constants";
import Table from "../table/table";
import styles from "./playingField.module.scss";
import createGameNumbers from "../../utils/gameNumbers/createGameNumbers";
import createGameBoolean from "../../utils/gameNumbers/createGameBoolean";
import sumColumnsAndRows from "../../utils/gameNumbers/sumColumnsAndRows";
import { setInnerWidth } from "../../utils/slices/innerWidthSlice";

interface StateType {
  cellStates: string[][];
  resultStates: boolean[][];
  rowIndex: number;
  cellIndex: number;
}

export const StateContext = React.createContext<{
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
}>({
  state: {
    cellStates: [],
    resultStates: [],
    rowIndex: 0,
    cellIndex: 0,
  },
  setState: () => {},
});

export default function PlayingField() {
  const playingField = useSelector(
    (state: RootState) => state.playingField.playingField,
  );
  const arrayNumbers = useSelector(
    (state: RootState) => state.arrayNumbers.arrayNumbers,
  );
  const arrayBoolean = useSelector(
    (state: RootState) => state.arrayNumbers.arrayBoolean,
  );
  const arrayAnswers = useSelector(
    (state: RootState) => state.arrayNumbers.arrayAnswers,
  );
  const innerWidth = useSelector(
    (state: RootState) => state.innerWidth.innerWidth,
  );
  const limitationNumbers = useSelector(
    (state: RootState) => state.innerWidth.limitationNumders,
  );
  const negativeNumbers = useSelector(
    (state: RootState) => state.innerWidth.negativeNumbers,
  );
  const fieldSize = useSelector((state: RootState) => state.field.size);
  const dispatch = useDispatch();

  const [state, setState] = React.useState<StateType>({
    cellStates: [],
    resultStates: [],
    rowIndex: 0,
    cellIndex: 0,
  });

  const handleClickPlay = () => {
    dispatch(setPlayingField(!playingField));
    dispatch(
      setArrayNumbers(
        createGameNumbers(
          fieldSize,
          innerWidth[limitationNumbers],
          negativeNumbers,
        ),
      ),
    );
    dispatch(setArrayBoolean(createGameBoolean(fieldSize)));
  };

  React.useEffect(() => {
    console.log(arrayNumbers);
    console.log(arrayBoolean);
    dispatch(setArrayAnswers(sumColumnsAndRows(arrayNumbers, arrayBoolean)));
    setState({
      cellStates: arrayNumbers.map((row) => row.map(() => "default")),
      resultStates: arrayNumbers.map((row) => row.map(() => true)),
      rowIndex: 0,
      cellIndex: 0,
    });
  }, [arrayNumbers, arrayBoolean, dispatch]);

  React.useEffect(() => {
    console.log(arrayAnswers);
  }, [arrayAnswers]);

  React.useEffect(() => {
    dispatch(
      setInnerWidth(
        window.innerWidth < 360
          ? LIMITATION_NUMBERS.limit_1
          : LIMITATION_NUMBERS.limit_2,
      ),
    );
  }, []);

  return (
    <>
      <StateContext.Provider value={{ state, setState }}>
        <div className={styles.playingField}>
          <img
            className={`${styles.imgPlay} ${playingField ? styles.none : ""}`}
            src={SVG_SRC.play}
            alt="play"
            onClick={() => handleClickPlay()}
          />
          <div
            className={`${styles.table_conteiner} ${!playingField ? styles.none : ""}`}
          >
            <Table></Table>
          </div>
        </div>
      </StateContext.Provider>
    </>
  );
}
