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
          settings: "Настройки",
          language: "Язык",
          playingField: "Игровое поле",
          gameMode: "Режим игры",
          sum: "Сумма",
          subtraction: "Разность",
          multiplication: "Умножение",
        },
      },
      en: {
        translation: {
          settings: "Settings",
          language: "Language",
          playingField: "Playing field",
          gameMode: "Game mode",
          sum: "Sum",
          subtraction: "Subtraction",
          multiplication: "Multiplication",
        },
      },
      tr: {
        translation: {
          settings: "Ayarlar",
          language: "Dil",
          playingField: "Oyun alanı",
          gameMode: "Oyun modu",
          sum: "Toplam",
          subtraction: "Çıkarma",
          multiplication: "Çarpma",
        },
      },
    },
  });

export default i18n;
