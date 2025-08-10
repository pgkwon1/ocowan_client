import { IRootReducer } from "@/store/reducer.dto";
import { useSelector } from "react-redux";
import CountUp from "react-countup";

export default function BigThreeBoard() {
  const { commitCount, issueCount, pullReqCount } = useSelector(
    (state: IRootReducer) => state.bigthreeReducer
  );

  return (
    <>
      <div className="flex justify-around p-4 bg-blue-200 shadow-md rounded-lg text-white bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">풀 리퀘스트</div>
          <div className="text-4xl font-bold text-white">
            <CountUp end={pullReqCount ?? 0} duration={5} />
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">이슈</div>
          <div className="text-4xl font-bold text-white">
            <CountUp end={issueCount ?? 0} duration={5} />
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">커밋</div>
          <div className="text-4xl font-bold text-white">
            <CountUp end={commitCount ?? 0} duration={5} />
          </div>
        </div>
      </div>
    </>
  );
}
