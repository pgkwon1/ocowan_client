import { apiGetBigThree, apiGetBigThreeLatest } from "@/api/bigthree";
import { apiGetUser } from "@/api/member/users";
import { apiGetOcowan } from "@/api/ocowan";
import ProfileSkeleton from "@/components/Member/Profile/Skeleton/Profile";
import ProfileTilList from "@/components/Member/Profile/TIL";

import { useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ko";
interface ProfileProps {
  login: string;
}
export default function Profile({ login }: ProfileProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserProfile", login],
    queryFn: async () => await apiGetUser(login),
  });

  const { data: bigthree, isLoading: isBigthreeLoading } = useQuery({
    queryKey: ["getBigThree", login],
    queryFn: async () => await apiGetBigThreeLatest(login),
  });
  const [bigthreeStatus, setBigthreeStatus] = useState({
    bigthreeLatest: 0,
    increaseBigThree: 0,
  });

  useEffect(() => {
    if (bigthree && !isBigthreeLoading) {
      const bigthreeFirst = bigthree.data.latestData[0] ?? 0;
      const bigthreeLatest = bigthree.data.latestData.slice(-1)[0] ?? 0;
      const increaseBigThree =
        ((bigthreeLatest - bigthreeFirst) / bigthreeFirst) * 100;

      setBigthreeStatus({
        bigthreeLatest,
        increaseBigThree: increaseBigThree > 0 ? increaseBigThree : 0,
      });
    }
  }, [bigthree, isBigthreeLoading]);

  const { data: ocowan, isLoading: isOcowanLoading } = useQuery({
    queryKey: ["getOcowan", login],
    queryFn: async () => await apiGetOcowan(login, false),
  });

  // 연속 일 수 상태.
  const [ocowanSequence, setOcowanSequence] = useState(0);
  // 오코완 연속 일수 계산
  useEffect(() => {
    if (ocowan && ocowan.length > 0 && !isOcowanLoading) {
      setOcowanSequence(1);
      let sequence = 1;
      // 가장 최근 오코완과 오늘 날짜 차이가 2일 이상나면 연속 끊김.
      const today = moment().format("YYYY-MM-DD");
      const lastestDate = ocowan[ocowan.length - 1].ocowan_date;
      // 연속 끊김
      if (moment(today).diff(lastestDate, "days") > 1) {
        setOcowanSequence(0);
        return;
      }

      for (let i = 1; i < ocowan.length; i++) {
        const prev = ocowan[i - 1].ocowan_date;
        const current = ocowan[i].ocowan_date;

        const diffDay = moment(current).diff(prev, "days");

        // 날짜 비교하여 1일 이상 차이나면 연속 끊김.
        if (diffDay > 1) {
          setOcowanSequence(1);
          sequence = 1;
        } else if (diffDay === 1) {
          sequence++;
        }
      }

      setOcowanSequence(sequence);
    }
  }, [ocowan, isOcowanLoading]);
  return isLoading ? (
    <ProfileSkeleton />
  ) : (
    <div className="flex flex-col gap-4">
      <div className="bg-white shadow-lg    transform   duration-200 easy-in-out">
        <div className="flex justify-center px-5 ">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full"
            src={data.avatar_url}
            alt=""
          />
        </div>
        <div className=" ">
          <div className="text-center px-14">
            <h2 className="text-gray-800 text-3xl font-bold">{data.login}</h2>
            <a
              className="text-gray-400 mt-2 hover:text-blue-500"
              href="https://www.instagram.com/immohitdhiman/"
              target="BLANK()"
            >
              {login}
            </a>
            <p className="mt-2 text-gray-500 text-sm">{data.bio}</p>
          </div>
          <hr className="mt-6" />
          <div className="flex  bg-gray-50 ">
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-bold mr-2">{data.followers}</span>
                Followers
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-bold mr-2">{data.following}</span>
                Following
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
              <svg
                className="fill-gray-800 dark:fill-white/90"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.80443 5.60156C7.59109 5.60156 6.60749 6.58517 6.60749 7.79851C6.60749 9.01185 7.59109 9.99545 8.80443 9.99545C10.0178 9.99545 11.0014 9.01185 11.0014 7.79851C11.0014 6.58517 10.0178 5.60156 8.80443 5.60156ZM5.10749 7.79851C5.10749 5.75674 6.76267 4.10156 8.80443 4.10156C10.8462 4.10156 12.5014 5.75674 12.5014 7.79851C12.5014 9.84027 10.8462 11.4955 8.80443 11.4955C6.76267 11.4955 5.10749 9.84027 5.10749 7.79851ZM4.86252 15.3208C4.08769 16.0881 3.70377 17.0608 3.51705 17.8611C3.48384 18.0034 3.5211 18.1175 3.60712 18.2112C3.70161 18.3141 3.86659 18.3987 4.07591 18.3987H13.4249C13.6343 18.3987 13.7992 18.3141 13.8937 18.2112C13.9797 18.1175 14.017 18.0034 13.9838 17.8611C13.7971 17.0608 13.4132 16.0881 12.6383 15.3208C11.8821 14.572 10.6899 13.955 8.75042 13.955C6.81096 13.955 5.61877 14.572 4.86252 15.3208ZM3.8071 14.2549C4.87163 13.2009 6.45602 12.455 8.75042 12.455C11.0448 12.455 12.6292 13.2009 13.6937 14.2549C14.7397 15.2906 15.2207 16.5607 15.4446 17.5202C15.7658 18.8971 14.6071 19.8987 13.4249 19.8987H4.07591C2.89369 19.8987 1.73504 18.8971 2.05628 17.5202C2.28015 16.5607 2.76117 15.2906 3.8071 14.2549ZM15.3042 11.4955C14.4702 11.4955 13.7006 11.2193 13.0821 10.7533C13.3742 10.3314 13.6054 9.86419 13.7632 9.36432C14.1597 9.75463 14.7039 9.99545 15.3042 9.99545C16.5176 9.99545 17.5012 9.01185 17.5012 7.79851C17.5012 6.58517 16.5176 5.60156 15.3042 5.60156C14.7039 5.60156 14.1597 5.84239 13.7632 6.23271C13.6054 5.73284 13.3741 5.26561 13.082 4.84371C13.7006 4.37777 14.4702 4.10156 15.3042 4.10156C17.346 4.10156 19.0012 5.75674 19.0012 7.79851C19.0012 9.84027 17.346 11.4955 15.3042 11.4955ZM19.9248 19.8987H16.3901C16.7014 19.4736 16.9159 18.969 16.9827 18.3987H19.9248C20.1341 18.3987 20.2991 18.3141 20.3936 18.2112C20.4796 18.1175 20.5169 18.0034 20.4837 17.861C20.2969 17.0607 19.913 16.088 19.1382 15.3208C18.4047 14.5945 17.261 13.9921 15.4231 13.9566C15.2232 13.6945 14.9995 13.437 14.7491 13.1891C14.5144 12.9566 14.262 12.7384 13.9916 12.5362C14.3853 12.4831 14.8044 12.4549 15.2503 12.4549C17.5447 12.4549 19.1291 13.2008 20.1936 14.2549C21.2395 15.2906 21.7206 16.5607 21.9444 17.5202C22.2657 18.8971 21.107 19.8987 19.9248 19.8987Z"
                  fill=""
                ></path>
              </svg>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  이번 달 오코완 수
                </span>
                <div className="flex flex-row gap-3 items-center mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                  <span>{isOcowanLoading ? 0 : ocowan.length}</span>
                  {ocowanSequence > 1 ? (
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 text-white rounded-full font-extrabold text-sm shadow-lg animate-pulse">
                      🔥 {ocowanSequence}일 연속 오코완 🔥
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
              <svg
                className="fill-gray-800 dark:fill-white/90"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857L11.3296 20.9149L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z"
                  fill=""
                ></path>
              </svg>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-md text-gray-500 dark:text-gray-400">
                  3대
                </span>
                <div className="flex items-center gap-2 mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                  {!isBigthreeLoading &&
                    bigthree !== undefined &&
                    new Intl.NumberFormat("en-us").format(
                      bigthreeStatus.bigthreeLatest
                    )}
                  <div className="flex items-center text-sm font-bold text-green-500 stroke-green-500">
                    (7일간)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      className="h-5 w-5 flex-shrink-0 self-center text-green-500 stroke-green-500"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                      ></path>
                    </svg>
                    <span className="sr-only"> 증가 </span>
                    <span data-tooltip-id="completions-delta-label">
                      {Math.round(bigthreeStatus.increaseBigThree * 100) / 100}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
              <svg
                className="fill-gray-800 dark:fill-white/90"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857L11.3296 20.9149L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z"
                  fill=""
                ></path>
              </svg>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-md text-gray-500 dark:text-gray-400">
                  레벨
                </span>
                <div className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                  {data.levels.level}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <ProfileTilList id={data.id} />
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const login = context.query.login ?? "";

  return {
    props: {
      login: typeof login === "string" ? login.replace("@", "") : login[0],
    },
  };
};
