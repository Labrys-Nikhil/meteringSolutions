// import React, { useEffect, useState, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";

// // Import from currentPowerChartSlice (keeping existing functionality)
// import { selectChartsByDashboard } from "../redux/slice/currentPowerChartSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import { toast } from "react-toastify";

// // Import from the new userDashboard slice
// import {
//   selectDashboardData,
//   selectLoading,
//   selectError,
//   selectTotalEnergyConsumption,
//   selectTotalBalance,
//   selectActiveMeters,
//   setLoading,
//   setError,
//   updateFilterSettings,
//   resetFilterSettings,
//   fetchUserInit
// } from "../redux/slice/userDashboardSlice";

// import Header from "../components/header/Header";
// import CurrentPowerChart from "../components/meterManagement/CurrentPowerChart";
// import {
//   Zap,
//   History,
//   Settings,
//   Bolt,
//   Lock,
//   TrendingUp,
//   Calendar,
//   ArrowRight,
//   CreditCard,
//   RefreshCw,
//   AlertTriangle,
//   CheckCircle
// } from "lucide-react";
// import { EGStatusDisplay } from "../components/userManagement/ED-DGstausDisplay";
// import { useNavigate } from "react-router-dom";
// import { selectUserId } from "../redux/slice/authSlice";

// function UserDashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const userID = useSelector(selectUserId);
//   // Existing selectors
//   const charts = useSelector(selectChartsByDashboard);

//   // New selectors from userDashboard slice
//   const dashboardData = useSelector(selectDashboardData);
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);
//   const totalEnergyConsumption = useSelector(selectTotalEnergyConsumption);
//   const totalBalance = useSelector(selectTotalBalance);
//   const activeMeters = useSelector(selectActiveMeters);

//   // Local state
//   const [activeTab, setActiveTab] = useState("Daily");
//   const [startDate, setStartDate] = useState("2025-04-01");
//   const [refreshing, setRefreshing] = useState(false);
//   const [lastRefreshTime, setLastRefreshTime] = useState(null);
//   const [isRefreshingData, setIsRefreshingData] = useState(false);

//   const today = new Date().toISOString().split("T")[0];

//   useEffect(() => {

//     dispatch(fetchUserInit());
//     dispatch(setHeaderTitle("User Dashboard"));
//     dispatch(setBreadcrumbs([{ label: "User Dashboard" }]));
//   }, [dispatch]);

//   // Update filter settings when startDate changes
//   useEffect(() => {
//     dispatch(updateFilterSettings({
//       dateRange: {
//         startDate: startDate,
//         endDate: today
//       }
//     }));
//   }, [startDate, today, dispatch]);

//   // Memoized calculations to prevent unnecessary re-renders
//   const firstMeterData = useMemo(() => {
//     return dashboardData?.summary?.recentData || null;
//   }, [dashboardData]);

//   const chartData = useMemo(() => {
//     return {
//       className: "power consumption chart(7 days)",
//       title: "",
//       labels: charts?.labelsData || [],
//       dataPoints: charts?.chart || [],
//       barColor: "rgba(75, 192, 192, 0.6)",
//       bgColor: "rgba(75, 192, 192, 1)",
//     };
//   }, [charts]);

//   const calculatedMetrics = useMemo(() => {
//     const currentConsumption = firstMeterData ?
//       (Number(firstMeterData.cum_eb_kwh?.value) || 0) + (Number(firstMeterData.cum_dg_kwh?.value) || 0) :
//       245.8;

//     const remainingBalance = Number(firstMeterData?.balance_amount?.value) || 128.50;
//     const voltage = firstMeterData?.voltage_r?.value || 220;
//     const current = firstMeterData?.current_r?.value || 10.2;
//     const powerFactor = firstMeterData?.power_factor?.value || 0.92;
//     const frequency = firstMeterData?.frequency?.value || 50;

//     // More sophisticated bill estimation
//     const dailyAverage = currentConsumption / 30; // Assuming 30 days of data
//     const daysRemaining = Math.floor(remainingBalance / (dailyAverage * 0.15));
//     const nextBillAmount = remainingBalance + (currentConsumption * 0.15);

//     return {
//       currentConsumption,
//       remainingBalance,
//       voltage,
//       current,
//       powerFactor,
//       frequency,
//       daysRemaining,
//       nextBillAmount,
//       dailyAverage
//     };
//   }, [firstMeterData]);

//   // Handle refresh functionality
//   const handleRefresh = async () => {
//       const now = new Date();
//       const fourMinutesInMs = 4 * 60 * 1000;

//       // Check cooldown
//       if (lastRefreshTime && now - lastRefreshTime < fourMinutesInMs) {
//         const secondsLeft = Math.ceil(
//           (fourMinutesInMs - (now - lastRefreshTime)) / 1000
//         );
//         toast.error(
//           `Please wait ${Math.floor(secondsLeft / 60)}m ${
//             secondsLeft % 60
//           }s before refreshing again`,
//           { autoClose: 4000 }
//         );
//         return;
//       }

//       setIsRefreshingData(true);

//       try {
//         // Execute refresh sequence


//         await dispatch(fetchUserInit());


//         setLastRefreshTime(new Date());
//         // toast.success("Data updated successfully");
//       } catch (error) {
//         console.error("Refresh error:", error);
//         toast.error("Failed to update data");
//       } finally {
//         setIsRefreshingData(false);
//       }
//     };

//   // Handle loading state
//   if (loading) {
//     return (
//       <div className="bg-blue-200/10 min-h-screen">
//         <Header />
//         <div className="p-6 max-w-7xl mx-auto">
//           <div className="flex items-center justify-center h-64">
//             <div className="flex flex-col items-center space-y-4">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <div className="text-lg text-gray-600">Loading dashboard data...</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Handle error state
//   if (error) {
//     return (
//       <div className="bg-blue-200/10 min-h-screen">
//         <Header />
//         <div className="p-6 max-w-7xl mx-auto">
//           <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//             <div className="flex items-center space-x-3">
//               <AlertTriangle className="h-6 w-6 text-red-600" />
//               <div className="text-red-800">
//                 <strong>Error:</strong> {error}
//               </div>
//             </div>
//             <button
//               onClick={handleRefresh}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const isRelayOff = firstMeterData?.relay_status?.status === 'OFF';

//   return (
//     <div className="bg-blue-200/10 min-h-screen">
//       <Header />
//       <div className="p-6 max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
//               <p className="text-gray-600">
//                 Monitor your energy consumption and manage your account
//                 {activeMeters.length > 0 && (
//                   <span className="ml-2 body-sm   bg-green-100 text-green-800 px-2 py-1 rounded">
//                     {activeMeters.length} active meter{activeMeters.length > 1 ? 's' : ''}
//                   </span>
//                 )}
//               </p>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//             >
//               <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
//               <span>Refresh</span>
//             </button>
//           </div>

//           {/* Alert for relay off status */}
//           {isRelayOff && (
//             <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex items-center space-x-3">
//                 <AlertTriangle className="h-5 w-5 text-red-600" />
//                 <div>
//                   <span className="font-semibold text-red-800">Meter is OFF</span>
//                   <span className="text-red-700 ml-2">Please contact administrator for assistance</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatsCard
//             title="Current Consumption"
//             value={`${calculatedMetrics.currentConsumption.toFixed(1)} kWh`}
//             icon={<Zap className="h-6 w-6" />}
//             subText={`${calculatedMetrics.dailyAverage.toFixed(1)} kWh/day average`}
//             trend="up"
//             bgColor="bg-blue-50"
//             iconColor="text-blue-600"
//           />
//           <StatsCard
//             title="Remaining Balance"
//             value={`₹${calculatedMetrics.remainingBalance.toFixed(2)}`}
//             icon={<CreditCard className="h-6 w-6" />}
//             subText={`Estimated ${calculatedMetrics.daysRemaining} days left`}
//             trend="neutral"
//             bgColor="bg-green-50"
//             iconColor="text-green-600"
//           />
//           <StatsCard
//             title="Power Quality"
//             icon={<Bolt className="h-6 w-6" />}
//             bgColor="bg-purple-50"
//             iconColor="text-purple-600"
//             content={
//               <div className="space-y-2">
//                 <PowerQualityItem label="Voltage" value={`${calculatedMetrics.voltage}V`} isGood={calculatedMetrics.voltage >= 200 && calculatedMetrics.voltage <= 240} />
//                 <PowerQualityItem label="Current" value={`${calculatedMetrics.current}A`} isGood={true} />
//                 <PowerQualityItem label="Frequency" value={`${calculatedMetrics.frequency} Hz`} isGood={calculatedMetrics.frequency >= 49 && calculatedMetrics.frequency <= 51} />
//                 <PowerQualityItem label="Power Factor" value={calculatedMetrics.powerFactor.toFixed(2)} isGood={calculatedMetrics.powerFactor >= 0.9} />
//               </div>
//             }
//           />
//           <StatsCard
//             title="Next Bill Estimate"
//             value={`₹${calculatedMetrics.nextBillAmount.toFixed(2)}`}
//             icon={<Lock className="h-6 w-6" />}
//             subText="Due on Mar 25, 2025"
//             trend="neutral"
//             bgColor="bg-orange-50"
//             iconColor="text-orange-600"
//           />
//         </div>

