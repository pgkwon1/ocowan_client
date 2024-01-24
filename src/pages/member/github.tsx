import { apiGithubLogin } from "@/api/member/github";
import { setLoginData } from "@/store/reducers/github.reducer";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Router from "next/router";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";

export default function Github() {
  const query = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const code = query.get("code");
  let loginMutation = useMutation(
    "githubLogin",
    async (code: string) => await apiGithubLogin(code),
    {
      onSuccess: ({ result, data }) => {
        if (result) {
          data.isLogin = true;
          dispatch(setLoginData(data));
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
