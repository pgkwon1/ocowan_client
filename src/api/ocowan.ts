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
  const total_count = data.data;
  return {
    total_count,
  };
};

export const apiOcowan = async (id: string, total_count: number) => {
  const { data } = await api.post(`/ocowan`, {
    users_id: id,
    total_count,
  });
  return {
    data: data.data,
    total_count: data.total_count,
  };
};

export const apiGetOcowan = async (login: string) => {
  const { data } = await api.get(`/ocowan/${login}`);
  return data.length > 0
    ? data.data.map((ocowan: IOcowan) => ocowan.ocowan_date)
    : [];
};