//         {/* Real-time Meter Data */}
//         {firstMeterData && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
//             <h3 className="heading-xl   font-semibold text-gray-900 mb-6 flex items-center">
//               Real-time Meter Data
//               <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <MeterDataCard
//                 title="Total EB Units"
//                 value={firstMeterData?.cum_eb_kwh?.value || 0}
//                 unit="kWh"
//                 bgColor="bg-blue-50"
//               />
//               <MeterDataCard
//                 title="Total DG Units"
//                 value={firstMeterData?.cum_dg_kwh?.value || 0}
//                 unit="kWh"
//                 bgColor="bg-purple-50"
//               />
//               <EGStatusDisplay status={firstMeterData?.eb_dg_status?.value} />
//               <MeterDataCard
//                 title="Meter Status"
//                 value={firstMeterData?.relay_status?.status || 'UNKNOWN'}
//                 statusColor={
//                   firstMeterData?.relay_status?.status === 'ON'
//                     ? 'text-green-600'
//                     : firstMeterData?.relay_status?.status === 'OFF'
//                       ? 'text-red-600'
//                       : 'text-gray-500'
//                 }
//                 bgColor={firstMeterData?.relay_status?.status === 'OFF' ? 'bg-red-50' : 'bg-gray-50'}
//                 borderColor={firstMeterData?.relay_status?.status === 'OFF' ? 'border-red-300' : 'border-gray-200'}
//                 subText={firstMeterData?.relay_status?.status === 'OFF' ? 'Contact Administrator' : null}
//               />
//             </div>
//           </div>
//         )}

//         {/* Quick Actions */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//           <div className="flex flex-wrap gap-4">
//             <ActionButton
//               icon={<CreditCard className="h-5 w-5" />}
//               label="Recharge Account"
//               variant="primary"
//               onClick={() => navigate('/rechage-meter')}
//             />
//             <ActionButton
//               icon={<History className="h-5 w-5" />}
//               label="Usage History"
//               rightIcon={<ArrowRight className="h-4 w-4" />}
//               onClick={() => navigate(`/user/usage-history/${userID}`)}
//               variant="secondary"
//             />
//             <ActionButton
//               icon={<Settings className="h-5 w-5" />}
//               label="Account Settings"
//               variant="secondary"
//               onClick={() => navigate(`/user/account-setting/${userID}`)}
//             />
//             <ActionButton
//               icon={<TrendingUp className="h-5 w-5" />}
//               label="View Reports"
//               variant="secondary"
//               onClick={() => navigate('/reports')}
//             />
//           </div>
//         </div>

//         {/* Chart Section */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h2 className="heading-xl   font-semibold text-gray-900 mb-2">Usage Trends</h2>
//                 <p className="text-gray-600">Track your energy consumption patterns over time</p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div>
//                   <label className="block body-sm   font-medium text-gray-700 mb-1">
//                     <Calendar className="h-4 w-4 inline mr-1" />
//                     From Date
//                   </label>
//                   <input
//                     type="date"
//                     value={startDate}
//                     max={today}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
//                   />
//                 </div>
//                 <div>
//                   <label className="block body-sm   font-medium text-gray-700 mb-1">
//                     Reset Filters
//                   </label>
//                   <button
//                     onClick={() => {
//                       dispatch(resetFilterSettings());
//                       setStartDate("2025-04-01");
//                     }}
//                     className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-md body-sm   transition-colors"
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6">
//               {charts && (charts.labelsData?.length > 0 || charts.chart?.length > 0) ? (
//                 <CurrentPowerChart fullchartData={chartData} />
//               ) : (
//                 <div className="flex items-center justify-center h-64 text-gray-500">
//                   <div className="text-center">
//                     <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No chart data available</p>
//                     <p className="body-sm  ">Please check your meter configuration or try refreshing the page.</p>
//                     <button
//                       onClick={handleRefresh}
//                       className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       Refresh Data
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Enhanced components
// const StatsCard = ({ title, value, icon, subText, content, trend, bgColor, iconColor }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//     <div className="flex items-center justify-between mb-4">
//       <div className={`p-3 rounded-lg ${bgColor}`}>
//         <span className={iconColor}>{icon}</span>
//       </div>
//       {trend === "up" && (
//         <div className="flex items-center text-green-600 body-sm  ">
//           <TrendingUp className="h-4 w-4 mr-1" />
//           <span>+2.3%</span>
//         </div>
//       )}
//     </div>

//     <div className="mb-2">
//       <h3 className="body-sm   font-medium text-gray-600 mb-1">{title}</h3>
//       {content ? (
//         <div>{content}</div>
//       ) : (
//         <div className="text-2xl font-bold text-gray-900">{value}</div>
//       )}
//     </div>

//     {subText && (
//       <p className={`body-sm   ${trend === "up" ? "text-green-600" :
//           trend === "down" ? "text-red-600" :
//             "text-gray-500"
//         }`}>
//         {subText}
//       </p>
//     )}
//   </div>
// );

// const PowerQualityItem = ({ label, value, isGood }) => (
//   <div className="flex justify-between items-center">
//     <span className="body-sm   text-gray-600">{label}</span>
//     <div className="flex items-center space-x-1">
//       <span className="font-semibold text-gray-900">{value}</span>
//       {isGood ? (
//         <CheckCircle className="h-3 w-3 text-green-600" />
//       ) : (
//         <AlertTriangle className="h-3 w-3 text-yellow-600" />
//       )}
//     </div>
//   </div>
// );

// const MeterDataCard = ({ title, value, unit, statusColor, bgColor = "bg-gray-50", borderColor = "border-gray-200", subText }) => (
//   <div className={`${bgColor} rounded-lg p-5 shadow-sm border ${borderColor}`}>
//     <div className="body-sm   text-gray-500 mb-1">{title}</div>
//     <div className={`text-2xl font-bold ${statusColor || 'text-gray-800'}`}>
//       {value}
//       {unit && <span className="body-sm   text-gray-600 ml-1">{unit}</span>}
//     </div>
//     {subText && <span className="text-gray-800 body-sm  ">{subText}</span>}
//   </div>
// );

// const ActionButton = ({ icon, label, rightIcon, variant = "secondary", onClick }) => {
//   const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors";
//   const variantClasses = {
//     primary: "bg-blue-600 hover:bg-blue-700 text-white",
//     secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={`${baseClasses} ${variantClasses[variant]}`}
//     >
//       {icon}
//       <span>{label}</span>
//       {rightIcon}
//     </button>
//   );
// };

// export default UserDashboard;















// import { selectChartsByDashboard } from "../redux/slice/currentPowerChartSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// // Import from the new userDashboard slice
// import {
//   selectDashboardData,
//   selectLoading,
//   selectError,
//   selectTotalEnergyConsumption,
//   selectTotalBalance,
//   selectActiveMeters,
//   setLoading,
//   setError,
//   updateFilterSettings,
//   resetFilterSettings,
//   fetchUserInit,
//   fetchFilteredData // New action for filtered data
// } from "../redux/slice/userDashboardSlice";

