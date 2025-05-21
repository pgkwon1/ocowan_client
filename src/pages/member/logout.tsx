import { resetData } from "@/store/reducers/users.reducer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    Cookies.remove("token", {
      sameSite: "strict",
      secure: true,
    });
    dispatch(resetData());
    router.push("/");
  });
}
