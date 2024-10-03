import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface visibilitySettingsState {
  visibilitySettings: boolean;
}

const initialState: visibilitySettingsState = {
  visibilitySettings: false,
};

const visibilitySettingsSlice = createSlice({
  name: "visibilitySettings",
  initialState,
  reducers: {
    setVisibilitySettings(state, action: PayloadAction<boolean>) {
      state.visibilitySettings = action.payload;
    },
  },
});

export const { setVisibilitySettings } = visibilitySettingsSlice.actions;
export default visibilitySettingsSlice.reducer;
