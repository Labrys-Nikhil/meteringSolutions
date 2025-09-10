// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardData } from "../redux/thunks/adminDashboardThunks";
// import { Link, useNavigate } from "react-router-dom";

// import {
//   Gauge,
//   TrendingUp,
//   Download,
//   AlertTriangle,
//   Zap,
//   Bell,
//   Calendar,
//   Activity,
//   Users,
//   DollarSign,
//   BarChart3,
//   UserPlus,
//   Search,
//   Settings,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   Eye,
//   TrendingDown,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Magnet,
//   MessageSquareText,
//   Mail,
// } from "lucide-react";

// {
//   /* <DollarSign /> */
// }

// import MeterList from "../components/MeterList";
// import CurrentPowerChart from "../components/meterManagement/CurrentPowerChart";
// import {
//   fetchAdminDailyConsumption,
//   fetchFilteredChartData,
//   fetchMeterListByAdmin,
// } from "../redux/thunks/adminDashboardThunks";
// import { selectUserId } from "../redux/slice/authSlice";
// import {
//   selectMeterList,
//   selectLoading,
//   selectDailyConsuption,
//   selectError,
//   selectFetchDashboardData,
// } from "../redux/slice/adminDashboardSlice";
// import { toast } from "react-toastify";
// import { fetchUserNotifications } from "../redux/thunks/notificationThunks";
// // import { UserNotifications } from "../redux/slice/notificationSlice";
// import { selectUserNotifications } from "../redux/slice/notificationSlice";
// // Import the selector for tempered meters (assuming you have one)
// import { selectTemperedMeters } from "../redux/slice/adminDashboardSlice";
// import { getTemperedMeter } from "../redux/thunks/adminDashboardThunks";
// const Dashboard = () => {
//   let today = new Date().toISOString().split("T")[0];
//   today = "DD-MM-YYYY";
//   const [startDate, setStartDate] = useState(today);
//   const [endDate, setEndDate] = useState(today);
//   const [refreshing, setRefreshing] = useState(false);
//   const [notifications, setNotifications] = useState(23);
//   const [lastRefreshTime, setLastRefreshTime] = useState(null);
//   const [isRefreshingData, setIsRefreshingData] = useState(false);
//   const [originalSevenDayData, setOriginalSevenDayData] = useState([]);
//   // Inside your Dashboard component
//   const temperedMeters = useSelector(selectTemperedMeters);
//   const [filters, setFilters] = useState({
//     status: "all",
//     type: "all",
//   });

//   const [searchTerm, setSearchTerm] = useState("");

//   const dispatch = useDispatch();
//   const adminId = useSelector(selectUserId);
//   const loading = useSelector(selectLoading);
//   const fetchAdminMeters = useSelector(selectMeterList);
//   const dailyConsumption = useSelector(selectDailyConsuption);
//   const data = useSelector(selectFetchDashboardData);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     if (adminId) dispatch(getTemperedMeter(adminId));
//   }, [dispatch, adminId]);

//   // Store initial 7-day data when first loaded
//   useEffect(() => {
//     if (dailyConsumption.length > 0 && originalSevenDayData.length === 0) {
//       setOriginalSevenDayData(dailyConsumption);
//     }
//   }, [dailyConsumption]);

//   // Fetch initial data
//   useEffect(() => {
//     dispatch(fetchDashboardData(adminId));
//     dispatch(fetchAdminDailyConsumption(adminId));
//     dispatch(fetchMeterListByAdmin(adminId));
//     dispatch(fetchUserNotifications(adminId));
//   }, [dispatch, adminId]);

//   // Handle date range changes for analytics chart only
//   useEffect(() => {
//     if (startDate === today && endDate === today) {
//       dispatch(fetchAdminDailyConsumption(adminId));
//     } else {
//       dispatch(
//         fetchFilteredChartData({ adminId, from: startDate, to: endDate })
//       );
//     }
//   }, [startDate, endDate, dispatch, adminId]);

//   // Filter meters based on search and filters
//   const meters = fetchAdminMeters.filter((meter) => {
//     const matchesStatus =
//       filters.status === "all" || meter.status === filters.status;
//     const matchesType = filters.type === "all" || meter.type === filters.type;
//     const matchesSearch =
//       meter.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       meter.meterId?.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesStatus && matchesType && matchesSearch;
//   });

//   // Transform data for MetricsCards (always uses original 7-day data)
//   const transformLastSevenDaysData = (data) => {
//     if (!data || !Array.isArray(data)) {
//       return {
//         lastSevenDayDayWiseAdminConsumption: [],
//         lastSevenDayDayWiseUsers: [],
//         lastSevenDayDayWiseTotalMeters: [],
//         lastSevenDayDayWiseFaultyMeters: [],
//         lastSevenDayDayWiseOfflineMeters: [],
//         lastSevenDayDayWiseDueBalance: [],
//         lastSevenDayDayWiseDueUsers: [],
//         lastSevenDayDayWiseTotalRevenue: [],
//       };
//     }

//     return {
//       lastSevenDayDayWiseAdminConsumption: data.map(
//         (item) => item.latestTotalConsumption || 0
//       ),
//       lastSevenDayDayWiseUsers: data.map((item) => item.latestTotalUsers || 0),
//       lastSevenDayDayWiseTotalMeters: data.map(
//         (item) => item.latestTotalMeters || 0
//       ),
//       lastSevenDayDayWiseFaultyMeters: data.map(
//         (item) => item.latestTotalFaultyMeters || 0
//       ),
//       lastSevenDayDayWiseOfflineMeters: data.map(
//         (item) => item.latestTotalOfflineMeters || 0
//       ),
//       lastSevenDayDayWiseDueBalance: data.map(
//         (item) => item.dailyTotalDueBalance || 0
//       ),
//       lastSevenDayDayWiseDueUsers: data.map(
//         (item) => item.dailyTotalDueUsers || 0
//       ),
//       lastSevenDayDayWiseTotalRevenue: data.map(
//         (item) => item.latestTotalRevenue || 0
//       ),
//     };
//   };

//   // For MetricsCards - always use original 7-day data
//   const metricsCardData = transformLastSevenDaysData(originalSevenDayData);

//   console.log(
//     "------metricsCardData-----originalSevenDayData---",
//     metricsCardData,
//     originalSevenDayData
//   );

//   const chartData = [
//     {
//       id: "daily-consumption",
//       title: "Daily Consumption Overview",
//       labels:
//         dailyConsumption?.map((item) => {
//           const date = new Date(item.latestUpdatedAt);
//           return date.toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "short",
//             timeZone: "UTC",
//           });
//         }) || [],
//       datasets: [
//         {
//           label: `Latest Total Consumption (kWh)`,
//           data:
//             dailyConsumption?.map((item) =>
//               parseFloat(item.dailyTotalConsumption || 0)
//             ) || [],
//           backgroundColor: "rgba(75, 192, 192, 0.6)",
//           borderColor: "rgba(75, 192, 192, 1)",
//         },
//         {
//           label: `Cost/Unit: ${data?.data?.costEbPerUnit} | Daily EB Consumption (kWh)`,
//           data:
//             dailyConsumption?.map((item) =>
//               parseFloat(item.dailyTotalEbConsumption || 0)
//             ) || [],
//           backgroundColor: "rgba(255, 99, 132, 0.6)",
//           borderColor: "rgba(255, 99, 132, 1)",
//         },
//         {
//           label: `Cost/Unit: ${
//             data?.data?.costDgPerUnit || 0
//           } | Daily DG Consumption (kWh)`,
//           data:
//             dailyConsumption?.map((item) =>
//               parseFloat(item.dailyTotalDgConsumption || 0)
//             ) || [],
//           backgroundColor: "rgba(255, 206, 86, 0.6)",
//           borderColor: "rgba(255, 206, 86, 1)",
//         },
//       ],
//       rawData: dailyConsumption,
//     },
//   ];

