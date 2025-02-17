import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { apiGetTil } from "@/api/til/til";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai-sublime.css";
import Emoji from "@/components/Til/Skeleton/Emoji";
import TilViewSkeleton from "@/components/Til/Skeleton/Index";
import { UserProfile } from "@/components/Profile";
import DeleteModal from "@/components/Til/DeleteModal";
import TilCommentComponent from "@/components/Til/Comment/Comment";
import { useSelector } from "react-redux";
import { IRootReducer } from "@/store/reducer.dto";

export interface EmojiCountData {
  thumbsUp: { count: number; clicked: boolean };
  heart: { count: number; clicked: boolean };
  smile: { count: number; clicked: boolean };
  fire: { count: number; clicked: boolean };
  idea: { count: number; clicked: boolean };
}

interface Emotify {
  type: string;
}

export interface CommentsAttributes {
  id: string;
  users_id: string;
  contents: string;
  createdAt: Date;
  users: {
    login: string;
    avatar_url: string;
    follower: number;
    following: number;
  };
}
export interface TilViewAttribute {
  id: string;
  users_id: string;
  category: string;
  title: string;
  contents: string;
  slug: string;
  thumbsUpCnt: number;
  heartCnt: number;
  smileCnt: number;
  fireCnt: number;
  ideaCnt: number;
  viewCnt: number;
  commentCnt: number;
  createdAt: string;
  updatedAt: string;
  emotify: Emotify[];
  comments: CommentsAttributes[];
  selectedEmojis: string[];
  users: UserProfile;
}
export default function TilView({
  slug,
  page,
  category,
  order,
}: {
  slug: string;
  page: number;
  category: string;
  string: string;
  order: string;
}) {
  const router = useRouter();
  const { users_id } = useSelector((state: IRootReducer) => state.usersReducer);
  const [isTilMenuVisible, setTilMenuVisible] = useState(false);
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const { data, isLoading, isSuccess } = useQuery<TilViewAttribute>({
    queryKey: ["getTil", slug],
    queryFn: async () => await apiGetTil(slug),
    select(data) {
      return data;
    },
  });

  const emojiCountData = useMemo(() => {
    if (data && isSuccess) {
      const selectedEmojis =
        data.emotify.map((selectedEmoji) => selectedEmoji.type) ?? [];
      return {
        thumbsUp: {
          count: data.thumbsUpCnt ?? 0,
          clicked: selectedEmojis.includes("thumbsUp"),
        },
        heart: {
          count: data.heartCnt ?? 0,
          clicked: selectedEmojis.includes("heart"),
        },
        smile: {
          count: data.smileCnt ?? 0,
          clicked: selectedEmojis.includes("smile"),
        },
        fire: {
          count: data.fireCnt ?? 0,
          clicked: selectedEmojis.includes("fire"),
        },
        idea: {
          count: data.ideaCnt ?? 0,
          clicked: selectedEmojis.includes("idea"),
        },
      };
    }
  }, [data]);

  const EmojiComponent = useMemo(() => Emoji, []);

  return isLoading ? (
    <TilViewSkeleton />
  ) : data ? (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-4">
        <div className="flex flex-col gap-3 mb-4">
          <span className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 w-fit pb-1">
            {data.category}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {data.title}
          </h1>
          {/* 작성자 일 경우 수정, 삭제 메뉴 노출 */}
          {users_id === data.users_id ? (
            <div className="relative">
              <button
                className="group text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={() => setTilMenuVisible(!isTilMenuVisible)}
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
              {isTilMenuVisible && (
                <div className="absolute right-0 mt-2 w-24   bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() =>
                        router.push(`/til/${data.title}-${slug}/edit`)
                      }
                    >
                      수정
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => setDeleteVisible(true)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
              {isDeleteVisible && (
                <DeleteModal id={data.id} setModalOpen={setDeleteVisible} />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Author Section */}
      <div className="group flex items-center mb-20 space-x-4 relative">
        {/* 아바타 이미지 */}
        <img
          src={data.users.avatar_url}
          alt={data.users.login}
          className="w-12 h-12 rounded-full"
        />

        <div className="relative group">
          <div className="gro up hover:underline flex flex-row items-center space-x-2 gap-2 text-lg text-gray-900 font-bold">
            <span className="font-md font-bold ">{data.users.login}</span>
          </div>
          <p className="flex gap-2 items-center text-md font-bold">
            <span className="text-sm text-gray-400">
              조회수 {data.viewCnt}회
            </span>
            <span title={moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss")}>
              {moment(data.createdAt).fromNow()}
            </span>
          </p>

          {/* Hover Card */}
          <div
            onClick={() => router.push(`/member/profile/@${data.users.login}`)}
            className="invisible group-hover:visible absolute left-0 top-[80%] mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-10 border border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <img
                src={data.users.avatar_url}
                alt={data.users.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg">{data.users.login}</h3>
                <p className="text-sm text-[#3b82f6]">
                  {data.users.followers} followers
                </p>
              </div>
            </div>
            <p className="mt-3 text-gray-600">{data.users.bio}</p>
          </div>
        </div>
      </div>

      <div className="post-content mb-8 min-h-60">
        <div
          dangerouslySetInnerHTML={{ __html: data.contents }} // content를 HTML로 렌더링
        />
      </div>

      {emojiCountData ? (
        <EmojiComponent id={data.id} emojiCountData={emojiCountData} />
      ) : (
        ""
      )}

      <TilCommentComponent til_id={data.id} writerLogin={data.users.login} />
      <div className="flex mt-7">
        <button
          onClick={() =>
            router.push(`/til?page=${page}&category=${category}&order=${order}`)
          }
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          목록
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug, page, category, order } = context.query;
  let splitSlug;
  splitSlug = typeof slug === "string" ? slug.split("-")[1] : slug;
  return {
    props: {
      slug: splitSlug,
      page: page ?? 1,
      category: category ?? "전체",
      order: order ?? "createdAt",
    },
  };
};
