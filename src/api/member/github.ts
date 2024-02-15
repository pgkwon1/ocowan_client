import { ICommonResponseData } from "@/common/response.interface";
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
  return data;
};
