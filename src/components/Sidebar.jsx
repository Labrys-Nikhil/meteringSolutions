

// // Sidebar

// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaFileInvoiceDollar,
//   FaLifeRing,
//   FaBolt,
//   FaUserPlus,
//   FaTachometerAlt,
//   FaUser,
//   FaBell,
//   FaUsers,
//   FaCalculator,
//   FaComments,
//   FaArchive,
//   FaCog,
//   FaChartBar,
//   FaCreditCard,
//   FaHistory,
//   FaHeadset,
//   FaSignOutAlt,
//   FaChevronDown,
//   FaChevronRight,
// } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { logout, selectUserId, selectUserRole } from "../redux/slice/authSlice";
// import { selectUserProfile } from "../redux/slice/userSlice";
// import { useEffect } from "react";
// import { fetchUserProfile } from "../redux/thunks/profileThunks";

// const getAdminFavoriteItems = (userId) => [
//   {
//     name: "Billing & Payments",
//     path: "/billing-payment",
//     icon: FaFileInvoiceDollar,
//     color: "text-emerald-500",
//   },
//   // Admin
//   {
//     name: "Support & Logs",
//     path: `/admin/supportandlogs/${userId}`,
//     icon: FaLifeRing,
//     color: "text-blue-500",
//   },

//   {
//     name: "Energy Consumption",
//     path: "/energyConsumption",
//     icon: FaBolt,
//     color: "text-yellow-500",
//   },
//   {
//     name: "Onboarding",
//     path: "/onboarding",
//     icon: FaUserPlus,
//     color: "text-purple-500",
//   },
// ];

// const getAdminMainMenuItems = (userId) => [
//   {
//     name: "Dashboard",
//     path: `/admin/dashboard/${userId}`,
//     icon: FaTachometerAlt,
//     color: "text-blue-600",
//   },
//   {
//     name: "Alerts & Notifications",
//     path: `/admin/alert&notification`,
//     icon: FaBell,
//     color: "text-red-500",
//   },
//   {
//     name: "User Management",
//     path: `/admin/user-management/${userId}`,
//     icon: FaUsers,
//     color: "text-green-500",
//   },
//   {
//     name: "Meter Management",
//     path: `/admin/meter-management/${userId}`,
//     icon: FaCalculator,
//     color: "text-orange-500",
//   },
//   { name: "Chat", path: "/chat", icon: FaComments, color: "text-cyan-500" },
//   {
//     name: "Invoice",
//     path: "/invoice",
//     icon: FaFileInvoiceDollar,
//     color: "text-pink-500",
//   },
//   {
//     name: "Archive",
//     path: "/archive",
//     icon: FaArchive,
//     color: "text-gray-500",
//   },
//   {
//     name: "System Settings",
//     path: `/system-settings/${userId}`,
//     icon: FaCog,
//     color: "text-gray-600",
//   },
//   {
//     name: "Analytics",
//     path: `/analytics/${userId}`,
//     icon: FaChartBar,
//     color: "text-purple-600",
//   },
//      {
//     name: "Roles",  
//     path: `/admin/roles/${userId}`,
//     icon: FaUsers,
//     color: "text-gray-600",
//   },
// ];

// const getUserFavoriteItems = (userId) => [
//   {
//     name: "Account Recharge",
//     path: `/rechage-meter/${userId}`,
//     icon: FaCreditCard,
//     color: "text-emerald-500",
//   },
//   {
//     name: "Usage History",
//     path: "/usage-history",
//     icon: FaHistory,
//     color: "text-blue-500",
//   },
//   {
//     name: "Energy Consumption",
//     path: "/energyConsumption",
//     icon: FaBolt,
//     color: "text-yellow-500",
//   },
//   // {
//   //   name: "Support",
//   //   path: "/support",
//   //   icon: FaHeadset,
//   //   color: "text-purple-500",
//   // },
// ];

// const getUserMainMenuItems = (userId) => [
//   {
//     name: "Dashboard",
//     path: `/user/dashboard/${userId}`,
//     icon: FaTachometerAlt,
//     color: "text-blue-600",
//   },
//   {
//     name: "Usage History",
//     path: "/usage-history",
//     icon: FaHistory,
//     color: "text-indigo-500",
//   },
//   {
//     name: "Account Recharge",
//     path: "/rechage-meter",
//     icon: FaCreditCard,
//     color: "text-green-500",
//   },
//   {
//     name: "Reports",
//     path: "/reports",
//     icon: FaChartBar,
//     color: "text-orange-500",
//   },
//   {
//     name: "Account Settings",
//     path: "/account-setting",
//     icon: FaCog,
//     color: "text-gray-500",
//   },
//     {
//     name: "Roles",  
//     path: "/roles",
//     icon: FaUsers,
//     color: "text-gray-600",
//   },
//   // User
//   {
//     name: "Support",
//     path: `/user/supportandlogs/${userId}`,
//     icon: FaLifeRing,
//     color: "text-blue-500",
//   },
//   // { name: "Support", path: "/support", icon: FaHeadset, color: "text-cyan-500" },
//   { name: "Chat", path: "/chat", icon: FaComments, color: "text-cyan-500" },
//   {
//     name: "Invoice",
//     path: "/invoice",
//     icon: FaFileInvoiceDollar,
//     color: "text-pink-500",
//   },
//   {
//     name: "Notifications",
//     path: `/user/alert-notification/${userId}`,
//     icon: FaBell,
//     color: "text-red-500",
//   },
  
