import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./settings.module.scss";

export default function Settings() {
  const { t, i18n } = useTranslation();

  const [activeLanguage, setActiveLanguage] = React.useState(
    i18n.language || "ru",
  );

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setActiveLanguage(lang);
  };

  return (
    <>
      <div className={styles.settings_container}>
        <div className={styles.settings_title1}>{t("part1")}</div>
        <div className={styles.settings_title2}>{t("part2")}</div>
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
      </div>
    </>
  );
}
