//////////////////////////////////////////////////////////////////////////////////////////////////////////
//  import React from "react";
// import { FaSignOutAlt, FaBell, FaCog, FaChartLine } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <aside className="w-full h-full bg-white shadow-lg p-6">
//       <div>
//         <img
//           className=" "
//             src=""
//           alt="User"
//         />
//       </div>

//       <nav className="space-y-4">
//         <div className="text-gray-700 font-semibold mb-2 text-sm">FAVORITES</div>
//         {["Billing & Payments", "Support & Logs", "Energy Consumption", "Onboarding"].map((item, index) => (
//           <a
//             key={index}
//             href="#"
//             className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 text-xs font-italic"
//           >
//             <FaChartLine className="text-blue-500" />
//             <span>{item}</span>
//           </a>
//         ))}
//         <div className="text-gray-700 font-semibold text-sm mt-6 mb-2">MAIN MENU</div>
//         {["Dashboard", "Alerts & Notifications", "User Management", "Meter Management", "Chat", "Invoice", "Archive"].map((item, index) => (
//           <a
//             key={index}
//             href="#"
//             className={`flex items-center space-x-2 p-1 rounded-lg ${
//               item === "Dashboard" ? "bg-gray-100 text-blue-600" : "hover:bg-gray-100 text-xs"
//             }`}
//           >
//             <FaChartLine className="text-blue-500" />
//             <span>{item}</span>
//           </a>
//         ))}
//         <div className="text-gray-700 font-semibold text-sm mt-6 mb-2">SETTINGS</div>
//         <a
//           href="#"
//           className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-100 text-sm"
//         >
//           <FaCog className="text-blue-500" />
//           <span>Roles</span>
//         </a>
//         <a
//           href="#"
//           className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-sm"
//         >
//           <FaSignOutAlt className="text-red-500" />
//           <span className="text-red-500">Log Out</span>
//         </a>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
///////////////////////////////////////////////////////////////////////////////////////

// import React from 'react'
// import { NavLink } from "react-router-dom";
// import { FaTachometerAlt, FaChartLine } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-white shadow-md p-4">
//       <nav className="space-y-2">
//         {/* Dashboard */}
//         <NavLink 
//           to="/dashboard" 
//           className={({ isActive }) => 
//             `flex items-center space-x-2 p-2 rounded-lg ${
//               isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100 text-gray-700"
//             }`
//           }
//         >
//           <FaTachometerAlt className="text-blue-500" />
//           <span>Dashboard</span>
//         </NavLink>

//         {/* Meter Management */}
//         <NavLink 
//           to="/metermanagement" 
//           className={({ isActive }) => 
//             `flex items-center space-x-2 p-2 rounded-lg ${
//               isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100 text-gray-700"
//             }`
//           }
//         >
//           <FaChartLine className="text-blue-500" />
//           <span>Meter Management</span>
//         </NavLink>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaSignOutAlt, FaCog, FaChartLine, FaBolt, FaTools } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <aside className="w-full h-full bg-white shadow-lg p-6">
//       {/* Main Menu Section */}
//       <div className="text-gray-700 font-semibold mb-2 text-sm">MAIN MENU</div>
//       {[
//         { name: "Dashboard", path: "/", icon: <FaChartLine className="text-blue-500" /> },
//         { name: "Meter Management", path: "/metermanagement", icon: <FaBolt className="text-blue-500" /> },
//       ].map((item, index) => (
//         <NavLink
//           key={index}
//           to={item.path}
//           className={({ isActive }) =>
//             `flex items-center space-x-2 p-2 rounded-lg ${
//               isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
//             }`
//           }
//         >
//           {item.icon}
//           <span>{item.name}</span>
//         </NavLink>
//       ))}

//       {/* Settings Section */}
//       <div className="text-gray-700 font-semibold text-sm mt-6 mb-2">SETTINGS</div>
//       <NavLink to="/roles" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-sm">
//         <FaTools className="text-blue-500" />
//         <span>Roles</span>
//       </NavLink>

//       {/* Logout Option */}
//       <NavLink to="/logout" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-sm">
//         <FaSignOutAlt className="text-red-500" />
//         <span className="text-red-500">Log Out</span>
//       </NavLink>
//     </aside>
//   );
// };

// export default Sidebar;
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FaSignOutAlt, FaBell, FaCog, FaChartLine } from "react-icons/fa";

