import { api, formDataApi } from "@/modules/ApiInstance";

export const apiGetTeamInfo = async (id: string) => {
  const { data } = await api.get(`/teams/info/${id}`);
  return data;
};

export const apiGetTeamList = async (page: number) => {
  console.log(page);
  const { data } = await api.get(`/teams/list/${page}`);
  return data;
};

export const apiGetMemberBigThree = async (id: string) => {
  const { data } = await api.get(`/teams/bigthree/${id}`);
  return data;
};

export const apiCreateTeam = async (teamData: {
  name: string;
  leader: string;
  description: string;
  logo: File;
}) => {
  const formData = new FormData();

  formData.append("name", teamData.name);
  formData.append("leader", teamData.leader);
  formData.append("description", teamData.description);
  formData.append("logo", teamData.logo);

  const { data } = await formDataApi.post(`/teams/create`, formData);

  return data;
};

export const apiEditTeam = async (teamData: {
  id: string;
  name: string;
  leader: string;
  description: string;
  logo: File;
}) => {
  const formData = new FormData();
  formData.append("id", teamData.id);
  formData.append("name", teamData.name);
  formData.append("leader", teamData.leader);
  formData.append("description", teamData.description);
  formData.append("logo", teamData.logo);
  const { data } = await formDataApi.patch(`/teams/edit`, formData);

  return data;
};

export const apiCreateInviteCode = async (teamId: string) => {
  const { data } = await api.post(`/invites/createCode`, {
    teamId,
  });

  return data;
};

export const apiGetTeamInfoByInviteCode = async (token: string) => {
  const { data } = await api.get(`/invites/team/${token}`);
  return data;
};

export const apiIsAlreadyJoin = async (team_id: string) => {
  const { data } = await api.get(`/teams/member/joinCheck/${team_id}`);
  return data;
};
export const apiJoinTeam = async (params: { [key: string]: string }) => {
  const { team_id, token: inviteToken } = params;
  const { data } = await api.post(`/teams/member/join`, {
    team_id,
    inviteToken,
  });
  return data;
};
