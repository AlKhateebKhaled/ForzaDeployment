import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./style.css";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function Main() {
  const { isDarkMode } = useContext(AppContext);
  return (
    <div className="root-layout">
      <header>
        <Navbar />
      </header>
      <main
        className={
          isDarkMode ? "main-content dark-mode" : "main-content light-mode"
        }
      >
        <Outlet />
      </main>
    </div>
  );
}
