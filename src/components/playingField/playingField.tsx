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
import { setPlayingFieldFirst } from "../../utils/slices/playingFieldSlice";
import Svg from "../svg/svg";
import { useYandexSDK } from "../../utils/YandexSDKContext";
import Header from "../head/header";
import updateStates from "../../utils/updateStates";
import checkWinner from "../../utils/gameNumbers/checkWinner";
import { checkAllColumns } from "../../utils/gameNumbers/checkColumn";
import { checkAllRows } from "../../utils/gameNumbers/checkRow";

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

  const playerRef = React.useRef<any | null>(null); // eslint-disable-line
  const [quantityClue, setQuantityClue] = React.useState(0);

  const ysdk = useYandexSDK();
  const showAd = () => {
    if (ysdk && ysdk.adv) {
      ysdk.adv.showFullscreenAdv({
        callbacks: {
          onOpen: function () {
            if (ysdk?.features?.LoadingAPI) {
              ysdk.features.GameplayAPI.stop();
            }
          },
          onClose: function () {
            if (ysdk?.features?.LoadingAPI) {
              ysdk.features.GameplayAPI.start();
            }
          },
          onError: function (error: Error) {
            console.error("Error displaying ad:", error.message);
            if (ysdk?.features?.LoadingAPI) {
              ysdk.features.GameplayAPI.start();
            }
          },
          onOffline: function () {
            console.warn("No internet connection");
            if (ysdk?.features?.LoadingAPI) {
              ysdk.features.GameplayAPI.start();
            }
          },
        },
      });
    } else {
      console.error("Yandex SDK is not initialized");
    }
  };

  React.useEffect(() => {
    if (ysdk && ysdk.getPlayer) {
      ysdk
        .getPlayer({ scopes: false })
        .then((_player: Promise<object>) => {
          playerRef.current = _player;
          playerRef.current.getStats(["clue_x02"]).then((stats: any) => { // eslint-disable-line
            if (stats.clue_x02 === undefined) {
              playerRef.current.setStats({ clue_x02: 3 });
              setQuantityClue(3);
            } else {
              setQuantityClue(stats.clue_x02);
            }
          });
        })
        .catch((err: Promise<object>) => {
          console.log(err);
        });
    } else {
      console.error("Yandex SDK is not initialized");
    }
  }, [ysdk]);

  const playingField = useSelector(
    (state: RootState) => state.playingField.playingField,
  );
  const playingFieldFirst = useSelector(
    (state: RootState) => state.playingField.playingFieldFirst,
  );
  const arrayNumbers = useSelector(
    (state: RootState) => state.arrayNumbers.arrayNumbers,
  );
  const arrayBoolean = useSelector(
    (state: RootState) => state.arrayNumbers.arrayBoolean,
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
  const arrayAnswers = useSelector(
    (state: RootState) => state.arrayNumbers.arrayAnswers,
  );
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

  React.useEffect(() => {
    if (playingFieldFirst) {
      setPlayingFieldFirst(!playingFieldFirst);
      window.YaGames.init()
        .then((ysdk) => {
          ysdk.features.LoadingAPI?.ready();
        })
        .catch(console.error);
    }
  }, []); // eslint-disable-line

  const handleClickPlay = () => {
    if (ysdk?.features?.LoadingAPI) {
      ysdk.features.GameplayAPI.start();
    }
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

  // const handleClickSolution = () => {
  //   if (!state.win) {
  //     setState({
  //       cellStates: arrayBoolean.map((row) =>
  //         row.map((elem) => (elem ? "active" : "none")),
  //       ),
  //       resultStates: arrayBoolean.map((row) => row.map((elem) => elem)),
  //       rowIndex: 0,
  //       cellIndex: 0,
  //       thRowFirstStates: arrayNumbers.map(() => true),
  //       thColumnFirstStates: arrayNumbers.map(() => true),
  //       win: true,
  //     });
  //     dispatch(setThead(arrayNumbers.map(() => true)));
  //   } else {
  //     handleClickPlay();
  //   }
  // };

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
    dispatch(setArrayAnswers(sumColumnsAndRows(arrayNumbers, arrayBoolean)));
    resetStateDefault();
  }, [arrayNumbers, arrayBoolean, dispatch, playingField]); // eslint-disable-line

  React.useEffect(() => {
    dispatch(
      setInnerWidth(
        window.innerWidth < 360
          ? LIMITATION_NUMBERS.limit_1
          : LIMITATION_NUMBERS.limit_2,
      ),
    );
  }, []); // eslint-disable-line

  const handleClickIdea = () => {
    if (!state.win) {
      if (quantityClue > 0) {
        const newClue = quantityClue - 1;
        setQuantityClue(newClue);
        playerRef.current.incrementStats({ clue_x02: -1 });
        const newState = updateStates(
          arrayBoolean,
          state.resultStates,
          state.cellStates,
        );
        const rowArg = {
          arrayNumbers: arrayNumbers,
          numbers: arrayAnswers[1],
          resultStates: newState.resultStates,
        };
        const colArg = {
          arrayNumbers: arrayNumbers,
          numbersCheck: arrayAnswers[0],
          resultStates: newState.resultStates,
        };
        setState((prevState) => {
          return {
            ...prevState,
            cellStates: newState.cellStates,
            resultStates: newState.resultStates,
            win: checkWinner(arrayBoolean, newState.resultStates),
          };
        });
        setState((prevState) => {
          const newStates_1 = checkAllRows(rowArg);
          return { ...prevState, thRowFirstStates: newStates_1 };
        });
        dispatch(setThead(checkAllColumns(colArg)));
      } else {
        ysdk.adv.showRewardedVideo({
          callbacks: {
            onOpen: () => {
              if (ysdk?.features?.LoadingAPI) {
                ysdk.features.GameplayAPI.stop();
              }
            },
            onClose: () => {
              if (ysdk?.features?.LoadingAPI) {
                ysdk.features.GameplayAPI.start();
              }
            },
            onError: function (error: Error) {
              console.error("Error displaying ad:", error.message);
              if (ysdk?.features?.LoadingAPI) {
                ysdk.features.GameplayAPI.start();
              }
            },
            onRewarded: () => {
              playerRef.current.incrementStats({ clue_x02: 3 });
              setQuantityClue(3);
              if (ysdk?.features?.LoadingAPI) {
                ysdk.features.GameplayAPI.start();
              }
            },
          },
        });
      }
    } else {
      handleClickPlay();
    }
  };

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
              className={`${styles.button} ${quantityClue === 0 ? styles.height : ""}`}
              onClick={() => handleClickIdea()}
            >
              {state.win
                ? `${t("continue")}`
                : quantityClue > 0
                  ? `${t("clue")} (${quantityClue})`
                  : t("advertisement")}
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
