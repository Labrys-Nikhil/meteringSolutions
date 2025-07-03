import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import MeterManagement from "./pages/MeterManagement";
import UserManagement from "./pages/UserManagement";
import AlertAndNotification from "./pages/AlertAndNotification";
import Archive from "./pages/Archive";
import BillingAndPayment from "./pages/BillingAndPayment";
import Chat from "./pages/Chat";
import EnergyConsumption from "./pages/EnergyConsumption";
import Invoice from "./pages/Invoice";
import Onboarding from "./pages/Onboarding";
import Roles from "./pages/Roles";
import SupportAndLogs from "./pages/SupportAndLogs";
import RecentAndHistoricalData from "./components/energyConsumption/RecentAndHistoricalData";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./service/ProtectedRoute";

const App = () => {
  // const isAuthenticated = true;
  // const userRole = "Admin"
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
        {/* <Route path="admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["Admin"]} userRoles={userRole} />}> */}
          <Route index element={<AdminDashboard />} />
          <Route path="userdashboard" element={<UserDashboard/>}/>

          <Route path="userdashboard">
            <Route path="" index element={<UserDashboard/>}/>
            <Route path="recenthistoricaldata" element={<RecentAndHistoricalData/>}/>
          </Route>
          {/* </Route> */}
          <Route path="metermanagement" element={<MeterManagement />} />
          <Route path="usermanagement" >
            <Route index element={<UserManagement />}/>
            <Route path="userDashboard/:userId" element={<UserDashboard/>}/>
          </Route>
          <Route
            path="alertandnotification"
            element={<AlertAndNotification />}
          />
          <Route path="archive" element={<Archive />} />
          <Route path="billingandpayment" element={<BillingAndPayment />} />
          <Route path="chat" element={<Chat />} />

          <Route path="energyConsumption">
            <Route path="" index element={<EnergyConsumption />}/>
            <Route path="recenthistoricaldata" element={<RecentAndHistoricalData />}/>
          </Route>

          <Route path="invoice" element={<Invoice />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="roles" element={<Roles />} />
          <Route path="supportandlogs" element={<SupportAndLogs />} />
        </Route>

         
      </Routes>
     
    </HashRouter>
  );
};

export default App;




// import React, { useState } from "react";
// import { HashRouter, Routes, Route } from "react-router-dom";
// import DashboardLayout from "./layout/DashboardLayout";
// import AdminDashboard from "./pages/AdminDashboard";
// import ManagerDashboard from "./pages/ManagerDashboard";
// import UserDashboard from "./pages/UserDashboard";
// import MeterManagement from "./pages/MeterManagement";
// import UserManagement from "./pages/UserManagement";
// import AlertAndNotification from "./pages/AlertAndNotification";
// import BillingAndPayment from "./pages/BillingAndPayment";
// import Chat from "./pages/Chat";
// import Roles from "./pages/Roles";
// import ProtectedRoute from "./service/ProtectedRoute";
// import Sidebar from "./components/Sidebar";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true); // Change based on auth state
//   const [userRole, setUserRole] = useState("Admin"); // Change based on login

//   return (
//     <HashRouter>
//       <div className="flex">
//         {/* Sidebar - Only show if authenticated */}
//         {isAuthenticated && <Sidebar userRole={userRole} />}

//         <div className="flex-grow p-6">
//           <Routes>
//             {/* Admin Routes */}
//             <Route
//               element={
//                 <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["Admin"]} userRole={userRole} />
//               }
//             >
//             <Route path="/" element={<DashboardLayout/>}>
//               <Route path="/admin" element={<AdminDashboard />} />
//               <Route path="/usermanagement" element={<UserManagement />} />
//               <Route path="/roles" element={<Roles />} />
//               <Route path="/billingandpayment" element={<BillingAndPayment />} />
//             </Route>
//             </Route>

//             {/* Manager Routes */}
//             <Route
//               element={
//                 <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["Manager"]} userRole={userRole} />
//               }
//             >
//               <Route path="/manager" element={<ManagerDashboard />} />
//               <Route path="/metermanagement" element={<MeterManagement />} />
//             </Route>

//             {/* User Routes */}
//             <Route
//               element={
//                 <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["User"]} userRole={userRole} />
//               }
//             >
//               <Route path="/user" element={<UserDashboard />} />
//               <Route path="/alertandnotification" element={<AlertAndNotification />} />
//               <Route path="/chat" element={<Chat />} />
//             </Route>

//             {/* Default Route */}
//             <Route path="*" element={<h1>404 Not Found</h1>} />
//           </Routes>
//         </div>
//       </div>
//     </HashRouter>
//   );
// };

// export default App;