// ];

// const getSettingsItems = () => [
//   {
//     name: "Profile Settings",
//     path: "/user/profile",
//     icon: FaUser,
//     color: "text-gray-600",
//   },
//   {
//     name: "Preferences",
//     path: "/preferences",
//     icon: FaCog,
//     color: "text-gray-600",
//   },
// ];

// const SectionHeader = ({ title, isExpanded, onToggle, count }) => (
//   <div
//     className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
//     onClick={onToggle}
//   >
//     <div className="flex items-center space-x-2">
//       <span className="body-sm   font-bold text-gray-600 uppercase tracking-wider">
//         {title}
//       </span>
//       <span className="body-sm   bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
//         {count}
//       </span>
//     </div>
//     {isExpanded ? (
//       <FaChevronDown className="text-gray-400 body-sm  " />
//     ) : (
//       <FaChevronRight className="text-gray-400 body-sm  " />
//     )}
//   </div>
// );

// const MenuItem = ({ item }) => (
//   <NavLink to={item.path} className={`block`}>
//     {({ isActive }) => (
//       <div
//         className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
//           isActive
//             ? "bg-blue-50 shadow-md border-l-4 border-blue-500"
//             : "hover:bg-gray-50 hover:shadow-md"
//         }`}
//       >
//         <div
//           className={`p-2 rounded-lg transition-colors ${
//             isActive ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200"
//           }`}
//         >
//           <item.icon
//             className={`${
//               isActive ? "text-blue-600" : item.color
//             } group-hover:scale-110 transition-transform`}
//             size={16}
//           />
//         </div>
//         <span
//           className={`font-bold body-sm   transition-colors ${
//             isActive
//               ? "text-blue-600 font-semibold"
//               : "text-gray-700 group-hover:text-gray-900"
//           }`}
//         >
//           {item.name}
//         </span>
//         {isActive && (
//           <div className="absolute right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//         )}
//       </div>
//     )}
//   </NavLink>
// );

// const Sidebar = ({ onClose }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const role = useSelector(selectUserRole);
//   const id = useSelector(selectUserId);
//   const userData = useSelector(selectUserProfile);
//   const { firstName, lastName } = userData;
//   console.log("-------->", userData);

//   const mobileViewToggle = () => {
//     if (onClose) onClose();
//   };

//   useEffect(() => {
//     dispatch(fetchUserProfile(id));
//   }, [id]);
//   const favoriteItems =
//     role === "admin" || role === "superadmin"
//       ? getAdminFavoriteItems(id)
//       : getUserFavoriteItems(id);
//   const mainMenuItems =
//     role === "admin" || role === "superadmin"
//       ? getAdminMainMenuItems(id)
//       : getUserMainMenuItems(id);
//   const settingsItems = getSettingsItems();

//   const [expandedSections, setExpandedSections] = React.useState({
//     favorites: true,
//     mainMenu: true,
//     settings: false,
//   });

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };
//   return (
//     <aside className="w-full h-full bg-white shadow-xl border-r border-gray-100">
//       <div className="px-6 py-4 h-full flex flex-col">
//         <div className="mb-8">
//           <div className="relative">
//             {/* <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 mx-auto flex items-center justify-center shadow-lg">
//               <FaUser className="text-white text-2xl" />
//             </div>
//             <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-sm"></div> */}

//             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 mx-auto flex items-center justify-center shadow-lg">
//               <FaUser className="text-white text-2xl" />
//             </div>
//             {/* <div onClick={mobileViewToggle} className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-white shadow-sm">X</div> */}
//             <div
//               onClick={mobileViewToggle}
//               className="sm:hidden absolute -bottom-2 mb-12 -right-2 w-8 h-8 rounded-full border-3 border-white shadow-sm flex items-center justify-center bg-gray-200 text-black body-sm   font-bold"
//             >
//               X
//             </div>
//           </div>
//           <div className="text-center items-center mt-6 p-4 bg-white">
//             <h3 className="heading-xl   font-semibold text-gray-800">
//               Welcome Back 👋
//             </h3>
//             <p className="body-sm   text-gray-500 capitalize mt-1">
//               {role} Dashboard
//             </p>
//             <p className="text-base font-bold text-gray-700 mt-1 tracking-wide">
//               {firstName.toUpperCase()} {lastName.toUpperCase()}
//             </p>
//           </div>
//         </div>