// const Sidebar = () => {
//   return (
//     <aside className="w-full h-full bg-white shadow-lg p-6">
//       {/* User Profile Section */}
//       <div>
//         <img className="w-16 h-16 rounded-full mx-auto" src="" alt="User" />
//       </div>

//       <nav className="space-y-4">
//         {/* Favorites Section */}
//         <div className="text-gray-700 font-semibold mb-2 text-sm">FAVORITES</div>
//         {[
//           { name: "Billing & Payments", path: "/billingandpayment" },
//           { name: "Support & Logs", path: "/supportandlogs" },
//           { name: "Energy Consumption", path: "/energyConsumption" },
//           { name: "Onboarding", path: "/onboarding" }
//         ].map((item, index) => (
//           <NavLink
//             key={index}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center space-x-2 p-2 rounded-lg text-xs font-italic ${
//                 isActive ? "bg-cyan-600 text-white font-semibold" : "hover:bg-gray-100"
//               }`
//             }
//           >
//             <FaChartLine className={({isActive})=>`${isActive ? "text-white" : "text-black"}`} />
//             <span>{item.name}</span>
//           </NavLink>
//         ))}

//         {/* Main Menu Section */}
//         <div className="text-gray-700 font-semibold text-sm mt-6 mb-2">MAIN MENU</div>
//         {[
//           { name: "Dashboard", path: "/", icon: <FaChartLine className={({isActive})=>`${isActive ? "text-white" : "text-black"}`} /> },
//           {name:"User Dashboard", path:"/userdashboard", icon: <FaChartLine className={({isActive})=>`${isActive ? "text-white" : "text-black"}`}/>},
//           { name: "Alerts & Notifications", path: "/alertandnotification", icon: <FaBell className={({isActive})=>`${isActive ? "text-white" : "text-black"}`} /> },
//           { name: "User Management", path: "/usermanagement", icon: <FaChartLine className={({isActive})=>`${isActive ? "text-white" : "text-black"}`} /> },
//           { name: "Meter Management", path: "/metermanagement", icon: <FaChartLine className={({isActive})=>`${isActive ? "text-white" : "text-black"}`} /> },
//           { name: "Chat", path: "/chat", icon: <FaChartLine className={({isActive})=>`${isActive ? "text-white" : "text-black"}`} /> },
//           { name: "Invoice", path: "/invoice", icon: <FaChartLine className={({isActive})=>`${isActive ? "text-white" : "text-black"}`} /> },
//           { name: "Archive", path: "/archive", icon: <FaChartLine className={({isActive})=>`${isActive ? "text-white" : "text-black"}`} /> }
//         ].map((item, index) => (
//           <NavLink
//             key={index}
//             to={item.path}
//             // className={({ isActive }) =>
//             //   `flex items-center space-x-2 p-2 rounded-lg text-xs ${
//             //     isActive ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
//             //   }`
//             // }
//             className={({ isActive }) =>
//               `flex items-center space-x-2 p-2 rounded-lg text-xs font-italic ${
//                 isActive ? "bg-cyan-600 text-white font-semibold" : "hover:bg-gray-100"
//               }`
//             }
//           >
//             {item.icon}
//             <span>{item.name}</span>
//           </NavLink>
//         ))}

//         {/* Settings Section */}
//         <div className="text-gray-700 font-semibold text-sm mt-6 mb-2">SETTINGS</div>
//         <NavLink to="/roles" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-sm">
//           <FaCog className="text-blue-500" />
//           <span>Roles</span>
//         </NavLink>

