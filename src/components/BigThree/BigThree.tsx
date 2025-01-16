import { apiCheckBigThree, apiGetBigThree } from "@/api/bigthree";
import { IRootReducer } from "@/store/reducer.dto";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalToast } from "../Toast";
import { setBigThree } from "@/store/reducers/bigthree.reducer";
import { apiIncrementExp } from "@/api/member/levels";
import { EXPINFO } from "@/constants/levels.constants";
import { setLevelsData } from "@/store/reducers/users.reducer";

interface BigThreeResponse {
  commitCount: number;
  issueCount: number;
  pullReqCount: number;
}
export default function BigThree() {
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);
  const {
    commitCount: currentCommitCount,
    issueCount: currentIssueCount,
    pullReqCount: currentPullReqCount,
  } = useSelector((state: IRootReducer) => state.bigthreeReducer);

  const currentBigThree =
    (currentCommitCount ?? 0) +
    (currentIssueCount ?? 0) +
    (currentPullReqCount ?? 0);

  const dispatch = useDispatch();
  const { data, refetch, isSuccess } = useQuery<BigThreeResponse>({
    queryKey: ["getBigThree", login],
    queryFn: async () => await apiGetBigThree(),
  });

  useEffect(() => {
    if (isSuccess) {
      calculateExp();
    }
  }, [isSuccess, data]);
  const calculateExp = useCallback(async () => {
    if (data) {
      const { pullReqCount, issueCount, commitCount } = data;
      const updateBigThree: number =
        (commitCount ?? 0) + (issueCount ?? 0) + (pullReqCount ?? 0);

      // 세 항목 각각 다 경험치 계산하여 경험치 증가.
      if (updateBigThree > currentBigThree) {
        const pullReqExp =
          pullReqCount > currentPullReqCount
            ? (pullReqCount - currentPullReqCount) * EXPINFO.PR_EXP
            : 0;
        const issueExp =
          issueCount > currentIssueCount
            ? (issueCount - currentIssueCount) * EXPINFO.ISSUE_EXP
            : 0;
        const commitExp =
          commitCount > currentCommitCount
            ? (commitCount - currentCommitCount) * EXPINFO.COMMIT_EXP
            : 0;

        const totalExp = pullReqExp + issueExp + commitExp;

        if (totalExp > 0) {
          await incrementExpMutate.mutate(totalExp);
        }
      }

      dispatch(
        setBigThree({
          pullReqCount,
          issueCount,
          commitCount,
        })
      );
    }
  }, [data]);

  const incrementExpMutate = useMutation({
    mutationKey: ["increment", login],
    mutationFn: async (exp: number) => await apiIncrementExp(exp),
    onSuccess({ data }) {
      const { exp, level } = data;
      dispatch(
        setLevelsData({
          exp,
          level,
        })
      );
    },
  });

  const checkMutation = useMutation({
    mutationKey: ["checkBigThree", login],
    mutationFn: async () => await apiCheckBigThree(),
    onSuccess(result) {
      if (result) {
        setGlobalToast("3대 측정이 완료되었습니다.");
        refetch();
      }
    },
  });
  return (
    <div className="flex flex-col align-center gap-8">
      <h2 className="text-center text-2xl font-semibold mb-4">3대 측정하기</h2>
      <button
        type="button"
        className="shadow-md rounded-lg text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-8 py-2.5 me-2 mb-2 font-extrabold text-xl mt-4"
        onClick={async () => await checkMutation.mutate()}
      >
        {checkMutation.isPending ? "측정중..." : "측정"}
      </button>
    </div>
  );
}
