import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";

function DashboardLayout() {
  return (
    <div className="w-screen h-screen bg-blue-200/20 flex space-around">
      <div className="w-[20%] h-screen ">
        <Sidebar />
      </div>
      <div className="w-[85%] flex-col h-full">
        <div className="h-[10%]">
          <Topbar />
        </div>
        <div className="h-[90%] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
      <div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default DashboardLayout;
