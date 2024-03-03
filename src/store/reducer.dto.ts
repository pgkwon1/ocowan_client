export interface IRootReducer {
  githubReducer: IGithubReducer;
  ocowanReducer: IOcowanReducer;
  bigthreeReducer: IBigThreeReducer;
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
interface IBigThreeReducer {
  pullReqCount: number;
  issueCount: number;
  commitCount: number;
  isCheck: boolean;
}
