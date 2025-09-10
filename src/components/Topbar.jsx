







// // // topbar


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Search,
//   Bell,
//   Mail,
//   Globe,
//   Menu,
//   Expand,
//   UserCircle,
//   LogOutIcon,
//   ChevronDown,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout, selectUserId, selectUserRole } from "../redux/slice/authSlice";
// import { selectUserProfile } from "../redux/slice/userSlice";

// const Topbar = ({ onToggleSidebar }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [notifications] = useState(3);

//   const role = useSelector(selectUserRole);
//   const id = useSelector(selectUserId);
//   const userData = useSelector(selectUserProfile);
//   const { firstName = "", lastName = "" } = userData || {};

//   const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   return (
//     // <div className="w-full flex justify-between items-center px-4 sm:px-6 py-3 bg-white  ">
//          <div className="h-full flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-100">
//       {/* Left Section */}
//       <div className="flex items-center space-x-4 sm:space-x-6">
//         {/* Sidebar Toggle (Mobile Only) */}
//         <button
//           className="lg:hidden p-2 rounded-md hover:bg-gray-100"
//           onClick={onToggleSidebar}
//         >
//           <Menu className="text-gray-600" size={20} />
//         </button>

//         {/* Search Bar */}
//         {/* <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
//           <input
//             type="text"
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 focus:bg-white body-sm   sm:text-base transition-all"
//             placeholder="Search..."
//           />
//           <Search
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             size={18}
//           />
//         </div> */}
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-2 sm:space-x-4">
//         {/* Quick Actions */}
//         <div className="flex items-center space-x-2 sm:space-x-3">
//           {/* <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100">
//             <Globe className="text-gray-500" size={18} />
//           </button> */}
//           {/* <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100">
//             <Expand className="text-gray-500" size={18} />
//           </button> */}
//           <button className="p-2 rounded-lg hover:bg-gray-100 relative">
//             <Mail className="text-gray-500" size={18} />
//             <span className="absolute -top-1 -right-1 bg-blue-500 text-white body-xs  rounded-full h-4 w-4 flex items-center justify-center">
//               2
//             </span>
//           </button>
//           <button className="p-2 rounded-lg hover:bg-gray-100 relative">
//             <Bell className="text-gray-500" size={18} />
//             {notifications > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white body-xs  rounded-full h-4 w-4 flex items-center justify-center">
//                 {notifications}
//               </span>
//             )}
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

//         {/* User Profile */}
//         <div className="relative">
//           <div
//             className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
//             onClick={() => setShowDropdown(!showDropdown)}
//           >
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
//               <span className="text-white body-sm   font-medium">
//                 {initials || "U"}
//               </span>
//             </div>
//             <div className="hidden md:block">
//               <p className="body-sm   font-semibold text-gray-800">
//                 {firstName} {lastName}
//               </p>
//               <span className="body-xs  text-gray-500">
//                 SmartLynk Metering Solutions
//               </span>
//             </div>
//             <ChevronDown
//               className={`text-gray-400 transition-transform ${
//                 showDropdown ? "rotate-180" : ""
//               }`}
//               size={16}
//             />
//           </div>

//           {/* Dropdown */}
//           {showDropdown && (
//             <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
//               <div className="px-4 py-3 border-b border-gray-100">
//                 <p className="body-sm   font-semibold text-gray-800">
//                   {firstName?.toUpperCase()} {lastName?.toUpperCase()}
//                 </p>
//                 <p className="body-xs  font-semibold text-gray-500">{role}</p>
//               </div>
//               <div className="py-2">
//                 <div
//                   onClick={() => navigate(`/${role}/profile`)}
//                   className="flex items-center px-4 py-2 body-sm   text-gray-700 hover:bg-gray-50 cursor-pointer"
//                 >
//                   <UserCircle className="mr-3 text-gray-400" size={16} />
//                   My Profile
//                 </div>
//                 <Link
//                   to=""
//                   className="flex items-center px-4 py-2 body-sm   text-gray-700 hover:bg-gray-50"
//                 >
//                   <Bell className="mr-3 text-gray-400" size={16} />
//                   Notifications
//                 </Link>
//                 <div
//                   onClick={handleLogout}
//                   className="flex items-center px-4 py-2 body-sm   text-gray-700 hover:bg-gray-50 cursor-pointer"
//                 >
//                   <LogOutIcon className="mr-3 text-gray-400" size={16} />
//                   Logout
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;







import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Menu,
  UserCircle,
  LogOutIcon,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserRole, selectUserId } from "../redux/slice/authSlice";
import { selectUserProfile } from "../redux/slice/userSlice";

const Topbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications] = useState(3);

  const role = useSelector(selectUserRole);
  const id = useSelector(selectUserId); // direct selector for userId
  const userData = useSelector(selectUserProfile);
  const { firstName = "", lastName = "" } = userData || {};

  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  const wrapperRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false); // ✅ close after logout
    navigate("/");
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-full flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-100">
      {/* Left Section */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={onToggleSidebar}
        >
          <Menu className="text-gray-600" size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Notifications */}
        {/* <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Bell className="text-gray-500" size={18} />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white body-xs  rounded-full h-4 w-4 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button> */}

      
        {/* Quick Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            to={
              role === "admin"
                ? `/${role}/alert&notification`
                : `/${role}/alert-notification/${id}`
            }
            className="p-2 rounded-lg hover:bg-gray-100 relative"
          >
            <Bell className="text-gray-500" size={18} />
          </Link>
        </div>

        <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

        {/* User Profile (Wrapper has ref) */}
        <div className="relative" ref={wrapperRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <span className="text-white body-sm   font-medium">
                {initials || "U"}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="body-sm   font-semibold text-gray-800">
                {firstName} {lastName}
              </p>
              <span className="body-xs  text-gray-500">
                SmartLynk Metering Solutions
              </span>
            </div>
            <ChevronDown
              className={`text-gray-400 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
              size={16}
            />
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="body-sm   font-semibold text-gray-800">
                  {firstName?.toUpperCase()} {lastName?.toUpperCase()}
                </p>
                <p className="body-xs  font-semibold text-gray-500">{role}</p>
              </div>
              <div className="py-2">
                <div
                  onClick={() => {
                    navigate(`/${role}/profile`);
                    setShowDropdown(false); // ✅ close on click
                  }}
                  className="flex items-center px-4 py-2 body-sm   text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <UserCircle className="mr-3 text-gray-400" size={16} />
                  My Profile
                </div>
                {/* <Link
                  to=""
                  onClick={() => setShowDropdown(false)} // ✅ close on click
                  className="flex items-center px-4 py-2 body-sm   text-gray-700 hover:bg-gray-50"
                >
                  <Bell className="mr-3 text-gray-400" size={16} />
                  Notifications
                </Link> */}
                   <Link
                  to={
                    role === "admin"
                      ? `/${role}/alert&notification`
                      : `/${role}/alert-notification/${id}`
                  }
                  className="flex items-center px-4 py-2 body-sm   text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowDropdown(false)} // optional: auto-close dropdown
                >
                  <Bell className="mr-3 text-gray-400" size={16} />
                  Notifications
                </Link>
                <div
                  onClick={handleLogout} // already closes inside handleLogout
                  className="flex items-center px-4 py-2 body-sm   text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <LogOutIcon className="mr-3 text-gray-400" size={16} />
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;

























