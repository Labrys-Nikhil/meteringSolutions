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
import PrivateRoute from "./service/ProtectedRoute";
import UsageHistory from './pages/UsageHistory'
import AccountSettings from "./pages/AccountSetting";
import SignUpForm from './components/user/SignUpForm'
import SignIn from './components/user/LoginForm';

const App = () => {
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/customer-register" element={<SignUpForm />} />

      
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path='/admin-dashbaord' element={<AdminDashboard />} />
            <Route path="user-management/:id"  element={<UserManagement />} />
            <Route path="meter-management/:id" element={<MeterManagement />} />
            <Route path="roles/:id" element={<Roles />} />
            <Route path="supportandlogs/:id" element={<SupportAndLogs />} />
            <Route path="onboarding/:id" element={<Onboarding />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={['user']} />}>
          <Route path='/user' element={<DashboardLayout />} >
            <Route path='dashboard/:id' element={<UserDashboard />} />
            <Route path='usage-history/:id' element={<UsageHistory />} />
            <Route path='account-setting/:id' element={<AccountSettings />} />
            <Route path="alert-notification/:id"element={<AlertAndNotification />}/>
            <Route path="archive/:id" element={<Archive />} />
            <Route path="billingandpayment/:id" element={<BillingAndPayment />} />
            <Route path="chat/:id" element={<Chat />} />

            <Route path="energyConsumption/:id">
              <Route path="" index element={<EnergyConsumption />} />
              <Route path="recenthistoricaldata" element={<RecentAndHistoricalData />} />
            </Route>

            <Route path="invoice/:id" element={<Invoice />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;

