import { resetData } from "@/store/reducers/users.reducer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { IRootReducer } from "@/store/reducer.dto";
import { apiLogout } from "@/api/member/users";
export default function Logout() {
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const logoutMutate = useMutation({
    mutationKey: ["logout", login],
    mutationFn: async () => await apiLogout(),
  });
  useEffect(() => {
    dispatch(resetData());
    router.push("/");
    logoutMutate.mutate();
  }, []);
}