//   // Generate labels for MetricsCards from original data
//   const metricsCardLabels =
//     originalSevenDayData?.map((item) => {
//       // const date = new Date(item.latestUpdatedAt);
//       // return date.toLocaleDateString("en-GB", {
//       //   day: "2-digit",
//       //   month: "short",
//       // });
//       return new Date(item.latestUpdatedAt).toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         timeZone: "UTC", // <-- force UTC, avoids timezone shift
//       });
//     }) || [];

//   // Calculate changes for MetricsCards using original data
//   const calculateDailyChange = (dataArray) => {
//     if (!dataArray || dataArray.length < 2) {
//       return {
//         change: 0,
//         isPositive: true,
//         tooltip: "Insufficient data to calculate trend",
//       };
//     }

//     const todayValue = dataArray[dataArray.length - 1];
//     const yesterdayValue = dataArray[dataArray.length - 2];

//     if (yesterdayValue === 0) {
//       return {
//         change: todayValue === 0 ? 0 : 100,
//         isPositive: todayValue >= yesterdayValue,
//         tooltip:
//           todayValue === 0
//             ? "No change from zero"
//             : "Previous day had zero value",
//       };
//     }

//     const change = ((todayValue - yesterdayValue) / yesterdayValue) * 100;
//     const roundedChange = Math.round(change * 10) / 10;

//     return {
//       change: Math.abs(roundedChange),
//       isPositive: change >= 0,
//       tooltip: `Today vs Yesterday: ${todayValue} vs ${yesterdayValue}`,
//     };
//   };

//   const adminConsumptionChange = calculateDailyChange(
//     metricsCardData.lastSevenDayDayWiseAdminConsumption
//   );
//   const dueBalanceChange = calculateDailyChange(
//     metricsCardData.lastSevenDayDayWiseDueBalance
//   );
//   const faultyMetersChange = calculateDailyChange(
//     metricsCardData.lastSevenDayDayWiseFaultyMeters
//   );
//   const totalUsersChange = calculateDailyChange(
//     metricsCardData.lastSevenDayDayWiseUsers
//   );
//   const totalRevenueChange = calculateDailyChange(
//     metricsCardData.lastSevenDayDayWiseTotalRevenue
//   );
//   const offlineMetersChange = calculateDailyChange(
//     metricsCardData.lastSevenDayDayWiseOfflineMeters
//   );

//   const handleRefresh = async () => {
//     const now = new Date();
//     const fourMinutesInMs = 4 * 60 * 1000;

//     if (lastRefreshTime && now - lastRefreshTime < fourMinutesInMs) {
//       const secondsLeft = Math.ceil(
//         (fourMinutesInMs - (now - lastRefreshTime)) / 1000
//       );
//       toast.error(
//         `Please wait ${Math.floor(secondsLeft / 60)}m ${
//           secondsLeft % 60
//         }s before refreshing again`,
//         { autoClose: 4000 }
//       );
//       return;
//     }

//     setIsRefreshingData(true);
//     try {
//       await dispatch(fetchDashboardData(adminId));
//       const refreshOriginal = dispatch(fetchAdminDailyConsumption(adminId));

//       const chartParams =
//         startDate === today && endDate === today
//           ? { adminId }
//           : { adminId, from: startDate, to: endDate };
//       const refreshChart = dispatch(fetchFilteredChartData(chartParams));

//       await Promise.all([refreshOriginal, refreshChart]);
//       setLastRefreshTime(new Date());
//     } catch (error) {
//       console.error("Refresh error:", error);
//       toast.error("Failed to update data");
//     } finally {
//       setIsRefreshingData(false);
//     }
//   };

//   const getModeIcon = (mode) => {
//     if (mode === "Text") {
//       return (
//         <div className="flex items-center space-x-1 text-blue-600">
//           <MessageSquareText size={18} />
//           <span className="body-xs  font-medium">SMS</span>
//         </div>
//       );
//     }
//     if (mode === "Email") {
//       return (
//         <div className="flex items-center space-x-1 text-green-600">
//           <Mail size={18} />
//           <span className="body-xs  font-medium">Email</span>
//         </div>
//       );
//     }
//     return null;
//   };

//   const getAlertIcon = (type) => {
//     if (!type) return <AlertCircle className="text-gray-600" size={20} />;
//     if (type.includes("Polarity"))
//       return <Zap className="text-red-600" size={20} />;
//     if (type.includes("Magnetic"))
//       return <Magnet className="text-orange-600" size={20} />;
//     if (type.includes("Load"))
//       return <Activity className="text-yellow-600" size={20} />;
//     if (type.includes("Balance"))
//       return <DollarSign className="text-blue-600" size={20} />;
//     return <AlertCircle className="text-gray-600" size={20} />;
//   };

//   const AlertPanel = () => {
//     // let notifications = useSelector(UserNotifications);
//     let notifications = useSelector(selectUserNotifications);

//     const recentNotifications = useMemo(() => {
//       if (!Array.isArray(notifications)) return [];
//       return [...notifications]
//         .sort((a, b) => new Date(b.time) - new Date(a.time))
//         .slice(0, 6);
//     }, [notifications]);

//     return (
//       <div className="bg-white border border-white p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-orange-100 rounded-md">
//               <AlertTriangle className="text-orange-600" size={20} />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800">
//                 Recent Alerts
//               </h3>
//               <p className="body-xs  font-medium text-gray-500">
//                 {recentNotifications.length} Notifications
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
//           {recentNotifications.length > 0 ? (
//             recentNotifications.map((notification) => (
//               <div
//                 key={notification._id}
//                 className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="p-1.5 bg-blue-100 rounded-md">
//                     {getAlertIcon(notification.alertType)}
//                   </div>
//                   {getModeIcon(notification.mode)}
//                 </div>

//                 <h3 className="text-[15px] font-semibold text-gray-800 mb-2 truncate">
//                   {notification.alertType}
//                 </h3>

//                 <div className="text-gray-600 body-sm   font-medium mb-3">
//                   {notification.message}
//                 </div>

