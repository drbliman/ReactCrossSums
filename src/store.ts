import { configureStore } from "@reduxjs/toolkit";
import fieldReducer from "../src/utils/slices/fieldSlice";
import gameModeReducer from "./utils/slices/GameModeSlice";
import visibilitySettingsReducer from "./utils/slices/visibilitySettingsSlice";

export const store = configureStore({
  reducer: {
    field: fieldReducer,
    gameMode: gameModeReducer,
    visibilitySettings: visibilitySettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