// import Header from "../components/header/Header";
// import CurrentPowerChart from "../components/meterManagement/CurrentPowerChart";
// import {
//   Zap,
//   History,
//   Settings,
//   Bolt,
//   Lock,
//   TrendingUp,
//   Calendar,
//   ArrowRight,
//   CreditCard,
//   RefreshCw,
//   AlertTriangle,
//   CheckCircle
// } from "lucide-react";
// import { EGStatusDisplay } from "../components/userManagement/ED-DGstausDisplay";
// import { useNavigate, useParams } from "react-router-dom";
// import { selectUserId } from "../redux/slice/authSlice";

// import React, { useEffect, useState, useMemo } from "react";

// // function UserDashboard() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const userID = useSelector(selectUserId);
// //   const role=useParams().role ?? "user"
// //   // Existing selectors
// //   const charts = useSelector(selectChartsByDashboard);
// // console.log("-----000",charts)
// //   // New selectors from userDashboard slice
// //   const dashboardData = useSelector(selectDashboardData);
// //   console.log("===========dashboarddata=========",dashboardData)
// //   const loading = useSelector(selectLoading);
// //   const error = useSelector(selectError);
// //   const totalEnergyConsumption = useSelector(selectTotalEnergyConsumption);
// //   const totalBalance = useSelector(selectTotalBalance);
// //   const activeMeters = useSelector(selectActiveMeters);


// //   // Local state
// //   const [activeTab, setActiveTab] = useState("Daily");
// //   const [startDate, setStartDate] = useState(() => {
// //     // Set default start date to 7 days ago
// //     const date = new Date();
// //     date.setDate(date.getDate() - 7);
// //     return date.toISOString().split('T')[0];
// //   });
// //   const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [lastRefreshTime, setLastRefreshTime] = useState(null);
// //   const [isRefreshingData, setIsRefreshingData] = useState(false);

// //   const today = new Date().toISOString().split("T")[0];

// //   useEffect(() => {
// //     // Fetch initial data with default 7-day range
// //     const defaultRange = 7;
// //     dispatch(fetchUserInit({userId: userID, range: defaultRange}));
// //     dispatch(setHeaderTitle("User Dashboard"));
// //     dispatch(setBreadcrumbs([{ label: "User Dashboard" }]));
// //   }, [dispatch, userID]);

// //   // Update filter settings when dates change and fetch filtered data
// //   useEffect(() => {
// //     if (startDate && endDate) {
// //       // Calculate range in days
// //       const start = new Date(startDate);
// //       const end = new Date(endDate);
// //       const rangeInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

// //       // Update filter settings
// //       dispatch(updateFilterSettings({
// //         dateRange: {
// //           startDate: startDate,
// //           endDate: endDate
// //         }
// //       }));

// //       // Fetch filtered data
// //       dispatch(fetchFilteredData({userId: userID, range: rangeInDays}));
// //     }
// //   }, [startDate, endDate, dispatch, userID]);
// // console.log("===startDate====endDate======",startDate,endDate)
// //   // Memoized calculations to prevent unnecessary re-renders
// //   const firstMeterData = useMemo(() => {
// //     return dashboardData?.summary?.recentData || null;
// //   }, [dashboardData]);
// // console.log("=======chart=000==",charts)




// // //   const chartData = useMemo(() => {
// // //   const rawData = charts?.chart || [];
// // //   const labels = charts?.labelsData || [];

// // //   const dataPoints = rawData.map(item => parseFloat(item.totalKWh || 0));

// // //   return {
// // //     className: "power consumption chart",
// // //     title: "Energy Consumption",
// // //     labels,
// // //     dataPoints,
// // //     barColor: "rgba(75, 192, 192, 0.6)",
// // //     bgColor: "rgba(75, 192, 192, 1)",
// // //   };
// // // }, [charts]);



// // const chartData = useMemo(() => {
// //   const rawData = charts?.chart || [];
// //   const labels = charts?.labelsData || [];

// //   // Create datasets array with the expected format
// //   const datasets = [
// //     {
// //       label: "Energy Consumption",
// //       data: rawData.map(item => parseFloat(item.totalKWh || 0)),
// //       borderColor: "rgba(75, 192, 192, 0.6)",
// //       backgroundColor: "rgba(75, 192, 192, 1)",
// //     }
// //   ];

// //   return {
// //     className: "power consumption chart",
// //     title: "Energy Consumption",
// //     labels,
// //     datasets,
// //     rawData, // Pass the raw data for tooltips
// //   };
// // }, [charts]);


// // console.log("====chartData =======",chartData )
// //   const calculatedMetrics = useMemo(() => {
// //     const currentConsumption = firstMeterData ?
// //       (Number(firstMeterData.cum_eb_kwh?.value) || 0) + (Number(firstMeterData.cum_dg_kwh?.value) || 0) :
// //       245.8;

// //     const remainingBalance = Number(firstMeterData?.balance_amount?.value) || 128.50;
// //     const voltage = firstMeterData?.voltage_r?.value || 220;
// //     const current = firstMeterData?.current_r?.value || 10.2;
// //     const powerFactor = firstMeterData?.power_factor?.value || 0.92;
// //     const frequency = firstMeterData?.frequency?.value || 50;

// //     // More sophisticated bill estimation
// //     const dailyAverage = currentConsumption / 30; // Assuming 30 days of data
// //     const daysRemaining = Math.floor(remainingBalance / (dailyAverage * 0.15));
// //     const nextBillAmount = remainingBalance + (currentConsumption * 0.15);

// //     return {
// //       currentConsumption,
// //       remainingBalance,
// //       voltage,
// //       current,
// //       powerFactor,
// //       frequency,
// //       daysRemaining,
// //       nextBillAmount,
// //       dailyAverage
// //     };
// //   }, [firstMeterData]);

// //   // Handle refresh functionality
// //   const handleRefresh = async () => {
// //     const now = new Date();
// //     const fourMinutesInMs = 4 * 60 * 1000;

// //     // Check cooldown
// //     if (lastRefreshTime && now - lastRefreshTime < fourMinutesInMs) {
// //       const secondsLeft = Math.ceil(
// //         (fourMinutesInMs - (now - lastRefreshTime)) / 1000
// //       );
// //       toast.error(
// //         `Please wait ${Math.floor(secondsLeft / 60)}m ${
// //           secondsLeft % 60
// //         }s before refreshing again`,
// //         { autoClose: 4000 }
// //       );
// //       return;
// //     }

// //     setIsRefreshingData(true);

// //     try {
// //       // Calculate range based on current filter
// //       const start = new Date(startDate);
// //       const end = new Date(endDate);
// //       const rangeInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

// //       // Execute refresh with current filter
// //       await dispatch(fetchUserInit({userId: userID, range: rangeInDays}));

// //       setLastRefreshTime(new Date());
// //     } catch (error) {
// //       console.error("Refresh error:", error);
// //       toast.error("Failed to update data");
// //     } finally {
// //       setIsRefreshingData(false);
// //     }
// //   };

// //   // Handle loading state
// //   if (loading) {
// //     return (
// //       <div className="bg-blue-200/10 min-h-screen">
// //         <Header />
// //         <div className="p-6 max-w-7xl mx-auto">
// //           <div className="flex items-center justify-center h-64">
// //             <div className="flex flex-col items-center space-y-4">
// //               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //               <div className="text-lg text-gray-600">Loading dashboard data...</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Handle error state
// //   if (error) {
// //     return (
// //       <div className="bg-blue-200/10 min-h-screen">
// //         <Header />
// //         <div className="p-6 max-w-7xl mx-auto">
// //           <div className="bg-red-50 border border-red-200 rounded-lg p-6">
// //             <div className="flex items-center space-x-3">
// //               <AlertTriangle className="h-6 w-6 text-red-600" />
// //               <div className="text-red-800">
// //                 <strong>Error:</strong> {error}
// //               </div>
// //             </div>
// //             <button
// //               onClick={handleRefresh}
// //               className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
// //             >
// //               Try Again
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const isRelayOff = firstMeterData?.relay_status?.status === 'OFF';

