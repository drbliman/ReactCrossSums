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
import Table from "../table/table";
import styles from "./playingField.module.scss";
import createGameNumbers from "../../utils/gameNumbers/createGameNumbers";
import createGameBoolean from "../../utils/gameNumbers/createGameBoolean";
import sumColumnsAndRows from "../../utils/gameNumbers/sumColumnsAndRows";

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
  const fieldSize = useSelector((state: RootState) => state.field.size);
  const dispatch = useDispatch();

  const handleClickPlay = () => {
    dispatch(setPlayingField(!playingField));
    dispatch(setArrayNumbers(createGameNumbers(fieldSize)));
    dispatch(setArrayBoolean(createGameBoolean(fieldSize)));
  };

  React.useEffect(() => {
    console.log(arrayNumbers);
    console.log(arrayBoolean);
    dispatch(setArrayAnswers(sumColumnsAndRows(arrayNumbers, arrayBoolean)));
  }, [arrayNumbers, arrayBoolean, dispatch]);

  React.useEffect(() => {
    console.log(arrayAnswers);
  }, [arrayAnswers]);

  return (
    <>
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
    </>
  );
}
