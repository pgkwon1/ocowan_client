import {
  apiJoinTeam,
  apiGetTeamInfoByInviteCode,
  apiIsAlreadyJoin,
} from "@/api/team/team";
import { setGlobalToast } from "@/components/Toast";
import { IRootReducer } from "@/store/reducer.dto";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import moment from "moment";
import { api } from "@/modules/ApiInstance";

export default function InviteTeam({ token }: { token: string }) {
  const router = useRouter();
  const { isLogin, login } = useSelector(
    (state: IRootReducer) => state.usersReducer
  );

  const [teamInfo, setTeamInfo] = useState({
    id: "",
    name: "",
    description: "",
    leader: "",
    logo: "",
    member_count: 0,
    createdAt: "",
    updatedAt: "",
  });
  const { data, isSuccess } = useQuery({
    queryKey: ["getTeam", token],
    queryFn: async () => {
      if (isLogin && login) {
        return await apiGetTeamInfoByInviteCode(token);
      } else {
        const isError = true;
        setGlobalToast("로그인 후 이용해주세요.", isError);
        router.push(
          {
            pathname: `/member/login`,
            query: { callback: router.asPath },
          },
          "/member/login"
        );
        return false;
      }
    },
  });
  useEffect(() => {
    if (isSuccess && data) {
      const { team } = data;
      checkAvailableCode();
      setTeamInfo(team);
    }
  }, [isSuccess, data]);

  const checkAvailableCode = async () => {
    const now = moment();
    const { team } = data;
    if (now.isAfter(data.expire_time)) {
      const isError = true;
      setGlobalToast("만료된 초대코드 입니다.", isError);
      router.push(`/`);
      return false;
    }

    if (team.leader === login) {
      router.push(`/`);
      return false;
    }

    const alreadyJoin = await apiIsAlreadyJoin(team.id);
    if (alreadyJoin.result === false) {
      setGlobalToast("이미 가입되어 있습니다.", true);
      router.push(`/`);
      return false;
    }
  };

  const joinTeamMutation = useMutation({
    mutationKey: ["joinTeam", teamInfo.id, login],
    mutationFn: async () => await apiJoinTeam({ team_id: teamInfo.id, token }),

    onSuccess(result) {
      if (result) {
        setGlobalToast("가입 되었습니다.");
      }
    },
  });
  return (
    <div className="flex flex-col items-center gap-8">
      {data ? (
        <div className="text-center my-4">
          <img
            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
            src={"https://avatars.githubusercontent.com/u/159014841?v=4"}
            alt=""
          />
          <div className="font-bold text-lg">{teamInfo.name}</div>
          <div className="flex flex-col gap-4 ml-auto font-bold text-sm text-gray-500 dark:text-white mb-2">
            <div className="text-left">소개 {teamInfo.description}</div>

            <div className="text-left">리더 {teamInfo.leader}</div>
            <div className="text-left">인원 {teamInfo.member_count}명</div>
          </div>

          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={async () => await joinTeamMutation.mutate()}
          >
            가입
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { token } = context.query;
  return {
    props: {
      token,
      isLayoutDisplay: false,
    },
  };
};
