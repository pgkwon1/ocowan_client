import BigThree from "@/components/BigThree/BigThree";
import BigThreeBoard from "@/components/BigThree/BigThreeBoard";
import BigThreeChart from "@/components/BigThree/BigThreeChart";
import ConditionalWrapper from "@/components/ConditionalWrapper";
import LoginOverlay from "@/components/LoginOverlay";
import { useSelector } from "react-redux";
import { IRootReducer } from "@/store/reducer.dto";

export default function BigThreeIndex() {
  const { isLogin } = useSelector((state: IRootReducer) => state.usersReducer);
  return (
    <ConditionalWrapper
      condition={!isLogin}
      wrapper={(children) => <LoginOverlay>{children}</LoginOverlay>}
    >
      <BigThree />
      <h2 className="text-center text-2xl font-semibold mb-4">내 3대는?</h2>
      <BigThreeBoard />
      <BigThreeChart />
    </ConditionalWrapper>
  );
}
