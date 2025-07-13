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

export const apiGetUser = async (login: string) => {
  const { data } = await api.get(`/users/${login}`);
  return data;
};

export const apiLogout = async () => {
  const { data } = await api.post(`/users/logout`);
  return data;
};
