import { createSlice } from "@reduxjs/toolkit";

export const ocowanReducers = createSlice({
  name: "ocowanReducer",
  initialState: {
    ocowan: false,
    total_count: 0,
  },

  reducers: {
    setOcowan(state, action) {
      state.ocowan = action.payload.ocowan;
      state.total_count = action.payload.total_count;
    },
  },
});

export const { setOcowan } = ocowanReducers.actions;
export default ocowanReducers.reducer;
