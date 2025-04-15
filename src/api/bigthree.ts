import { api } from "@/modules/ApiInstance";

export const apiGetBigThree = async (login: string = "") => {
  const { data } = await api.get(
    `/bigthrees${login.length > 0 ? `/${login}` : ""}`
  );
  const { pullReqCount, issueCount, commitCount }: Record<string, number> =
    data;

  return {
    pullReqCount,
    issueCount,
    commitCount,
  };
};

export const apiGetBigThreeLatest = async () => {
  const { data } = await api.get(`/bigthrees/latest`);
  const latestData = data.map(
    (day: any, index: number) =>
      day.pullReqCount + day.issueCount + day.commitCount
  );
  const latestDate = data.map((day: any, index: number) => day.createdAt);
  return {
    data: {
      latestData,
      latestDate,
    },
    result: data.result,
    message: data.message,
  };
};

export const apiCheckBigThree = async () => {
  const { data } = await api.post(`/bigthrees`);
  return data;
};
