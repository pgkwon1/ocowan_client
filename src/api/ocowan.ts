import { api } from "@/modules/ApiInstance";

interface IOcowan {
  ocowan_date: string;
  total_count: number;
}
export const apiCheck = async (login: string) => {
  const result = await api.get(`/ocowan/check/${login}`);
  if (result.data === false) {
    return false;
  }
  const total_count = result.data;
  return {
    total_count,
  };
};

export const apiOcowan = async (login: string, total_count: number) => {
  const result = await api.post(`/ocowan`, {
    login,
    total_count,
  });
  return {
    result,
    total_count,
  };
};

export const apiGetOcowan = async (login: string) => {
  const result = await api.get(`/ocowan/${login}`);
  return result.data.length > 0
    ? result.data.map((ocowan: IOcowan) => ({
        ocowan_date: ocowan.ocowan_date,
        total_count: ocowan.total_count,
      }))
    : [];
};