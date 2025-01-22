import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { apiGetOcowan } from "@/api/ocowan";
import { setOcowan } from "@/store/reducers/ocowan.reducer";
import { IRootReducer } from "@/store/reducer.dto";
import { useEffect } from "react";

interface OcowanData {
  ocowan_date: string;
  total_count: number;
}
type OcowanResponse = OcowanData[];

export default function OcowanCalendar() {
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);
  const dispatch = useDispatch();
  const { data, isSuccess } = useQuery<OcowanResponse>({
    queryKey: ["getOcowan", login],
    queryFn: async () => await apiGetOcowan(login),
  });
  useEffect(() => {
    if (isSuccess && data !== undefined) {
      const isOcowan = data.some(({ ocowan_date }) => {
        const today = moment().format("YYYY-MM-DD");
        return today === ocowan_date;
      });
      dispatch(
        setOcowan({
          ocowan: isOcowan,
        })
      );
    }
  }, [isSuccess]);
  const currentDate = moment();

  const tileClassName = ({ date }: { date: Date }) => {
    return data?.some((ocowan_date: any) =>
      moment(ocowan_date).isSame(date, "day")
    )
      ? "ocowan"
      : null;
  };
  return (
    <div className="w-full">
      <Calendar
        maxDetail="month"
        activeStartDate={currentDate.toDate()}
        className="hide-arrows !w-full"
        tileClassName={tileClassName}
        formatDay={(locale, date) => moment(date).format("D")}
      />
    </div>
  );
}
