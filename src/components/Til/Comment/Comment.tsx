import {
  apiEditComments,
  apiGetComments,
  apiWriteComments,
} from "@/api/til/til";
import { setGlobalToast } from "@/components/Toast";
import { CommentsAttributes } from "@/pages/til/[slug]";
import { IRootReducer } from "@/store/reducer.dto";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/ko";
import { useRouter } from "next/router";

import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import DeleteModal from "./DeleteModal";

interface CommentComponentProps {
  til_id: string;
  writerLogin: string;
}
export default function TilCommentComponent({
  til_id,
  writerLogin,
}: CommentComponentProps) {
  const { isLogin } = useSelector((state: IRootReducer) => state.usersReducer);
  const [contents, setContents] = useState("");
  const [menuData, setMenuData] = useState({
    commentId: "",
    isOpen: false,
  });

  const [editData, setEditData] = useState({
    commentId: "",
    editContents: "",
    isEdit: false,
  });

  const [deleteData, setDeleteData] = useState({
    commentId: "",
    isDelete: false,
  });
  const { users_id } = useSelector((state: IRootReducer) => state.usersReducer);

  const {
    data: tilComments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getComments", til_id],
    queryFn: async () => await apiGetComments(til_id),
  });

  const writeCommentMutation = useMutation({
    mutationKey: ["writeComments", til_id],
    mutationFn: async () =>
      await apiWriteComments({ til_id, contents, users_id }),
    onSuccess() {
      setTimeout(() => {
        refetch();
        setContents("");
      }, 500);
    },
  });
  const editCommentMutation = useMutation({
    mutationKey: ["editComments"],
    mutationFn: async () =>
      await apiEditComments({
        commentId: editData.commentId,
        contents: editData.editContents,
      }),
    onSuccess() {
      setTimeout(() => {
        refetch();
      }, 500);
    },
  });

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(String(e.target.value));
  };

  const handleWrite = async () => {
    if (!contents) {
      const isError = true;
      setGlobalToast("댓글 내용을 입력해주세요.", isError);
      return false;
    }
    await writeCommentMutation.mutateAsync();
  };

  const handleEdit = async () => {
    if (!editData.editContents) {
      const isError = true;
      setGlobalToast("수정할 내용을 입력해주세요.", isError);
      return false;
    }
    await editCommentMutation.mutateAsync();
    setEditData({
      commentId: "",
      editContents: "",
      isEdit: false,
    });
  };

  const handleDeleteClose = async () => {
    setDeleteData({
      commentId: "",
      isDelete: false,
    });
  };

  const handleMenuData = (commentId: string) => {
    setMenuData((current) => ({
      commentId,
      isOpen: !current.isOpen,
    }));
  };

  return isLoading ? (
    ""
  ) : (
    <div className="flex flex-col gap-4 comments-section  pt-8">
      <div className="flex flex-row items-center gap-2 text-xl">
        <h2 className="font-semibold mb-4 text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
        </h2>
        <h2 className="font-semibold mb-4 text-gray-900">
          {tilComments.length}
        </h2>
      </div>
      {tilComments.map((comment: CommentsAttributes, index: number) => (
        <div
          key={index}
          className="w-full flex flex-col gap-2 mx-auto p-4 bg-white border-t border-gray-200"
        >
          <div className="flex gap-8">
            <div className="flex gap-2">
              <div className="flex items-center justify-center font-bold text-gray-600">
                <img
                  src={comment.users.avatar_url}
                  alt={comment.users.login}
                  className="w-12 h-12 rounded-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-800">
                  {comment.users.login}

                  {comment.users.login === writerLogin ? (
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                      작성자
                    </span>
                  ) : (
                    ""
                  )}
                </h3>
                <p className="text-sm text-gray-500">
                  {moment(comment.createdAt).fromNow()}
                </p>
              </div>
              {users_id === comment.users_id ? (
                <div className="relative">
                  <button
                    className="group text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={() => handleMenuData(comment.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </button>
                  {menuData.commentId === comment.id && menuData.isOpen && (
                    <div className="absolute right-0 mt-2 w-24   bg-white rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => {
                            setEditData((current) => ({
                              isEdit: !current.isEdit,
                              commentId: comment.id,
                              editContents: comment.contents,
                            }));
                            handleMenuData("");
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() =>
                            setDeleteData({
                              commentId: comment.id,
                              isDelete: true,
                            })
                          }
                        >
                          삭제
                        </button>
                        {deleteData.isDelete ? (
                          <DeleteModal
                            til_id={til_id}
                            commentId={deleteData.commentId}
                            handleClose={handleDeleteClose}
                            refetch={refetch}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="mt-4 text-gray-700">
            {editData.isEdit && editData.commentId === comment.id ? (
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  className="block w-50 p-2 text-gray-900 border-b border-gray-600 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editData.editContents}
                  onChange={(e) =>
                    setEditData((current) => ({
                      ...current,
                      editContents: e.target.value,
                    }))
                  }
                />
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded"
                  onClick={handleEdit}
                >
                  수정
                </button>
              </div>
            ) : (
              <p>{comment.contents}</p>
            )}
          </div>
        </div>
      ))}

      <div className="add-comment">
        <textarea
          disabled={isLogin ? false : true}
          className="w-full border rounded-lg p-2 mb-4 disabled:cursor-not-allowed"
          rows={3}
          onChange={handleComment}
          value={contents}
        />
        <button
          disabled={isLogin ? false : true}
          className={`${
            !isLogin
              ? "disabled:cursor-not-allowed bg-gray-400 text-gray-100"
              : "bg-blue-600 hover:bg-blue-800 text-white"
          } px-4 py-2 font-medium rounded-lg  disabled:cursor-not-allowed`}
          onClick={handleWrite}
        >
          작성
        </button>
      </div>
    </div>
  );
}
