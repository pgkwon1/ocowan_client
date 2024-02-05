export interface IRootReducer {
  githubReducer: IGithubReducer;
  ocowanReducer: IOcowanReducer;
}

interface IGithubReducer {
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  isLogin: boolean;
}
interface IOcowanReducer {
  ocowan: false;
  ocowan_date: boolean;
}
