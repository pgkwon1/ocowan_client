import { IRootReducer } from "@/store/reducer.dto";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const { isLogin, login } = useSelector(
    (state: IRootReducer) => state.usersReducer
  );
  return (
    <div className="min-h-40 flex flex-col">
      <header className="py-4 px-8 flex justify-between items-center">
        <Link href="/">
          <img src="/logo.png" alt="OCOWAN Logo" className="w-40 h-auto" />
        </Link>
        {isLogin && login ? (
          <>
            <Link href="/bigthree/">
              <button className="text-3xl text-white font-bold">3대측정</button>
            </Link>
            <Link href="/member/logout">
              <button className="text-3xl text-white font-bold">LOGOUT</button>
            </Link>
          </>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}
