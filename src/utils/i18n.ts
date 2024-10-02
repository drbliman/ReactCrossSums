import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: {
        translation: {
          part1: "Настройки",
          part2: "Язык",
        },
      },
      en: {
        translation: {
          part1: "Settings",
          part2: "Language",
        },
      },
      tr: {
        translation: {
          part1: "Ayarlar",
          part2: "Dil",
        },
      },
    },
  });

export default i18n;
