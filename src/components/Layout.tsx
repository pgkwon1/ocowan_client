import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="min-h-screen">{children}</div>
      <footer className="flex justify-items-center flex-col contents-center p-10">
        <Footer />
      </footer>
    </div>
  );
};
export default Layout;
