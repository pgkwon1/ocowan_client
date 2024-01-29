import { setLoginData } from "@/store/reducers/github.reducer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoginData({}));
    router.push("/");
  });
}
