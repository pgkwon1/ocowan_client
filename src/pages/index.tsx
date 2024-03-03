import Ocowan from "@/components/Ocowan";
import Profile from "@/components/Profile";
import Link from "next/link";
import GitHubCalendar from "react-github-calendar";
import { useSelector } from "react-redux";
import Calendar from "@/components/Calendar";
import { IRootReducer } from "@/store/reducer.dto";

export default function Home() {
  const { login, avatar_url, bio, followers, isLogin } = useSelector(
    (state: IRootReducer) => state.githubReducer
  );

  const { ocowan } = useSelector((state: IRootReducer) => state.ocowanReducer);

  return (
    <>
      <h2 className="text-center text-2xl font-semibold mb-4">
        매일 코딩하자!!
      </h2>
      <p className="text-gray-600 text-center font-bold">
        오운완 처럼 오코완으로도 인증해보자.
      </p>
      {isLogin && login !== "" ? (
        <>
          <Profile
            login={login}
            avatar_url={avatar_url}
            followers={followers}
            bio={bio}
          />
          <GitHubCalendar
            username={login}
            errorMessage="로딩에 실패하였습니다 다시 로그인해주세요."
            hideTotalCount={true}
            hideColorLegend={true}
          />
          <Ocowan />
          <Calendar />
        </>
      ) : (
        <div className="flex flex-col mt-4">
          <Link
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email`}
          >
            <button className="w-full flex items-center justify-center bg-black text-white py-4 px-20 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.698-2.782.603-3.36-1.338-3.36-1.338-.453-1.154-1.108-1.462-1.108-1.462-.904-.618.07-.606.07-.606 1.002.07 1.528 1.03 1.528 1.03.892 1.53 2.34 1.088 2.91.83.09-.647.348-1.088.633-1.338-2.22-.253-4.555-1.11-4.555-4.94 0-1.09.39-1.98 1.03-2.675-.103-.253-.446-1.268.097-2.646 0 0 .84-.27 2.75 1.025A9.583 9.583 0 0110 4.505c.855.004 1.715.116 2.508.343 1.91-1.295 2.747-1.025 2.747-1.025.545 1.378.203 2.393.1 2.646.64.694 1.03 1.585 1.03 2.675 0 3.838-2.34 4.683-4.57 4.93.36.308.682.916.682 1.847 0 1.334-.012 2.41-.012 2.737 0 .267.18.576.688.48C17.14 18.165 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>GitHub으로 로그인</span>
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
