import { api } from "@/modules/ApiInstance";
import { TilWriteAttributes } from "@/pages/til/write";

export const apiGetListTil = async ({
  category,
  page,
  order,
}: {
  category: string;
  page: number;
  order: string;
}) => {
  const { data } = await api.get(
    `/tils/page/${page}?category=${category}&order=${order}`
  );
  return data;
};

export const apiGetTil = async (slug: string) => {
  const { data } = await api.get(`/tils/${slug}`);
  return data;
};

export const apiWriteTil = async (writeData: TilWriteAttributes) => {
  const { data } = await api.post(`/tils/write`, writeData);
  return data;
};

export const apiDeleteTil = async (id: string) => {
  const { data } = await api.delete(`/tils/${id}`);
  return data;
};

export const apiEditTil = async (editData: any) => {
  const { id, title, category, contents } = editData;
  const { data } = await api.patch(`/tils/${id}`, {
    title,
    category,
    contents,
  });

  return data;
};

export const apiGetComments = async (til_id: string) => {
  const { data } = await api.get(`/tils/comments/${til_id}`);
  return data;
};

export const apiWriteComments = async ({
  til_id,
  contents,
  users_id,
}: {
  til_id: string;
  contents: string;
  users_id: string;
}) => {
  const { data } = await api.post(`/tils/comments/write`, {
    til_id,
    contents,
    users_id,
  });
  return data;
};

export const apiEditComments = async ({
  commentId,
  contents,
}: {
  commentId: string;
  contents: string;
}) => {
  const { data } = await api.patch(`/tils/comments/${commentId}`, {
    contents,
  });
  return data;
};

export const apiDeleteComments = async (til_id: string, commentId: string) => {
  const { data } = await api.delete(`/tils/comments/${commentId}`, {
    data: {
      til_id,
    },
  });
  return data;
};
