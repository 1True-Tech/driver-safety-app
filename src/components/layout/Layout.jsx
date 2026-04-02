import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import "../../styles/components/Layout.css";

export default function Layout() {
  useScrollToTop();

  return (
    <div className="layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}