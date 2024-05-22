import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import moment from "moment";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { apiGetOcowan } from "@/api/ocowan";
import { setOcowan } from "@/store/reducers/ocowan.reducer";
import { IRootReducer } from "@/store/reducer.dto";
export default function OcowanCalendar() {
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);
  const dispatch = useDispatch();
  const { data } = useQuery(
    ["getOcowan", login],
    async () => await apiGetOcowan(login),
    {
      onSuccess(result) {
        const isOcowan = result.some((ocowan_date: string) => {
          const today = moment().format("YYYY-MM-DD");
          return today === ocowan_date;
        });
        dispatch(
          setOcowan({
            ocowan: isOcowan,
          })
        );
      },
    }
  );
  const currentDate = moment();

  const tileClassName = ({ date }: { date: Date }) => {
    return data?.some((ocowan_date: string) =>
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
