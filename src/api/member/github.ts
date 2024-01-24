import { api } from "@/modules/ApiInstance";

export const apiGithubLogin = async (code: string) => {
  const { result, data } = await api.post(
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

  return { result, data };
};
