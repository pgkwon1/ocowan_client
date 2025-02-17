import { api } from "@/modules/ApiInstance";

export const apiEmotify = async (emoji: string, til_id: string) => {
  console.log("emoji", emoji);
  const response = await api.post(`/emotify`, {
    type: emoji,
    til_id,
  });
  response.data.emoji = emoji;
  console.log("Res", response.data);
  return response.data;
};

export const apiEmotifyCancel = async (tilId: string, emoji: string) => {
  const response = await api.delete(`/emotify/delete`, {
    data: {
      til_id: tilId,
      type: emoji,
    },
  });
  console.log(response.data);
  return response.data;
};