//         <nav className="flex-1 space-y-6 px-2 overflow-y-scroll w-full">
//           <div>
//             <SectionHeader
//               title="Favorites"
//               isExpanded={expandedSections.favorites}
//               onToggle={() => toggleSection("favorites")}
//               count={favoriteItems.length}
//             />
//             {/* {expandedSections.favorites &&
//               favoriteItems.map((item, index) => (
//                 <MenuItem key={index} item={item} />
//               ))} */}
//               {expandedSections.favorites && (
//               <div className="space-y-1">
//                 {favoriteItems.map((item, index) => (
//                   <NavLink
//                     key={index}
//                     onClick={mobileViewToggle}
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `block ${isActive ? "relative" : ""}`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <MenuItem item={item} isActive={isActive} />
//                     )}
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div>
//             <SectionHeader
//               title="Main Menu"
//               isExpanded={expandedSections.mainMenu}
//               onToggle={() => toggleSection("mainMenu")}
//               count={mainMenuItems.length}
//             />
//             {/* {expandedSections.mainMenu &&
//               mainMenuItems.map((item, index) => (
//                 <MenuItem key={index} item={item} />
//               ))} */}
//                    {expandedSections.mainMenu && (
//               <div className="space-y-1">
//                 {mainMenuItems.map((item, index) => (
//                   <NavLink
//                     key={index}
//                     onClick={mobileViewToggle}
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `block ${isActive ? "relative" : ""}`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <MenuItem item={item} isActive={isActive} />
//                     )}
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div>
//             <SectionHeader
//               title="Settings"
//               isExpanded={expandedSections.settings}
//               onToggle={() => toggleSection("settings")}
//               count={settingsItems.length}
//             />
//             {/* {expandedSections.settings &&
//               settingsItems.map((item, index) => (
//                 <MenuItem key={index} item={item} />
//               ))} */}

//                 {expandedSections.settings && (
//               <div className="space-y-2">
//                 {settingsItems.map((item, index) => (
//                   <NavLink
//                     key={index}
//                     onClick={mobileViewToggle}
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `block ${isActive ? "relative" : ""}`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <MenuItem item={item} isActive={isActive} />
//                     )}
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>
//         </nav>

//         <div className="pt-6 border-t border-gray-100">
//           <NavLink
//             onClick={handleLogout}
//             className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 hover:shadow-md transition-all duration-200 group"
//           >
//             <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
//               <FaSignOutAlt
//                 className="text-red-500 group-hover:text-red-600"
//                 size={16}
//               />
//             </div>
//             <span className="font-medium body-sm   text-red-500 group-hover:text-red-600 transition-colors">
//               Log Out
//             </span>
//           </NavLink>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;























/////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaProjectDiagram, FaUsers, FaCog, FaUser, FaFileInvoiceDollar, FaLifeRing, FaBolt, FaUserPlus, FaTachometerAlt, FaBell, FaCalculator, FaComments, FaArchive, FaChartBar, FaCreditCard, FaHistory, FaHeadset, FaCreditCard as FaCreditCardIcon, FaChartBar as FaChartBarIcon
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserId, selectUserRole } from "../redux/slice/authSlice";
import { selectUserProfile } from "../redux/slice/userSlice";
import { fetchUserProfile } from "../redux/thunks/profileThunks";
import axios from "axios";
import { roleApi } from "../api/apiService";
const iconMap = {
  FaProjectDiagram: FaProjectDiagram,
  FaUsers: FaUsers,
  FaCog: FaCog,
   FaUser, FaFileInvoiceDollar, FaLifeRing, FaBolt, FaUserPlus, FaTachometerAlt, FaBell, FaCalculator, FaComments, FaArchive, FaChartBar, FaCreditCard, FaHistory, FaHeadset
};
// ------------------
// Section Header Component
// ------------------
const SectionHeader = ({ title, isExpanded, onToggle, count }) => (
  <div
    className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
    onClick={onToggle}
  >
    <div className="flex items-center space-x-2">
      <span className="body-sm   font-bold text-gray-600 uppercase tracking-wider">
        {title}
      </span>
      <span className="body-sm   bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
        {count}
      </span>
    </div>
    {isExpanded ? (
      <FaChevronDown className="text-gray-400 body-sm  " />
    ) : (
      <FaChevronRight className="text-gray-400 body-sm  " />
    )}
  </div>
);

