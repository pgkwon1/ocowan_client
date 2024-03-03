import { createSlice } from "@reduxjs/toolkit";

export const bigthreeReducer = createSlice({
  name: "bigthreeReducer",
  initialState: {
    commitCount: 0,
    issueCount: 0,
    pullReqCount: 0,
    isCheck: false,
  },

  reducers: {
    setBigThree(state, action) {
      state.commitCount = action.payload.commitCount;
      state.issueCount = action.payload.issueCount;
      state.pullReqCount = action.payload.pullReqCount;
      state.isCheck = action.payload.isCheck;
    },
  },
});
export const { setBigThree } = bigthreeReducer.actions;
export default bigthreeReducer.reducer;
