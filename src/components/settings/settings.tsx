import React from "react";
import { useTranslation } from "react-i18next";
import { SVG_SRC, GAME_MODE } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { setField } from "../../utils/slices/fieldSlice";
import { RootState } from "../../store";
import styles from "./settings.module.scss";
import { setGameMode } from "../../utils/slices/GameModeSlice";
import { setVisibilitySettings } from "../../utils/slices/visibilitySettingsSlice";

export default function Settings() {
  const { t, i18n } = useTranslation();

  const [activeLanguage, setActiveLanguage] = React.useState(
    i18n.language || "ru",
  );

  const fieldSize = useSelector((state: RootState) => state.field.size);
  const gameMode = useSelector((state: RootState) => state.gameMode.mode);
  const visibilitySettings = useSelector(
    (state: RootState) => state.visibilitySettings.visibilitySettings,
  );
  const dispatch = useDispatch();

  const handleSize = (n: number) => {
    dispatch(setField(n));
  };

  const handleGameMode = (mode: string) => {
    dispatch(setGameMode(mode));
  };

  const handleVisibilitySettings = () => {
    if (visibilitySettings) {
      dispatch(setVisibilitySettings(false));
    } else {
      dispatch(setVisibilitySettings(true));
    }
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setActiveLanguage(lang);
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
        <div className={styles.settings_title2}>{t("language")}</div>
        <div className={styles.settings_language}>
          <div
            className={`${styles.language} ${activeLanguage === "ru" ? styles.active : ""}`}
            onClick={() => handleLanguageChange("ru")}
          >
            RU
          </div>
          <div
            className={`${styles.language} ${activeLanguage === "en" ? styles.active : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            EN
          </div>
          <div
            className={`${styles.language} ${activeLanguage === "tr" ? styles.active : ""}`}
            onClick={() => handleLanguageChange("tr")}
          >
            TR
          </div>
        </div>
        <div className={styles.settings_title2}>{t("playingField")}</div>
        <div className={styles.settings_playing_field}>
          <div
            className={`${styles.language} ${fieldSize === 5 ? styles.active : ""}`}
            onClick={() => handleSize(5)}
          >
            5 x 5
          </div>
          <div
            className={`${styles.language} ${fieldSize === 6 ? styles.active : ""}`}
            onClick={() => handleSize(6)}
          >
            6 x 6
          </div>
          <div
            className={`${styles.language} ${fieldSize === 7 ? styles.active : ""}`}
            onClick={() => handleSize(7)}
          >
            7 x 7
          </div>
        </div>
        <div className={styles.settings_title2}>{t("gameMode")}</div>
        <div className={styles.settings_playing_field}>
          <div
            className={`${styles.language} ${gameMode === GAME_MODE.mode_1 ? styles.active : ""}`}
            onClick={() => handleGameMode(GAME_MODE.mode_1)}
          >
            {t("sum")}
          </div>
          <div
            className={`${styles.language} ${gameMode === GAME_MODE.mode_2 ? styles.active : ""}`}
            onClick={() => handleGameMode(GAME_MODE.mode_2)}
          >
            {t("subtraction")}
          </div>
          <div
            className={`${styles.language} ${gameMode === GAME_MODE.mode_3 ? styles.active : ""}`}
            onClick={() => handleGameMode(GAME_MODE.mode_3)}
          >
            {t("multiplication")}
          </div>
        </div>
      </div>
    </>
  );
}
