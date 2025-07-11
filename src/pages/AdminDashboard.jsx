{/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-5 gap-4 p-4 h-full bg-gray-100 overflow-y-scroll auto-rows-min">
      
        <MetricsCard
          title="Total Users & Active Meters"
          value="44,071.00"
          change="30.8%"
          isPositive={true}
          className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1"
          isGraph={true}
          typeGraph="Line"
        />
        <MetricsCard
          title="Faulty Meters Detected"
          value="8.00"
          change="2.3%"
          isPositive={true}
          className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1"
        />
        <MetricsCard
          title="Total Next Payment"
          value="$2,829.00"
          change="-1.43%"
          isPositive={false}
          className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1"
        />
        <MetricsCard
          title="Total Energy Consumption"
          value="12,300 kWh"
          change="18.9%"
          isPositive={true}
          className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 row-span-1"
        />

     
         <CurrentPowerCard className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-3 row-span-1" /> 

       
        <div className="bg-white rounded-sm shadow p-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold mb-4">Usage Trends</h2>

            <div>
              <label className="block text-xs text-gray-500">From Date</label>
              <input
                type="date"
                value={startDate}
                max={today}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 px-2 py-1 border text-sm rounded-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            {charts.map((chart) => {
              const filteredChart = filterChart(chart);
              return <CurrentPowerChart key={chart.id} {...filteredChart} />;
            })}
          </div>
        </div>
        <CalendarCard className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-2 row-span-1" />

     
        <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1">
          📢 Alerts Summary
        </div>
        <HighlightCard className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1" />
        <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1">
          ⚡ Energy Usage
        </div>
        <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 row-span-1">
          <FaTachometerAlt className="text-green-500 text-3xl mr-3" />
          <h1 className="">Active Meter</h1>
          <h1 className="">25/30</h1>
          <h1 className="">Final Target Finished</h1>
        </div>

       
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3 row-span-1 bg-white shadow-md rounded-2xl p-4">
          <h3 className="text-lg font-semibold mb-2">Detailed Statistics</h3>
          <p className="text-gray-600 text-sm">
            Graphical analysis of meter activity and payments.
          </p>
        </div> 
      </div> */}

// import React from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import MetricsCard from "../components/MetricsCard";
// import CurrentPowerCard from "../components/CurrrentPower";
// import HighlightCard from "../components/Highlight";
// import CalendarCard from "../components/Calender";
// import { FaTachometerAlt } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";

// import { selectChartsByDashboard } from "../redux/slice/currentPowerChartSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import Header from "../components/header/Header";
// import CurrentPowerChart from "../components/meterManagement/CurrentPowerChart";
// import { useEffect, useState } from "react";

// const Dashboard = () => {
//   const charts = useSelector(selectChartsByDashboard("admin"));
//   const [startDate, setStartDate] = useState("2025-04-01");
//   const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setHeaderTitle("AdminDashboard"));
//     dispatch(
//       setBreadcrumbs([
//         // Updated label for clarity
//         { label: "AdminDashboard" },
//       ])
//     );
//   }, []);

//   const filterChart = (chart) => {
//     const from = new Date(startDate);
//     const to = new Date();

//     const filteredLabels = [];
//     const filteredDataPoints = [];

//     chart.labels.forEach((label, i) => {
//       const fakeDate = new Date(
//         `2025-${(i + 1).toString().padStart(2, "0")}-01`
//       );
//       if (fakeDate >= from && fakeDate <= to) {
//         filteredLabels.push(label);
//         filteredDataPoints.push(chart.dataPoints[i]);
//       }
//     });

//     return {
//       ...chart,
//       labels: filteredLabels,
//       dataPoints: filteredDataPoints,
//     };
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Header Section */}
//       <Header />
//       <div className="h-[10%] px-6 py-3 bg-green-50">
//         <div className="flex justify-between items-center">
//           {/* Revenue Section */}
//           <div className="flex flex-col gap-1">
//             <span className="font-md font-semibold text-gray-600">
//               Your Total Revenue
//             </span>
//             <span className="text-xl font-bold"> $ 95,000 </span>
//           </div>
//           {/* Download Section */}
//           <div className="text-sm text-gray-700">📥 Data to Download</div>
//         </div>
//       </div>

//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4 h-full bg-gray-100 overflow-y-scroll auto-rows-min">
  

