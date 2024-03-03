import { apiCheckBigThree, apiGetBigThree } from "@/api/bigthree";
import { IRootReducer } from "@/store/reducer.dto";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import BigThreeBoard from "./BigThreeBoard";
import { setGlobalToast } from "../Toast";
import { setBigThree } from "@/store/reducers/bigthree.reducer";

export default function BigThree() {
  const { login } = useSelector((state: IRootReducer) => state.githubReducer);
  const dispatch = useDispatch();
  const { data, refetch } = useQuery(
    ["getBigThree", login],
    async () => await apiGetBigThree(),
    {
      onSuccess(data) {
        const { pullReqCount, issueCount, commitCount } = data;
        dispatch(
          setBigThree({
            pullReqCount,
            issueCount,
            commitCount,
          })
        );
      },
    }
  );

  const checkMutation = useMutation(
    ["checkBigThree", login],
    async () => await apiCheckBigThree(),
    {
      onSuccess(data) {
        if (data.result) {
          setGlobalToast("3대 측정이 완료되었습니다.");
          refetch();
        }
      },
    }
  );
  return (
    <div className="flex flex-col align-center gap-8">
      <h2 className="text-center text-2xl font-semibold mb-4">3대 측정하기</h2>
      <button
        type="button"
        className="shadow-md rounded-lg text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-8 py-2.5 me-2 mb-2 font-extrabold text-xl mt-4"
        onClick={async () => await checkMutation.mutate()}
      >
        {checkMutation.isLoading ? "측정중..." : "측정"}
      </button>
    </div>
  );
}
