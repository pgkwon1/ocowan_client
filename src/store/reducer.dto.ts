export interface IRootReducer {
  githubReducer: IUsersReducer;
  ocowanReducer: IOcowanReducer;
  bigthreeReducer: IBigThreeReducer;
}

interface IUsersReducer {
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  isLogin: boolean;
  callback: string;
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