//   <MetricsCard
//     title="Total Users & Active Meters"
//     value="44,071.00"
//     change="30.8%"
//     isPositive={true}
//     className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2"
//     isGraph={true}
//     typeGraph="Line"
//   />
//   <MetricsCard
//     title="Faulty Meters Detected"
//     value="8.00"
//     change="2.3%"
//     isPositive={true}
//     className="col-span-1 sm:col-span-1 lg:col-span-1"
//   />
//   <MetricsCard
//     title="Total Next Payment"
//     value="$2,829.00"
//     change="-1.43%"
//     isPositive={false}
//     className="col-span-1 sm:col-span-1 lg:col-span-1"
//   />
//   <MetricsCard
//     title="Total New Orders"
//     value="5,230"
//     change="-1.43%"
//     isPositive={false}
//     className="col-span-1 sm:col-span-2 lg:col-span-1"
//   />


//   <CurrentPowerCard className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3 row-span-1" />
//   <HighlightCard className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1 bg-black text-white" />

 
//   <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3">
//     🏆 Recent Comparative Progress
//   </div>
//   <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 lg:col-span-1 xl:col-span-1">
//     ⚡ Active Meter
//   </div>
//   <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 lg:col-span-1 xl:col-span-1">
//     📞 Contact Support
//   </div>
//   <div className="bg-red-500 text-white shadow-md rounded-2xl p-4 col-span-1 lg:col-span-1 xl:col-span-1">
//     📅 Calendar Schedule
//   </div>
// </div> */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-5 gap-4 p-4 h-full bg-gray-100 overflow-y-scroll auto-rows-min">
//         {/* First Row: 4 elements */}
//         <MetricsCard
//           title="Total Users & Active Meters"
//           value="44,071.00"
//           change="30.8%"
//           isPositive={true}
//           className="col-span-1 sm:col-span-2 xl:col-span-2 row-span-1"
//           isGraph={true}
//           typeGraph="Line"
//         />
//         <MetricsCard
//           title="Faulty Meters Detected"
//           value="8.00"
//           change="2.3%"
//           isPositive={true}
//           className="col-span-1 xl:col-span-1 row-span-1"
//         />
//         <MetricsCard
//           title="Total Next Payment"
//           value="$2,829.00"
//           change="-1.43%"
//           isPositive={false}
//           className="col-span-1 xl:col-span-1 row-span-1"
//         />
//         <MetricsCard
//           title="Total Energy Consumption"
//           value="12,300 kWh"
//           change="18.9%"
//           isPositive={true}
//           className="col-span-1 sm:col-span-2 xl:col-span-1 row-span-1"
//         />

//         {/* Second Row: Chart Section full width */}
//         <div className="bg-white rounded-sm shadow p-4 col-span-1 sm:col-span-2 xl:col-span-5 row-span-1">
//           <div className="flex justify-between flex-wrap gap-4">
//             <h2 className="text-lg font-bold">Usage Trends</h2>
//             <div>
//               <label className="block text-xs text-gray-500">From Date</label>
//               <input
//                 type="date"
//                 value={startDate}
//                 max={today}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="mt-1 px-2 py-1 border text-sm rounded-sm"
//               />
//             </div>
//           </div>
//           <div className="mt-4">
//             {charts.map((chart) => {
//               const filteredChart = filterChart(chart);
//               return <CurrentPowerChart key={chart.id} {...filteredChart} />;
//             })}
//           </div>
//         </div>

//         {/* Third Row: 4 elements */}
//         <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 xl:col-span-1 row-span-1">
//           📢 Alerts Summary
//         </div>
//         <HighlightCard className="col-span-1 sm:col-span-2 xl:col-span-2 row-span-1" />
//         <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 xl:col-span-1 row-span-1">
//           ⚡ Energy Usage
//         </div>
//         <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 xl:col-span-1 row-span-1 flex flex-col justify-center items-start">
//           <FaTachometerAlt className="text-green-500 text-3xl mb-2" />
//           <h1 className="text-lg font-semibold">Active Meter</h1>
//           <h2 className="text-md font-medium">25/30</h2>
//           <p className="text-sm text-gray-600">Final Target Finished</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import MetricsCard from "../components/MetricsCard";
// import CurrentPowerCard from "../components/CurrrentPower";
// import HighlightCard from "../components/Highlight";
// import CalendarCard from "../components/Calender";
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
//   Filter
// } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { selectChartsByDashboard } from "../redux/slice/currentPowerChartSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import Header from "../components/header/Header";
// import CurrentPowerChart from "../components/meterManagement/CurrentPowerChart";