// //   return (
// //     <div className="bg-blue-200/10 min-h-screen">
// //       <Header />
// //       <div className="p-6 max-w-7xl mx-auto">
// //         {/* Header Section */}
// //         <div className="mb-8">
// //           <div className="flex justify-between items-start">
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
// //               <p className="text-gray-600">
// //                 Monitor your energy consumption and manage your account
// //                 {activeMeters.length > 0 && (
// //                   <span className="ml-2 body-sm   bg-green-100 text-green-800 px-2 py-1 rounded">
// //                     {activeMeters.length} active meter{activeMeters.length > 1 ? 's' : ''}
// //                   </span>
// //                 )}
// //               </p>
// //             </div>
// //             <button
// //               onClick={handleRefresh}
// //               disabled={refreshing}
// //               className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
// //             >
// //               <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
// //               <span>Refresh</span>
// //             </button>
// //           </div>

// //           {/* Alert for relay off status */}
// //           {isRelayOff && (
// //             <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
// //               <div className="flex items-center space-x-3">
// //                 <AlertTriangle className="h-5 w-5 text-red-600" />
// //                 <div>
// //                   <span className="font-semibold text-red-800">Meter is OFF</span>
// //                   <span className="text-red-700 ml-2">Please contact administrator for assistance</span>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //           <StatsCard
// //             title="Current Consumption"
// //             value={`${calculatedMetrics.currentConsumption.toFixed(1)} kWh`}
// //             icon={<Zap className="h-6 w-6" />}
// //             subText={`${calculatedMetrics.dailyAverage.toFixed(1)} kWh/day average`}
// //             trend="up"
// //             bgColor="bg-blue-50"
// //             iconColor="text-blue-600"
// //           />
// //           <StatsCard
// //             title="Remaining Balance"
// //             value={`₹${calculatedMetrics.remainingBalance.toFixed(2)}`}
// //             icon={<CreditCard className="h-6 w-6" />}
// //             subText={`Estimated ${calculatedMetrics.daysRemaining} days left`}
// //             trend="neutral"
// //             bgColor="bg-green-50"
// //             iconColor="text-green-600"
// //           />
// //           <StatsCard
// //             title="Power Quality"
// //             icon={<Bolt className="h-6 w-6" />}
// //             bgColor="bg-purple-50"
// //             iconColor="text-purple-600"
// //             content={
// //               <div className="space-y-2">
// //                 <PowerQualityItem label="Voltage" value={`${calculatedMetrics.voltage}V`} isGood={calculatedMetrics.voltage >= 200 && calculatedMetrics.voltage <= 240} />
// //                 <PowerQualityItem label="Current" value={`${calculatedMetrics.current}A`} isGood={true} />
// //                 <PowerQualityItem label="Frequency" value={`${calculatedMetrics.frequency} Hz`} isGood={calculatedMetrics.frequency >= 49 && calculatedMetrics.frequency <= 51} />
// //                 <PowerQualityItem label="Power Factor" value={calculatedMetrics.powerFactor.toFixed(2)} isGood={calculatedMetrics.powerFactor >= 0.9} />
// //               </div>
// //             }
// //           />
// //           <StatsCard
// //             title="Next Bill Estimate"
// //             value={`₹${calculatedMetrics.nextBillAmount.toFixed(2)}`}
// //             icon={<Lock className="h-6 w-6" />}
// //             subText="Due on Mar 25, 2025"
// //             trend="neutral"
// //             bgColor="bg-orange-50"
// //             iconColor="text-orange-600"
// //           />
// //         </div>

// //         {/* Real-time Meter Data */}
// //         {firstMeterData && (
// //           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
// //             <h3 className="heading-xl   font-semibold text-gray-900 mb-6 flex items-center">
// //               Real-time Meter Data
// //               <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
// //             </h3>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //               <MeterDataCard
// //                 title="Total EB Units"
// //                 value={firstMeterData?.cum_eb_kwh?.value || 0}
// //                 unit="kWh"
// //                 bgColor="bg-blue-50"
// //               />
// //               <MeterDataCard
// //                 title="Total DG Units"
// //                 value={firstMeterData?.cum_dg_kwh?.value || 0}
// //                 unit="kWh"
// //                 bgColor="bg-purple-50"
// //               />
// //               <EGStatusDisplay status={firstMeterData?.eb_dg_status?.value} />
// //               <MeterDataCard
// //                 title="Meter Status"
// //                 value={firstMeterData?.relay_status?.status || 'UNKNOWN'}
// //                 statusColor={
// //                   firstMeterData?.relay_status?.status === 'ON'
// //                     ? 'text-green-600'
// //                     : firstMeterData?.relay_status?.status === 'OFF'
// //                       ? 'text-red-600'
// //                       : 'text-gray-500'
// //                 }
// //                 bgColor={firstMeterData?.relay_status?.status === 'OFF' ? 'bg-red-50' : 'bg-gray-50'}
// //                 borderColor={firstMeterData?.relay_status?.status === 'OFF' ? 'border-red-300' : 'border-gray-200'}
// //                 subText={firstMeterData?.relay_status?.status === 'OFF' ? 'Contact Administrator' : null}
// //               />
// //             </div>
// //           </div>
// //         )}

// //         {/* Quick Actions */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
// //           <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
// //           <div className="flex flex-wrap gap-4">
// //             <ActionButton
// //               icon={<CreditCard className="h-5 w-5" />}
// //               label="Recharge Account"
// //               variant="primary"
// //               onClick={() => navigate('/rechage-meter')}
// //             />
// //             <ActionButton
// //               icon={<History className="h-5 w-5" />}
// //               label="Usage History"
// //               rightIcon={<ArrowRight className="h-4 w-4" />}
// //               onClick={() => navigate(`/user/usage-history/${userID}`)}
// //               variant="secondary"
// //             />
// //             <ActionButton
// //               icon={<Settings className="h-5 w-5" />}
// //               label="Account Settings"
// //               variant="secondary"
// //               onClick={() => navigate(`/${role}/profile`)}
// //             />
// //             <ActionButton
// //               icon={<TrendingUp className="h-5 w-5" />}
// //               label="View Reports"
// //               variant="secondary"
// //               onClick={() => navigate('/reports')}
// //             />
// //           </div>
// //         </div>

// //         {/* Chart Section */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// //           <div className="p-6">
// //             <div className="flex justify-between items-start mb-6">
// //               <div>
// //                 <h2 className="heading-xl   font-semibold text-gray-900 mb-2">Usage Trends</h2>
// //                 <p className="text-gray-600">Track your energy consumption patterns over time</p>
// //               </div>
// //               <div className="flex items-center space-x-4">
// //                 <div>
// //                   <label className="block body-sm   font-medium text-gray-700 mb-1">
// //                     <Calendar className="h-4 w-4 inline mr-1" />
// //                     From Date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     value={startDate}
// //                     max={today}
// //                     onChange={(e) => setStartDate(e.target.value)}
// //                     className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block body-sm   font-medium text-gray-700 mb-1">
// //                     To Date
// //                   </label>
// //                   <input
// //                     type="date"
// //                     value={endDate}
// //                     max={today}
// //                     onChange={(e) => setEndDate(e.target.value)}
// //                     className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block body-sm   font-medium text-gray-700 mb-1">
// //                     Reset Filters
// //                   </label>
// //                   <button
// //                     onClick={() => {
// //                       dispatch(resetFilterSettings());
// //                       // Reset to default 7-day range
// //                       const date = new Date();
// //                       date.setDate(date.getDate() - 7);
// //                       setStartDate(date.toISOString().split('T')[0]);
// //                       setEndDate(new Date().toISOString().split('T')[0]);
// //                     }}
// //                     className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-md body-sm   transition-colors"
// //                   >
// //                     Reset
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* <div className="mt-6">
// //               {charts && (charts.labelsData?.length > 0 || charts.chart?.length > 0) ? (
// //                 <CurrentPowerChart {...chartData} />
// //               ) : (
// //                 <div className="flex items-center justify-center h-64 text-gray-500">
// //                   <div className="text-center">
// //                     <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
// //                     <p className="text-lg font-medium">No chart data available</p>
// //                     <p className="body-sm  ">Please check your meter configuration or try refreshing the page.</p>
// //                     <button
// //                       onClick={handleRefresh}
// //                       className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //                     >
// //                       Refresh Data
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div> */}
// //             <div className="mt-6">
// //   {charts && (charts.labelsData?.length > 0 || charts.chart?.length > 0) ? (
// //     <CurrentPowerChart {...chartData} />
// //   ) : (
// //     <div className="flex items-center justify-center h-64 text-gray-500">
// //       <div className="text-center">
// //         <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
// //         <p className="text-lg font-medium">No chart data available</p>
// //         <p className="body-sm  ">Please check your meter configuration or try refreshing the page.</p>
// //         <button
// //           onClick={handleRefresh}
// //           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //         >
// //           Refresh Data
// //         </button>
// //       </div>
// //     </div>
// //   )}
// // </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }






