import { api } from "@/modules/ApiInstance";

export const apiIncrementExp = async (number: number) => {
  const { data } = await api.patch(`/levels/increment`, {
    exp: number,
  });
  return data;
};