// ------------------
// Menu Item Component
// ------------------
const MenuItem = ({ item, userId, role, onClick }) => {
   const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();   // ✅ Sidebar close (mobile view)
    if (item.path) navigate(item.path);  // ✅ Page navigate
  };

   const resolvedPath = item.path?.replace(":id", userId).replace(":role",role || ""); // Resolve dynamic paths
   const IconComponent = iconMap[item.icon];
   return(
  <NavLink to={resolvedPath} className={`block`}>
    {({ isActive }) => (
      <div
        className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
          isActive
            ? "bg-blue-50 shadow-md border-l-4 border-blue-500"
            : "hover:bg-gray-50 hover:shadow-md"
        }`}
      >
        <div
          className={`p-2 rounded-lg transition-colors ${
            isActive ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200"
          }`}
        >
          {/* Use dynamic icon if needed, fallback to emoji */}
          {IconComponent ? (
             <IconComponent className={`${item.color}`} />
          ) : (
            <span className="text-gray-500">📁</span>
          )}
        </div>
        <span
          className={`font-bold body-sm   transition-colors ${
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 group-hover:text-gray-900"
          }`}
           onClick={handleClick}
        >
          {item.name}
        </span>
       
        {/* {isActive && (
          <div className="absolute right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        )} */}
      </div>
    )}
  </NavLink>
);
}

// ------------------
// Sidebar Component
// ------------------
const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector(selectUserRole);
  const id = useSelector(selectUserId);
  const userData = useSelector(selectUserProfile);
  const { firstName, lastName } = userData || {};

  const [modules, setModules] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    mainMenu: true,
    settings: false,
  });

  const mobileViewToggle = () => {
    if (onClose) onClose();
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchUserProfile(id));
    }
  }, [id]);

  // Fetch modules with permissions from backend
  useEffect(() => {
    const fetchModules = async () => {
      try {
        
        const res = await roleApi.getViewPermissionsByRole();

        console.log("Modules fetched:", res.data);

        // Filter modules: show only if any permission true
        const filterModules = (mods) =>
          mods
            .map((m) => {
              if (!m.permissions) return null;
              const { read, create, update, delete: del } = m.permissions;
              const isVisible = read || create || update || del;
              if (!isVisible) return null;

              return {
                ...m,
                children: m.children ? filterModules(m.children) : [],
              };
            })
            .filter(Boolean);

        setModules(filterModules(res.data || []));
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, [role]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <aside className="w-full h-full bg-white border-r border-gray-100">
      <div className="px-6 py-4 h-full flex flex-col">
        {/* Profile Info */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 mx-auto flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {/* {firstName ? firstName[0] : "?"} */}
                <FaUser className="text-white text-2xl" />
              </span>
            </div>
            <div
              onClick={mobileViewToggle}
              className="sm:hidden absolute -bottom-2 mb-12 -right-2 w-8 h-8 rounded-full border-3 border-white shadow-sm flex items-center justify-center bg-gray-200 text-black body-sm   font-bold"
            >
              X
            </div>
          </div>
          <div className="text-center items-center mt-6 p-4 bg-white">
            {/* <h3 className="heading-xl   font-semibold text-gray-800"> */}
                        <h3 className="body-md   sm:text-lg md:heading-xl   font-semibold text-gray-900">
              Welcome Back 👋
            </h3>
            {/* <p className="body-sm   text-gray-500 capitalize mt-1">
              {role} Dashboard
            </p> */}
            <p className="text-base mr-6 font-bold text-gray-700 mt-1 tracking-wide">
              {/* {firstName?.toUpperCase()} {lastName?.toUpperCase()} */}
              {firstName?.charAt(0).toUpperCase() + firstName?.slice(1).toLowerCase()}{" "}
{lastName?.charAt(0).toUpperCase() + lastName?.slice(1).toLowerCase()}
            </p>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 space-y-6 px-2 overflow-y-scroll w-full">
          <div>
            <SectionHeader
            
              title="Main Menu"
              isExpanded={expandedSections.mainMenu}
              onToggle={() => toggleSection("mainMenu")}
              count={modules.length}
            />
            {expandedSections.mainMenu && (
              <div className="space-y-1">
                {modules.map((item, index) => (
                  
                  <MenuItem key={index} item={item} userId={id} role={role}  onClick={mobileViewToggle} />
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Logout */}
        <div className="pt-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 hover:shadow-md transition-all duration-200 group w-full"
          >
            <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
              <FaSignOutAlt
                className="text-red-500 group-hover:text-red-600"
                size={16}
              />
            </div>
            <span className="font-medium body-sm   text-red-500 group-hover:text-red-600 transition-colors">
              Log Out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;