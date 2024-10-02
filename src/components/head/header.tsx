import React from "react";
import { SVG_SRC } from "../../utils/constants";
import styles from "./header.module.scss";

export default function Header() {
  const [musicStatus, setMusicStatus] = React.useState(SVG_SRC.music_on);

  const handleClickMusic = () => {
    setMusicStatus((musicStatus) =>
      musicStatus === SVG_SRC.music_on ? SVG_SRC.music_off : SVG_SRC.music_on,
    );
  };

  return (
    <>
      <header className={styles.header}>
        <div>
          <img
            className={styles.img}
            onClick={handleClickMusic}
            src={musicStatus}
            alt="music"
          />
        </div>
        <div>
          <img className={styles.img} src={SVG_SRC.settings} alt="settings" />
        </div>
        <div>
          <img className={styles.img} src={SVG_SRC.book} alt="book" />
        </div>
        <div>
          <img className={styles.img} src={SVG_SRC.idea} alt="idea" />
        </div>
        <div>
          <img className={styles.img} src={SVG_SRC.brush} alt="brush" />
        </div>
      </header>
    </>
  );
}
