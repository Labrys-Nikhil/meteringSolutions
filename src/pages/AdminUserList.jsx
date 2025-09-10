// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAdminUserMeterData } from '../redux/thunks/adminDashboardThunks'; // adjust path
// import { Eye, ArrowLeft, Calendar, Filter, Activity, Zap } from 'lucide-react';
// import { selectUserId } from '../redux/slice/authSlice';
// import {selectAdminUserMeterData,selectLoading,selectError} from '../redux/slice/adminDashboardSlice'


// const AdminUserList = () => {

//     const [currentView, setCurrentView] = useState('main');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [dateFilter, setDateFilter] = useState('7days');
//   const [searchTerm, setSearchTerm] = useState('');
//   const dispatch = useDispatch();
  
//   const adminId = useSelector(selectUserId);

//   const  adminUserMeterData =  useSelector(selectAdminUserMeterData);
//   const  loading = useSelector(selectLoading);
//   const error  = useSelector(selectError);

//   useEffect(() => {
//     dispatch(fetchAdminUserMeterData(adminId));
//   }, [dispatch, adminId]);
//   const filteredUsers = adminUserMeterData.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleViewUser = (user) => {
//     setSelectedUser(user);
//     setCurrentView('userDetails');
//   };

//   const handleBackToUserList = () => {
//     setSelectedUser(null);
//     setCurrentView('main');
//     setDateFilter('7days');
//     setSearchTerm('');
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const filterDataByDate = (dailyData) => {
//     const currentDate = new Date();
//     return dailyData.filter((data) => {
//       const dataDate = new Date(data.date);
//       const daysDiff = Math.ceil((currentDate - dataDate) / (1000 * 3600 * 24));
//       switch (dateFilter) {
//         case '7days': return daysDiff <= 7;
//         case '30days': return daysDiff <= 30;
//         case '3months': return daysDiff <= 90;
//         case '6months': return daysDiff <= 180;
//         case '1year': return daysDiff <= 365;
//         default: return true;
//       }
//     }).sort((a, b) => new Date(b.date) - new Date(a.date));
//   };

//   console.log("===selectedUser======",selectedUser)

//   return (
//     <div className=" bg-blue-200/10 p-4 sm:p-6 md:p-8">
//       {currentView === 'main' && (
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
//             <p className="text-gray-500">Manage users and their meter data</p>
//           </div>

//           <div className="min-h-screen bg-white rounded-lg shadow mb-6">
//             <div className="px-6 py-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <h2 className="heading-xl   font-semibold text-gray-800">Users List</h2>
//               <input
//                 type="text"
//                 placeholder="Search by Name, Email or ID"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full md:w-72 border border-gray-300 rounded-md px-3 py-2 body-sm   text-gray-700"
//               />
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left body-xs  font-medium text-gray-500 uppercase tracking-wider">User Name</th>
//                     <th className="px-6 py-3 text-left body-xs  font-medium text-gray-500 uppercase tracking-wider">User ID</th>
//                     <th className="px-6 py-3 text-left body-xs  font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-3 text-left body-xs  font-medium text-gray-500 uppercase tracking-wider">Meters</th>
//                     <th className="px-6 py-3 text-right body-xs  font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 {/* <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredUsers.map((user) => (
//                     <tr key={user.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 body-sm   font-medium text-gray-750">{user.name}</td>
//                       <td className="px-6 py-4 body-sm   text-gray-500">{user.userId}</td>
//                       <td className="px-6 py-4 body-sm   text-gray-500">{user.email || 'N/A'}</td>
//                       <td className="px-6 py-4 body-sm   text-gray-500">{user.meters?.length || 0}</td>
//                       <td className="px-6 py-4 text-right">
//                         <button
//                           onClick={() => handleViewUser(user)}
//                           className="text-blue-600 hover:text-blue-800 body-sm   font-medium inline-flex items-center"
//                         >
//                           <Eye className="w-4 h-4 mr-1" /> View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody> */}
//                           <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredUsers.length > 0 ? (
//                     filteredUsers.map((user) => (
//                       <tr key={user.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 body-sm   font-medium text-gray-750">
//                           {user.name}
//                         </td>
//                         <td className="px-6 py-4 body-sm   text-gray-500">
//                           {user.userId}
//                         </td>
//                         <td className="px-6 py-4 body-sm   text-gray-500">
//                           {user.email || "N/A"}
//                         </td>
//                         <td className="px-6 py-4 body-sm   text-gray-500">
//                           {user.meters?.length || 0}
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <button
//                             onClick={() => handleViewUser(user)}
//                             className="text-blue-600 hover:text-blue-800 body-sm   font-medium inline-flex items-center"
//                           >
//                             <Eye className="w-4 h-4 mr-1" /> View
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="5"
//                         className="px-6 py-10 text-center text-gray-500 body-sm   font-medium"
//                       >
//                             <p className="text-center text-gray-500 p-8 heading-xl   font-semibold">
//                   Users not found
//                 </p>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentView === 'userDetails' && selectedUser && (
//         <div className="max-w-7xl mx-auto">
//           <button
//             onClick={handleBackToUserList}
//             className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" /> Back to User List
//           </button>

//           {/* <div className="bg-white rounded-lg shadow p-4 mb-4">
//             <h2 className="heading-xl   font-semibold text-gray-800 mb-2">User Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block body-sm   font-medium text-gray-700">User Name</label>
//                 <p className="text-lg text-gray-900 font-medium mt-1">{selectedUser.name}</p>
//               </div>
//               <div>
//                 <label className="block body-sm   font-medium text-gray-700">User ID</label>
//                 <p className="text-lg text-gray-900 font-medium mt-1">{selectedUser.userId}</p>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block body-sm   font-medium text-gray-700">Email</label>
//                 <p className="text-lg text-gray-900 font-medium mt-1">{selectedUser.email || 'N/A'}</p>
//               </div>
//             </div>
//           </div> */}

//           <div className="bg-white rounded-lg shadow p-4 mb-4">
//   <h2 className="heading-xl   font-semibold text-gray-800 mb-2">User Information</h2>
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//     <div>
//       <label className="block body-sm   font-medium text-gray-700">User Name</label>
//       <p className="text-lg text-gray-900 font-medium mt-1">{selectedUser.name}</p>
//     </div>
//     <div>
//       <label className="block body-sm   font-medium text-gray-700">User ID</label>
//       <p className="text-lg text-gray-900 font-medium mt-1">{selectedUser.userId}</p>
//     </div>
//     <div>
//       <label className="block body-sm   font-medium text-gray-700">Email</label>
//       <p className="text-lg text-gray-900 font-medium mt-1">{selectedUser.email || 'N/A'}</p>
//     </div>
//   </div>
// </div>


//           {/* {selectedUser?.meters?.map((meter, idx) => {
//             return (
//               <div key={idx} className="bg-white rounded-lg shadow mb-6">
//                 <div className="px-6 py-4 border-b">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                     <Zap className="w-5 h-5 mr-2 text-yellow-500" /> {meter.name}
//                   </h3>
//                   <p className="body-sm   text-gray-600 mt-1">{meter.meterType}</p>
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h4 className="body-md   font-semibold text-gray-800 flex items-center">
//                       <Activity className="w-4 h-4 mr-1 text-blue-500" /> Daily Data
//                     </h4>
//                     <div className="flex items-center space-x-2">
//                       <Filter className="w-4 h-4 text-gray-500" />
//                       <select
//                         value={dateFilter}
//                         onChange={(e) => setDateFilter(e.target.value)}
//                         className="body-sm   border border-gray-300 rounded-md px-2 py-1"
//                       >
//                         <option value="7days">Last 7 Days</option>
//                         <option value="30days">Last 30 Days</option>
//                         <option value="3months">Last 3 Months</option>
//                         <option value="6months">Last 6 Months</option>
//                         <option value="1year">Last 1 Year</option>
//                       </select>
//                     </div>
//                   </div>

//                   {filterDataByDate(meter.dailyData).length > 0 ? (
//                     <table className="w-full body-sm   text-left">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-4 py-2 text-gray-500">Date</th>
//                           <th className="px-4 py-2 text-gray-500">Total kWh</th>
//                           <th className="px-4 py-2 text-gray-500">Deduction</th>
//                           <th className="px-4 py-2 text-gray-500">EG</th>
//                           <th className="px-4 py-2 text-gray-500">DG</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filterDataByDate(meter.dailyData).map((entry, idx) => (
//                           <tr key={idx} className="hover:bg-gray-50">
//                             <td className="px-4 py-2 text-gray-900">{formatDate(entry.date)}</td>
//                             <td className="px-4 py-2 text-gray-900">{entry.totalKWh}</td>
//                             <td className="px-4 py-2 text-gray-900">{entry.totalDeduction}</td>
//                             <td className="px-4 py-2 text-gray-900">{entry.totalEG}</td>
//                             <td className="px-4 py-2 text-gray-900">{entry.totalDG}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <div className="text-gray-500 text-center py-6">No data available for selected range.</div>
//                   )}
//                 </div>
//               </div>
//             );
//           })} */}


//           {selectedUser?.meters?.map((entry, idx) => {
//   const meter = entry.meter || entry; // support both formats

//   return (
//     <div key={idx} className="bg-white rounded-lg shadow mb-6">
//       <div className="px-6 py-4 border-b">
//         <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//           <Zap className="w-5 h-5 mr-2 text-yellow-500" /> {meter.name}
//         </h3>
//         <p className="body-sm   text-gray-600 mt-1">{meter.type}</p>
//       </div>
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h4 className="body-md   font-semibold text-gray-800 flex items-center">
//             <Activity className="w-4 h-4 mr-1 text-blue-500" /> Daily Data
//           </h4>
//           <div className="flex items-center space-x-2">
//             <Filter className="w-4 h-4 text-gray-500" />
//             <select
//               value={dateFilter}
//               onChange={(e) => setDateFilter(e.target.value)}
//               className="body-sm   border border-gray-300 rounded-md px-2 py-1"
//             >
//               <option value="7days">Last 7 Days</option>
//               <option value="30days">Last 30 Days</option>
//               <option value="3months">Last 3 Months</option>
//               <option value="6months">Last 6 Months</option>
//               <option value="1year">Last 1 Year</option>
//             </select>
//           </div>
//         </div>

//         {filterDataByDate(entry.dailyData || []).length > 0 ? (
//           <table className="w-full body-sm   text-left">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-2 text-gray-500">Date</th>
//                 <th className="px-4 py-2 text-gray-500">Total kWh</th>
//                 <th className="px-4 py-2 text-gray-500">Deduction</th>
//                 <th className="px-4 py-2 text-gray-500">EG</th>
//                 <th className="px-4 py-2 text-gray-500">DG</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filterDataByDate(entry.dailyData).map((data, i) => (
//                 <tr key={i} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 text-gray-900">{formatDate(data.date)}</td>
//                   <td className="px-4 py-2 text-gray-900">{data.totalKWh}</td>
//                   <td className="px-4 py-2 text-gray-900">{data.totalDeduction}</td>
//                   <td className="px-4 py-2 text-gray-900">{data.totalEG}</td>
//                   <td className="px-4 py-2 text-gray-900">{data.totalDG}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="text-gray-500 text-center py-6">No data available for selected range.</div>
//         )}
//       </div>
//     </div>
//   );
// })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminUserList;





















import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUserMeterData } from "../redux/thunks/adminDashboardThunks";
import {
  Eye,
  ArrowLeft,
  Calendar,
  Filter,
  Activity,
  Zap,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { selectUserId } from "../redux/slice/authSlice";
import {
  selectAdminUserMeterData,
  selectLoading,
  selectError,
} from "../redux/slice/adminDashboardSlice";

const AdminUserList = () => {
  const [currentView, setCurrentView] = useState("main");
  const [selectedUser, setSelectedUser] = useState(null);
  const [dateFilter, setDateFilter] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentMeterPage, setCurrentMeterPage] = useState(1);
  const usersPerPage = 5;
  const meterDataPerPage = 5;
  const dispatch = useDispatch();

  const adminId = useSelector(selectUserId);
  const adminUserMeterData = useSelector(selectAdminUserMeterData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
console.log("==adminUserMeterData===",adminUserMeterData)
  useEffect(() => {
    const getDateRange = (filter) => {
      const now = new Date();
      let startDate, endDate;

      switch (filter) {
        case "today":
          startDate = new Date(now);
          startDate.setHours(0, 0, 0, 0);
          endDate = now;
          break;
        case "1hour":
          startDate = new Date(now.getTime() - 60 * 60 * 1000);
          endDate = now;
          break;
        case "7days":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30days":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "3months":
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        case "6months":
          startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
          break;
        case "1year":
          startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 60 * 60 * 1000);
      }

      endDate = now;
      return { startDate, endDate };
    };

    const { startDate, endDate } = getDateRange(dateFilter);
    
    dispatch(
      fetchAdminUserMeterData({
        adminId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
    );
  }, [dispatch, adminId, dateFilter]);

  // Update selectedUser when adminUserMeterData changes and we're in userDetails view
  useEffect(() => {
    if (currentView === "userDetails" && selectedUser && adminUserMeterData.length > 0) {
      const updatedUser = adminUserMeterData.find(user => user.userId === selectedUser.userId);
      if (updatedUser) {
        setSelectedUser(updatedUser);
      }
    }
  }, [adminUserMeterData, currentView, selectedUser]);

  const filteredUsers = adminUserMeterData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentUserPage(1);
  }, [searchTerm]);

  // Reset to first page when date filter changes (but maintain filter across pagination)
  useEffect(() => {
    setCurrentMeterPage(1);
  }, [dateFilter, selectedUser]);

  // Pagination for user list
  const indexOfLastUser = currentUserPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalUserPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setCurrentView("userDetails");
    setCurrentMeterPage(1);
  };

  const handleBackToUserList = () => {
    setSelectedUser(null);
    setCurrentView("main");
    setSearchTerm("");
    setCurrentUserPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";

      const formattedDate = date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const formattedTime = date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return `${formattedDate}, ${formattedTime}`;
    } catch (error) {
      return "Invalid Date";
    }
  };

  const processMeterData = (decodedData) => {
    if (!decodedData || !Array.isArray(decodedData)) return [];

    return decodedData.map((data) => ({
      date: data.timestamp,
      totalKWh: (data.cum_eb_kwh?.value || 0) + (data.cum_dg_kwh?.value || 0),
      totalDeduction: data.balance_amount?.value || 0,
      totalEG: data.cum_eb_kwh?.value || 0,
      totalDG: data.cum_dg_kwh?.value || 0,
      voltage: data.voltage_r?.value || 0,
    }));
  };

  const filterDataByDate = (decodedData) => {
    const processedData = processMeterData(decodedData);
    if (!processedData || !Array.isArray(processedData)) return [];

    const now = new Date();
    const uniqueEntries = new Map();

    const filteredData = processedData
      .filter((data) => {
        if (!data.date) return false;

        try {
          const dataDate = new Date(data.date);
          if (isNaN(dataDate.getTime())) return false;

          // Calculate the time difference in milliseconds
          const diffMs = now.getTime() - dataDate.getTime();

          switch (dateFilter) {
            case "today":
              // Check if the data is from today
              return dataDate.toDateString() === now.toDateString();
            case "1hour":
              // Last 1 hour (3600000 ms)
              return diffMs >= 0 && diffMs <= 60 * 60 * 1000;
            case "7days":
              // Last 7 days (604800000 ms)
              return diffMs >= 0 && diffMs <= 7 * 24 * 60 * 60 * 1000;
            case "30days":
              // Last 30 days (2592000000 ms)
              return diffMs >= 0 && diffMs <= 30 * 24 * 60 * 60 * 1000;
            case "3months":
              // Last 3 months (approximately 90 days)
              return diffMs >= 0 && diffMs <= 90 * 24 * 60 * 60 * 1000;
            case "6months":
              // Last 6 months (approximately 180 days)
              return diffMs >= 0 && diffMs <= 180 * 24 * 60 * 60 * 1000;
            case "1year":
              // Last 1 year (approximately 365 days)
              return diffMs >= 0 && diffMs <= 365 * 24 * 60 * 60 * 1000;
            default:
              return true;
          }
        } catch (error) {
          console.error('Date filtering error:', error);
          return false;
        }
      })
      .sort((a, b) => {
        try {
          return new Date(b.date) - new Date(a.date);
        } catch (error) {
          return 0;
        }
      });

    // Remove duplicates based on date
    const deduplicatedData = filteredData.filter((data) => {
      try {
        const dateKey = new Date(data.date).toISOString();
        if (!uniqueEntries.has(dateKey)) {
          uniqueEntries.set(dateKey, true);
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    });

    return deduplicatedData;
  };

  const paginateUsers = (pageNumber) => setCurrentUserPage(pageNumber);

  const getUserPaginationRange = () => {
    const totalPageCount = totalUserPages;
    if (totalPageCount <= 1) return [];

    if (totalPageCount <= 5) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentUserPage - 1, 1);
    const rightSiblingIndex = Math.min(currentUserPage + 1, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      return [1, 2, 3, "...", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      return [1, "...", totalPageCount - 2, totalPageCount - 1, totalPageCount];
    }

    return [1, "...", currentUserPage, "...", totalPageCount];
  };

  const paginateMeterData = (pageNumber) => setCurrentMeterPage(pageNumber);

  const getMeterPaginationRange = (totalPages) => {
    if (totalPages <= 1) return [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentMeterPage - 1, 1);
    const rightSiblingIndex = Math.min(currentMeterPage + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      return [1, 2, 3, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentMeterPage, "...", totalPages];
  };

  const HeaderSection = () => (
    <div className="mb-6 sticky top-0 bg-white z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-4 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex-1">
        <h1 className="body-md   sm:text-lg md:heading-xl   font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 body-sm   sm:text-base">
          {currentView === "main" 
            ? "Manage users and their meter data" 
            : `Viewing details for ${selectedUser?.name || "user"}`}
        </p>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="body-sm   border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto min-w-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="today">Today</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last 1 Year</option>
        </select>
      </div>
    </div>
  );

  const SearchSection = () => (
    <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <h2 className="text-lg sm:heading-xl   font-semibold text-gray-800">
        {currentView === "main" ? "Users List" : "Search Users"}
      </h2>
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by Name, Email or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md body-sm   text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const UserCard = ({ user }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="body-sm   font-medium text-gray-900 truncate">{user.name}</h3>
            <p className="body-sm   text-gray-500 mt-1">ID: {user.userId}</p>
          </div>
          <button
            onClick={() => handleViewUser(user)}
            className="flex-shrink-0 text-blue-600 hover:text-blue-800 body-sm   font-medium inline-flex items-center ml-2"
          >
            <Eye className="w-4 h-4 mr-1" /> View
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div>
            <span className="body-xs  text-gray-500 block">Email</span>
            <span className="body-sm   text-gray-900 truncate block" title={user.email || "N/A"}>{user.email || "N/A"}</span>
          </div>
          <div>
            <span className="body-xs  text-gray-500 block">Meters</span>
            <span className="body-sm   text-gray-900">{user.meters?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const MeterDataCard = ({ data, index }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  gap-3 ml-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="body-xs  text-gray-500 block">Date & Time</span>
          <span className="body-sm   font-medium text-gray-900">{formatDate(data.date)}</span>
        </div>
        
        <div>
          <span className="body-xs  text-gray-500 block">Total kWh</span>
          <span className="body-sm   text-gray-900">{Number(data.totalKWh).toFixed(2)}</span>
        </div>
        
        <div>
          <span className="body-xs  text-gray-500 block">Balance</span>
          <span className="body-sm   text-gray-900">{Number(data.totalDeduction).toFixed(2)}</span>
        </div>
        
        <div>
          <span className="body-xs  text-gray-500 block">EB (kWh)</span>
          <span className="body-sm   text-gray-900">{Number(data.totalEG).toFixed(2)}</span>
        </div>
        
        <div>
          <span className="body-xs  text-gray-500 block">DG (kWh)</span>
          <span className="body-sm   text-gray-900">{Number(data.totalDG).toFixed(2)}</span>
        </div>
        
        <div>
          <span className="body-xs  text-gray-500 block">Voltage (V)</span>
          <span className="body-sm   text-gray-900">{Number(data.voltage).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-blue-50/30 p-2 sm:p-4 md:p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <HeaderSection />
        
        {currentView === "main" && (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
              <SearchSection />
              
              {/* Users Grid - Responsive */}
              <div className="p-4 sm:p-6">
                {currentUsers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentUsers.map((user) => (
                      <UserCard key={user.userId} user={user} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-500 body-sm   font-medium">
                      {searchTerm
                        ? "No users found matching your search"
                        : "No users available"}
                    </div>
                  </div>
                )}
              </div>

              {filteredUsers.length > usersPerPage && (
                <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                  <div className="body-sm   text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastUser, filteredUsers.length)}
                    </span>{" "}
                    of <span className="font-medium">{filteredUsers.length}</span>{" "}
                    users
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => paginateUsers(currentUserPage - 1)}
                      disabled={currentUserPage === 1}
                      className={`px-3 py-1 rounded-md border body-sm   ${
                        currentUserPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 inline" />
                    </button>

                    {getUserPaginationRange().map((pageNumber, index) => {
                      if (pageNumber === "...") {
                        return (
                          <span key={index} className="px-3 py-1 text-gray-700">
                            ...
                          </span>
                        );
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => paginateUsers(pageNumber)}
                          className={`px-3 py-1 rounded-md body-sm   ${
                            currentUserPage === pageNumber
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => paginateUsers(currentUserPage + 1)}
                      disabled={currentUserPage === totalUserPages}
                      className={`px-3 py-1 rounded-md border body-sm   ${
                        currentUserPage === totalUserPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 inline" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {currentView === "userDetails" && selectedUser && (
          <>            
            <button
              onClick={handleBackToUserList}
              className="text-blue-600 hover:text-blue-800 flex items-center mb-4 body-sm   sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to User List
            </button>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
              <h2 className="text-md sm:heading-xl   font-semibold text-gray-800 mb-4">
                User Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block body-sm   font-medium text-gray-700">
                    User Name
                  </label>
                  <p className="text-base sm:text-lg text-gray-900 font-medium mt-1">
                    {selectedUser.name}
                  </p>
                </div>
                <div>
                  <label className="block body-sm   font-medium text-gray-700">
                    User ID
                  </label>
                  <p className="text-base sm:text-lg text-gray-900 font-medium mt-1">
                    {selectedUser.userId}
                  </p>
                </div>
                <div>
                  <label className="block body-sm   font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-base sm:text-lg text-gray-900 font-medium mt-1">
                    {selectedUser.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {selectedUser.meters && selectedUser.meters.length > 0 ? (
       
              selectedUser.meters.map((meter, idx) => {
                      //  console.log("====")
                const filteredMeterData = filterDataByDate(
                  meter.decodedData || []
                );
                const totalMeterPages = Math.ceil(
                  filteredMeterData.length / meterDataPerPage
                );
                const indexOfLastMeterData = currentMeterPage * meterDataPerPage;
                const indexOfFirstMeterData =
                  indexOfLastMeterData - meterDataPerPage;
                const currentMeterData = filteredMeterData.slice(
                  indexOfFirstMeterData,
                  indexOfLastMeterData
                );

                console.log("--filteredMeterData----",filteredMeterData)

                return (
                  <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-yellow-500" />{" "}
                            {meter.meter?.name || meter.name || "Unnamed Meter"}
                          </h3>
                          <p className="body-sm   text-gray-600 mt-1">
                            {meter.meter?.type ||
                              meter.meterType ||
                              "No type specified"}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 mr-1 text-blue-500" />
                          <span className="body-sm   font-medium text-gray-700">Daily Data</span>
                        </div>
                      </div>
                    </div>

                    {/* Meter Data Cards - Responsive */}
                    <div className="p-4 sm:p-6">
                      {currentMeterData.length > 0 ? (
                        <div className="space-y-4">
                          {currentMeterData.map((data, index) => (
                            <MeterDataCard key={index} data={data} index={index} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="text-gray-500 body-sm   font-medium">
                            No meter data available for selected filter
                          </div>
                        </div>
                      )}
                    </div>

                    {filteredMeterData.length > meterDataPerPage && (
                      <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                        <div className="body-sm   text-gray-700">
                          Showing{" "}
                          <span className="font-medium">
                            {indexOfFirstMeterData + 1}
                          </span>{" "}
                          to{" "}
                          <span className="font-medium">
                            {Math.min(
                              indexOfLastMeterData,
                              filteredMeterData.length
                            )}
                          </span>{" "}
                          of{" "}
                          <span className="font-medium">
                            {filteredMeterData.length}
                          </span>{" "}
                          entries
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() =>
                              paginateMeterData(currentMeterPage - 1)
                            }
                            disabled={currentMeterPage === 1}
                            className={`px-3 py-1 rounded-md border body-sm   ${
                              currentMeterPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <ChevronLeft className="w-4 h-4 inline" />
                          </button>

                          {getMeterPaginationRange(totalMeterPages).map(
                            (pageNumber, index) => {
                              if (pageNumber === "...") {
                                return (
                                  <span
                                    key={index}
                                    className="px-3 py-1 text-gray-700"
                                  >
                                    ...
                                  </span>
                                );
                              }

                              return (
                                <button
                                  key={index}
                                  onClick={() => paginateMeterData(pageNumber)}
                                  className={`px-3 py-1 rounded-md body-sm   ${
                                    currentMeterPage === pageNumber
                                      ? "bg-blue-600 text-white"
                                      : "bg-white text-gray-700 hover:bg-gray-50 border"
                                  }`}
                                >
                                  {pageNumber}
                                </button>
                              );
                            }
                          )}

                          <button
                            onClick={() =>
                              paginateMeterData(currentMeterPage + 1)
                            }
                            disabled={currentMeterPage === totalMeterPages}
                            className={`px-3 py-1 rounded-md border body-sm   ${
                              currentMeterPage === totalMeterPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <ChevronRight className="w-4 h-4 inline" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center text-gray-500">
                No meters available for this user
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;