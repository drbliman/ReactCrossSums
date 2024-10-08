import React from "react";
import { useTranslation } from "react-i18next";
import { SVG_SRC } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { setField } from "../../utils/slices/fieldSlice";
import { RootState } from "../../store";
import styles from "./settings.module.scss";
// import { setGameMode } from "../../utils/slices/GameModeSlice";
import { setVisibilitySettings } from "../../utils/slices/visibilitySettingsSlice";
import { setlimitatiomNumders } from "../../utils/slices/innerWidthSlice";
import { setNegativeNumbers } from "../../utils/slices/innerWidthSlice";
import { LANGUAGES } from "../../utils/constants";

export default function Settings() {
  const { t, i18n } = useTranslation();

  const [activeLanguage, setActiveLanguage] = React.useState(
    i18n.language || "ru",
  );

  const fieldSize = useSelector((state: RootState) => state.field.size);
  // const gameMode = useSelector((state: RootState) => state.gameMode.mode);
  const innerWidth = useSelector(
    (state: RootState) => state.innerWidth.innerWidth,
  );
  const limitatiomNumders = useSelector(
    (state: RootState) => state.innerWidth.limitationNumders,
  );
  const negativeNumbers = useSelector(
    (state: RootState) => state.innerWidth.negativeNumbers,
  );
  const visibilitySettings = useSelector(
    (state: RootState) => state.visibilitySettings.visibilitySettings,
  );

  const dispatch = useDispatch();

  const handleFieldSizeChange = (n: number) => {
    dispatch(setField(n));
  };

  // const handleGameMode = (mode: string) => {
  //   dispatch(setGameMode(mode));
  // };

  const handleVisibilitySettings = () => {
    dispatch(setVisibilitySettings(!visibilitySettings));
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setActiveLanguage(lang);
  };

  const handlelimitatiomNumders = (index: number) => {
    dispatch(setlimitatiomNumders(index));
  };

  const handleNegativeNumbers = () => {
    dispatch(setNegativeNumbers(!negativeNumbers));
  };

  return (
    <>
      <div
        className={`${styles.settings_container} ${visibilitySettings === true ? styles.active : ""}`}
      >
        <img
          className={styles.img_cross}
          src={SVG_SRC.cross}
          alt="cross"
          onClick={() => handleVisibilitySettings()}
        />
        <div className={styles.settings_title1}>{t("settings")}</div>
        <div className={styles.settings_hidden}>
          <div className={styles.settings_title2}>{t("language")}</div>
          <div className={styles.settings_language}>
            <div
              className={`${styles.language} ${activeLanguage === LANGUAGES.ru.code ? styles.active : ""}`}
              onClick={() => handleLanguageChange(LANGUAGES.ru.code)}
            >
              {LANGUAGES.ru.label}
            </div>
            <div
              className={`${styles.language} ${activeLanguage === LANGUAGES.en.code ? styles.active : ""}`}
              onClick={() => handleLanguageChange(LANGUAGES.en.code)}
            >
              {LANGUAGES.en.label}
            </div>
            <div
              className={`${styles.language} ${activeLanguage === LANGUAGES.tr.code ? styles.active : ""}`}
              onClick={() => handleLanguageChange(LANGUAGES.tr.code)}
            >
              {LANGUAGES.tr.label}
            </div>
          </div>
          <div className={styles.settings_title2}>{t("playingField")}</div>
          <div className={styles.settings_playing_field}>
            <div
              className={`${styles.language} ${fieldSize === 5 ? styles.active : ""}`}
              onClick={() => handleFieldSizeChange(5)}
            >
              5 x 5
            </div>
            <div
              className={`${styles.language} ${fieldSize === 6 ? styles.active : ""}`}
              onClick={() => handleFieldSizeChange(6)}
            >
              6 x 6
            </div>
            <div
              className={`${styles.language} ${fieldSize === 7 ? styles.active : ""}`}
              onClick={() => handleFieldSizeChange(7)}
            >
              7 x 7
            </div>
          </div>
          <div className={styles.settings_title2}>{t("numbers")}</div>
          <div className={styles.settings_playing_field}>
            {innerWidth.map((elem, index) => (
              <div
                className={`${styles.language} ${index === limitatiomNumders ? styles.active : ""}`}
                key={`limitationNumbers_${elem}`}
                onClick={() => handlelimitatiomNumders(index)}
              >{`1 - ${elem}`}</div>
            ))}
          </div>
          <div className={styles.negative_numbers}>
            <div
              className={`${styles.negative_numbers_controller} ${negativeNumbers ? styles.active : ""}`}
              onClick={() => handleNegativeNumbers()}
            ></div>
            <div className={styles.settings_title3}>{t("negativeNumbers")}</div>
          </div>
          {/* <div className={styles.settings_title2}>{t("gameMode")}</div>
          <div className={styles.settings_playing_field}>
            <div
              className={`${styles.language} ${gameMode === GAME_MODE.mode_1 ? styles.active : ""}`}
              onClick={() => handleGameMode(GAME_MODE.mode_1)}
            >
              {t("sum")}
            </div>
            <div
              className={`${styles.language} ${gameMode === GAME_MODE.mode_3 ? styles.active : ""}`}
              onClick={() => handleGameMode(GAME_MODE.mode_3)}
            >
              {t("multiplication")}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
