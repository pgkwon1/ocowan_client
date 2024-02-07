import { apiGithubLogin } from "@/api/member/github";
import { setLoginData } from "@/store/reducers/github.reducer";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Router from "next/router";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function Github() {
  const query = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const code = query.get("code");
  let loginMutation = useMutation(
    "githubLogin",
    async (code: string) => await apiGithubLogin(code),
    {
      onSuccess: ({ data }) => {
        if (data) {
          data.login.isLogin = true;
          dispatch(setLoginData(data.login));
          Cookies.set("token", data.token);
          router.push("/");
        }
      },
    }
  );

  useEffect(() => {
    if (code) {
      loginMutation.mutate(code);
    }
  }, [code]);
}