//                 <div className="space-y-1 body-sm  ">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Time</span>
//                     <span className="font-medium">
//                       {new Date(notification.time).toLocaleString()}
//                     </span>
//                   </div>
//                   {notification.userName && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">User</span>
//                       <span className="font-medium">
//                         {notification.userName}
//                       </span>
//                     </div>
//                   )}
//                   {notification.meterId && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Meter ID</span>
//                       <span className="font-medium">
//                         {notification.meterId}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-4">
//               <p className="body-sm   font-medium text-gray-500">
//                 No recent alerts
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const MetricsCard1 = ({
//     title,
//     value,
//     change,
//     isPositive,
//     icon: Icon,
//     trend,
//     trendLabel,
//     labels,
//     subLabel,
//     subValue,
//     valueRoute,
//     subValueRoute,
//     trendRoute, // ✅ clickable trend
//     metricUnit = "",
//     showMainGraph = true,
//     secondaryTrends = [],
//     isClickable = true, // New prop to control clickability
//   }) => {
//     const navigate = useNavigate();

//     // Helper function to normalize data
//     const normalizeData = (data) => {
//       if (data === undefined || data === null) return null;
//       return Array.isArray(data) ? data : [data];
//     };

//     const getLastValue = (data) => {
//       const normalized = normalizeData(data);
//       return normalized ? normalized[normalized.length - 1] : 0;
//     };

//     const renderGraphBars = (data, color, metricUnitOverride, labelTitle) => {
//       const normalizedData = normalizeData(data);
//       if (!normalizedData || !labels || normalizedData.length !== labels.length)
//         return null;

//       const maxValue =
//         Math.max(...normalizedData.filter((val) => !isNaN(val))) || 1;
//       const currentMetricUnit = metricUnitOverride || metricUnit;

//       return (
//         <div className="h-16 bg-gray-50 rounded-sm flex items-end justify-center gap-[2px] w-full relative">
//           {normalizedData.map((point, index) => {
//             const heightPercent = (point / maxValue) * 100;
//             const formattedDate = labels[index];
//             const formattedValue = point.toLocaleString();

//             return (
//               <div
//                 key={index}
//                 className={`w-[12px] rounded-t relative group ${
//                   color === "green"
//                     ? "bg-green-400"
//                     : color === "red"
//                     ? "bg-red-400"
//                     : color === "blue"
//                     ? "bg-blue-400"
//                     : color === "purple"
//                     ? "bg-purple-400"
//                     : "bg-gray-400"
//                 }`}
//                 style={{ height: `${heightPercent}%` }}
//               >
//                 {/* Tooltip */}
//                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 body-xs  text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-md whitespace-nowrap">
//                   <div className="font-semibold">{formattedDate}</div>
//                   <div>
//                     {labelTitle} {formattedValue} {currentMetricUnit}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       );
//     };

//     const normalizedTrend = normalizeData(trend);
//     const hasGraphContent =
//       normalizedTrend || (secondaryTrends && secondaryTrends.length > 0);

//     return (
//       <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 w-full flex flex-col h-full">
//         {/* Top Icon & Change */}
//         <div className="flex items-center justify-between mb-4">
//           <div
//             className={`p-3 rounded-xl ${
//               isPositive ? "bg-green-100" : "bg-red-100"
//             }`}
//           >
//             <Icon
//               className={`${isPositive ? "text-green-600" : "text-red-600"}`}
//               size={24}
//             />
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="relative group flex items-center space-x-1 body-xs  font-medium">
//               {isPositive ? (
//                 <TrendingUp size={16} className="text-green-600" />
//               ) : (
//                 <TrendingDown size={16} className="text-red-600" />
//               )}
//               <span
//                 className={`body-xs  font-semibold ${
//                   isPositive ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {change}
//               </span>
//               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max px-2 py-1 body-xs  text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-md">
//                 <div>
//                   {isPositive ? "Increased" : "Decreased"} by {change}
//                 </div>
//                 <div className="text-gray-500 body-xs  mt-1">
//                   vs previous day
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Title & Values */}
//         <div className="flex flex-row items-stretch justify-between gap-4 mb-4">
//           {/* Left Section (Title + Value) */}
//           <div className="flex-1 flex flex-col justify-between">
//             <h3
//               className={`body-xs  font-medium text-gray-600 mb-1 truncate ${
//                 valueRoute && isClickable ? "cursor-pointer hover:underline" : ""
//               }`}
//               onClick={() => valueRoute && isClickable && navigate(valueRoute)}
//             >
//               {title}
//             </h3>
//             <p
//               className={`text-2xl font-bold text-gray-900 truncate ${
//                 valueRoute && isClickable ? "cursor-pointer hover:underline" : ""
//               }`}
//               onClick={() => valueRoute && isClickable && navigate(valueRoute)}
//             >
//               {value}{" "}
//               {metricUnit && (
//                 <span className="body-sm   font-normal">{metricUnit}</span>
//               )}
//             </p>
//           </div>

//           {/* Right Section (Sub value clickable) */}
//           {subLabel && (
//             <div className="flex-1 flex flex-col items-end justify-between">
//               <p
//                 className={`body-xs  font-medium text-gray-600 mb-1 truncate ${
//                   subValueRoute && isClickable ? "cursor-pointer hover:underline" : ""
//                 }`}
//                 onClick={() => subValueRoute && isClickable && navigate(subValueRoute)}
//               >
//                 {subLabel}
//               </p>
//               <p
//                 className={`text-2xl font-bold text-gray-900 truncate ${
//                   subValueRoute && isClickable ? "cursor-pointer hover:underline" : ""
//                 }`}
//                 onClick={() => subValueRoute && isClickable && navigate(subValueRoute)}
//               >
//                 {subValue ?? 0} {title.includes("Energy") ? "kW" : ""}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Graph / Values Section */}
//         <div
//           className={`w-full mt-auto ${hasGraphContent ? "" : "min-h-[64px]"}`}
//         >
//           {normalizedTrend ||
//           (secondaryTrends && secondaryTrends.length > 0) ? (
//             <div className="w-full relative z-10 flex flex-col justify-end">
//               {/* Labels Row */}
//               <div className="flex items-center justify-between mb-1">
//                 {trendLabel && (
//                   <div
//                     className={`body-xs  font-medium text-gray-600 mb-1 truncate ${
//                       trendRoute && isClickable ? "cursor-pointer hover:underline" : ""
//                     }`}
//                     onClick={() => trendRoute && isClickable && navigate(trendRoute)}
//                   >
//                     {trendLabel}
//                   </div>
//                 )}
//                 <div className="flex items-center justify-between mb-1" />
//                 {secondaryTrends.map((st, i) => (
//                   <div
//                     key={i}
//                     className={`body-xs  font-medium text-gray-600 mb-1 truncate ${
//                       st.route && isClickable ? "cursor-pointer hover:underline" : ""
//                     }`}
//                     onClick={() => st.route && isClickable && navigate(st.route)}
//                   >
//                     {st.label || ""}
//                   </div>
//                 ))}
//               </div>

//               {/* Graphs or Values */}
//               <div className="flex justify-between items-end gap-2 min-h-[64px]">
//                 {/* Main Trend */}
//                 {normalizedTrend && labels ? (
//                   <div className="flex-1 relative">
//                     {showMainGraph ? (
//                       renderGraphBars(
//                         normalizedTrend,
//                         isPositive ? "green" : "red",
//                         metricUnit,
//                         trendLabel || title
//                       )
//                     ) : (
//                       <p
//                         className={`text-2xl mb-6 font-bold text-gray-900 truncate ${
//                           trendRoute && isClickable ? "cursor-pointer hover:underline" : ""
//                         }`}
//                         onClick={() => trendRoute && isClickable && navigate(trendRoute)}
//                       >
//                         {getLastValue(normalizedTrend)} {metricUnit}
//                       </p>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex-1" />
//                 )}

//                 {/* Secondary Trends */}
//                 {secondaryTrends.map((st, i) => (
//                   <div
//                     key={i}
//                     className="flex justify-between items-end gap-2 min-h-[64px]"
//                   >
//                     {st.data ? (
//                       st.showGraph ? (
//                         renderGraphBars(
//                           st.data,
//                           st.color || "blue",
//                           st.unit || "",
//                           st.label
//                         )
//                       ) : (
//                         <p
//                           className={`text-2xl font-bold mb-6 text-gray-900 truncate ${
//                             st.route && isClickable ? "cursor-pointer hover:underline" : ""
//                           }`}
//                           onClick={() => st.route && isClickable && navigate(st.route)}
//                         >
//                           {getLastValue(st.data)} {st.unit || ""}
//                         </p>
//                       )
//                     ) : (
//                       <div className="flex-1" />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="h-16 flex items-center justify-center text-gray-400 body-sm  ">
//               No graph data available
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500 text-lg">Loading Dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-lg">
//           Error loading dashboard: {error.message || error}
//         </p>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-500 text-lg">No dashboard data found.</p>
//       </div>
//     );
//   }

//   const totalActive = data.data.totalActiveMeters;
//   const total = data.data.totalMeters;
//   const percentage = total > 0 ? Math.round((totalActive / total) * 100) : 0;

//   return (
//     <div className="bg-blue-200/10 min-h-screen">
//       <div className="bg-white px-4 sm:px-6 py-4">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="body-md   sm:text-lg md:heading-xl   font-semibold text-gray-900">
//               Admin Dashboard
//             </h1>
//             <p className="body-xs  text-gray-500">
//               <span className="font-bold">Hello {"user"}</span> Welcome to
//               Real-time energy management system
//             </p>
//           </div>
//           <div className="flex items-center flex-wrap gap-2 body-xs  text-gray-600">
//             <Clock size={16} />
//             <span>Last updated: {new Date().toLocaleTimeString()}</span>
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
//             >
//               <RefreshCw
//                 className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
//               />
//               {refreshing ? "Refreshing..." : "Refresh"}
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mx-4 sm:mx-6 mt-6 mb-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-6">
//           <div className="flex items-center space-x-6">
//             <div className="p-4 bg-emerald-100 rounded-2xl">
//               <DollarSign className="text-emerald-600" size={32} />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-emerald-800 mb-1">
//                 Total Revenue
//               </h2>
//               <div className="flex items-baseline space-x-2">
//                 <span className="text-3xl font-bold text-emerald-900">
//                   {data.data.totalRevenue}
//                 </span>
//                 <span
//                   className={`body-xs  flex items-center group relative ${
//                     totalRevenueChange.isPositive
//                       ? "text-emerald-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {totalRevenueChange.isPositive ? (
//                     <TrendingUp size={14} className="mr-1" />
//                   ) : (
//                     <TrendingDown size={14} className="mr-1" />
//                   )}
//                   {totalRevenueChange.change}%
//                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max px-2 py-1 body-xs  text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-md">
//                     Vs Previous Day
//                   </div>
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-6 justify-between">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-emerald-900">
//                 {data.data.totalAssignedUsers}
//               </div>
//               <div className="body-xs  text-emerald-600">Active Users</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-emerald-900">
//                 {data.data.totalActiveMeters}
//               </div>
//               <div className="body-xs  text-emerald-600">Active Meters</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 sm:px-6 pb-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
//           {/* Total Users Card */}
//           <MetricsCard1
//             title="Total Users"
//             value={data.data.totalUsers}
//             subLabel="Total Meters"
//             subValue={data.data.totalMeters}
//             change={`${totalUsersChange.change}%`}
//             isPositive={totalUsersChange.isPositive}
//             icon={Users}
//             trend={metricsCardData.lastSevenDayDayWiseUsers}
//             // trend={metricsCardData.latestTotalConsumption}
//             // trend={[100, 120, 110, 130, 125, 140, 150]} // ✅ wrap array in {}
//             trendLabel="New Users"
//             labels={metricsCardData.lastSevenDayDayWiseAdminConsumption}
//             // labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} // ✅ wrap array in {}
//             showMainGraph={true}
//             secondaryTrends={[
//               {
//                 data: metricsCardData.lastSevenDayDayWiseTotalMeters,
//                 label: "New Meters",
//                 color: "blue",
//                 showGraph: true,
//               },
//             ]}
//             valueRoute="/admin/user-list"
//             subValueRoute="/admin/meters-list"
//             isClickable={true}
//           />

//           {/* Online / Offline / Faulty / Tempered Meters Card */}
//           <MetricsCard1
//             title="Online Meters"
//             value={data.data.totalActiveMeters}
//             subLabel="Offline Meters"
//             subValue={data.data.totalOfflineMeters}
//             change={`${offlineMetersChange.change}%`}
//             isPositive={offlineMetersChange.isPositive}
//             icon={AlertTriangle}
//             trend={data.data.totalFaultyMeters}
//             trendLabel="Faulty Meters"
//             labels={metricsCardLabels}
//             showMainGraph={false}
//             secondaryTrends={[
//               {
//                 // data: data.data.totalTemperedMeters || 0,
//                 // label: "Tempered Meters",
//                 // color: "red",
//                 // showGraph: false,
//                 // route: "/admin/tempered-meters", // ✅ Tempered Meters → clickable

//                 data: temperedMeters?.meterCount || 0, // Use the count from Redux state
//                 label: "Tempered Meters",
//                 color: "red",
//                 showGraph: false,
//                 route: "/admin/tempered-meters",
//               },
//             ]}
//             valueRoute="/admin/online-meters" // ✅ Online Meters → clickable
//             subValueRoute="/admin/offline-meters" // ✅ Offline Meters → clickable
//             trendRoute="/admin/faulty-meters" // ✅ Faulty Meters → clickable
//             isClickable={true}
//           />

//           <MetricsCard1
//             title="Due Balance"
//             value={data.data.negativeRevenue}
//             subLabel="Due Users"
//             subValue={data.data.totalDueUser}
//             change={`${dueBalanceChange.change}%`}
//             isPositive={dueBalanceChange.isPositive}
//             icon={DollarSign}
//             trend={metricsCardData.lastSevenDayDayWiseDueBalance}
//             trendLabel="Due Balance"
//             // trend={[100, 120, 110, 130, 125, 140, 150]} // ✅ wrap array in {}
//             labels={metricsCardLabels}
//             // labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} // ✅ wrap array in {}
//             showMainGraph={true}
//             secondaryTrends={[
//               {
//                 data: metricsCardData.lastSevenDayDayWiseTotalMeters,
//                 label: "Due Users",
//                 color: "blue",
//                 showGraph: true,
//               },
//             ]}
//             metricUnit=""
//             secondaryTrend={metricsCardData.lastSevenDayDayWiseDueUsers}
//             secondaryTrendLabel="Due Users"
//             subValueRoute={`/admin/dashboard/duebalanceuser/${adminId}`}
//             isClickable={true}
//           />

//           {/* Total Energy Consumption Card */}
//           <MetricsCard1
//             title="Total Energy Consumption"
//             value={data.data.totalConsumption}
//             change={`${adminConsumptionChange.change}%`}
//             isPositive={adminConsumptionChange.isPositive}
//             icon={Zap}
//             trend={data.data.totalEbConsumption}
//             trendLabel="Total EB"
//             labels={["Current"]}
//             showMainGraph={false}
//             secondaryTrends={[
//               {
//                 data: data.data.totalDgConsumption,
//                 label: "Total DG",
//                 showGraph: false,
//               },
//             ]}
//             isClickable={false} // This makes the card non-clickable
//           />
//         </div>

//         <div className="mt-6">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-blue-100 rounded-sm">
//                   <BarChart3 className="text-blue-600" size={24} />
//                 </div>

//                 <div>
//                   <h2 className="body-md   font-bold text-gray-800">
//                     Smart Usage Analytics
//                   </h2>
//                   {/* <p className="body-xs  text-gray-500">
//                     AI-powered consumption insights
//                   </p> */}
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center gap-4">
//                 <div className="flex items-center space-x-4">
//                   <div>
//                     <label className="block body-xs  font-medium text-gray-700 mb-1">
//                       <Calendar className="h-4 w-4 inline mr-1" />
//                       From Date
//                     </label>
//                     <input
//                       type="date"
//                       value={startDate}
//                       max={endDate || today}
//                       //  max={today} // Can't select future dates
//                       onChange={(e) => setStartDate(e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-xs "
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <div>
//                     <label className="block body-xs  font-medium text-gray-700 mb-1">
//                       <Calendar className="h-4 w-4 inline mr-1" />
//                       Last Date
//                     </label>
//                     <input
//                       type="date"
//                       value={endDate}
//                       // min={startDate}
//                       // max={today}
//                       max={today} // Can't select future dates
//                       onChange={(e) => setEndDate(e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-xs "
//                     />
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => {
//                     setStartDate(today);
//                     setEndDate(today);
//                   }}
//                   className="px-3 py-2 body-xs  bg-gray-100 font-medium text-gray-700 rounded-sm"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>

//             <div className="mt-6">
//               {chartData.map((chart, ind) => (
//                 <CurrentPowerChart key={ind} {...chart} />
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
//           <div className="flex flex-col bg-white p-6 h-full">
//             <AlertPanel />
//           </div>

//           <div className="flex flex-col bg-white p-6 h-full">
//             <MeterList meters={meters} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../redux/thunks/adminDashboardThunks";
import { Link, useNavigate } from "react-router-dom";

import {
  Gauge,
  TrendingUp,
  Download,
  AlertTriangle,
  Zap,
  Bell,
  Calendar,
  Activity,
  Users,
  DollarSign,
  BarChart3,
  UserPlus,
  Search,
  Settings,
  Filter,
  RefreshCw,
  ChevronDown,
  Eye,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Magnet,
  MessageSquareText,
  Mail,
} from "lucide-react";

{
  /* <DollarSign /> */
}

import MeterList from "../components/MeterList";
import CurrentPowerChart from "../components/meterManagement/CurrentPowerChart";
import {
  fetchAdminDailyConsumption,
  fetchFilteredChartData,
  fetchMeterListByAdmin,
} from "../redux/thunks/adminDashboardThunks";
import { selectUserId } from "../redux/slice/authSlice";
import {
  selectMeterList,
  selectLoading,
  selectDailyConsuption,
  selectError,
  selectFetchDashboardData,
} from "../redux/slice/adminDashboardSlice";
import { toast } from "react-toastify";
import { fetchUserNotifications } from "../redux/thunks/notificationThunks";
// import { UserNotifications } from "../redux/slice/notificationSlice";
import { selectUserNotifications } from "../redux/slice/notificationSlice";

import { selectTemperedMeters } from "../redux/slice/adminDashboardSlice";
import { getTemperedMeter } from "../redux/thunks/adminDashboardThunks";

const Dashboard = () => {
  let today = new Date().toISOString().split("T")[0];
  today = "DD-MM-YYYY";
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(23);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const [isRefreshingData, setIsRefreshingData] = useState(false);
  const [originalSevenDayData, setOriginalSevenDayData] = useState([]);
  // const today = new Date().toISOString().split("T")[0];
  // const [startDate, setStartDate] = useState(today);
  // const [endDate, setEndDate] = useState(today);
  const [showLatest, setShowLatest] = useState(false); // toggle button state
  const temperedMeters = useSelector(selectTemperedMeters);
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const adminId = useSelector(selectUserId);
  const loading = useSelector(selectLoading);
  const fetchAdminMeters = useSelector(selectMeterList);
  const dailyConsumption = useSelector(selectDailyConsuption);
  const data = useSelector(selectFetchDashboardData);
  const error = useSelector(selectError);

  // Store initial 7-day data when first loaded
  useEffect(() => {
    if (dailyConsumption.length > 0 && originalSevenDayData.length === 0) {
      setOriginalSevenDayData(dailyConsumption);
    }
  }, [dailyConsumption]);

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchDashboardData(adminId));
    dispatch(fetchAdminDailyConsumption(adminId));
    dispatch(fetchMeterListByAdmin(adminId));
    dispatch(fetchUserNotifications(adminId));
    if (adminId) dispatch(getTemperedMeter(adminId));
  }, [dispatch, adminId]);

  // Handle date range changes for analytics chart only
  useEffect(() => {
    if (startDate === today && endDate === today) {
      dispatch(fetchAdminDailyConsumption(adminId));
    } else {
      dispatch(
        fetchFilteredChartData({ adminId, from: startDate, to: endDate })
      );
    }
  }, [startDate, endDate, dispatch, adminId]);

  // Filter meters based on search and filters
  const meters = fetchAdminMeters.filter((meter) => {
    const matchesStatus =
      filters.status === "all" || meter.status === filters.status;
    const matchesType = filters.type === "all" || meter.type === filters.type;
    const matchesSearch =
      meter.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meter.meterId?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  // Transform data for MetricsCards (always uses original 7-day data)
  const transformLastSevenDaysData = (data) => {
    if (!data || !Array.isArray(data)) {
      return {
        lastSevenDayDayWiseAdminConsumption: [],
        lastSevenDayDayWiseUsers: [],
        lastSevenDayDayWiseTotalMeters: [],
        lastSevenDayDayWiseFaultyMeters: [],
        lastSevenDayDayWiseOfflineMeters: [],
        lastSevenDayDayWiseDueBalance: [],
        lastSevenDayDayWiseDueUsers: [],
        lastSevenDayDayWiseTotalRevenue: [],
      };
    }

    return {
      lastSevenDayDayWiseAdminConsumption: data.map(
        (item) => item.latestTotalConsumption || 0
      ),
      lastSevenDayDayWiseUsers: data.map((item) => item.latestTotalUsers || 0),
      lastSevenDayDayWiseTotalMeters: data.map(
        (item) => item.latestTotalMeters || 0
      ),
      lastSevenDayDayWiseFaultyMeters: data.map(
        (item) => item.latestTotalFaultyMeters || 0
      ),
      lastSevenDayDayWiseOfflineMeters: data.map(
        (item) => item.latestTotalOfflineMeters || 0
      ),
      lastSevenDayDayWiseDueBalance: data.map(
        (item) => item.dailyTotalDueBalance || 0
      ),
      lastSevenDayDayWiseDueUsers: data.map(
        (item) => item.dailyTotalDueUsers || 0
      ),
      lastSevenDayDayWiseTotalRevenue: data.map(
        (item) => item.latestTotalRevenue || 0
      ),
    };
  };

  // For MetricsCards - always use original 7-day data
  const metricsCardData = transformLastSevenDaysData(originalSevenDayData);

  console.log(
    "------metricsCardData-----originalSevenDayData---",
    metricsCardData,
    originalSevenDayData
  );

  const chartData = [
    {
      id: "daily-consumption",
      title: showLatest
        ? "Total Energy Consumption (Latest)"
        : "Daily Consumption Overview",
      labels:
        dailyConsumption?.map((item) => {
          const date = new Date(item.latestUpdatedAt);
          return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            timeZone: "UTC",
          });
        }) || [],
      datasets: [
        // ✅ Agar showLatest true hai → sirf latest dataset
        ...(showLatest
          ? [
              {
                label: "Total Energy Consumption (kWh) EB + DG",
                data:
                  dailyConsumption?.map((item) =>
                    parseFloat(item.latestTotalConsumption || 0)
                  ) || [],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
              },
            ]
          : [
              {
                label: "Daily Total Consumption (kWh) EB + DG",
                data:
                  dailyConsumption?.map((item) =>
                    parseFloat(item.dailyTotalConsumption || 0)
                  ) || [],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
              },
            ]),

        // ✅ EB & DG sirf tabhi dikhana hai jab latest nahi ho
        ...(!showLatest
          ? [
              {
                label: `Cost/Unit: ${data?.data?.costEbPerUnit} | Daily EB Consumption (kWh)`,
                data:
                  dailyConsumption?.map((item) =>
                    parseFloat(item.dailyTotalEbConsumption || 0)
                  ) || [],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
              },
              {
                label: `Cost/Unit: ${
                  data?.data?.costDgPerUnit || 0
                } | Daily DG Consumption (kWh)`,
                data:
                  dailyConsumption?.map((item) =>
                    parseFloat(item.dailyTotalDgConsumption || 0)
                  ) || [],
                backgroundColor: "rgba(255, 206, 86, 0.6)",
                borderColor: "rgba(255, 206, 86, 1)",
              },
            ]
          : []),
      ],
      rawData: dailyConsumption,
    },
  ];

  // Generate labels for MetricsCards from original data
  const metricsCardLabels =
    originalSevenDayData?.map((item) => {
      // const date = new Date(item.latestUpdatedAt);
      // return date.toLocaleDateString("en-GB", {
      //   day: "2-digit",
      //   month: "short",
      // });
      return new Date(item.latestUpdatedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        timeZone: "UTC", // <-- force UTC, avoids timezone shift
      });
    }) || [];

  // Calculate changes for MetricsCards using original data
  const calculateDailyChange = (dataArray) => {
    if (!dataArray || dataArray.length < 2) {
      return {
        change: 0,
        isPositive: true,
        tooltip: "Insufficient data to calculate trend",
      };
    }

    const todayValue = dataArray[dataArray.length - 1];
    const yesterdayValue = dataArray[dataArray.length - 2];

    if (yesterdayValue === 0) {
      return {
        change: todayValue === 0 ? 0 : 100,
        isPositive: todayValue >= yesterdayValue,
        tooltip:
          todayValue === 0
            ? "No change from zero"
            : "Previous day had zero value",
      };
    }

    const change = ((todayValue - yesterdayValue) / yesterdayValue) * 100;
    const roundedChange = Math.round(change * 10) / 10;

    return {
      change: Math.abs(roundedChange),
      isPositive: change >= 0,
      tooltip: `Today vs Yesterday: ${todayValue} vs ${yesterdayValue}`,
    };
  };

  const adminConsumptionChange = calculateDailyChange(
    metricsCardData.lastSevenDayDayWiseAdminConsumption
  );
  const dueBalanceChange = calculateDailyChange(
    metricsCardData.lastSevenDayDayWiseDueBalance
  );
  const faultyMetersChange = calculateDailyChange(
    metricsCardData.lastSevenDayDayWiseFaultyMeters
  );
  const totalUsersChange = calculateDailyChange(
    metricsCardData.lastSevenDayDayWiseUsers
  );
  const totalRevenueChange = calculateDailyChange(
    metricsCardData.lastSevenDayDayWiseTotalRevenue
  );
  const offlineMetersChange = calculateDailyChange(
    metricsCardData.lastSevenDayDayWiseOfflineMeters
  );

  const handleRefresh = async () => {
    const now = new Date();
    const fourMinutesInMs = 4 * 60 * 1000;

    if (lastRefreshTime && now - lastRefreshTime < fourMinutesInMs) {
      const secondsLeft = Math.ceil(
        (fourMinutesInMs - (now - lastRefreshTime)) / 1000
      );
      toast.error(
        `Please wait ${Math.floor(secondsLeft / 60)}m ${
          secondsLeft % 60
        }s before refreshing again`,
        { autoClose: 4000 }
      );
      return;
    }

    setIsRefreshingData(true);
    try {
      await dispatch(fetchDashboardData(adminId));
      const refreshOriginal = dispatch(fetchAdminDailyConsumption(adminId));

      const chartParams =
        startDate === today && endDate === today
          ? { adminId }
          : { adminId, from: startDate, to: endDate };
      const refreshChart = dispatch(fetchFilteredChartData(chartParams));

      await Promise.all([refreshOriginal, refreshChart]);
      setLastRefreshTime(new Date());
    } catch (error) {
      console.error("Refresh error:", error);
      toast.error("Failed to update data");
    } finally {
      setIsRefreshingData(false);
    }
  };

  const getModeIcon = (mode) => {
    if (mode === "Text") {
      return (
        <div className="flex items-center space-x-1 text-blue-600">
          <MessageSquareText size={18} />
          <span className="body-xs  font-medium">SMS</span>
        </div>
      );
    }
    if (mode === "Email") {
      return (
        <div className="flex items-center space-x-1 text-green-600">
          <Mail size={18} />
          <span className="body-xs  font-medium">Email</span>
        </div>
      );
    }
    return null;
  };

  const getAlertIcon = (type) => {
    if (!type) return <AlertCircle className="text-gray-600" size={20} />;
    if (type.includes("Polarity"))
      return <Zap className="text-red-600" size={20} />;
    if (type.includes("Magnetic"))
      return <Magnet className="text-orange-600" size={20} />;
    if (type.includes("Load"))
      return <Activity className="text-yellow-600" size={20} />;
    if (type.includes("Balance"))
      return <DollarSign className="text-blue-600" size={20} />;
    return <AlertCircle className="text-gray-600" size={20} />;
  };

  const AlertPanel = () => {
    // let notifications = useSelector(UserNotifications);
    let notifications = useSelector(selectUserNotifications);

    const recentNotifications = useMemo(() => {
      if (!Array.isArray(notifications)) return [];
      return [...notifications]
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 6);
    }, [notifications]);

    return (
      <div className="bg-white border border-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-md">
              <AlertTriangle className="text-orange-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Alerts
              </h3>
              <p className="body-xs  font-medium text-gray-500">
                {recentNotifications.length} Notifications
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
          {recentNotifications.length > 0 ? (
            recentNotifications.map((notification) => (
              <div
                key={notification._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 bg-blue-100 rounded-md">
                    {getAlertIcon(notification.alertType)}
                  </div>
                  {getModeIcon(notification.mode)}
                </div>

                <h3 className="text-[15px] font-semibold text-gray-800 mb-2 truncate">
                  {notification.alertType}
                </h3>

                <div className="text-gray-600 body-sm   font-medium mb-3">
                  {notification.message}
                </div>

                <div className="space-y-1 body-sm  ">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium">
                      {new Date(notification.time).toLocaleString()}
                    </span>
                  </div>
                  {notification.userName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">User</span>
                      <span className="font-medium">
                        {notification.userName}
                      </span>
                    </div>
                  )}
                  {notification.meterId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Meter ID</span>
                      <span className="font-medium">
                        {notification.meterId}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="body-sm   font-medium text-gray-500">
                No recent alerts
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MetricsCard1 = ({
    title,
    value,
    change,
    isPositive,
    icon: Icon,
    trend,
    trendLabel,
    labels,
    subLabel,
    subValue,
    valueRoute,
    subValueRoute,
    trendRoute, // ✅ clickable trend
    metricUnit = "",
    showMainGraph = true,
    secondaryTrends = [],
    isClickable = true, // New prop to control clickability
  }) => {
    const navigate = useNavigate();

    // Helper function to normalize data
    const normalizeData = (data) => {
      if (data === undefined || data === null) return null;
      return Array.isArray(data) ? data : [data];
    };

    const getLastValue = (data) => {
      const normalized = normalizeData(data);
      return normalized ? normalized[normalized.length - 1] : 0;
    };

    const renderGraphBars = (data, color, metricUnitOverride, labelTitle) => {
      const normalizedData = normalizeData(data);
      if (!normalizedData || !labels || normalizedData.length !== labels.length)
        return null;

      const maxValue =
        Math.max(...normalizedData.filter((val) => !isNaN(val))) || 1;
      const currentMetricUnit = metricUnitOverride || metricUnit;

      return (
        <div className="h-16 bg-gray-50 rounded-sm flex items-end justify-center gap-[2px] w-full relative">
          {normalizedData.map((point, index) => {
            const heightPercent = (point / maxValue) * 100;
            const formattedDate = labels[index];
            const formattedValue = point.toLocaleString();

            return (
              <div
                key={index}
                className={`w-[12px] rounded-t relative group ${
                  color === "green"
                    ? "bg-green-400"
                    : color === "red"
                    ? "bg-red-400"
                    : color === "blue"
                    ? "bg-blue-400"
                    : color === "purple"
                    ? "bg-purple-400"
                    : "bg-gray-400"
                }`}
                style={{ height: `${heightPercent}%` }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 body-xs  text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-md whitespace-nowrap">
                  <div className="font-semibold">{formattedDate}</div>
                  <div>
                    {labelTitle} {formattedValue} {currentMetricUnit}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    const normalizedTrend = normalizeData(trend);
    const hasGraphContent =
      normalizedTrend || (secondaryTrends && secondaryTrends.length > 0);

    return (
      <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 w-full flex flex-col h-full">
        {/* Top Icon & Change */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${
              isPositive ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Icon
              className={`${isPositive ? "text-green-600" : "text-red-600"}`}
              size={24}
            />
          </div>
          <div className="flex items-center space-x-1">
            <div className="relative group flex items-center space-x-1 body-xs  font-medium">
              {isPositive ? (
                <TrendingUp size={16} className="text-green-600" />
              ) : (
                <TrendingDown size={16} className="text-red-600" />
              )}
              <span
                className={`body-xs  font-semibold ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {change}
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max px-2 py-1 body-xs  text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-md">
                <div>
                  {isPositive ? "Increased" : "Decreased"} by {change}
                </div>
                <div className="text-gray-500 body-xs  mt-1">
                  vs previous day
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title & Values */}
        <div className="flex flex-row items-stretch justify-between gap-4 mb-4">
          {/* Left Section (Title + Value) */}
          <div className="flex-1 flex flex-col justify-between">
            <h3
              className={`body-xs  font-medium text-gray-600 mb-1 truncate ${
                valueRoute && isClickable
                  ? "cursor-pointer hover:underline"
                  : ""
              }`}
              onClick={() => valueRoute && isClickable && navigate(valueRoute)}
            >
              {title}
            </h3>
            <p
              className={`text-2xl font-bold text-gray-900 truncate ${
                valueRoute && isClickable
                  ? "cursor-pointer hover:underline"
                  : ""
              }`}
              onClick={() => valueRoute && isClickable && navigate(valueRoute)}
            >
              {value}{" "}
              {metricUnit && (
                <span className="body-sm   font-normal">{metricUnit}</span>
              )}
            </p>
          </div>

          {/* Right Section (Sub value clickable) */}
          {subLabel && (
            <div className="flex-1 flex flex-col items-end justify-between">
              <p
                className={`body-xs  font-medium text-gray-600 mb-1 truncate ${
                  subValueRoute && isClickable
                    ? "cursor-pointer hover:underline"
                    : ""
                }`}
                onClick={() =>
                  subValueRoute && isClickable && navigate(subValueRoute)
                }
              >
                {subLabel}
              </p>
              <p
                className={`text-2xl font-bold text-gray-900 truncate ${
                  subValueRoute && isClickable
                    ? "cursor-pointer hover:underline"
                    : ""
                }`}
                onClick={() =>
                  subValueRoute && isClickable && navigate(subValueRoute)
                }
              >
                {subValue ?? 0} {title.includes("Energy") ? "kW" : ""}
              </p>
            </div>
          )}
        </div>

        {/* Graph / Values Section */}
        <div
          className={`w-full mt-auto ${hasGraphContent ? "" : "min-h-[64px]"}`}
        >
          {normalizedTrend ||
          (secondaryTrends && secondaryTrends.length > 0) ? (
            <div className="w-full relative z-10 flex flex-col justify-end">
              {/* Labels Row */}
              <div className="flex items-center justify-between mb-1">
                {trendLabel && (
                  <div
                    className={`body-xs  font-medium text-gray-600 mb-1 truncate ${
                      trendRoute && isClickable
                        ? "cursor-pointer hover:underline"
                        : ""
                    }`}
                    onClick={() =>
                      trendRoute && isClickable && navigate(trendRoute)
                    }
                  >
                    {trendLabel}
                  </div>
                )}
                <div className="flex items-center justify-between mb-1" />
                {secondaryTrends.map((st, i) => (
                  <div
                    key={i}
                    className={`body-xs  font-medium text-gray-600 mb-1 truncate ${
                      st.route && isClickable
                        ? "cursor-pointer hover:underline"
                        : ""
                    }`}
                    onClick={() =>
                      st.route && isClickable && navigate(st.route)
                    }
                  >
                    {st.label || ""}
                  </div>
                ))}
              </div>

              {/* Graphs or Values */}
              <div className="flex justify-between items-end gap-2 min-h-[64px]">
                {/* Main Trend */}
                {normalizedTrend && labels ? (
                  <div className="flex-1 relative">
                    {showMainGraph ? (
                      renderGraphBars(
                        normalizedTrend,
                        isPositive ? "green" : "red",
                        metricUnit,
                        trendLabel || title
                      )
                    ) : (
                      <p
                        className={`text-2xl mb-6 font-bold text-gray-900 truncate ${
                          trendRoute && isClickable
                            ? "cursor-pointer hover:underline"
                            : ""
                        }`}
                        onClick={() =>
                          trendRoute && isClickable && navigate(trendRoute)
                        }
                      >
                        {getLastValue(normalizedTrend)} {metricUnit}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex-1" />
                )}

                {/* Secondary Trends */}
                {secondaryTrends.map((st, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-end gap-2 min-h-[64px]"
                  >
                    {st.data ? (
                      st.showGraph ? (
                        renderGraphBars(
                          st.data,
                          st.color || "blue",
                          st.unit || "",
                          st.label
                        )
                      ) : (
                        <p
                          className={`text-2xl font-bold mb-6 text-gray-900 truncate ${
                            st.route && isClickable
                              ? "cursor-pointer hover:underline"
                              : ""
                          }`}
                          onClick={() =>
                            st.route && isClickable && navigate(st.route)
                          }
                        >
                          {getLastValue(st.data)} {st.unit || ""}
                        </p>
                      )
                    ) : (
                      <div className="flex-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-16 flex items-center justify-center text-gray-400 body-sm  ">
              No graph data available
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Error loading dashboard: {error.message || error}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No dashboard data found.</p>
      </div>
    );
  }

  const totalActive = data.data.totalActiveMeters;
  const total = data.data.totalMeters;
  const percentage = total > 0 ? Math.round((totalActive / total) * 100) : 0;

  return (
    <div className="bg-blue-200/10 min-h-screen">
      <div className="bg-white px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="body-md   sm:text-lg md:heading-xl   font-semibold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="body-xs  text-gray-500">
              {/* <span className="font-bold">Hello {"user"}</span> */}
              Welcome to Real-time energy management system
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-2 body-xs  text-gray-600">
            <Clock size={16} />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-4 sm:mx-6 mt-6 mb-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-6">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-emerald-100 rounded-2xl">
              <DollarSign className="text-emerald-600" size={32} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-emerald-800 mb-1">
                Total Revenue
              </h2>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-emerald-900">
                  {data.data.totalRevenue}
                </span>
                <span
                  className={`body-xs  flex items-center group relative ${
                    totalRevenueChange.isPositive
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {totalRevenueChange.isPositive ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  {totalRevenueChange.change}%
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max px-2 py-1 body-xs  text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-md">
                    Vs Previous Day
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-900">
                {data.data.totalAssignedUsers}
              </div>
              <div className="body-xs  text-emerald-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-900">
                {data.data.totalActiveMeters}
              </div>
              <div className="body-xs  text-emerald-600">Active Meters</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {/* Total Users Card */}
          <MetricsCard1
            title="Total Users"
            value={data.data.totalUsers}
            subLabel="Total Meters"
            subValue={data.data.totalMeters}
            change={`${totalUsersChange.change}%`}
            isPositive={totalUsersChange.isPositive}
            icon={Users}
            trend={metricsCardData.lastSevenDayDayWiseUsers}
            // trend={metricsCardData.latestTotalConsumption}
            // trend={[100, 120, 110, 130, 125, 140, 150]} // ✅ wrap array in {}
            trendLabel="New Users"
            labels={metricsCardData.lastSevenDayDayWiseAdminConsumption}
            // labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} // ✅ wrap array in {}
            showMainGraph={true}
            secondaryTrends={[
              {
                data: metricsCardData.lastSevenDayDayWiseTotalMeters,
                label: "New Meters",
                color: "blue",
                showGraph: true,
              },
            ]}
            valueRoute="/admin/user-list"
            subValueRoute="/admin/meters-list"
            isClickable={true}
          />

          {/* Online / Offline / Faulty / Tempered Meters Card */}
          <MetricsCard1
            title="Online Meters"
            value={data.data.totalActiveMeters}
            subLabel="Offline Meters"
            subValue={data.data.totalOfflineMeters}
            change={`${offlineMetersChange.change}%`}
            isPositive={offlineMetersChange.isPositive}
            icon={AlertTriangle}
            trend={data.data.totalFaultyMeters}
            trendLabel="Faulty Meters"
            labels={metricsCardLabels}
            showMainGraph={false}
            secondaryTrends={[
              {
                // data: data.data.totalTemperedMeters || 0,
                // label: "Tempered Meters",
                // color: "red",
                // showGraph: false,
                // route: "/admin/tempered-meters", // ✅ Tempered Meters → clickable

                data: temperedMeters?.meterCount || 0, // Use the count from Redux state
                label: "Tempered Meters",
                color: "red",
                showGraph: false,
                route: "/admin/tempered-meters",
              },
            ]}
            valueRoute="/admin/online-meters" // ✅ Online Meters → clickable
            subValueRoute="/admin/offline-meters" // ✅ Offline Meters → clickable
            trendRoute="/admin/faulty-meters" // ✅ Faulty Meters → clickable
            isClickable={true}
          />

          <MetricsCard1
            title="Due Balance"
            value={data.data.negativeRevenue}
            subLabel="Due Users"
            subValue={data.data.totalDueUser}
            change={`${dueBalanceChange.change}%`}
            isPositive={dueBalanceChange.isPositive}
            icon={DollarSign}
            trend={metricsCardData.lastSevenDayDayWiseDueBalance}
            trendLabel="Due Balance"
            // trend={[100, 120, 110, 130, 125, 140, 150]} // ✅ wrap array in {}
            labels={metricsCardLabels}
            // labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} // ✅ wrap array in {}
            showMainGraph={true}
            secondaryTrends={[
              {
                data: metricsCardData.lastSevenDayDayWiseTotalMeters,
                label: "Due Users",
                color: "blue",
                showGraph: true,
              },
            ]}
            metricUnit=""
            secondaryTrend={metricsCardData.lastSevenDayDayWiseDueUsers}
            secondaryTrendLabel="Due Users"
            subValueRoute={`/admin/dashboard/duebalanceuser/${adminId}`}
            isClickable={true}
          />

          {/* Total Energy Consumption Card */}
          <MetricsCard1
            title="Total Energy Consumption"
            value={data.data.totalConsumption}
            change={`${adminConsumptionChange.change}%`}
            isPositive={adminConsumptionChange.isPositive}
            icon={Zap}
            trend={data.data.totalEbConsumption}
            trendLabel="Total EB"
            labels={["Current"]}
            showMainGraph={false}
            secondaryTrends={[
              {
                data: data.data.totalDgConsumption,
                label: "Total DG",
                showGraph: false,
              },
            ]}
            isClickable={false} // This makes the card non-clickable
          />
        </div>

        <div className="mt-6">
          {/* <Link
            to={`/admin/user-payments/${adminId}`}
            className="text-green-600 hover:text-green-800 flex items-center"
          >
            <DollarSign className="w-4 h-4 mr-1" /> Payments
          </Link> */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-sm">
                  <BarChart3 className="text-blue-600" size={24} />
                </div>

                <div>
                  <h2 className="body-md  text-lg  font-bold text-gray-800">
                    Smart Usage Analytics
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block body-xs  font-medium text-gray-700 mb-1">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      From Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      max={endDate || today}
                      //  max={today} // Can't select future dates
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-xs "
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block body-xs  font-medium text-gray-700 mb-1">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Last Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      // min={startDate}
                      // max={today}
                      max={today} // Can't select future dates
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-xs "
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStartDate(today);
                    setEndDate(today);
                  }}
                  className="px-3 mt-4 py-2 body-xs  cursor-pointer bg-gray-100 font-medium text-gray-700 rounded-sm"
                >
                  Reset
                </button>

                {/* Toggle latest button */}
                <button
                  onClick={() => setShowLatest(!showLatest)}
                  className="px-3 mt-4 py-2 body-xs  cursor-pointer bg-blue-100 text-blue-700 font-medium rounded-sm"
                >
                  {showLatest
                    ? "Show Daily Consumption"
                    : "Show Total Consumption"}
                </button>
              </div>
            </div>

            <div className="mt-6">
              {chartData.map((chart, ind) => (
                <CurrentPowerChart key={ind} {...chart} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          <div className="flex flex-col bg-white p-6 h-full">
            <AlertPanel />
          </div>

          <div className="flex flex-col bg-white p-6 h-full">
            <MeterList meters={meters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