//         {/* Logout Button */}
//         <NavLink to="/logout" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-sm">
//           <FaSignOutAlt className="text-red-500" />
//           <span className="text-red-500">Log Out</span>
//         </NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaSignOutAlt, 
  FaBell, 
  FaCog, 
  FaChartLine, 
  FaTachometerAlt,
  FaUsers,
  FaFileInvoiceDollar,
  FaComments,
  FaArchive,
  FaCalculator,
  FaLifeRing,
  FaBolt,
  FaUserPlus,
  FaChevronDown,
  FaChevronRight,
  FaUser,
  FaUserShield
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    favorites: true,
    mainMenu: true,
    settings: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const favoriteItems = [
    { name: "Billing & Payments", path: "/billingandpayment", icon: FaFileInvoiceDollar, color: "text-emerald-500" },
    { name: "Support & Logs", path: "/supportandlogs", icon: FaLifeRing, color: "text-blue-500" },
    { name: "Energy Consumption", path: "/energyConsumption", icon: FaBolt, color: "text-yellow-500" },
    { name: "Onboarding", path: "/onboarding", icon: FaUserPlus, color: "text-purple-500" }
  ];

  const mainMenuItems = [
    { name: "Dashboard", path: "/", icon: FaTachometerAlt, color: "text-blue-600" },
    { name: "User Dashboard", path: "/userdashboard", icon: FaUser, color: "text-indigo-500" },
    { name: "Alerts & Notifications", path: "/alertandnotification", icon: FaBell, color: "text-red-500" },
    { name: "User Management", path: "/usermanagement", icon: FaUsers, color: "text-green-500" },
    { name: "Meter Management", path: "/metermanagement", icon: FaCalculator, color: "text-orange-500" },
    { name: "Chat", path: "/chat", icon: FaComments, color: "text-cyan-500" },
    { name: "Invoice", path: "/invoice", icon: FaFileInvoiceDollar, color: "text-pink-500" },
    { name: "Archive", path: "/archive", icon: FaArchive, color: "text-gray-500" }
  ];

  const settingsItems = [
    { name: "Roles", path: "/roles", icon: FaUserShield, color: "text-violet-500" }
  ];

  const SectionHeader = ({ title, isExpanded, onToggle, count }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left mb-3 group"
    >
      <div className="flex items-center space-x-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {title}
        </span>
        {count && (
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
            {count}
          </span>
        )}
      </div>
      <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
        {isExpanded ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
      </div>
    </button>
  );

  const MenuItem = ({ item, isActive }) => {
    const IconComponent = item.icon;
    return (
      <div className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
        isActive 
          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg transform scale-[1.02]" 
          : "hover:bg-gray-50 hover:shadow-md hover:transform hover:scale-[1.01]"
      }`}>
        <div className={`p-2 rounded-lg ${
          isActive 
            ? "bg-white/20" 
            : "bg-gray-100 group-hover:bg-white group-hover:shadow-sm"
        }`}>
          <IconComponent 
            className={`${isActive ? "text-white" : item.color} transition-colors`} 
            size={16} 
          />
        </div>
        <span className={`font-medium text-sm ${
          isActive ? "text-white" : "text-gray-700"
        } group-hover:text-gray-900 transition-colors`}>
          {item.name}
        </span>
      </div>
    );
  };

  return (
    <aside className="w-full h-full bg-white shadow-xl border-r border-gray-100">
      <div className="px-6 py-4  h-full flex flex-col">
        {/* User Profile Section */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 mx-auto flex items-center justify-center shadow-lg">
              <FaUser className="text-white text-2xl" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-sm"></div>
          </div>
          <div className="text-center mt-4">
            <h3 className="font-bold text-gray-800">Welcome Back</h3>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 px-3 overflow-y-scroll w-full">
          {/* Favorites Section */}
          <div>
            <SectionHeader 
              title="Favorites" 
              isExpanded={expandedSections.favorites}
              onToggle={() => toggleSection('favorites')}
              count={favoriteItems.length}
            />
            {expandedSections.favorites && (
              <div className="space-y-2">
                {favoriteItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) => `block ${isActive ? 'relative' : ''}`}
                  >
                    {({ isActive }) => <MenuItem item={item} isActive={isActive} />}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Main Menu Section */}
          <div>
            <SectionHeader 
              title="Main Menu" 
              isExpanded={expandedSections.mainMenu}
              onToggle={() => toggleSection('mainMenu')}
              count={mainMenuItems.length}
            />
            {expandedSections.mainMenu && (
              <div className="space-y-2">
                {mainMenuItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) => `block ${isActive ? 'relative' : ''}`}
                  >
                    {({ isActive }) => <MenuItem item={item} isActive={isActive} />}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div>
            <SectionHeader 
              title="Settings" 
              isExpanded={expandedSections.settings}
              onToggle={() => toggleSection('settings')}
              count={settingsItems.length}
            />
            {expandedSections.settings && (
              <div className="space-y-2">
                {settingsItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) => `block ${isActive ? 'relative' : ''}`}
                  >
                    {({ isActive }) => <MenuItem item={item} isActive={isActive} />}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="pt-6 border-t border-gray-100">
          <NavLink 
            to="/logout" 
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 hover:shadow-md transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
              <FaSignOutAlt className="text-red-500 group-hover:text-red-600" size={16} />
            </div>
            <span className="font-medium text-sm text-red-500 group-hover:text-red-600 transition-colors">
              Log Out
            </span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;