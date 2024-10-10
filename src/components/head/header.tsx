import React from "react";
import Icon from "./headerIcon";
import { SVG_SRC } from "../../utils/constants";
import styles from "../settings/settings.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setVisibilitySettings } from "../../utils/slices/visibilitySettingsSlice";
import { setVisibilityRules } from "../../utils/slices/visibilityRulesSlice";
import { RootState } from "../../store";

export default function Header() {
  const [musicIcon, setMusicIcon] = React.useState(SVG_SRC.music_on);

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
    setMusicIcon((musicIcon) =>
      musicIcon === SVG_SRC.music_on ? SVG_SRC.music_off : SVG_SRC.music_on,
    );
  };

  return (
    <>
      <header className={styles.header}>
        <Icon src={musicIcon} alt="toggle music" onClick={handleClickMusic} />
        <Icon
          src={SVG_SRC.settings}
          alt="settings"
          onClick={handleVisibilitySettings}
        />
        <Icon src={SVG_SRC.book} alt="book" onClick={handleVisibilityRules} />
        <Icon src={SVG_SRC.idea} alt="idea" />
        <Icon src={SVG_SRC.brush} alt="brush" />
      </header>
    </>
  );
}
