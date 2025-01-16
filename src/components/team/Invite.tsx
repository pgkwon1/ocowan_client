import { apiCreateInviteCode } from "@/api/team/team";
import { IRootReducer } from "@/store/reducer.dto";
import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { setGlobalToast } from "../Toast";

export default function TeamInvite({
  isLeader,
  id,
}: {
  isLeader: boolean;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [link, setLink] = useState("");

  const inviteMutation = useMutation({
    mutationKey: ["invite", id],
    mutationFn: async () => await apiCreateInviteCode(id),

    onSuccess(data) {
      setLink(`${process.env.NEXT_PUBLIC_DOMAIN}team/invite/${data.token}`);
      setIsCreate(true);
    },
  });

  const handleLink = async () => {
    open === false && isCreate === false ? await inviteMutation.mutate() : null;
    setOpen(true);
  };

  return (
    <div>
      {isLeader ? (
        <div className="flex flex-col ">
          <div className="flex flex-row gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={async () => await handleLink()}
            >
              초대코드 생성
            </button>
            {open ? (
              <div className="">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={async () => {
                    console.log(link);
                    await navigator.clipboard.writeText(link);
                    setGlobalToast("복사되었습니다.");
                  }}
                >
                  복사하기
                </button>
              </div>
            ) : (
              ""
            )}
          </div>

          {open ? (
            <div>
              <div className="flex justify-center items-center mt-4">
                <div className="bg-gray-800 text-white p-4 rounded-md">
                  <Countdown date={moment().add(10, "minutes").toString()} />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
