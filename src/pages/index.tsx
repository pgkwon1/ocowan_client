import Ocowan from "@/components/Ocowan";
import Profile from "@/components/Profile";
import Link from "next/link";
import GitHubCalendar from "react-github-calendar";
import { useSelector } from "react-redux";
import Calendar from "@/components/Calendar";
import { IRootReducer } from "@/store/reducer.dto";
import ConditionalWrapper from "@/components/ConditionalWrapper";
import LoginOverlay from "@/components/LoginOverlay";
import dynamic from "next/dynamic";

export default function Home() {
  const { isLogin, login } = useSelector(
    (state: IRootReducer) => state.usersReducer
  );
  const { ocowan } = useSelector((state: IRootReducer) => state.ocowanReducer);

  const Calendar = dynamic(() => import("@/components/Calendar"), {
    ssr: false,
  });
  return (
    <>
      <>
        <div className="font-extrabold text-xl text-center box-decoration-slice text-white bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-4 rounded-lg shadow-md mb-4">
          <h1 className="text-2xl mb-2">
            오늘도 코딩 완료 <span className="text-yellow-300">✓</span>
          </h1>
          <p className="text-lg font-medium">
            깃허브 활동
            <span className="font-bold text-underline">
              (커밋, PR, 이슈 등)
            </span>
            을 추적해 오코완 달성 여부와 <br />
            3대(커밋, PR, 이슈들) 건수를 측정할 수 있습니다.
          </p>
        </div>
        <ConditionalWrapper
          condition={!isLogin}
          wrapper={(children) => <LoginOverlay>{children}</LoginOverlay>}
        >
          <Profile />
          {isLogin ? (
            <GitHubCalendar
              username={login}
              errorMessage="로딩에 실패하였습니다 다시 로그인해주세요."
              hideTotalCount={true}
              hideColorLegend={true}
            />
          ) : (
            ""
          )}
          <Ocowan />
          <Calendar />
        </ConditionalWrapper>
      </>
    </>
  );
}
