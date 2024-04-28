import { setCallback } from "@/store/reducers/github.reducer";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Login({ callback }: { callback: string }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (callback !== "") {
      dispatch(setCallback(callback));
    }
  }, [callback]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-xl text-white font-bold mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            로그인 해주세요.
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mt-8 mb-8 shadow-2xl sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-col gap-2">
            <Link
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email`}
            >
              <button className="w-full flex items-center justify-center bg-black text-white py-2 px-4 rounded-lg">
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
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return {
    props: {
      callback: context.query.callback,
    },
  };
};
