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
      const {
        login,
        avatar_url,
        bio,
        followers,
        following,
        public_repos,
        isLogin,
      } = action.payload;
      state.login = login;
      state.avatar_url = avatar_url;
      state.bio = bio;
      state.followers = followers;
      state.following = following;
      state.public_repos = public_repos;
      state.isLogin = isLogin;
      console.log(state);
    },
  },
});

export const { setLoginData } = githubReducers.actions;
export default githubReducers.reducer;
