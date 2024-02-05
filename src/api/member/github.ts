import { api } from "@/modules/ApiInstance";

export const apiGithubLogin = async (code: string) => {
  const { data } = await api.post(
    `/github/login`,
    {
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return { data: data.data, result: data.result };
};
