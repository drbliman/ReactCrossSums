import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface visibilityRulesState {
  visibilityRules: boolean;
}

const initialState: visibilityRulesState = {
  visibilityRules: false,
};

const visibilityRulesSlice = createSlice({
  name: "visibilityRules",
  initialState,
  reducers: {
    setVisibilityRules(state, action: PayloadAction<boolean>) {
      state.visibilityRules = action.payload;
    },
  },
});

export const { setVisibilityRules } = visibilityRulesSlice.actions;
export default visibilityRulesSlice.reducer;
