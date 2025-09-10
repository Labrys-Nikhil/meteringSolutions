// import React from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import { Outlet } from "react-router-dom";

// function DashboardLayout() {
//   return (
//     <div className="w-screen h-screen bg-blue-200/20 flex space-around">
//       <div className="w-[20%] h-screen ">
//         <Sidebar />
//       </div>
//       <div className="w-[80%] flex-col h-full">
//         <div className="h-[10%] w-full">
//           <Topbar />
//         </div>
//         <div className="h-[90%] w-full overflow-y-scroll">
//           <Outlet />
//         </div>
//       </div>
//       <div>
//         {/* <Footer /> */}
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;




// dashboard layouts


import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-screen h-screen bg-blue-200/20 flex overflow-hidden relative">
      {/* Sidebar (Single Component for both mobile + desktop) */}
      <div
        className={`
          fixed lg:static top-0 left-0 h-full w-72 lg:w-[20%] bg-white shadow-xl border-r border-gray-100 z-40
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full lg:w-[80%]">
        <div className="h-[10%]">
          <Topbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        </div>

        <div className="h-[90%] overflow-y-scroll overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