// // Enhanced components
// function UserDashboard() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const userID = useSelector(selectUserId);
//   const role = useParams().role ?? "user";

//   // Existing selectors
//   const charts = useSelector(selectChartsByDashboard);

//   // New selectors from userDashboard slice
//   const dashboardData = useSelector(selectDashboardData);
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);
//   const totalEnergyConsumption = useSelector(selectTotalEnergyConsumption);
//   const totalBalance = useSelector(selectTotalBalance);
//   const activeMeters = useSelector(selectActiveMeters);

//   // Local state
//   const [activeTab, setActiveTab] = useState("Daily");
//   const [startDate, setStartDate] = useState(() => {
//     // Set default start date to 7 days ago
//     const date = new Date();
//     date.setDate(date.getDate() - 7);
//     return date.toISOString().split('T')[0];
//   });
//   const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [lastRefreshTime, setLastRefreshTime] = useState(null);
//   const [isRefreshingData, setIsRefreshingData] = useState(false);

//   const today = new Date().toISOString().split("T")[0];

//   useEffect(() => {
//     // Fetch initial data with default date range (last 7 days)
//     const defaultStartDate = new Date();
//     defaultStartDate.setDate(defaultStartDate.getDate() - 7);
//     const defaultEndDate = new Date();

//     const formattedStartDate = defaultStartDate.toISOString().split('T')[0];
//     const formattedEndDate = defaultEndDate.toISOString().split('T')[0];

//     dispatch(fetchUserInit({
//       userId: userID, 
//       startDate: formattedStartDate, 
//       endDate: formattedEndDate
//     }));

//     dispatch(setHeaderTitle("User Dashboard"));
//     dispatch(setBreadcrumbs([{ label: "User Dashboard" }]));
//   }, [dispatch, userID]);

//   // Update filter settings when dates change and fetch filtered data
//   useEffect(() => {
//     if (startDate && endDate) {
//       // Update filter settings
//       dispatch(updateFilterSettings({
//         dateRange: {
//           startDate: startDate,
//           endDate: endDate
//         }
//       }));

//       // Fetch filtered data
//       dispatch(fetchFilteredData({
//         userId: userID, 
//         startDate: startDate, 
//         endDate: endDate
//       }));
//     }
//   }, [startDate, endDate, dispatch, userID]);

//   // Memoized calculations to prevent unnecessary re-renders
//   const firstMeterData = useMemo(() => {
//     return dashboardData?.summary?.recentData || null;
//   }, [dashboardData]);

//   const chartData = useMemo(() => {
//     const rawData = charts?.chart || [];
//     const labels = charts?.labelsData || [];

//     // Create datasets array with the expected format
//     const datasets = [
//       {
//         label: "Energy Consumption",
//         data: rawData.map(item => parseFloat(item.totalKWh || 0)),
//         borderColor: "rgba(75, 192, 192, 0.6)",
//         backgroundColor: "rgba(75, 192, 192, 1)",
//       }
//     ];

//     return {
//       className: "power consumption chart",
//       title: "Energy Consumption",
//       labels,
//       datasets,
//       rawData, // Pass the raw data for tooltips
//     };
//   }, [charts]);

//   const calculatedMetrics = useMemo(() => {
//     const currentConsumption = firstMeterData ?
//       (Number(firstMeterData.cum_eb_kwh?.value) || 0) + (Number(firstMeterData.cum_dg_kwh?.value) || 0) :
//       245.8;

//     const remainingBalance = Number(firstMeterData?.balance_amount?.value) || 128.50;
//     const voltage = firstMeterData?.voltage_r?.value || 220;
//     const current = firstMeterData?.current_r?.value || 10.2;
//     const powerFactor = firstMeterData?.power_factor?.value || 0.92;
//     const frequency = firstMeterData?.frequency?.value || 50;

//     // More sophisticated bill estimation
//     const dailyAverage = currentConsumption / 30; // Assuming 30 days of data
//     const daysRemaining = Math.floor(remainingBalance / (dailyAverage * 0.15));
//     const nextBillAmount = remainingBalance + (currentConsumption * 0.15);

//     return {
//       currentConsumption,
//       remainingBalance,
//       voltage,
//       current,
//       powerFactor,
//       frequency,
//       daysRemaining,
//       nextBillAmount,
//       dailyAverage
//     };
//   }, [firstMeterData]);

//   // Handle refresh functionality
//   const handleRefresh = async () => {
//     const now = new Date();
//     const fourMinutesInMs = 4 * 60 * 1000;

//     // Check cooldown
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
//       // Execute refresh with current date filter
//       await dispatch(fetchUserInit({
//         userId: userID, 
//         startDate: startDate, 
//         endDate: endDate
//       }));

//       setLastRefreshTime(new Date());
//     } catch (error) {
//       console.error("Refresh error:", error);
//       toast.error("Failed to update data");
//     } finally {
//       setIsRefreshingData(false);
//     }
//   };

//   // Handle loading state
//   if (loading) {
//     return (
//       <div className="bg-blue-200/10 min-h-screen">
//         <Header />
//         <div className="p-6 max-w-7xl mx-auto">
//           <div className="flex items-center justify-center h-64">
//             <div className="flex flex-col items-center space-y-4">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <div className="text-lg text-gray-600">Loading dashboard data...</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Handle error state
//   if (error) {
//     return (
//       <div className="bg-blue-200/10 min-h-screen">
//         <Header />
//         <div className="p-6 max-w-7xl mx-auto">
//           <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//             <div className="flex items-center space-x-3">
//               <AlertTriangle className="h-6 w-6 text-red-600" />
//               <div className="text-red-800">
//                 <strong>Error:</strong> {error}
//               </div>
//             </div>
//             <button
//               onClick={handleRefresh}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const isRelayOff = firstMeterData?.relay_status?.status === 'OFF';

//   return (
//     <div className="bg-blue-200/10 min-h-screen">
//       <Header />
//       <div className="p-6 max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
//               <p className="text-gray-600">
//                 Monitor your energy consumption and manage your account
//                 {activeMeters.length > 0 && (
//                   <span className="ml-2 body-sm   bg-green-100 text-green-800 px-2 py-1 rounded">
//                     {activeMeters.length} active meter{activeMeters.length > 1 ? 's' : ''}
//                   </span>
//                 )}
//               </p>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//             >
//               <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
//               <span>Refresh</span>
//             </button>
//           </div>

//           {/* Alert for relay off status */}
//           {isRelayOff && (
//             <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex items-center space-x-3">
//                 <AlertTriangle className="h-5 w-5 text-red-600" />
//                 <div>
//                   <span className="font-semibold text-red-800">Meter is OFF</span>
//                   <span className="text-red-700 ml-2">Please contact administrator for assistance</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatsCard
//             title="Current Consumption"
//             value={`${calculatedMetrics.currentConsumption.toFixed(1)} kWh`}
//             icon={<Zap className="h-6 w-6" />}
//             subText={`${calculatedMetrics.dailyAverage.toFixed(1)} kWh/day average`}
//             trend="up"
//             bgColor="bg-blue-50"
//             iconColor="text-blue-600"
//           />
//           <StatsCard
//             title="Remaining Balance"
//             value={`₹${calculatedMetrics.remainingBalance.toFixed(2)}`}
//             icon={<CreditCard className="h-6 w-6" />}
//             subText={`Estimated ${calculatedMetrics.daysRemaining} days left`}
//             trend="neutral"
//             bgColor="bg-green-50"
//             iconColor="text-green-600"
//           />
//           <StatsCard
//             title="Power Quality"
//             icon={<Bolt className="h-6 w-6" />}
//             bgColor="bg-purple-50"
//             iconColor="text-purple-600"
//             content={
//               <div className="space-y-2">
//                 <PowerQualityItem label="Voltage" value={`${calculatedMetrics.voltage}V`} isGood={calculatedMetrics.voltage >= 200 && calculatedMetrics.voltage <= 240} />
//                 <PowerQualityItem label="Current" value={`${calculatedMetrics.current}A`} isGood={true} />
//                 <PowerQualityItem label="Frequency" value={`${calculatedMetrics.frequency} Hz`} isGood={calculatedMetrics.frequency >= 49 && calculatedMetrics.frequency <= 51} />
//                 <PowerQualityItem label="Power Factor" value={calculatedMetrics.powerFactor.toFixed(2)} isGood={calculatedMetrics.powerFactor >= 0.9} />
//               </div>
//             }
//           />
//           <StatsCard
//             title="Next Bill Estimate"
//             value={`₹${calculatedMetrics.nextBillAmount.toFixed(2)}`}
//             icon={<Lock className="h-6 w-6" />}
//             subText="Due on Mar 25, 2025"
//             trend="neutral"
//             bgColor="bg-orange-50"
//             iconColor="text-orange-600"
//           />
//         </div>

