import { apiCheck, apiOcowan } from "@/api/ocowan";
import { setOcowan } from "@/store/reducers/ocowan.reducer";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalToast } from "./Toast";
import { IRootReducer } from "@/store/reducer.dto";

export default function Ocowan() {
  const { login } = useSelector((state: IRootReducer) => state.githubReducer);
  const { ocowan } = useSelector((state: IRootReducer) => state.ocowanReducer);
  const dispatch = useDispatch();
  const checkMutation = useMutation(
    ["check", login],
    async () => await apiCheck(login),
    {
      async onSuccess(result) {
        if (result && typeof result === "object") {
          return await ocowanMutate.mutate(result.total_count);
        }
        const isError = true;
        setGlobalToast("조회된 컨트리뷰션이 없습니다.", isError);
      },
    }
  );

  const ocowanMutate = useMutation(
    ["ocowan", login],
    async (total_count: number) => await apiOcowan(login, total_count),
    {
      onSuccess({ result, total_count }, variables, context) {
        if (result.data) {
          dispatch(setOcowan({ ocowan: true, total_count: total_count }));
          setGlobalToast("오코완 완료!");
        } else {
          dispatch(setOcowan({ ocowan: true, total_count: total_count }));
          setGlobalToast("이미 오코완 되었습니다.");
        }
      },
    }
  );

  return (
    <div className="flex justify-center">
      {checkMutation.isLoading ? (
        <button
          disabled
          type="button"
          className="shadow-md rounded-md text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-8 py-2.5 me-2 mb-2 font-extrabold text-xl mt-4"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      ) : (
        <button
          type="button"
          className="shadow-md rounded-lg text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg px-8 py-2.5 me-2 mb-2 font-extrabold text-xl mt-4"
          onClick={async () => await checkMutation.mutate()}
          disabled={ocowan ? true : false}
        >
          {ocowan ? "오늘도 오코완 완료!" : "오코완"}
        </button>
      )}
    </div>
  );
}
