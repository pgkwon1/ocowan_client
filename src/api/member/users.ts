import { api } from "@/modules/ApiInstance";

export const apiLogin = async (code: string) => {
  const { data } = await api.post(
    `/users/login`,
    {
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return data;
};