//         {/* Real-time Meter Data */}
//         {firstMeterData && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
//             <h3 className="heading-xl   font-semibold text-gray-900 mb-6 flex items-center">
//               Real-time Meter Data
//               <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <MeterDataCard
//                 title="Total EB Units"
//                 value={firstMeterData?.cum_eb_kwh?.value || 0}
//                 unit="kWh"
//                 bgColor="bg-blue-50"
//               />
//               <MeterDataCard
//                 title="Total DG Units"
//                 value={firstMeterData?.cum_dg_kwh?.value || 0}
//                 unit="kWh"
//                 bgColor="bg-purple-50"
//               />
//               <EGStatusDisplay status={firstMeterData?.eb_dg_status?.value} />
//               <MeterDataCard
//                 title="Meter Status"
//                 value={firstMeterData?.relay_status?.status || 'UNKNOWN'}
//                 statusColor={
//                   firstMeterData?.relay_status?.status === 'ON'
//                     ? 'text-green-600'
//                     : firstMeterData?.relay_status?.status === 'OFF'
//                       ? 'text-red-600'
//                       : 'text-gray-500'
//                 }
//                 bgColor={firstMeterData?.relay_status?.status === 'OFF' ? 'bg-red-50' : 'bg-gray-50'}
//                 borderColor={firstMeterData?.relay_status?.status === 'OFF' ? 'border-red-300' : 'border-gray-200'}
//                 subText={firstMeterData?.relay_status?.status === 'OFF' ? 'Contact Administrator' : null}
//               />
//             </div>
//           </div>
//         )}

//         {/* Quick Actions */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//           <div className="flex flex-wrap gap-4">
//             <ActionButton
//               icon={<CreditCard className="h-5 w-5" />}
//               label="Recharge Account"
//               variant="primary"
//               onClick={() => navigate('/rechage-meter')}
//             />
//             <ActionButton
//               icon={<History className="h-5 w-5" />}
//               label="Usage History"
//               rightIcon={<ArrowRight className="h-4 w-4" />}
//               onClick={() => navigate(`/user/usage-history/${userID}`)}
//               variant="secondary"
//             />
//             <ActionButton
//               icon={<Settings className="h-5 w-5" />}
//               label="Account Settings"
//               variant="secondary"
//               onClick={() => navigate(`/${role}/profile`)}
//             />
//             <ActionButton
//               icon={<TrendingUp className="h-5 w-5" />}
//               label="View Reports"
//               variant="secondary"
//               onClick={() => navigate('/reports')}
//             />
//           </div>
//         </div>

