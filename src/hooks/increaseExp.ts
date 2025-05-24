import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "@/store/reducer.dto";
import { apiIncrementExp } from "@/api/member/levels";
import { useCallback, useEffect } from "react";
import { setLevelsData } from "@/store/reducers/users.reducer";

export default function useIncrementExp() {
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);
  const dispatch = useDispatch();
  const increaseMutation = useMutation({
    mutationKey: ["increaseExp", login],
    mutationFn: async (exp: number) => await apiIncrementExp(exp),
    onSuccess(data) {
      const { exp, level } = data;
      dispatch(
        setLevelsData({
          exp,
          level,
        })
      );
    },
  });

  const increaseExp = useCallback(
    (exp: number) => {
      if (exp > 0 && login) {
        increaseMutation.mutate(exp);
      }
    },
    [login]
  );
  return increaseExp;
}
