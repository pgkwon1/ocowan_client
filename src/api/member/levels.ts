import { api } from "@/modules/ApiInstance";

export const apiGetLevel = async (login: string) => {
  const { data } = await api.get(`/levels/${login}`);
  return data;
};

export const apiIncrementExp = async (number: number) => {
  const { data } = await api.patch(`/levels/increment`, {
    exp: number,
  });
  return data;
};
