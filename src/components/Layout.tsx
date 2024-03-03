import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen">
        <main className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg mt-8">
          <div className="flex gap-8 flex-col p-8 shadow-md rounded-md">
            {children}
          </div>
        </main>
      </div>
      <footer className="flex justify-items-center flex-col contents-center p-10">
        <Footer />
      </footer>
    </div>
  );
};
export default Layout;
