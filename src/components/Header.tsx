import { IRootReducer } from "@/store/reducer.dto";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { isLogin, login } = useSelector(
    (state: IRootReducer) => state.usersReducer
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const menuList = [
    {
      name: "대시보드",
      href: "/member/profile/dashboard/",
    },
    {
      name: "3대측정",
      href: "/bigthree/",
    },
    {
      name: "팀",
      href: "/team/",
    },
    {
      name: "TIL",
      href: "/til/",
    },
    isLogin
      ? { name: "로그아웃", href: "/member/logout" }
      : { name: "로그인", href: "/member/login" },
  ];
  return (
    <div className="min-h-40 flex flex-col">
      <header className="py-6 px-8 flex justify-center items-center gap-8 bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg">
        <Link href="/">
          <span className="text-xl font-extrabold	py-2 box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
            OCOWAN
          </span>
        </Link>

        {/* PC에서 보이는 메뉴 */}
        <div className="hidden md:flex flex-row gap-8 items-center xs:text-base">
          {menuList.map((menu, key) => (
            <Link href={menu.href} key={key}>
              <button className="text-3xl text-black font-bold">
                {menu.name}
              </button>
            </Link>
          ))}
        </div>

        {/* 모바일에서 보이는 햄버거 메뉴 */}
        <div className="relative md:hidden">
          <button className="block p-2 focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg p-4 z-50">
              <ul>
                {menuList.map((menu, key) => (
                  <li className="py-2" key={key}>
                    <Link href={menu.href} className="text-gray-800">
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