// const Dashboard = () => {
//   const charts = useSelector(selectChartsByDashboard("admin"));
//   const [startDate, setStartDate] = useState("2025-04-01");
//   const today = new Date().toISOString().split("T")[0];
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setHeaderTitle("AdminDashboard"));
//     dispatch(
//       setBreadcrumbs([
//         { label: "AdminDashboard" },
//       ])
//     );
//   }, []);

//   const filterChart = (chart) => {
//     const from = new Date(startDate);
//     const to = new Date();

//     const filteredLabels = [];
//     const filteredDataPoints = [];

//     chart.labels.forEach((label, i) => {
//       const fakeDate = new Date(
//         `2025-${(i + 1).toString().padStart(2, "0")}-01`
//       );
//       if (fakeDate >= from && fakeDate <= to) {
//         filteredLabels.push(label);
//         filteredDataPoints.push(chart.dataPoints[i]);
//       }
//     });

//     return {
//       ...chart,
//       labels: filteredLabels,
//       dataPoints: filteredDataPoints,
//     };
//   };

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       {/* Enhanced Header Section */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <Header />
        
//         {/* Additional Header Actions */}
//         <div className="px-6 py-4 border-t border-gray-100">
//           <div className="flex justify-between items-center max-w-7xl mx-auto">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <input
//                   type="text"
//                   placeholder="Search dashboard..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//               </div>
//               <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-colors">
//                 <Filter className="h-4 w-4 mr-2" />
//                 Filter
//               </button>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors">
//                 <UserPlus className="h-4 w-4 mr-2" />
//                 Add User
//               </button>
//               <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors">
//                 <Settings className="h-4 w-4 mr-2" />
//                 Settings
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Enhanced Revenue Banner */}
//       <div className="mx-6 mt-6 mb-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl shadow-sm border border-emerald-100">
//         <div className="flex justify-between items-center p-6">
//           <div className="flex items-center space-x-4">
//             <div className="p-3 bg-emerald-100 rounded-xl">
//               <DollarSign className="text-emerald-600" size={24} />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm font-medium text-emerald-700">
//                 Your Total Revenue
//               </span>
//               <span className="text-2xl font-bold text-emerald-900">$95,000</span>
//               <span className="text-xs text-emerald-600 flex items-center gap-1">
//                 <TrendingUp size={12} />
//                 +12.5% from last month
//               </span>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             {/* Quick Stats */}
//             <div className="hidden md:flex items-center space-x-6 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-emerald-200">
//               <div className="text-center">
//                 <div className="text-sm font-bold text-emerald-900">1,247</div>
//                 <div className="text-xs text-emerald-600">Active Users</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-sm font-bold text-emerald-900">25/30</div>
//                 <div className="text-xs text-emerald-600">Active Meters</div>
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-emerald-200 cursor-pointer hover:bg-white/80 transition-colors">
//               <Download className="text-emerald-600" size={16} />
//               <span className="text-sm font-medium text-emerald-700">Export Data</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Dashboard Grid */}
//       <div className="px-6 pb-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          
//           {/* Enhanced Metrics Cards Row */}
//           <div className="col-span-1 sm:col-span-2 xl:col-span-2">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <MetricsCard
//                 title="Total Users & Active Meters"
//                 value="44,071.00"
//                 change="30.8%"
//                 isPositive={true}
//                 className="h-full"
//                 isGraph={true}
//                 typeGraph="Line"
//               />
//             </div>
//           </div>
          
//           <div className="col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <MetricsCard
//                 title="Faulty Meters Detected"
//                 value="8.00"
//                 change="2.3%"
//                 isPositive={true}
//                 className="h-full"
//               />
//             </div>
//           </div>
          
//           <div className="col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <MetricsCard
//                 title="Total Next Payment"
//                 value="$2,829.00"
//                 change="-1.43%"
//                 isPositive={false}
//                 className="h-full"
//               />
//             </div>
//           </div>
          
//           <div className="col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <MetricsCard
//                 title="Total Energy Consumption"
//                 value="12,300 kWh"
//                 change="18.9%"
//                 isPositive={true}
//                 className="h-full"
//               />
//             </div>
//           </div>

