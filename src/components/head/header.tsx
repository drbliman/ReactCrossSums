import React from "react";
import Icon from "./headerIcon";
import { SVG_SRC } from "../../utils/constants";
import styles from "../settings/settings.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setVisibilitySettings } from "../../utils/slices/visibilitySettingsSlice";
import { RootState } from "../../store";

export default function Header() {
  const [musicIcon, setMusicIcon] = React.useState(SVG_SRC.music_on);

  const visibilitySettings = useSelector(
    (state: RootState) => state.visibilitySettings.visibilitySettings,
  );
  const dispatch = useDispatch();

  const handleVisibilitySettings = () => {
    if (visibilitySettings) {
      dispatch(setVisibilitySettings(false));
    } else {
      dispatch(setVisibilitySettings(true));
    }
    console.log(visibilitySettings);
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
        <Icon src={SVG_SRC.book} alt="book" />
        <Icon src={SVG_SRC.idea} alt="idea" />
        <Icon src={SVG_SRC.brush} alt="brush" />
      </header>
    </>
  );
}
