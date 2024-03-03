import BigThree from "@/components/BigThree/BigThree";
import BigThreeBoard from "@/components/BigThree/BigThreeBoard";
import BigThreeChart from "@/components/BigThree/BigThreeChart";

export default function BigThreeIndex() {
  return (
    <>
      <BigThree />
      <h2 className="text-center text-2xl font-semibold mb-4">내 3대는?</h2>
      <BigThreeBoard />
      <BigThreeChart />
    </>
  );
}
