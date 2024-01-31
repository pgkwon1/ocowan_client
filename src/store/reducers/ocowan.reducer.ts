import { createSlice } from "@reduxjs/toolkit";

export const ocowanReducers = createSlice({
  name: "ocowanReducer",
  initialState: {
    ocowan: false,
  },

  reducers: {
    setOcowan(state, action) {
      state.ocowan = action.payload.ocowan;
    },
  },
});

export const { setOcowan } = ocowanReducers.actions;
export default ocowanReducers.reducer;