//           {/* Enhanced Chart Section */}
//           <div className="col-span-1 sm:col-span-2 lg:col-span-4 xl:col-span-5">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//               <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="p-2 bg-blue-100 rounded-sm">
//                     <BarChart3 className="text-blue-600" size={20} />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold text-gray-800">Usage Trends</h2>
//                     <p className="text-sm text-gray-500">Real-time energy consumption analysis</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//                     <span className="text-sm text-gray-600">Current Period</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                     <span className="text-sm text-gray-600">Previous Period</span>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 mb-1">From Date</label>
//                     <input
//                       type="date"
//                       value={startDate}
//                       max={today}
//                       onChange={(e) => setStartDate(e.target.value)}
//                       className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="h-80">
//                 {charts.map((chart) => {
//                   const filteredChart = filterChart(chart);
//                   return <CurrentPowerChart key={chart.id} {...filteredChart} />;
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Dashboard Cards */}
//           <div className="col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="p-3 bg-orange-100 rounded-full">
//                   <AlertTriangle className="text-orange-600" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">Alerts Summary</h3>
//                   <p className="text-2xl font-bold text-orange-600 mt-2">12</p>
//                   <p className="text-sm text-gray-500">Active Alerts</p>
//                   <div className="mt-2 px-2 py-1 bg-orange-50 rounded-full text-xs text-orange-700">
//                     3 Critical
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="col-span-1 sm:col-span-2 xl:col-span-2">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <HighlightCard className="h-full" />
//             </div>
//           </div>
          
//           <div className="col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="p-3 bg-yellow-100 rounded-full">
//                   <Zap className="text-yellow-600" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">Energy Usage</h3>
//                   <p className="text-2xl font-bold text-yellow-600 mt-2">85%</p>
//                   <p className="text-sm text-gray-500">Current Load</p>
//                   <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                     <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="col-span-1">
//             <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex flex-col space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="p-3 bg-green-100 rounded-full">
//                     <Gauge className="text-green-600" size={24} />
//                   </div>
//                   <div className="text-right">
//                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
//                       Active
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">Active Meters</h3>
//                   <div className="mt-2">
//                     <div className="flex items-baseline space-x-2">
//                       <span className="text-2xl font-bold text-green-600">25</span>
//                       <span className="text-lg text-gray-500">/30</span>
//                     </div>
//                     <p className="text-sm text-gray-600 mt-1">83% Target Achieved</p>
//                   </div>
//                   <div className="mt-3">
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '83%' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Additional Enhanced Cards */}
//           <div className="col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="p-3 bg-purple-100 rounded-full">
//                   <Users className="text-purple-600" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">Active Users</h3>
//                   <p className="text-2xl font-bold text-purple-600 mt-2">1,247</p>
//                   <p className="text-sm text-gray-500">Online Now</p>
//                   <div className="flex items-center justify-center space-x-1 mt-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-xs text-green-600">Live</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="p-3 bg-cyan-100 rounded-full">
//                   <Activity className="text-cyan-600" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
//                   <p className="text-2xl font-bold text-cyan-600 mt-2">98.5%</p>
//                   <p className="text-sm text-gray-500">Uptime</p>
//                   <div className="mt-2 px-2 py-1 bg-cyan-50 rounded-full text-xs text-cyan-700">
//                     Excellent
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="p-3 bg-red-100 rounded-full">
//                   <Calendar className="text-red-600" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">Scheduled Tasks</h3>
//                   <p className="text-2xl font-bold text-red-600 mt-2">8</p>
//                   <p className="text-sm text-gray-500">Due Today</p>
//                   <div className="mt-2 px-2 py-1 bg-red-50 rounded-full text-xs text-red-700">
//                     2 Overdue
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="p-3 bg-indigo-100 rounded-full relative">
//                   <Bell className="text-indigo-600" size={24} />
//                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
//                     <span className="text-xs text-white font-bold">!</span>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
//                   <p className="text-2xl font-bold text-indigo-600 mt-2">23</p>
//                   <p className="text-sm text-gray-500">Unread</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-1">
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="p-3 bg-blue-100 rounded-full">
//                   <TrendingUp className="text-blue-600" size={24} />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">Growth Rate</h3>
//                   <p className="text-2xl font-bold text-blue-600 mt-2">+15.2%</p>
//                   <p className="text-sm text-gray-500">This Month</p>
//                   <div className="mt-2 px-2 py-1 bg-blue-50 rounded-full text-xs text-blue-700">
//                     Above Target
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* New Quick Actions Card */}
//           <div className="col-span-1 sm:col-span-2 lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
//                 <div className="p-2 bg-gray-100 rounded-sm">
//                   <Settings className="text-gray-600" size={16} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <button className="p-3 bg-blue-50 rounded-sm hover:bg-blue-100 transition-colors text-left">
//                   <div className="text-blue-600 font-medium text-sm">Add New Meter</div>
//                   <div className="text-gray-500 text-xs mt-1">Register device</div>
//                 </button>
//                 <button className="p-3 bg-green-50 rounded-sm hover:bg-green-100 transition-colors text-left">
//                   <div className="text-green-600 font-medium text-sm">Generate Report</div>
//                   <div className="text-gray-500 text-xs mt-1">Export data</div>
//                 </button>
//                 <button className="p-3 bg-orange-50 rounded-sm hover:bg-orange-100 transition-colors text-left">
//                   <div className="text-orange-600 font-medium text-sm">View Alerts</div>
//                   <div className="text-gray-500 text-xs mt-1">Check issues</div>
//                 </button>
//                 <button className="p-3 bg-purple-50 rounded-sm hover:bg-purple-100 transition-colors text-left">
//                   <div className="text-purple-600 font-medium text-sm">User Management</div>
//                   <div className="text-gray-500 text-xs mt-1">Manage accounts</div>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* New Recent Activity Card */}
//           <div className="col-span-1 sm:col-span-2 lg:col-span-3">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
//                 <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
//               </div>
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-sm">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <div className="flex-1">
//                     <div className="text-sm font-medium text-gray-900">New meter registered</div>
//                     <div className="text-xs text-gray-500">2 minutes ago</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-sm">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                   <div className="flex-1">
//                     <div className="text-sm font-medium text-gray-900">User login detected</div>
//                     <div className="text-xs text-gray-500">5 minutes ago</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-sm">
//                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                   <div className="flex-1">
//                     <div className="text-sm font-medium text-gray-900">Alert threshold reached</div>
//                     <div className="text-xs text-gray-500">10 minutes ago</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
  AlertCircle
} from "lucide-react";

