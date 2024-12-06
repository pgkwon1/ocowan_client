import { api } from "@/modules/ApiInstance";

export const apiGetBigThree = async () => {
  const { data } = await api.get(`/bigthrees`);
  const { pullReqCount, issueCount, commitCount } = data;

  return {
    pullReqCount,
    issueCount,
    commitCount,
  };
};

export const apiGetBigThreeWeekly = async () => {
  const { data } = await api.get(`/bigthrees/weekly`);
  const weeklyData = data.map(
    (day: any, index: number) =>
      day.pullReqCount + day.issueCount + day.commitCount
  );
  const weeklyDate = data.map((day: any, index: number) => day.createdAt);
  return {
    data: {
      weeklyData,
      weeklyDate,
    },
    result: data.result,
    message: data.message,
  };
};

export const apiCheckBigThree = async () => {
  const { data } = await api.post(`/bigthrees`);
  return data;
};
