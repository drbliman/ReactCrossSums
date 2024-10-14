import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayingField } from "../../utils/slices/playingFieldSlice";
import {
  setArrayNumbers,
  setArrayBoolean,
  setArrayAnswers,
} from "../../utils/slices/arrayNumbersSlice";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { LIMITATION_NUMBERS } from "../../utils/constants";
import Table from "../table/table";
import styles from "./playingField.module.scss";
import createGameNumbers from "../../utils/gameNumbers/createGameNumbers";
import createGameBoolean from "../../utils/gameNumbers/createGameBoolean";
import sumColumnsAndRows from "../../utils/gameNumbers/sumColumnsAndRows";
import { setInnerWidth } from "../../utils/slices/innerWidthSlice";
import { setThead } from "../../utils/slices/theadSlice";
import Svg from "../svg/svg";
import { useYandexSDK } from "../../utils/YandexSDKContext";
import Header from "../head/header";
// import backgroundMusic from "../../../public/sound/background.wav";
// import { setMusic } from "../../utils/slices/musicSlice";

interface StateType {
  cellStates: string[][];
  resultStates: boolean[][];
  rowIndex: number;
  cellIndex: number;
  thRowFirstStates: boolean[];
  thColumnFirstStates: boolean[];
  win: boolean;
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
    thRowFirstStates: [],
    thColumnFirstStates: [],
    win: false,
  },
  setState: () => {},
});

export default function PlayingField() {
  const { t } = useTranslation();
  // const music = useSelector((state: RootState) => state.music.music);
  // const musicBackground = new Audio(backgroundMusic);

  const ysdk = useYandexSDK();
  const showAd = () => {
    if (ysdk && ysdk.adv) {
      ysdk.adv
        .showFullscreenAdv()
        .then(() => console.log("Ad shown successfully"))
        .catch((err: any) => console.error("Failed to show ad", err)); // eslint-disable-line
    } else {
      console.error("Yandex SDK is not initialized");
    }
  };

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
  // const music = useSelector((state: RootState) => state.music.music);
  const fieldSize = useSelector((state: RootState) => state.field.size);
  const dispatch = useDispatch();

  const [state, setState] = React.useState<StateType>({
    cellStates: [],
    resultStates: [],
    rowIndex: 0,
    cellIndex: 0,
    thRowFirstStates: [],
    thColumnFirstStates: [],
    win: false,
  });

  const handleClickPlay = () => {
    // musicBackground.play();
    dispatch(setPlayingField(playingField ? true : true));
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
    showAd();
  };

  const handleClickReset = () => {
    resetStateDefault();
    dispatch(setThead(arrayNumbers.map(() => false)));
  };

  const handleClickSolution = () => {
    if (!state.win) {
      setState({
        cellStates: arrayBoolean.map((row) =>
          row.map((elem) => (elem ? "active" : "none")),
        ),
        resultStates: arrayBoolean.map((row) => row.map((elem) => elem)),
        rowIndex: 0,
        cellIndex: 0,
        thRowFirstStates: arrayNumbers.map(() => true),
        thColumnFirstStates: arrayNumbers.map(() => true),
        win: true,
      });
      dispatch(setThead(arrayNumbers.map(() => true)));
    } else {
      handleClickPlay();
    }
  };

  function resetStateDefault() {
    setState({
      cellStates: arrayNumbers.map((row) => row.map(() => "default")),
      resultStates: arrayNumbers.map((row) => row.map(() => true)),
      rowIndex: 0,
      cellIndex: 0,
      thRowFirstStates: arrayNumbers.map(() => false),
      thColumnFirstStates: arrayNumbers.map(() => false),
      win: false,
    });
  }

  React.useEffect(() => {
    console.log(arrayNumbers);
    console.log(arrayBoolean);
    dispatch(setArrayAnswers(sumColumnsAndRows(arrayNumbers, arrayBoolean)));
    resetStateDefault();
  }, [arrayNumbers, arrayBoolean, dispatch, playingField]); // eslint-disable-line

  React.useEffect(() => {
    console.log(arrayAnswers);
  }, [arrayAnswers]);

  // React.useEffect(() => {
  //   if (music) {
  //     musicBackground.play();
  //   } else {
  //     musicBackground.pause();
  //   }
  // }, [music]);

  React.useEffect(() => {
    dispatch(
      setInnerWidth(
        window.innerWidth < 360
          ? LIMITATION_NUMBERS.limit_1
          : LIMITATION_NUMBERS.limit_2,
      ),
    );
  }, []); // eslint-disable-line

  return (
    <>
      <StateContext.Provider value={{ state, setState }}>
        <Header></Header>
        <div className={styles.playingField}>
          <div
            className={`${styles.imgPlay} ${playingField ? styles.none : ""}`}
          >
            <Svg name="play" onClick={handleClickPlay}></Svg>
          </div>
          <div
            className={`${styles.table_conteiner} ${!playingField ? styles.none : ""}`}
          >
            <Table></Table>
          </div>
          <div
            className={`${styles.button_conteiner} ${!playingField ? styles.none : ""}`}
          >
            <button
              className={styles.button}
              onClick={() => handleClickSolution()}
            >
              {state.win ? `${t("continue")}` : `${t("solution")}`}
            </button>
            <button
              className={`${styles.button} ${state.win ? styles.disabled : ""}`}
              onClick={() => handleClickReset()}
              disabled={state.win}
            >
              {t("reset")}
            </button>
          </div>
        </div>
      </StateContext.Provider>
    </>
  );
}
