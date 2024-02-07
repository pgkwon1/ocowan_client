import { IRootReducer } from "@/store/reducer.dto";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const { isLogin, login } = useSelector(
    (state: IRootReducer) => state.githubReducer
  );
  return (
    <div className="min-h-40 flex flex-col">
      <header className="py-4 px-8 flex justify-between items-center">
        <img src="/images/logo.png" alt="OCOWAN Logo" className="w-40 h-auto" />
        {isLogin && login ? (
          <Link href="/member/logout">
            <button className="text-3xl text-white font-bold">LOGOUT</button>
          </Link>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}
