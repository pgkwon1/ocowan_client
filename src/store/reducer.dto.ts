export interface IRootReducer {
  usersReducer: IUsersReducer;
  ocowanReducer: IOcowanReducer;
  bigthreeReducer: IBigThreeReducer;
}

interface IUsersReducer {
  id: string;
  users_id: string;
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  isLogin: boolean;
  callback: string;
  levels: {
    level: number;
    exp: number;
  };
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
