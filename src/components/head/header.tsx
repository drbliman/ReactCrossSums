import React from "react";
import styles from "../settings/settings.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setVisibilitySettings } from "../../utils/slices/visibilitySettingsSlice";
import { setVisibilityRules } from "../../utils/slices/visibilityRulesSlice";
import { RootState } from "../../store";
import Svg from "../svg/svg";
import { useYandexSDK } from "../../utils/YandexSDKContext";
import { StateContext } from "../playingField/playingField";
import updateStates from "../../utils/updateStates";
import { checkAllRows } from "../../utils/gameNumbers/checkRow";
import { checkAllColumns } from "../../utils/gameNumbers/checkColumn";
import { setThead } from "../../utils/slices/theadSlice";
import checkWinner from "../../utils/gameNumbers/checkWinner";
import { setMusic } from "../../utils/slices/musicSlice";

export default function Header() {
  const ysdk = useYandexSDK();
  const playerRef = React.useRef<any | null>(null); // eslint-disable-line
  const [quantityClue, setQuantityClue] = React.useState(0);
  const { state, setState } = React.useContext(StateContext);
  const arrayBoolean = useSelector(
    (state: RootState) => state.arrayNumbers.arrayBoolean,
  );
  const arrayNumbers = useSelector(
    (state: RootState) => state.arrayNumbers.arrayNumbers,
  );
  const arrayAnswers = useSelector(
    (state: RootState) => state.arrayNumbers.arrayAnswers,
  );
  const playingField = useSelector(
    (state: RootState) => state.playingField.playingField,
  );
  const music = useSelector((state: RootState) => state.music.music);

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
              console.log(stats.clue_x02);
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

  const [musicIcon, setMusicIcon] = React.useState<"music_on" | "music_off">(
    "music_on",
  );

  const visibilitySettings = useSelector(
    (state: RootState) => state.visibilitySettings.visibilitySettings,
  );
  const visibilityRules = useSelector(
    (state: RootState) => state.visibilityRules.visibilityRules,
  );
  const dispatch = useDispatch();

  const handleVisibilitySettings = () => {
    dispatch(setVisibilitySettings(!visibilitySettings));
    dispatch(setVisibilityRules(false));
  };

  const handleVisibilityRules = () => {
    dispatch(setVisibilityRules(!visibilityRules));
    dispatch(setVisibilitySettings(false));
  };

  const handleClickMusic = () => {
    dispatch(setMusic(!music));
    setMusicIcon((musicIcon) =>
      musicIcon === "music_on" ? "music_off" : "music_on",
    );
  };

  const handleClickIdea = () => {
    if (quantityClue > 0) {
      const newClue = quantityClue - 1;
      setQuantityClue(newClue);
      playerRef.current.incrementStats({ clue_x02: -1 });
      const newState = updateStates(
        arrayBoolean,
        state.resultStates,
        state.cellStates,
      );
      console.log(newState.index);
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
          onRewarded: () => {
            playerRef.current.incrementStats({ clue_x02: 3 });
            setQuantityClue(3);
          },
        },
      });
    }
  };

  return (
    <>
      <header className={styles.header}>
        <Svg name={musicIcon} onClick={handleClickMusic}></Svg>
        <Svg name="settings" onClick={handleVisibilitySettings}></Svg>
        <Svg name="book" onClick={handleVisibilityRules}></Svg>
        <div
          className={`${styles.idea_container} ${!playingField || state.win ? styles.disabled : ""}`}
        >
          <Svg name="idea" onClick={handleClickIdea}></Svg>
        </div>
        <div className={styles.quantityClue}>
          {quantityClue > 0 ? quantityClue : <Svg name="play_1"></Svg>}
        </div>
      </header>
    </>
  );
}
