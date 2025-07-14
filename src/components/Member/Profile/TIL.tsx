import { apiGetListTil, apiGetTil } from "@/api/til/til";
import Paginate from "@/components/Pagination";
import { TilAttribute } from "@/pages/til";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/ko";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

export default function ProfileTilList({ id: users_id }: { id: string }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getTilList", users_id, page],
    queryFn: async () =>
      await apiGetListTil({
        category: "전체",
        page,
        order: "createdAt",
        users_id,
      }),
  });

  const onPageChange = (page: number) => setPage(page);

  useEffect(() => {
    refetch();
  }, [page]);
  return isLoading ? (
    ""
  ) : (
    <div className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-4">
          <h2 className="shrink-0 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            TIL ({data.totalCount})
          </h2>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
            {data.tilList.map((til: TilAttribute, index: number) => (
              <div key={index} className="space-y-4 py-6 md:py-8">
                <div className="grid gap-4">
                  <span
                    className="text-lg font-bold text-blue-600 block mb-2 cursor-pointer"
                    onClick={() =>
                      router.push(`/til/?category=${til.category}`)
                    }
                  >
                    {til.category}
                  </span>
                  <h2
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => router.push(`/til/${til.title}-${til.slug}`)}
                  >
                    {til.title}
                  </h2>
                </div>
                <div className="flex flex-row gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {moment(til.createdAt).fromNow()}
                  <a
                    href="#"
                    className="text-gray-900 hover:underline dark:text-white"
                  >
                    {til.users.login}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex  items-center justify-center">
          <Paginate
            page={page}
            onPageChange={onPageChange}
            totalCount={data.totalCount}
          />
        </div>
      </div>
    </div>
  );
}