// Mock data for demo purposes
const mockCharts = [
  {
    id: 1,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    dataPoints: [65, 59, 80, 81, 56, 55]
  }
];

const Dashboard = () => {
  // State management
  const [startDate, setStartDate] = useState("2025-04-01");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(23);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'Meter #245 offline', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'High usage detected', time: '5 min ago' },
    { id: 3, type: 'info', message: 'System update available', time: '1 hour ago' }
  ]);

  const today = new Date().toISOString().split("T")[0];

  // Smart filtering and memoization
  const filteredCharts = useMemo(() => {
    return mockCharts.map(chart => {
      const from = new Date(startDate);
      const to = new Date();
      
      const filteredLabels = [];
      const filteredDataPoints = [];
      
      chart.labels.forEach((label, i) => {
        const fakeDate = new Date(`2025-${(i + 1).toString().padStart(2, "0")}-01`);
        if (fakeDate >= from && fakeDate <= to) {
          filteredLabels.push(label);
          filteredDataPoints.push(chart.dataPoints[i]);
        }
      });
      
      return {
        ...chart,
        labels: filteredLabels,
        dataPoints: filteredDataPoints,
      };
    });
  }, [startDate]);

  // Smart refresh functionality
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  // Smart notification management
  const handleNotificationRead = useCallback(() => {
    setNotifications(prev => Math.max(0, prev - 1));
  }, []);

  // Smart alert dismissal
  const dismissAlert = useCallback((alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  }, []);

  // Enhanced MetricsCard component
  const MetricsCard = ({ title, value, change, isPositive, icon: Icon, trend, className = "" }) => (
    <div className={`bg-white rounded-md shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={`${isPositive ? 'text-green-600' : 'text-red-600'}`} size={24} />
        </div>
        <div className="flex items-center space-x-1">
          {isPositive ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-red-600" />}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className="mt-2 h-12 bg-gray-50 rounded-sm flex items-end justify-between px-2 py-1">
            {trend.map((point, index) => (
              <div 
                key={index}
                className={`w-2 rounded-t ${isPositive ? 'bg-green-400' : 'bg-red-400'}`}
                style={{ height: `${point}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Enhanced Chart component
  const EnhancedChart = ({ data }) => (
    <div className="w-full h-80 bg-gray-50 rounded-sm flex items-center justify-center">
      <div className="text-center">
        <BarChart3 className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-gray-600">Interactive Chart Placeholder</p>
        <p className="text-sm text-gray-500 mt-2">Data points: {data.dataPoints?.length || 0}</p>
      </div>
    </div>
  );

  // Smart Alert Panel
  const AlertPanel = () => (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-sm">
            <AlertTriangle className="text-orange-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Smart Alerts</h3>
            <p className="text-sm text-gray-500">{alerts.length} active alerts</p>
          </div>
        </div>
        <button 
          onClick={() => setAlerts([])}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                alert.type === 'critical' ? 'bg-red-500' :
                alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
              }`} />
              <div>
                <div className="text-sm font-medium text-gray-900">{alert.message}</div>
                <div className="text-xs text-gray-500">{alert.time}</div>
              </div>
            </div>
            <button 
              onClick={() => dismissAlert(alert.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-blue-200/10 min-h-screen">
      {/* Smart Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-xs text-gray-500"><span className='font-bold'>Hello {"user"}</span> Welcome to Real-time energy management system</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Smart Revenue Banner */}
      <div className="mx-6 mt-6 mb-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-emerald-100 rounded-2xl">
              <DollarSign className="text-emerald-600" size={32} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-emerald-800 mb-1">Total Revenue</h2>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-emerald-900">$95,000</span>
                <span className="text-sm text-emerald-600 flex items-center">
                  <TrendingUp size={14} className="mr-1" />
                  +12.5% from last month
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-900">1,247</div>
              <div className="text-sm text-emerald-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-900">25/30</div>
              <div className="text-sm text-emerald-600">Active Meters</div>
            </div>
            <button className="flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200 hover:bg-white transition-colors">
              <Download className="text-emerald-600 mr-2" size={18} />
              <span className="text-emerald-700 font-medium">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Smart Dashboard Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Enhanced Metrics Cards */}
          <MetricsCard
            title="Total Users"
            value="44,071"
            change="30.8%"
            isPositive={true}
            icon={Users}
            trend={[20, 40, 60, 80, 100, 85, 90]}
          />
          
          <MetricsCard
            title="Faulty Meters"
            value="8"
            change="2.3%"
            isPositive={false}
            icon={AlertTriangle}
            trend={[10, 15, 8, 12, 20, 18, 8]}
          />
          
          <MetricsCard
            title="Next Payment"
            value="$2,829"
            change="-1.43%"
            isPositive={false}
            icon={DollarSign}
            trend={[80, 70, 85, 75, 90, 85, 75]}
          />
          
          <MetricsCard
            title="Energy Consumption"
            value="12,300 kWh"
            change="18.9%"
            isPositive={true}
            icon={Zap}
            trend={[30, 50, 70, 90, 85, 95, 100]}
          />

          {/* Enhanced Chart Section */}
          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-sm">
                    <BarChart3 className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Smart Usage Analytics</h2>
                    <p className="text-sm text-gray-500">AI-powered consumption insights</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Current</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Previous</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">From:</label>
                    <input
                      type="date"
                      value={startDate}
                      max={today}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <EnhancedChart data={filteredCharts[0] || { dataPoints: [] }} />
            </div>
          </div>

          {/* Smart Alert Panel */}
          <div className="lg:col-span-2">
            <AlertPanel />
          </div>
          
          {/* Enhanced Status Cards */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm border border-green-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Gauge className="text-green-600" size={24} />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 font-medium">ONLINE</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Meters</h3>
              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-2xl font-bold text-green-600">25</span>
                <span className="text-lg text-gray-500">/30</span>
                <span className="text-sm text-green-600">(83%)</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3 mb-2">
                <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: '83%' }}></div>
              </div>
              <p className="text-sm text-gray-600">5 meters scheduled for maintenance</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Activity className="text-blue-600" size={24} />
              </div>
              <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                EXCELLENT
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">System Health</h3>
              <div className="text-2xl font-bold text-blue-600 mb-3">98.5%</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-medium">99.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium">45ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;