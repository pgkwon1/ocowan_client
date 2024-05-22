import { createSlice } from "@reduxjs/toolkit";

const usersReducer = createSlice({
  name: "usersReducer",
  initialState: {
    login: "",
    avatar_url: "",
    bio: "",
    followers: 0,
    following: 0,
    public_repos: 0,
    isLogin: false,
    callback: "",
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
    },

    setCallback(state, action) {
      state.callback = action.payload;
    },
  },
});

export const { setLoginData, setCallback } = usersReducer.actions;
export default usersReducer.reducer;