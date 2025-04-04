import { api } from "@/modules/ApiInstance";

interface IOcowan {
  ocowan_date: string;
  total_count: number;
}
export const apiCheck = async (login: string) => {
  const { data } = await api.get(`/ocowan/check/${login}`);
  if (data === false) {
    return false;
  }
  return {
    total_count: data,
  };
};

export const apiOcowan = async (id: string, total_count: number) => {
  const { data } = await api.post(`/ocowan`, {
    users_id: id,
    total_count,
  });
  return data;
};

export const apiGetOcowan = async (login: string) => {
  const { data } = await api.get(`/ocowan/${login}`);
  return data.length > 0
    ? data.map((ocowan: IOcowan) => ocowan.ocowan_date)
    : [];
};
