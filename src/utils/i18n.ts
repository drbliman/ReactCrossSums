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
          reset: "Сбросить",
          solution: "Решение",
          continue: "Продолжить",
          time: "Время",
          rules: "Правила",
          rules_part_1:
            "Цель игры — вычеркнуть числа в таблице так, чтобы сумма в каждой строке и каждом столбце совпадала с числами, указанными в шапке таблицы и в первом столбце.",
          rules_part_2:
            "Вы можете переводить каждое число в одно из трёх состояний:",
          rules_part_2_1:
            "Если вы уверены, что число необходимо вычеркнуть, вы можете пометить его как 'вычеркнутое'.",
          rules_part_2_2:
            "Если вы уверены, что число нужно оставить, вы можете пометить его как 'оставленное'.",
          rules_part_2_3:
            "Если вы не уверены, вы можете оставить число в состоянии 'неопределённое'.",
          rules_part_2_4:
            "Примечание: для победы достаточно 'вычеркнуть' числа.",
          rules_part_2_5:
            "Если сумма оставшихся чисел в строке или столбце правильная, строка или столбец 'подсветятся' соответственно.",
          rules_part_2_6:
            "Примечание: помните, если строка или столбец 'подсветились', это не значит, что вы все сделали правильно, ведь разные числа в сумме могут давать одинаковый результат.",
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
          reset: "Reset",
          solution: "Solution",
          continue: "Continue",
          time: "Time",
          rules: "Rules",
          rules_part_1:
            "The goal of the game is to cross out numbers in the table so that the sum in each row and each column matches the numbers given in the table header and the first column.",
          rules_part_2: "You can switch each number between three states:",
          rules_part_2_1:
            "If you are sure the number should be crossed out, you can mark it as 'crossed out'.",
          rules_part_2_2:
            "If you are sure the number should remain, you can mark it as `kept`.",
          rules_part_2_3:
            "If you are unsure, you can leave it in the 'unsure' state.",
          rules_part_2_4: "Note: To win, simply 'cross out' the numbers.",
          rules_part_2_5:
            "If the sum of the remaining numbers in a row or column is correct, the row or column will 'highlight' accordingly.",
          rules_part_2_6:
            "Note: remember, if a row or column is 'highlighted', it does not mean you have done everything correctly, as different numbers can result in the same sum.",
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
          reset: "Sıfırla",
          solution: "Çözüm",
          continue: "Devam etmek",
          time: "Zaman",
          rules: "Tüzük",
          rules_part_1:
            "Oyunun amacı, her satır ve sütundaki toplamın, tablonun üst kısmında ve ilk sütunda verilen sayılarla eşleşecek şekilde sayıları işaretlemektir.",
          rules_part_2: "Her sayıyı üç duruma geçirebilirsiniz:",
          rules_part_2_1:
            "Sayının silinmesi gerektiğinden emin olduğunuzda, onu 'silindi' olarak işaretleyebilirsiniz.",
          rules_part_2_2:
            "Sayının kalması gerektiğinden emin olduğunuzda, onu 'bırakıldı' olarak işaretleyebilirsiniz.",
          rules_part_2_3:
            "Emin değilseniz, sayıyı 'kararsız' durumda bırakabilirsiniz.",
          rules_part_2_4: "Not: Kazanmak için sayıları 'silmek' yeterlidir.",
          rules_part_2_5:
            "Eğer bir satır veya sütundaki kalan sayıların toplamı doğruysa, ilgili satır veya sütun 'vurgulanacaktır'.",
          rules_part_2_6:
            "Not: Bir satır veya sütun 'vurgulandıysa' bu, her şeyi doğru yaptığınız anlamına gelmez, çünkü farklı sayılar aynı sonucu verebilir.",
        },
      },
    },
  });

export default i18n;
