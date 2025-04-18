import { useEffect, useState } from "react";
import "highlight.js/styles/atom-one-dark.css"; // 원하는 스타일로 변경 가능
import { TILCATEGORIES } from "@/constants/til.constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/ko";

import { apiGetListTil } from "@/api/til/til";
import { GetServerSidePropsContext } from "next";
import TilSkeleton from "@/components/Til/Skeleton/Index";
import { useRouter } from "next/router";
import Paginate from "@/components/Pagination";
import { UserProfile } from "@/components/Profile";

export interface TilAttribute {
  category: string;
  commentsCnt: number;
  createdAt: Date;
  fireCnt: number;
  heartCnt: number;
  ideaCnt: number;
  slug: string;
  smileCnt: number;
  thumbsUpCnt: number;
  title: string;
  users: UserProfile;
  viewCnt: number;
}

interface FilterProps {
  currentPage: number;
  currentCategory: string;
  currentOrder: "createdAt" | "viewCnt" | "commentsCnt";
}

export default function TilList({
  currentPage,
  currentCategory,
  currentOrder,
}: FilterProps) {
  const [page, setPage] = useState(Number(currentPage));
  const [selectedOrder, setSelectedOrder] = useState(currentOrder);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const router = useRouter();
  const { data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["getListTil", selectedCategory, page, selectedOrder],
    queryFn: async () => {
      const filterData = {
        order: selectedOrder,
        category: selectedCategory,
        page,
      };
      if (!["createdAt", "commentsCnt", "viewCnt"].includes(filterData.order)) {
        filterData.order = "createdAt";
      }

      if (!TILCATEGORIES.some((category) => category === selectedCategory)) {
        filterData.category = "전체";
      }
      return await apiGetListTil(filterData);
    },
    placeholderData: keepPreviousData,
  });
  const onPageChange = (page: number) => {
    setPage(page);
  };
  const handleViewTil = (slug: string) => {
    router.push(
      `/til/${slug}?page=${page}&category=${selectedCategory}&order=${selectedOrder}`
    );
  };
  const handleCategory = async (category: (typeof TILCATEGORIES)[number]) => {
    setPage(1);
    setSelectedCategory(category);
  };

  const handleOrder = (
    selectedOrder: "createdAt" | "viewCnt" | "commentsCnt"
  ) => {
    setSelectedOrder(selectedOrder);
  };

  useEffect(() => {
    router.push(
      `/til?page=${page}&category=${selectedCategory}&order=${selectedOrder}`
    );
  }, [page, selectedCategory, selectedOrder]);

  useEffect(() => {
    refetch();
  }, [page]);
  return isLoading ? (
    <TilSkeleton />
  ) : (
    <div className="container mx-auto p-4  min-h-screen">
      <div className="text-md font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {TILCATEGORIES.map(
            (category: (typeof TILCATEGORIES)[number], key: number) => (
              <li key={key} className="me-2">
                <a
                  href="#"
                  className={`inline-block p-4 ${
                    selectedCategory === category
                      ? "text-blue-600 border-b-2 border-b-blue-600"
                      : ``
                  } active:text-blue-600 active:border-b-2 active:border-b-blue-600 hover:text-blue-600 hover:border-b-2 hover:border-b-blue-600 rounded-t-lg`}
                  onClick={() => handleCategory(category)}
                >
                  {category}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="space-y-6">
        <div className="flex justify-end items-center flex-row text-xs font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
          <span>정렬 :</span>
          <ul className="flex flex-wrap -mb-px">
            <li>
              <a
                href="#"
                className={`inline-block p-4 ${
                  selectedOrder === "createdAt"
                    ? "text-blue-600 border-b-2 border-b-blue-600"
                    : ``
                } active:text-blue-600 active:border-b-2 active:border-b-blue-600 hover:text-blue-600 hover:border-b-2 hover:border-b-blue-600 rounded-t-lg`}
                onClick={() => handleOrder("createdAt")}
              >
                {"최신순"}
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`inline-block p-4 ${
                  selectedOrder === "viewCnt"
                    ? "text-blue-600 border-b-2 border-b-blue-600"
                    : ``
                } active:text-blue-600 active:border-b-2 active:border-b-blue-600 hover:text-blue-600 hover:border-b-2 hover:border-b-blue-600 rounded-t-lg`}
                onClick={() => handleOrder("viewCnt")}
              >
                {"조회수"}
              </a>
            </li>

            <li>
              <a
                href="#"
                className={`inline-block p-4 ${
                  selectedOrder === "commentsCnt"
                    ? "text-blue-600 border-b-2 border-b-blue-600"
                    : ``
                } active:text-blue-600 active:border-b-2 active:border-b-blue-600 hover:text-blue-600 hover:border-b-2 hover:border-b-blue-600 rounded-t-lg`}
                onClick={() => handleOrder("commentsCnt")}
              >
                {"댓글수"}
              </a>
            </li>
          </ul>
        </div>
        {isSuccess &&
          data.tilList.map((til: TilAttribute, key: number) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-4 flex flex-col gap-4">
                  <span className="text-lg font-semibold text-blue-600 block mb-2">
                    {til.category}
                  </span>

                  <div
                    className="flex flex-row gap-3 text-gray-600 text-sm cursor-pointer"
                    onClick={() => handleViewTil(`${til.title}-${til.slug}`)}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={til.users.avatar_url}
                    />
                    <h4>{til.users.login}</h4>
                    <h4>조회 {til.viewCnt}</h4>
                    <h4> {moment(til.createdAt).fromNow()}</h4>
                  </div>

                  <div
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() => handleViewTil(`${til.title}-${til.slug}`)}
                  >
                    <h2 className="text-2xl font-bold">{til.title}</h2>
                  </div>
                </div>

                <div className="flex flex-row items-center space-x-2">
                  <div className="flex flex-row text-md items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                      />
                    </svg>
                    <span>0</span>
                  </div>
                  <div className="flex flex-row items-center text-md gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                      />
                    </svg>

                    <span>{til.commentsCnt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {isSuccess && data?.tilList?.length === 0 && (
          <div className="bg-white text-center rounded-lg shadow overflow-hidden">
            <div className="p-6">작성된 TIL이 없습니다.</div>
          </div>
        )}
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => router.push(`/til/write`)}
        >
          작성
        </button>
      </div>
      <div className="flex justify-center flex-row mt-6">
        <Paginate
          onPageChange={onPageChange}
          totalCount={data?.totalCount}
          page={page}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { category, page, order } = context.query;
  return {
    props: {
      currentCategory: category ?? "전체",
      currentPage: page ?? 1,
      currentOrder: order ?? "createdAt",
    },
  };
};
