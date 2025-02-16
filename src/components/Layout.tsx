import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Levels from "./users/level";

const Layout = ({
  children,
  isLayoutDisplay = true,
}: {
  children: ReactNode;
  isLayoutDisplay: boolean;
}) => {
  return (
    <div className="flex flex-col">
      {isLayoutDisplay ? <Header /> : ""}
      <div className="min-h-screen px-5 md:px-0">
        <Levels />

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
