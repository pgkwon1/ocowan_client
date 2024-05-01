import {
  apiCreateInviteCode,
  apiGetTeamInfo,
  getTeamInfoByInviteCode,
} from "@/api/team/team";
import { setGlobalToast } from "@/components/Toast";
import { IRootReducer } from "@/store/reducer.dto";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { isError, useQuery } from "react-query";
import { useSelector } from "react-redux";
import moment from "moment";

export default function InviteTeam({ token }: { token: string }) {
  const router = useRouter();
  const { isLogin, login } = useSelector(
    (state: IRootReducer) => state.githubReducer
  );
  const { data } = useQuery(
    ["getTeam", token],
    async () => {
      if (isLogin && login) {
        return await getTeamInfoByInviteCode(token);
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
    {
      onSuccess(response) {
        if (response.result === true) {
          const now = moment();
          if (now.isAfter(response.expire_time)) {
            const isError = true;
            setGlobalToast("만료된 초대코드 입니다.", isError);
            router.push(`/`);
          }
        }
      },
    }
  );
  return (
    <div className="">
      <img
        className="w-32 mx-auto shadow-xl rounded-full drop-shadow-sm"
        alt="profile sc"
      />
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
