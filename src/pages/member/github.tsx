import { apiLogin } from "@/api/member/users";
import { setCallback, setLoginData } from "@/store/reducers/users.reducer";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Router from "next/router";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { IRootReducer } from "@/store/reducer.dto";

export default function Github() {
  const query = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const code = query.get("code");
  const { callback } = useSelector((state: IRootReducer) => state.usersReducer);

  const loginMutation = useMutation({
    mutationKey: ["githubLogin"],
    mutationFn: async (code: string) => await apiLogin(code),
    onSuccess: (result) => {
      const { data, token } = result;
      data.isLogin = true;
      dispatch(setLoginData(data));
      localStorage.setItem("token", token);

      if (callback === "") {
        router.push("/");
      } else {
        dispatch(setCallback(""));
        router.push(callback);
      }
    },
  });

  useEffect(() => {
    if (code) {
      loginMutation.mutate(code);
    }
  }, [code]);
}
