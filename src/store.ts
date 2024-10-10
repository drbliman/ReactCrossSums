import { configureStore } from "@reduxjs/toolkit";
import fieldReducer from "../src/utils/slices/fieldSlice";
import visibilitySettingsReducer from "./utils/slices/visibilitySettingsSlice";
import visibilityRulesReducer from "./utils/slices/visibilityRulesSlice";
import playingFieldReducer from "./utils/slices/playingFieldSlice";
import arrayNumbersReducer from "./utils/slices/arrayNumbersSlice";
import theadReducer from "./utils/slices/theadSlice";
import innerWidthReducer from "./utils/slices/innerWidthSlice";
import timerReducer from "./utils/slices/timerSlice";

export const store = configureStore({
  reducer: {
    field: fieldReducer,
    visibilitySettings: visibilitySettingsReducer,
    visibilityRules: visibilityRulesReducer,
    playingField: playingFieldReducer,
    arrayNumbers: arrayNumbersReducer,
    thead: theadReducer,
    innerWidth: innerWidthReducer,
    timer: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
