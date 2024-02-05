import { createSlice } from "@reduxjs/toolkit";

export const ocowanReducers = createSlice({
  name: "ocowanReducer",
  initialState: {
    ocowan: false,
    ocowan_date: "",
  },

  reducers: {
    setOcowan(state, action) {
      state.ocowan = action.payload.ocowan;
      state.ocowan_date = action.payload.ocowan_date;
    },
  },
});

export const { setOcowan } = ocowanReducers.actions;
export default ocowanReducers.reducer;
