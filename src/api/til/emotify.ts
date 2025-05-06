import { api } from "@/modules/ApiInstance";

export const apiGetEmotify = async (til_id: string) => {
  const { data } = await api.get(`/emotify/${til_id}`);
  return data;
};

export const apiEmotify = async (emoji: string, til_id: string) => {
  const { data } = await api.post(`/emotify`, {
    type: emoji,
    til_id,
  });
  data.emoji = emoji;
  return data;
};

export const apiEmotifyCancel = async (tilId: string, emoji: string) => {
  const { data } = await api.delete(`/emotify/delete`, {
    data: {
      til_id: tilId,
      type: emoji,
    },
  });

  return data;
};
