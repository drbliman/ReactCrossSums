import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_MODE } from "../constants";

interface GameMode {
  mode: string;
}

const initialState: GameMode = {
  mode: GAME_MODE.mode_1,
};

const gameModeSlice = createSlice({
  name: "gameMode",
  initialState,
  reducers: {
    setGameMode(state, action: PayloadAction<string>) {
      state.mode = action.payload;
    },
  },
});

export const { setGameMode } = gameModeSlice.actions;
export default gameModeSlice.reducer;
