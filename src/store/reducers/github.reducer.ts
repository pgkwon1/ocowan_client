import { createSlice } from "@reduxjs/toolkit";

const githubReducers = createSlice({
  name: "githubReducer",
  initialState: {
    login: "",
    avatar_url: "",
    bio: "",
    followers: 0,
    following: 0,
    public_repos: 0,
    isLogin: false,
  },
  reducers: {
    setLoginData: (state, action) => {
      console.log(action.payload);
      state = Object.assign(state, action.payload);
    },
  },
});

export const { setLoginData } = githubReducers.actions;
export default githubReducers.reducer;
