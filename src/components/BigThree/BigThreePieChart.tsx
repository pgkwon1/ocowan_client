import { IRootReducer } from "@/store/reducer.dto";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function BigThreePieChart({}) {
  const { commitCount, issueCount, pullReqCount } = useSelector(
    (state: IRootReducer) => state.bigthreeReducer
  );

  const options: ApexCharts.ApexOptions = {
    labels: ["커밋", "이슈", "PR"],
    colors: ["#3b82f6", "#f59e0b", "#ef4444"],
  };

  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  return (
    <div className="flex items-center justify-center">
      <ReactApexChart
        type={"pie"}
        series={[commitCount, issueCount, pullReqCount]}
        options={options}
      />
    </div>
  );
}
