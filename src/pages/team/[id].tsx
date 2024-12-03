import { apiGetMemberBigThree, apiGetTeamInfo } from "@/api/team/team";
import TeamInvite from "@/components/team/Invite";
import { IRootReducer } from "@/store/reducer.dto";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

interface ITeamInfo {
  name: string;
  description: string;
  leader: string;
  logo: string;
  member_count: number;
}

interface ITeamMember {
  users: {
    login: string;
    avatar_url: string;
  };
}
export default function TeamInfo({ id }: { id: string }) {
  const [bigThree, setBigThree] = useState<any[]>([]);
  const [teamMember, setTeamMember] = useState<ITeamMember[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLeader, setIsLeader] = useState(false);
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);

  const Chart = dynamic(() => import("react-apexcharts"));

  const { data, isLoading } = useQuery(
    ["getTeamInfo", id],
    async () => await apiGetTeamInfo(id),

    {
      async onSuccess(result) {
        if (result) {
          if (result.leader === login) {
            setIsLeader(true);
          }

          setTeamMember(result.teamMember);
          const response = await apiGetMemberBigThree(id);
          setBigThree(response);
        }
      },
    }
  );

  useEffect(() => {
    bigThree.length > 0 && setChartData(handleMemberBigThree);
  }, [bigThree]);

  const handleMemberBigThree = useMemo(() => {
    return bigThree.map((member) => ({
      name: Array.isArray(member) && member.length > 0 ? member[0].login : "",
      data: member?.map(
        (data: { pullReqCount: any; issueCount: any; commitCount: any }) =>
          data?.pullReqCount + data?.issueCount + data?.commitCount
      ),
    }));
  }, [bigThree]);

  const options: ApexCharts.ApexOptions = useMemo(
    () => ({
      chart: {
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: "pgkwon1",
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
      ],

      colors: ["#9333ea", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "monotoneCubic",
      },
      title: {
        text: "최근 7일 측정 통계",
        align: "center",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 0.5,
      },

      xaxis: {},
      yaxis: {
        title: {
          text: "",
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -5,
        offsetX: -5,
      },
    }),
    []
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {!isLoading ? (
        <div className="text-center">
          {isLeader ? (
            <div className="flex flex-row items-center gap-12">
              <TeamInvite isLeader={isLeader} id={id} />
              <TeamMenu id={id} />
            </div>
          ) : (
            ``
          )}
          <img
            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
            src={`${data.logo}`}
            alt=""
          />
          <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-2">
            {data.name}
          </h3>
          <h5 className="font-bold text-sm text-gray-500 dark:text-white mb-2">
            {data.description}
          </h5>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col w-80 gap-4">
        <div className="font-bold text-2xl text-gray-800 dark:text-white mb-2 text-center">
          멤버
        </div>
        {teamMember && teamMember?.length > 0 ? (
          teamMember.map((member: any, key: number) => {
            return (
              <div
                key={key}
                className="flex flex-row rounded-full border border-black p-2 gap-4 justify-center items-center h-50"
              >
                <div className="flex-shrink rounded-full">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={member.users.avatar_url}
                    alt="Rounded avatar"
                  />
                </div>
                <div className="flex-grow flex flex-row gap-8 items-center justify-center">
                  <span className="text-lg text-gray-800">
                    {member.users.login}
                  </span>
                  {member.leader_yn ? (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      Owner
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="font-bold text-md text-red-900 dark:text-white mb-2 text-center">
            멤버가 존재하지 않습니다.
          </div>
        )}
      </div>
      <Chart width={"100%"} series={chartData} options={options} />
    </div>
  );
}

const TeamMenu = ({ id }: { id: string }) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <button className="flex items-center gap-1 bg-gray-800 text-white py-2 px-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M2.75 7.25h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5zM2.75 11.25h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5zM2.75 15.25h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5z" />
            </svg>
          </button>
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <Link
            href={`/team/${id}/edit`}
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
          >
            수정
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href={`/team/${id}/delete`}
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
          >
            삭제
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};
export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};
