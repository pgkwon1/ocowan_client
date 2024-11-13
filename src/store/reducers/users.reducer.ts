import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  login: "",
  avatar_url: "",
  bio: "",
  followers: 0,
  following: 0,
  public_repos: 0,
  isLogin: false,
  callback: "",
  levels: {
    exp: 0,
    level: 0,
  },
};
const usersReducer = createSlice({
  name: "usersReducer",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      const {
        login,
        avatar_url,
        bio,
        followers,
        following,
        public_repos,
        isLogin,
        levels = { level: 0, exp: 1 },
      } = action.payload;
      state.login = login;
      state.avatar_url = avatar_url;
      state.bio = bio;
      state.followers = followers;
      state.following = following;
      state.public_repos = public_repos;
      state.isLogin = isLogin;
      state.levels.level = levels.level ?? 1;
      state.levels.exp = levels.exp ?? 0;
    },

    setLevelsData(state, action) {
      state.levels.level = action.payload.level;
      state.levels.exp = action.payload.exp;
    },

    setCallback(state, action) {
      state.callback = action.payload;
    },
    resetData: () => initialState,
  },
});

export const { setLoginData, setCallback, resetData, setLevelsData } =
  usersReducer.actions;
export default usersReducer.reducer;
