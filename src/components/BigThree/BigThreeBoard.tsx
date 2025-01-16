import { apiGetBigThree } from "@/api/bigthree";
import { IRootReducer } from "@/store/reducer.dto";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { setGlobalToast } from "@/components/Toast";
import CountUp from "react-countup";

export default function BigThreeBoard() {
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);

  const { data, isLoading } = useQuery({
    queryKey: ["getBigThree", login],
    queryFn: async () => await apiGetBigThree(),
  });

  return (
    <>
      {!isLoading && data !== undefined ? (
        <div className="flex justify-around p-4 bg-blue-200 shadow-md rounded-lg text-white bg-gradient-to-br from-purple-600 to-blue-500">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">풀 리퀘스트</div>
            <div className="text-4xl font-bold text-white">
              <CountUp end={data.pullReqCount} duration={5} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">이슈</div>
            <div className="text-4xl font-bold text-white">
              <CountUp end={data.issueCount} duration={5} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">커밋</div>
            <div className="text-4xl font-bold text-white">
              <CountUp end={data.commitCount} duration={5} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
