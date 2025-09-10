


import React, { useState, useEffect } from 'react';
import { Calendar, Activity, Filter, Download } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchUsageHistory30Days, selectRecentData, selectUserMeterData30Days } from '../redux/slice/userDashboardSlice';
import { useSelector } from 'react-redux';
import {  selectUserId } from '../redux/slice/authSlice';
import { selectUserProfile } from '../redux/slice/userSlice';

const UsageHistoryDashboard = () => {
  
  const dispatch = useDispatch();
  // const [selectedUser] = useState('user_12345');
  const [dateRange] = useState(30);
  const [filterType, setFilterType] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const selectedUser = useSelector(selectUserId);
  const dailyMeterData = useSelector(selectUserMeterData30Days);
    const userData = useSelector(selectUserProfile);
    
  const { firstName, lastName } = userData || {};
  console.log("===dashboardData=selectRecentData====",useSelector(selectRecentData))
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log('Fetching 30-day usage history for user:');
    dispatch(fetchUsageHistory30Days());
  }, [dispatch, selectedUser, dateRange]);

  console.log('Daily Meter Data:', dailyMeterData);
  
  const filteredData = dailyMeterData.filter(item => {
    if (filterType === 'ALL') return true;
    if (filterType === 'HIGH_KWH') return parseFloat(item.totalKWh) > 100;
    if (filterType === 'LOW_KWH') return parseFloat(item.totalKWh) < 50;
    if (filterType === 'HIGH_DEDUCTION') return parseFloat(item.totalDeduction) > 50;
    if (filterType === 'LOW_DEDUCTION') return parseFloat(item.totalDeduction) < 10;
    if (filterType === 'HIGH_EG') return parseFloat(item.totalEG) > 50;
    if (filterType === 'HIGH_DG') return parseFloat(item.totalDG) > 50;
    return true;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate summary statistics
  const summaryStats = {
    totalRecords: dailyMeterData.length,
    totalKWh: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalKWh || 0), 0),
    totalDeductions: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalDeduction || 0), 0),
    totalEG: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalEG || 0), 0),
    totalDG: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalDG || 0), 0),
    uniqueMeters: new Set(dailyMeterData.map(item => item.meterId)).size
  };

  const exportData = () => {
    const csvContent = [
      ['Date', 'Meter ID', 'Total kWh', 'Total Deduction', 'Total EG', 'Total DG', 'Created At'],
      ...filteredData.map(item => [
        new Date(item.date).toISOString().split('T')[0],
        item.meterId,
        item.totalKWh,
        item.totalDeduction,
        item.totalEG,
        item.totalDG,
        new Date(item.createdAt).toISOString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily_meter_summary_30_days.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Helper function to format numbers with colors
  const formatNumberWithColor = (value, type) => {
    const numValue = parseFloat(value);
    let colorClass = 'text-slate-900';
    
    if (type === 'kWh') {
      colorClass = numValue > 100 ? 'text-green-600 font-semibold' : 
                   numValue < 50 ? 'text-orange-600' : 'text-slate-900';
    } else if (type === 'deduction') {
      colorClass = numValue > 50 ? 'text-red-600 font-semibold' : 
                   numValue < 10 ? 'text-green-600' : 'text-slate-900';
    } else if (type === 'EG') {
      colorClass = 'text-purple-600 font-medium';
    } else if (type === 'DG') {
      colorClass = 'text-orange-600 font-medium';
    }
    
    return <span className={colorClass}>{numValue.toFixed(2)}</span>;
  };
console.log("===selectedUser==",selectedUser)
  return (
    <div className="min-h-screen bg-blue-200/10 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              {/* <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2 md:gap-3">
                <Activity className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                Daily Meter Summary - 30 Days
              </h1> */}
                              <h1 className="body-md   sm:text-lg md:heading-xl   font-semibold text-gray-900 flex items-center gap-2 md:gap-3">
                        {/* <h1 className="body-md   sm:text-lg md:heading-xl   font-semibold text-gray-900"> */}
                <Activity className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                Daily Meter Summary - 30 Days
              </h1>
              <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">
                User:  {firstName?.charAt(0).toUpperCase() + firstName?.slice(1).toLowerCase()}{" "}
{lastName?.charAt(0).toUpperCase() + lastName?.slice(1).toLowerCase()}{" "}
  | Historical Data
  {/* : Last {dateRange} days */}
              </p>
            </div>
            <button
              onClick={exportData}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto justify-center"
            >
              <Download size={18} className="md:size-5" />
              <span className="text-sm md:text-base">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-slate-200">
          {/* <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <Calendar className="text-slate-600 w-4 h-4 md:w-5 md:h-5" />
            <h2 className="text-lg md:text-xl font-semibold text-slate-800">30-Day Summary</h2>
          </div> */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm text-slate-600">Total Records</p>
              <p className="text-xl md:text-2xl font-bold text-blue-600">{summaryStats.totalRecords}</p>
            </div>
            <div className="bg-green-50 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm text-slate-600">Total kWh</p>
              <p className="text-xl md:text-2xl font-bold text-green-600">{summaryStats.totalKWh.toFixed(2)}</p>
            </div>
            <div className="bg-red-50 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm text-slate-600">Total Deductions</p>
              <p className="text-xl md:text-2xl font-bold text-red-600">₹{summaryStats.totalDeductions.toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm text-slate-600">Total EG</p>
              <p className="text-xl md:text-2xl font-bold text-purple-600">{summaryStats.totalEG.toFixed(2)}</p>
            </div>
            <div className="bg-orange-50 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm text-slate-600">Total DG</p>
              <p className="text-xl md:text-2xl font-bold text-orange-600">{summaryStats.totalDG.toFixed(2)}</p>
            </div>
            {/* <div className="bg-indigo-50 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm text-slate-600">Unique Meters</p>
              <p className="text-xl md:text-2xl font-bold text-indigo-600">{summaryStats.uniqueMeters}</p>
            </div> */}
          </div>
        </div>

        {/* Filters and Data Table */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="p-4 md:p-6 border-b border-slate-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-4">
                <Filter className="text-slate-600 w-4 h-4 md:w-5 md:h-5" />
                <h2 className="text-lg md:text-xl font-semibold text-slate-800">
                  {/* Daily  */}
                  Meter Data
                </h2>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-auto">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 md:px-4 md:py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-auto text-sm md:text-base"
                >
                  <option value="ALL">All Records</option>
                  <option value="HIGH_KWH">High kWh (&gt;100)</option>
                  <option value="LOW_KWH">Low kWh (&lt;50)</option>
                  <option value="HIGH_DEDUCTION">High Deduction (&gt;₹50)</option>
                  <option value="LOW_DEDUCTION">Low Deduction (&lt;₹10)</option>
                  <option value="HIGH_EG">High EG (&gt;50)</option>
                  <option value="HIGH_DG">High DG (&gt;50)</option>
                </select>
                <p className="text-sm text-slate-600 whitespace-nowrap">
                  Showing {filteredData.length} of {dailyMeterData.length} records
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          {!isMobile && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Meter ID</th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"> kWh</th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"> Deduction</th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"> EG</th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"> DG</th>
                    <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {paginatedData.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-slate-900">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-slate-900 font-mono">
                        {item.meterId}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-slate-900">
                        {formatNumberWithColor(item.totalKWh, 'kWh')} kWh
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-slate-900">
                        ₹{formatNumberWithColor(item.totalDeduction, 'deduction')}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-slate-900">
                        {formatNumberWithColor(item.totalEG, 'EG')}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-slate-900">
                        {formatNumberWithColor(item.totalDG, 'DG')}
                      </td>
                      <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Card View */}
          {isMobile && (
  <div className="p-4 space-y-4">
    {paginatedData.map((item, index) => (
      <div key={item._id || index} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-slate-500 font-medium">Date</p>
              <p className="text-sm font-medium text-slate-900">
                {new Date(item.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-2">Meter ID</p>
              <p className="text-xs text-slate-500 font-mono">{item.meterId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium">Created At</p>
              <p className="text-xs text-slate-500">
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-2 rounded">
            <p className="text-xs text-slate-600">Consumption</p>
            <p className="text-sm font-medium">
              {formatNumberWithColor(item.totalKWh, 'kWh')} kWh
            </p>
          </div>
          
          <div className="bg-red-50 p-2 rounded">
            <p className="text-xs text-slate-600">Deduction</p>
            <p className="text-sm font-medium">
              ₹{formatNumberWithColor(item.totalDeduction, 'deduction')}
            </p>
          </div>
          
          <div className="bg-purple-50 p-2 rounded">
            <p className="text-xs text-slate-600">EG</p>
            <p className="text-sm font-medium">
              {formatNumberWithColor(item.totalEG, 'EG')}
            </p>
          </div>
          
          <div className="bg-orange-50 p-2 rounded">
            <p className="text-xs text-slate-600">DG</p>
            <p className="text-sm font-medium">
              {formatNumberWithColor(item.totalDG, 'DG')}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
          {/* {isMobile && (
            <div className="p-4 space-y-4">
              {paginatedData.map((item, index) => (
                <div key={item._id || index} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-slate-500 font-mono">{item.meterId}</p>
                      </div>
                      <p className="text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="text-xs text-slate-600">Consumption</p>
                      <p className="text-sm font-medium">
                        {formatNumberWithColor(item.totalKWh, 'kWh')} kWh
                      </p>
                    </div>
                    
                    <div className="bg-red-50 p-2 rounded">
                      <p className="text-xs text-slate-600">Deduction</p>
                      <p className="text-sm font-medium">
                        ₹{formatNumberWithColor(item.totalDeduction, 'deduction')}
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-2 rounded">
                      <p className="text-xs text-slate-600">EG</p>
                      <p className="text-sm font-medium">
                        {formatNumberWithColor(item.totalEG, 'EG')}
                      </p>
                    </div>
                    
                    <div className="bg-orange-50 p-2 rounded">
                      <p className="text-xs text-slate-600">DG</p>
                      <p className="text-sm font-medium">
                        {formatNumberWithColor(item.totalDG, 'DG')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )} */}

          {/* Pagination */}
          <div className="px-4 py-3 md:px-6 md:py-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm text-slate-600 order-2 md:order-1">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
            </div>
            <div className="flex items-center gap-2 order-1 md:order-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageHistoryDashboard;

// import React, { useState, useEffect } from 'react';
// import { Calendar, Activity, Filter, Download } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// import { fetchUsageHistory30Days, selectUserMeterData30Days } from '../redux/slice/userDashboardSlice';
// import { useSelector } from 'react-redux';


// const UsageHistoryDashboard = () => {
//   const dispatch = useDispatch();
//   const [selectedUser] = useState('user_12345'); // Single user as specified
//   const [dateRange] = useState(30);
//   const [filterType, setFilterType] = useState('ALL');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(20);

//   const dailyMeterData = useSelector(selectUserMeterData30Days);

//   // Load 30-day history data
//   //fetchUsageHistory30Days
//   useEffect(() => {
//     console.log('Fetching 30-day usage history for user:');
//     dispatch(fetchUsageHistory30Days());
//   }, [dispatch, selectedUser, dateRange]);

//   console.log('Daily Meter Data:', dailyMeterData);
//   const filteredData = dailyMeterData.filter(item => {
//     if (filterType === 'ALL') return true;
//     if (filterType === 'HIGH_KWH') return parseFloat(item.totalKWh) > 100;
//     if (filterType === 'LOW_KWH') return parseFloat(item.totalKWh) < 50;
//     if (filterType === 'HIGH_DEDUCTION') return parseFloat(item.totalDeduction) > 50;
//     if (filterType === 'LOW_DEDUCTION') return parseFloat(item.totalDeduction) < 10;
//     if (filterType === 'HIGH_EG') return parseFloat(item.totalEG) > 50;
//     if (filterType === 'HIGH_DG') return parseFloat(item.totalDG) > 50;
//     return true;
//   });

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   // Calculate summary statistics
//   const summaryStats = {
//     totalRecords: dailyMeterData.length,
//     totalKWh: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalKWh || 0), 0),
//     totalDeductions: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalDeduction || 0), 0),
//     totalEG: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalEG || 0), 0),
//     totalDG: dailyMeterData.reduce((sum, item) => sum + parseFloat(item.totalDG || 0), 0),
//     uniqueMeters: new Set(dailyMeterData.map(item => item.meterId)).size
//   };

//   const exportData = () => {
//     const csvContent = [
//       ['Date', 'Meter ID', 'Total kWh', 'Total Deduction', 'Total EG', 'Total DG', 'Created At'],
//       ...filteredData.map(item => [
//         new Date(item.date).toISOString().split('T')[0],
//         item.meterId,
//         item.totalKWh,
//         item.totalDeduction,
//         item.totalEG,
//         item.totalDG,
//         new Date(item.createdAt).toISOString()
//       ])
//     ].map(row => row.join(',')).join('\n');

//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `daily_meter_summary_30_days.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-blue-200/10 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
//                 <Activity className="text-blue-600" />
//                 Daily Meter Summary - 30 Days
//               </h1>
//               <p className="text-slate-600 mt-2">User: {selectedUser} | Historical Data: Last {dateRange} days</p>
//             </div>
//             <button
//               onClick={exportData}
//               className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Download size={20} />
//               Export CSV
//             </button>
//           </div>
//         </div>

//         {/* Summary Stats */}
//         <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
//           <div className="flex items-center gap-4 mb-4">
//             <Calendar className="text-slate-600" />
//             <h2 className="text-xl font-semibold text-slate-800">30-Day Summary</h2>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <p className="text-sm text-slate-600">Total Records</p>
//               <p className="text-2xl font-bold text-blue-600">{summaryStats.totalRecords}</p>
//             </div>
//             <div className="bg-green-50 p-4 rounded-lg">
//               <p className="text-sm text-slate-600">Total kWh</p>
//               <p className="text-2xl font-bold text-green-600">{summaryStats.totalKWh.toFixed(2)}</p>
//             </div>
//             <div className="bg-red-50 p-4 rounded-lg">
//               <p className="text-sm text-slate-600">Total Deductions</p>
//               <p className="text-2xl font-bold text-red-600">₹{summaryStats.totalDeductions.toFixed(2)}</p>
//             </div>
//             <div className="bg-purple-50 p-4 rounded-lg">
//               <p className="text-sm text-slate-600">Total EG</p>
//               <p className="text-2xl font-bold text-purple-600">{summaryStats.totalEG.toFixed(2)}</p>
//             </div>
//             <div className="bg-orange-50 p-4 rounded-lg">
//               <p className="text-sm text-slate-600">Total DG</p>
//               <p className="text-2xl font-bold text-orange-600">{summaryStats.totalDG.toFixed(2)}</p>
//             </div>
//             <div className="bg-indigo-50 p-4 rounded-lg">
//               <p className="text-sm text-slate-600">Unique Meters</p>
//               <p className="text-2xl font-bold text-indigo-600">{summaryStats.uniqueMeters}</p>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Data Table */}
//         <div className="bg-white rounded-xl shadow-lg border border-slate-200">
//           <div className="p-6 border-b border-slate-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <Filter className="text-slate-600" />
//                 <h2 className="text-xl font-semibold text-slate-800">
//                   Daily Meter Data
//                 </h2>
//               </div>
//               <div className="flex items-center gap-4">
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="ALL">All Records</option>
//                   <option value="HIGH_KWH">High kWh (&gt;100)</option>
//                   <option value="LOW_KWH">Low kWh (&lt;50)</option>
//                   <option value="HIGH_DEDUCTION">High Deduction (&gt;₹50)</option>
//                   <option value="LOW_DEDUCTION">Low Deduction (&lt;₹10)</option>
//                   <option value="HIGH_EG">High EG (&gt;50)</option>
//                   <option value="HIGH_DG">High DG (&gt;50)</option>
//                 </select>
//                 <p className="text-sm text-slate-600">
//                   Showing {filteredData.length} of {dailyMeterData.length} records
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-slate-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Meter ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total kWh</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Deduction</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total EG</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total DG</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created At</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-200">
//                 {paginatedData.map((item, index) => (
//                   <tr key={item._id || index} className="hover:bg-slate-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                       {new Date(item.date).toLocaleDateString('en-US', {
//                         month: 'short',
//                         day: 'numeric',
//                         year: 'numeric'
//                       })}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-mono">
//                       {item.meterId}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                       <span className={`${parseFloat(item.totalKWh) > 100 ? 'text-green-600 font-semibold' :
//                         parseFloat(item.totalKWh) < 50 ? 'text-orange-600' : 'text-slate-900'}`}>
//                         {parseFloat(item.totalKWh).toFixed(2)} kWh
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                       <span className={`${parseFloat(item.totalDeduction) > 50 ? 'text-red-600 font-semibold' :
//                         parseFloat(item.totalDeduction) < 10 ? 'text-green-600' : 'text-slate-900'}`}>
//                         ₹{parseFloat(item.totalDeduction).toFixed(2)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                       <span className="text-purple-600 font-medium">
//                         {parseFloat(item.totalEG).toFixed(2)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
//                       <span className="text-orange-600 font-medium">
//                         {parseFloat(item.totalDG).toFixed(2)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
//                       {new Date(item.createdAt).toLocaleDateString('en-US', {
//                         month: 'short',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
//             <div className="text-sm text-slate-600">
//               Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Previous
//               </button>
//               <span className="px-3 py-1 text-sm text-slate-600">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsageHistoryDashboard;