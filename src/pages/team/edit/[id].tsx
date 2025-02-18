import { apiCreateTeam, apiEditTeam, apiGetTeamInfo } from "@/api/team/team";
import { IRootReducer } from "@/store/reducer.dto";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { setGlobalToast } from "@/components/Toast";

export default function TeamEdit({ id }: { id: string }) {
  const router = useRouter();
  const { login, avatar_url } = useSelector(
    (state: IRootReducer) => state.usersReducer
  );
  const [teamData, setTeamData] = useState({
    id: "",
    name: "",
    leader: "",
    description: "",
    logo: {} as File,
    oldFileLogo: "",
  });

  const editMutate = useMutation({
    mutationKey: ["editTeam"],
    mutationFn: async () => await apiEditTeam(teamData),

    onSuccess(data) {
      if (data.result) {
        setGlobalToast("수정 완료되었습니다.");
        router.push(`/team/${teamData.id}`);
      }
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["getTeamInfo", id],
    queryFn: async () => await apiGetTeamInfo(id),
  });

  useEffect(() => {
    if (isSuccess) {
      const { id, name, leader, description, logo } = data;
      setTeamData({
        id,
        name,
        leader,
        description,
        logo,
        oldFileLogo: logo as string,
      });
    }
  }, [isSuccess]);

  const setFormData = (attr: string, data: any) => {
    setTeamData((current) => ({ ...current, [attr]: data }));
  };

  return (
    <div className="max-w-lg mx-auto">
      <form className="">
        <div className="mb-5">
          <img
            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
            src={teamData.oldFileLogo}
            alt=""
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            팀명
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="사용하실 팀 명을 입력해주세요."
            value={teamData.name}
            onChange={(e) => setFormData("name", e.currentTarget.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            팀 설명
          </label>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="팀 설명을 작성해주세요."
            value={teamData.description}
            onChange={(e) => setFormData("description", e.currentTarget.value)}
          ></textarea>
        </div>
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            로고
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={(e) => {
              if (e.target.files !== null) {
                setFormData("logo", e.target.files[0]);
              }
            }}
          />
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={async () => await editMutate.mutate()}
        >
          팀 생성
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};