//         {/* Chart Section */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h2 className="heading-xl   font-semibold text-gray-900 mb-2">Usage Trends</h2>
//                 <p className="text-gray-600">Track your energy consumption patterns over time</p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div>
//                   <label className="block body-sm   font-medium text-gray-700 mb-1">
//                     <Calendar className="h-4 w-4 inline mr-1" />
//                     From Date
//                   </label>
//                   <input
//                     type="date"
//                     value={startDate}
//                     max={today}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
//                   />
//                 </div>
//                 <div>
//                   <label className="block body-sm   font-medium text-gray-700 mb-1">
//                     To Date
//                   </label>
//                   <input
//                     type="date"
//                     value={endDate}
//                     max={today}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
//                   />
//                 </div>
//                 <div>
//                   <label className="block body-sm   font-medium text-gray-700 mb-1">
//                     Reset Filters
//                   </label>
//                   <button
//                     onClick={() => {
//                       dispatch(resetFilterSettings());
//                       // Reset to default 7-day range
//                       const date = new Date();
//                       date.setDate(date.getDate() - 7);
//                       setStartDate(date.toISOString().split('T')[0]);
//                       setEndDate(new Date().toISOString().split('T')[0]);
//                     }}
//                     className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-md body-sm   transition-colors"
//                   >
//                     Reset
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6">
//               {charts && (charts.labelsData?.length > 0 || charts.chart?.length > 0) ? (
//                 <CurrentPowerChart {...chartData} />
//               ) : (
//                 <div className="flex items-center justify-center h-64 text-gray-500">
//                   <div className="text-center">
//                     <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No chart data available</p>
//                     <p className="body-sm  ">Please check your meter configuration or try refreshing the page.</p>
//                     <button
//                       onClick={handleRefresh}
//                       className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       Refresh Data
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const StatsCard = ({ title, value, icon, subText, content, trend, bgColor, iconColor }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//     <div className="flex items-center justify-between mb-4">
//       <div className={`p-3 rounded-lg ${bgColor}`}>
//         <span className={iconColor}>{icon}</span>
//       </div>
//       {trend === "up" && (
//         <div className="flex items-center text-green-600 body-sm  ">
//           <TrendingUp className="h-4 w-4 mr-1" />
//           <span>+2.3%</span>
//         </div>
//       )}
//     </div>

//     <div className="mb-2">
//       <h3 className="body-sm   font-medium text-gray-600 mb-1">{title}</h3>
//       {content ? (
//         <div>{content}</div>
//       ) : (
//         <div className="text-2xl font-bold text-gray-900">{value}</div>
//       )}
//     </div>

//     {subText && (
//       <p className={`body-sm   ${trend === "up" ? "text-green-600" :
//           trend === "down" ? "text-red-600" :
//             "text-gray-500"
//         }`}>
//         {subText}
//       </p>
//     )}
//   </div>
// );

// const PowerQualityItem = ({ label, value, isGood }) => (
//   <div className="flex justify-between items-center">
//     <span className="body-sm   text-gray-600">{label}</span>
//     <div className="flex items-center space-x-1">
//       <span className="font-semibold text-gray-900">{value}</span>
//       {isGood ? (
//         <CheckCircle className="h-3 w-3 text-green-600" />
//       ) : (
//         <AlertTriangle className="h-3 w-3 text-yellow-600" />
//       )}
//     </div>
//   </div>
// );

// const MeterDataCard = ({ title, value, unit, statusColor, bgColor = "bg-gray-50", borderColor = "border-gray-200", subText }) => (
//   <div className={`${bgColor} rounded-lg p-5 shadow-sm border ${borderColor}`}>
//     <div className="body-sm   text-gray-500 mb-1">{title}</div>
//     <div className={`body-sm   font-semibold ${statusColor || 'text-gray-800'}`}>
//       {value}
//       {unit && <span className="body-sm   text-gray-600 ml-1">{unit}</span>}
//     </div>
//     {subText && <span className="text-gray-800 body-sm  ">{subText}</span>}
//   </div>
// );

// const ActionButton = ({ icon, label, rightIcon, variant = "secondary", onClick }) => {
//   const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors";
//   const variantClasses = {
//     primary: "bg-blue-600 hover:bg-blue-700 text-white",
//     secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={`${baseClasses} ${variantClasses[variant]}`}
//     >
//       {icon}
//       <span>{label}</span>
//       {rightIcon}
//     </button>
//   );
// };

// export default UserDashboard;














import { selectChartsByDashboard } from "../redux/slice/currentPowerChartSlice";
import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
// Import from the new userDashboard slice
import {
  selectDashboardData,
  selectLoading,
  selectError,
  selectTotalEnergyConsumption,
  selectTotalBalance,
  selectActiveMeters,
  setLoading,
  setError,
  updateFilterSettings,
  resetFilterSettings,
  fetchUserInit,
  fetchFilteredData, // New action for filtered data

} from "../redux/slice/userDashboardSlice";

import Header from "../components/header/Header";
import CurrentPowerChart from "../components/meterManagement/CurrentPowerChart";
import {
  Zap,
  History,
  Settings,
  Bolt,
  Lock,
  TrendingUp,
  Calendar,
  ArrowRight,
  CreditCard,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { EGStatusDisplay } from "../components/userManagement/ED-DGstausDisplay";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserId } from "../redux/slice/authSlice";

import React, { useEffect, useState, useMemo } from "react";

function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userID = useSelector(selectUserId);
  const role = useParams().role ?? "user";

  // Existing selectors
  const charts = useSelector(selectChartsByDashboard);

  // New selectors from userDashboard slice
  const dashboardData = useSelector(selectDashboardData);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalEnergyConsumption = useSelector(selectTotalEnergyConsumption);
  const totalBalance = useSelector(selectTotalBalance);
  const activeMeters = useSelector(selectActiveMeters);

  // Local state
  const [activeTab, setActiveTab] = useState("Daily");
  const [startDate, setStartDate] = useState(() => {
    // Set default start date to 7 days ago
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const [isRefreshingData, setIsRefreshingData] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Fetch initial data with default date range (last 7 days)
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 7);
    const defaultEndDate = new Date();

    const formattedStartDate = defaultStartDate.toISOString().split('T')[0];
    const formattedEndDate = defaultEndDate.toISOString().split('T')[0];

    dispatch(fetchUserInit({
      userId: userID,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    }));

    dispatch(setHeaderTitle("User Dashboard"));
    dispatch(setBreadcrumbs([{ label: "User Dashboard" }]));
  }, [dispatch, userID]);

  // Update filter settings when dates change and fetch filtered data
  useEffect(() => {
    if (startDate && endDate) {
      // Update filter settings
      dispatch(updateFilterSettings({
        dateRange: {
          startDate: startDate,
          endDate: endDate
        }
      }));

      // Fetch filtered data
      dispatch(fetchFilteredData({
        userId: userID,
        startDate: startDate,
        endDate: endDate
      }));
    }
  }, [startDate, endDate, dispatch, userID]);

  // Memoized calculations to prevent unnecessary re-renders
  const firstMeterData = useMemo(() => {
    return dashboardData?.summary?.recentData || null;
  }, [dashboardData]);

  // const chartData = useMemo(() => {
  //   const rawData = charts?.chart || [];
  //   const labels = charts?.labelsData || [];

  //   // Create datasets array with the expected format
  //   const datasets = [
  //     {
  //       label: "Energy Consumption",
  //       data: rawData.map(item => parseFloat(item.totalKWh || 0)),
  //       borderColor: "rgba(75, 192, 192, 0.6)",
  //       backgroundColor: "rgba(75, 192, 192, 1)",
  //     }
  //   ];

  //   return {
  //     className: "power consumption chart",
  //     title: "Energy Consumption",
  //     labels,
  //     datasets,
  //     rawData, // Pass the raw data for tooltips
  //   };
  // }, [charts]);


  // Extract EB & DG per unit cost from recentData
  const ebCost = firstMeterData?.eb_tariff_setting?.value || 0;
  const dgCost = firstMeterData?.dg_tariff_setting?.value || 0;

  const chartData = useMemo(() => {
    const rawData = charts?.chart || [];
    const labels = charts?.labelsData || [];

    // Create datasets array with the expected format
    const datasets = [
      {
        label: "Daily Total Consumption (kWh) EB + DG",
        data: rawData.map((item) => parseFloat(item.totalKWh || 0)),
        borderColor: "rgba(75, 192, 192, 0.6)",
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: `Cost/Unit: ${ebCost} | Daily EB Consumption (kWh)`,
        data: rawData.map((item) => parseFloat(item.totalEG || 0)),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: `Cost/Unit: ${dgCost} | Daily DG Consumption (kWh)`,
        data: rawData.map((item) => parseFloat(item.totalDg || 0)),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
      },
    ];

    return {
      className: "power consumption chart",
      title: "Daily Energy Consumption",
      labels,
      datasets,
      rawData, // Pass the raw data for tooltips
    };
  }, [charts]);
  
  const calculatedMetrics = useMemo(() => {
    const currentConsumption = firstMeterData ?
      (Number(firstMeterData.cum_eb_kwh?.value) || 0) + (Number(firstMeterData.cum_dg_kwh?.value) || 0) :
      245.8;

    const remainingBalance = Number(firstMeterData?.balance_amount?.value) || 128.50;
    const voltage = firstMeterData?.voltage_r?.value || 220;
    const current = firstMeterData?.current_r?.value || 10.2;
    const powerFactor = firstMeterData?.power_factor?.value || 0.92;
    const frequency = firstMeterData?.frequency?.value || 50;

    // More sophisticated bill estimation
    const dailyAverage = currentConsumption / 30; // Assuming 30 days of data
    const daysRemaining = Math.floor(remainingBalance / (dailyAverage * 0.15));
    const nextBillAmount = remainingBalance + (currentConsumption * 0.15);

    return {
      currentConsumption,
      remainingBalance,
      voltage,
      current,
      powerFactor,
      frequency,
      daysRemaining,
      nextBillAmount,
      dailyAverage
    };
  }, [firstMeterData]);

  // Handle refresh functionality
  const handleRefresh = async () => {
    const now = new Date();
    const fourMinutesInMs = 4 * 60 * 1000;

    // Check cooldown
    if (lastRefreshTime && now - lastRefreshTime < fourMinutesInMs) {
      const secondsLeft = Math.ceil(
        (fourMinutesInMs - (now - lastRefreshTime)) / 1000
      );
      toast.error(
        `Please wait ${Math.floor(secondsLeft / 60)}m ${secondsLeft % 60
        }s before refreshing again`,
        { autoClose: 4000 }
      );
      return;
    }

    setIsRefreshingData(true);

    try {
      // Execute refresh with current date filter
      await dispatch(fetchUserInit({
        userId: userID,
        startDate: startDate,
        endDate: endDate
      }));

      setLastRefreshTime(new Date());
    } catch (error) {
      console.error("Refresh error:", error);
      toast.error("Failed to update data");
    } finally {
      setIsRefreshingData(false);
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="bg-blue-200/10 min-h-screen">
        <Header />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div className="text-lg text-gray-600">Loading dashboard data...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="bg-blue-200/10 min-h-screen">
        <Header />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div className="text-red-800">
                <strong>Error:</strong> {error}
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isRelayOff = firstMeterData?.relay_status?.status === 'OFF';

  return (
    <div className="bg-blue-200/10 min-h-screen">
      <Header />
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>

              {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1> */}
              <h1 className="body-md   sm:text-lg md:heading-xl   font-semibold text-gray-900">Welcome Back!</h1>
              <p className="text-gray-600 body-sm   sm:text-base">
                Monitor your energy consumption and manage your account
                {activeMeters.length > 0 && (
                  <span className="ml-2 body-xs  sm:body-sm   bg-green-100 text-green-800 px-2 py-1 rounded">
                    {activeMeters.length} active meter{activeMeters.length > 1 ? 's' : ''}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 w-full sm:w-auto justify-center"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="body-sm   sm:text-base">Refresh</span>
            </button>
          </div>

          {/* Alert for relay off status */}
          {isRelayOff && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="body-sm   sm:text-base">
                  <span className="font-semibold text-red-800">Meter is OFF</span>
                  <span className="text-red-700 ml-2">Please contact administrator for assistance</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatsCard
            title="Current Consumption"
            value={`${calculatedMetrics.currentConsumption.toFixed(1)} kWh`}
            icon={<Zap className="h-5 w-5 sm:h-6 sm:w-6" />}
            subText={`${calculatedMetrics.dailyAverage.toFixed(1)} kWh/day average`}
            trend="up"
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatsCard
            title="Remaining Balance"
            value={`₹${calculatedMetrics.remainingBalance.toFixed(2)}`}
            icon={<CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />}
            subText={`Estimated ${calculatedMetrics.daysRemaining} days left`}
            trend="neutral"
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />
          <StatsCard
            title="Power Quality"
            icon={<Bolt className="h-5 w-5 sm:h-6 sm:w-6" />}
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
            content={
              <div className="space-y-1 sm:space-y-2">
                <PowerQualityItem label="Voltage" value={`${calculatedMetrics.voltage}V`} isGood={calculatedMetrics.voltage >= 200 && calculatedMetrics.voltage <= 240} />
                <PowerQualityItem label="Current" value={`${calculatedMetrics.current}A`} isGood={true} />
                <PowerQualityItem label="Frequency" value={`${calculatedMetrics.frequency} Hz`} isGood={calculatedMetrics.frequency >= 49 && calculatedMetrics.frequency <= 51} />
                <PowerQualityItem label="Power Factor" value={calculatedMetrics.powerFactor.toFixed(2)} isGood={calculatedMetrics.powerFactor >= 0.9} />
              </div>
            }
          />
          <StatsCard
            title="Next Bill Estimate"
            value={`₹${calculatedMetrics.nextBillAmount.toFixed(2)}`}
            icon={<Lock className="h-5 w-5 sm:h-6 sm:w-6" />}
            subText="Due on Mar 25, 2025"
            trend="neutral"
            bgColor="bg-orange-50"
            iconColor="text-orange-600"
          />
        </div>

        {/* Real-time Meter Data */}
        {firstMeterData && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg sm:heading-xl   font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
              Real-time Meter Data
              <span className="ml-2 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            </h3>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <MeterDataCard
                title="Total EB Units"
                value={firstMeterData?.cum_eb_kwh?.value || 0}
                unit="kWh"
                bgColor="bg-blue-50"
              />
              <MeterDataCard
                title="Total DG Units"
                value={firstMeterData?.cum_dg_kwh?.value || 0}
                unit="kWh"
                bgColor="bg-purple-50"
              />
              <EGStatusDisplay status={firstMeterData?.eb_dg_status?.value} />
              <MeterDataCard
                title="Meter Status"
                value={firstMeterData?.relay_status?.status || 'UNKNOWN'}
                statusColor={
                  firstMeterData?.relay_status?.status === 'ON'
                    ? 'text-green-600'
                    : firstMeterData?.relay_status?.status === 'OFF'
                      ? 'text-red-600'
                      : 'text-gray-500'
                }
                bgColor={firstMeterData?.relay_status?.status === 'OFF' ? 'bg-red-50' : 'bg-gray-50'}
                borderColor={firstMeterData?.relay_status?.status === 'OFF' ? 'border-red-300' : 'border-gray-200'}
                subText={firstMeterData?.relay_status?.status === 'OFF' ? 'Contact Administrator' : null}
              />
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <ActionButton
              icon={<CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />}
              label="Recharge Account"
              variant="primary"
              onClick={() => navigate('/rechage-meter')}
            />
            <ActionButton
              icon={<History className="h-4 w-4 sm:h-5 sm:w-5" />}
              label="Usage History"
              rightIcon={<ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />}
              onClick={() => navigate(`/user/usage-history/${userID}`)}
              variant="secondary"
            />
            <ActionButton
              icon={<Settings className="h-4 w-4 sm:h-5 sm:w-5" />}
              label="Account Settings"
              variant="secondary"
              onClick={() => navigate(`/${role}/profile`)}
            />
            <ActionButton
              icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />}
              label="View Reports"
              variant="secondary"
              onClick={() => navigate('/reports')}
            />

            {/* <ActionButton
              icon={<CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />}
              label="Payment History"
              variant="primary"
              onClick={() => navigate('/invoice-payment')}
            /> */}
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h2 className="text-lg sm:heading-xl   font-semibold text-gray-900 mb-2">Usage Trends</h2>
                <p className="text-gray-600 body-sm   sm:text-base">Track your energy consumption patterns over time</p>
              </div>
              <div className="flex xs:flex-row items-stretch xs:items-center gap-3 w-full lg:w-auto">
                <div className="flex-1">
                  <label className="block body-xs  sm:body-sm   font-medium text-gray-700 mb-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
                    From Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    max={today}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-xs  sm:body-sm  "
                  />
                </div>
                <div className="flex-1">
                  <label className="block body-xs  sm:body-sm   font-medium text-gray-700 mb-1">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    max={today}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-xs  sm:body-sm  "
                  />
                </div>
                <div className="flex-1 xs:flex-none">
                  <label className="block body-xs  sm:body-sm   font-medium text-gray-700 mb-1">
                    Reset Filters
                  </label>
                  <button
                    onClick={() => {
                      dispatch(resetFilterSettings());
                      // Reset to default 7-day range
                      const date = new Date();
                      date.setDate(date.getDate() - 7);
                      setStartDate(date.toISOString().split('T')[0]);
                      setEndDate(new Date().toISOString().split('T')[0]);
                    }}
                    className="w-full xs:w-auto px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-md body-xs  sm:body-sm   transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              {charts && (charts.labelsData?.length > 0 || charts.chart?.length > 0) ? (
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[300px]">
                    <CurrentPowerChart {...chartData} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 sm:h-64 text-gray-500">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4 text-gray-300" />
                    <p className="body-sm   sm:text-lg font-medium">No chart data available</p>
                    <p className="body-xs  sm:body-sm  ">Please check your meter configuration or try refreshing the page.</p>
                    <button
                      onClick={handleRefresh}
                      className="mt-2 sm:mt-4 px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors body-xs  sm:body-sm  "
                    >
                      Refresh Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatsCard = ({ title, value, icon, subText, content, trend, bgColor, iconColor }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <div className={`p-2 sm:p-3 rounded-lg ${bgColor}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      {/* {trend === "up" && (
        <div className="flex items-center text-green-600 body-xs  sm:body-sm  ">
          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span>+2.3%</span>
        </div>
      )} */}
    </div>

    <div className="mb-1 sm:mb-2">
      <h3 className="body-xs  sm:body-sm   font-medium text-gray-600 mb-1">{title}</h3>
      {content ? (
        <div className="body-sm  ">{content}</div>
      ) : (
        <div className="text-lg sm:heading-xl   md:text-2xl font-bold text-gray-900">{value}</div>
      )}
    </div>

    {subText && (
      <p className={`body-xs  sm:body-sm   ${trend === "up" ? "text-green-600" :
        trend === "down" ? "text-red-600" :
          "text-gray-500"
        }`}>
        {subText}
      </p>
    )}
  </div>
);

const PowerQualityItem = ({ label, value, isGood }) => (
  <div className="flex justify-between items-center">
    <span className="body-xs  sm:body-sm   text-gray-600">{label}</span>
    <div className="flex items-center space-x-1">
      <span className="font-semibold text-gray-900 body-xs  sm:body-sm  ">{value}</span>
      {isGood ? (
        <CheckCircle className="h-3 w-3 text-green-600" />
      ) : (
        <AlertTriangle className="h-3 w-3 text-yellow-600" />
      )}
    </div>
  </div>
);

const MeterDataCard = ({ title, value, unit, statusColor, bgColor = "bg-gray-50", borderColor = "border-gray-200", subText }) => (
  <div className={`${bgColor} rounded-lg p-3 sm:p-5 shadow-sm border ${borderColor}`}>
    <div className="body-xs  sm:body-sm   text-gray-500 mb-1">{title}</div>
    <div className={`body-xs  sm:body-sm   font-semibold ${statusColor || 'text-gray-800'}`}>
      {value}
      {unit && <span className="body-xs  sm:body-sm   text-gray-600 ml-1">{unit}</span>}
    </div>
    {subText && <span className="text-gray-800 body-xs  sm:body-sm  ">{subText}</span>}
  </div>
);

const ActionButton = ({ icon, label, rightIcon, variant = "secondary", onClick }) => {
  const baseClasses = "flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors body-xs  sm:body-sm  ";
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 text-white border border-gray-300 "
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} flex-1 sm:flex-none justify-center`}
    >
      {icon}
      <span>{label}</span>
      {rightIcon}
    </button>
  );
};

export default UserDashboard;