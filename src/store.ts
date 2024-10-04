import { configureStore } from "@reduxjs/toolkit";
import fieldReducer from "../src/utils/slices/fieldSlice";
import gameModeReducer from "./utils/slices/GameModeSlice";
import visibilitySettingsReducer from "./utils/slices/visibilitySettingsSlice";
import playingFieldReducer from "./utils/slices/playingFieldSlice";
import arrayNumbersReducer from "./utils/slices/arrayNumbersSlice";

export const store = configureStore({
  reducer: {
    field: fieldReducer,
    gameMode: gameModeReducer,
    visibilitySettings: visibilitySettingsReducer,
    playingField: playingFieldReducer,
    arrayNumbers: arrayNumbersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
