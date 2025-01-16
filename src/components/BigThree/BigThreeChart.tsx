import { apiGetBigThree, apiGetBigThreeWeekly } from "@/api/bigthree";
import { IRootReducer } from "@/store/reducer.dto";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { setGlobalToast } from "../Toast";

export default function BigThreeChart() {
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);

  const { data } = useQuery({
    queryKey: ["getBigThreeWeekly", login],
    queryFn: async () => await apiGetBigThreeWeekly(),
  });
  const ReactApexChart = dynamic(() => import("react-apexcharts"));
  return (
    <>
      <ReactApexChart
        series={[
          {
            name: login,
            data: data?.data.weeklyData,
          },
        ]}
        options={{
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

          colors: ["#9333ea", "#545454"],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "smooth",
          },
          title: {
            text: "최근 3대 측정 통계",
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
          xaxis: {
            categories: data?.data.weeklyDate,
          },
          yaxis: {
            title: {
              text: "",
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
        }}
      />
    </>
  );
}
