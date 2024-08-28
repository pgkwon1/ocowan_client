import { apiGetTeamList } from "@/api/team/team";
import { IRootReducer } from "@/store/reducer.dto";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import Paginate from "@/components/Pagination";
import Link from "next/link";

export default function TeamIndex() {
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);
  const router = useRouter();
  const [teamList, setTeamList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { data, isLoading, refetch } = useQuery(
    ["getTeamList", login],
    async () => await apiGetTeamList(page),
    {
      onSuccess(result) {
        const { count, teamList } = result.data;

        setTeamList(teamList);
        setTotalCount(count);
      },
    }
  );

  const onPageChange = (page: number) => setPage(page);

  useEffect(() => {
    refetch();
  }, [page]);

  const itemPerPage: number = 10;
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="text-2xl">팀 목록</div>
      <div className="flex flex-row justify-end">
        <Link href="/team/create">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            팀 생성
          </button>
        </Link>
      </div>
      {teamList?.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          <span className="font-medium">
            가입된 팀이 없습니다. 팀의 리더의 초대를 통해 팀에 가입할 수
            있습니다.
          </span>
        </div>
      ) : isLoading ? (
        "Loading..."
      ) : (
        teamList?.length > 0 &&
        teamList.map((data: any, key: number) => (
          <div
            key={key}
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 w-full"
          >
            <Link href={`/team/${data.id}`}>
              <div className="bg-background rounded-lg shadow-md overflow-hidden flex">
                <div className="bg-primary p-4 flex items-center justify-center">
                  <img
                    src={`${data.logo}`}
                    alt="Team Logo"
                    onError={() => "/placeholder.svg"}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                    style={{ aspectRatio: "48/48", objectFit: "cover" }}
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{data.name}</h2>
                    <div className="bg-primary-foreground text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {login === data.leader ? (
                        <div className="bg-blue-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Owner
                        </div>
                      ) : (
                        <div className="bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Member
                        </div>
                      )}
                    </div>
                  </div>
                  <h5 className="text-sm text-gray-400">{data.description}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))
      )}
      <Paginate
        page={page}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  );
}
