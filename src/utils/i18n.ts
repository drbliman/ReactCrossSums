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
          numbers: "Числа",
          negativeNumbers: "Отрицательные числа",
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
          numbers: "Numbers",
          negativeNumbers: "Negative numbers",
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
          numbers: "Sayılar",
          negativeNumbers: "Negatif sayılar",
        },
      },
    },
  });

export default i18n;
