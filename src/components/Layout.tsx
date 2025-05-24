import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Levels from "./users/level";
import ConditionalWrapper from "./ConditionalWrapper";
import { useSelector } from "react-redux";
import { IRootReducer } from "@/store/reducer.dto";
import LoginOverlay from "./LoginOverlay";

const Layout = ({
  children,
  isLayoutDisplay = true,
}: {
  children: ReactNode;
  isLayoutDisplay: boolean;
}) => {
  const { login } = useSelector((state: IRootReducer) => state.usersReducer);
  return (
    <div className="flex flex-col">
      {isLayoutDisplay ? <Header /> : ""}
      <div className="min-h-screen px-5 md:px-0">
        <ConditionalWrapper
          condition={!login}
          wrapper={(children) => <LoginOverlay>{children}</LoginOverlay>}
        >
          <Levels />
        </ConditionalWrapper>
        <main className="max-w-4xl min-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg mt-8">
          <div className="flex gap-8 flex-col p-8 shadow-md rounded-md ">
            {children}
          </div>
        </main>
      </div>
      {isLayoutDisplay ? (
        <footer className="flex justify-items-center flex-col contents-center p-10">
          <Footer />
        </footer>
      ) : (
        ""
      )}
    </div>
  );
};
export default Layout;
