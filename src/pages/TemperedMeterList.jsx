// import React, { useEffect, useState } from "react";
// import { AlertTriangle } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTemperedMeter } from "../redux/thunks/adminDashboardThunks";
// import { selectUserId } from "../redux/slice/authSlice";
// import {
//   selectTemperedMeters,
//   selectLoading,
// } from "../redux/slice/adminDashboardSlice";
// import { Search } from "lucide-react";
// const TemperedMeterList = () => {
//   const dispatch = useDispatch();
//   const adminId = useSelector(selectUserId);
//   const temperedMeters = useSelector(selectTemperedMeters);
//   const loading = useSelector(selectLoading);

//   const [search, setSearch] = useState("");
//   const [issueFilter, setIssueFilter] = useState("All");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 6; // show 6 per page
// console.log("------",temperedMeters)
//   useEffect(() => {
//     if (adminId) dispatch(getTemperedMeter(adminId));
//   }, [dispatch, adminId]);

//   const formatDate = (dateString) =>
//     new Date(dateString).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading tempered meters...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!temperedMeters || !temperedMeters.meters) return null;


//   // Filter + Search
//   let filteredMeters = temperedMeters.meters.filter((meterData) => {
//     const latestIssue = meterData.issues[0];
//     const matchesSearch =
//       meterData.meter.name.toLowerCase().includes(search.toLowerCase()) ||
//       meterData.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
//       meterData.user?.email?.toLowerCase().includes(search.toLowerCase());

//     const matchesIssue =
//       issueFilter === "All" || latestIssue?.type === issueFilter;

//     return matchesSearch && matchesIssue;
//   });

//   // Pagination
// //   const totalItems = filteredMeters.length;
//   const totalItems = filteredMeters.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIdx = (page - 1) * itemsPerPage;
//   const currentMeters = filteredMeters.slice(startIdx, startIdx + itemsPerPage);

//   return (
//     <div className="min-h-screen bg-orange-200/10 p-2 sm:p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header + Controls */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800">Tempered Meters</h1>
//             <p className="text-gray-500">
//               Latest tempered issues detected per meter
//             </p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
//                 <div className="relative w-full sm:w-64">
//   <input
//     type="text"
//     placeholder="Search by meter or user..."
//     value={search}
//     onChange={(e) => {
//       setSearch(e.target.value);
//       setPage(1);
//     }}
//     className="w-full px-3 py-2 pr-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400"
//   />
//   <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
// </div>
//             <select
//               value={issueFilter}
//               onChange={(e) => {
//                 setIssueFilter(e.target.value);
//                 setPage(1);
//               }}
//               className="w-full sm:w-48 px-3 py-2 border rounded-lg shadow-sm"
//             >
//               <option value="All">All Issues</option>
//               <option value="Neutral Voltage Issue">Neutral Voltage Issue</option>
//               <option value="Magnetic Interference">Magnetic Interference</option>
//               <option value="Current Imbalance">Current Imbalance</option>
//               <option value="Reverse Polarity">Reverse Polarity</option>
//             </select>
//           </div>

 

//         </div>

//         {/* Results */}
//         {currentMeters.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
//             <p className="text-lg font-medium">No tempered meters found</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {currentMeters.map((meterData, idx) => {
//               const latestIssue = meterData.issues[0];
//               return (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5"
//                 >
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 body-sm  ">
//                     <div>
//                       <p className="text-gray-500 font-medium">Meter Name</p>
//                       <p className="font-semibold text-blue-700">
//                         {meterData.meter.name}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 font-medium">Type</p>
//                       <p>{meterData.meter.type}</p>
//                     </div>
//                         <div>
//                       <p className="text-gray-500 font-medium">User</p>
//                       <p className="font-medium text-gray-800">
//                         {meterData.user?.name || "—"}
//                       </p>
//                       <p className="text-gray-500 body-xs ">
//                         {meterData.user?.email || ""}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 font-medium">Last Issue</p>
//                       <span className="inline-flex items-center px-2 py-1 rounded-full body-xs  font-medium bg-red-100 text-red-700">
//                         <AlertTriangle className="w-3 h-3 mr-1" />
//                         {latestIssue?.type || "—"}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-gray-500 font-medium">Last Detected</p>
//                       <p className="text-red-600">
//                         {latestIssue?.lastDetected
//                           ? formatDate(latestIssue.lastDetected)
//                           : "—"}
//                       </p>
//                     </div>
                
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-6 flex flex-col sm:flex-row items-center justify-between body-sm   text-gray-600">
//             <p>
//               Showing {startIdx + 1} to{" "}
//               {Math.min(startIdx + itemsPerPage, totalItems)} of {totalItems} items
//             </p>
//             <div className="flex items-center gap-1 mt-3 sm:mt-0">
//               <button
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setPage(i + 1)}
//                   className={`px-3 py-1 border rounded ${
//                     page === i + 1 ? "bg-blue-600 text-white" : ""
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                 disabled={page === totalPages}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TemperedMeterList;


















import React, { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperedMeter } from "../redux/thunks/adminDashboardThunks";
import { selectUserId } from "../redux/slice/authSlice";
import {
  selectTemperedMeters,
  selectLoading,
} from "../redux/slice/adminDashboardSlice";
import { Search } from "lucide-react";

const TemperedMeterList = () => {
  const dispatch = useDispatch();
  const adminId = useSelector(selectUserId);
  const temperedMeters = useSelector(selectTemperedMeters);
  const loading = useSelector(selectLoading);

  const [search, setSearch] = useState("");
  const [issueFilter, setIssueFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all"); // "all" or "highlight"
  const itemsPerPage = 6;

  useEffect(() => {
    if (adminId) dispatch(getTemperedMeter(adminId));
  }, [dispatch, adminId]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading tempered meters...</p>
        </div>
      </div>
    );
  }

  if (!temperedMeters) return null;
console.log("----data-------------",temperedMeters,temperedMeters.MetersDataWithIssuesLast5Days)
  // Determine which data to use based on active tab
  const dataSource = activeTab === "all" 
    ? temperedMeters.meters || [] 
    : temperedMeters.MetersDataWithIssuesLast5Days.meters || [];

  // Filter + Search
  let filteredMeters = dataSource.filter((meterData) => {
    const latestIssue = meterData.issues[0];
    const matchesSearch =
      meterData.meter.name.toLowerCase().includes(search.toLowerCase()) ||
      meterData.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      meterData.user?.email?.toLowerCase().includes(search.toLowerCase());

    const matchesIssue =
      issueFilter === "All" || latestIssue?.type === issueFilter;

    return matchesSearch && matchesIssue;
  });

  // Pagination
  const totalItems = filteredMeters.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const currentMeters = filteredMeters.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-orange-200/10 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header + Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Tempered Meters</h1>
            <p className="text-gray-500">
              {activeTab === "all" 
                ? "Latest tempered issues detected per meter" 
                : "Meters with issues in the last 5 consecutive days"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by meter or user..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full px-3 py-2 pr-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            <select
              value={issueFilter}
              onChange={(e) => {
                setIssueFilter(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-48 px-3 py-2 border rounded-lg shadow-sm"
            >
              <option value="All">All Issues</option>
              <option value="Neutral Voltage Issue">Neutral Voltage Issue</option>
              <option value="Magnetic Interference">Magnetic Interference</option>
              <option value="Current Imbalance">Current Imbalance</option>
              <option value="Reverse Polarity">Reverse Polarity</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium body-sm   ${activeTab === "all" 
              ? "border-b-2 border-orange-500 text-orange-600" 
              : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => {
              setActiveTab("all");
              setPage(1);
            }}
          >
            All Tempered Meters
            {temperedMeters.meterCount > 0 && (
              <span className="ml-2 bg-gray-100 text-gray-800 body-xs  font-medium px-2 py-0.5 rounded">
                {temperedMeters.meterCount}
              </span>
            )}
          </button>
          <button
            className={`py-2 px-4 font-medium body-sm   ${activeTab === "highlight" 
              ? "border-b-2 border-orange-500 text-orange-600" 
              : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => {
              setActiveTab("highlight");
              setPage(1);
            }}
          >
            Highlight Meters
            {temperedMeters.MetersDataWithIssuesLast5Days?.meterCount > 0 && (
              <span className="ml-2 bg-gray-100 text-gray-800 body-xs  font-medium px-2 py-0.5 rounded">
                {temperedMeters.MetersDataWithIssuesLast5Days.meterCount}
              </span>
            )}
          </button>
        </div>

        {/* Results */}
        {currentMeters.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            <p className="text-lg font-medium">
              {activeTab === "all" 
                ? "No tempered meters found" 
                : "No Meters with issues in the last 5 consecutive days"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentMeters.map((meterData, idx) => {
              const latestIssue = meterData.issues[0];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 body-sm  ">
                    <div>
                      <p className="text-gray-500 font-medium">Meter Name</p>
                      <p className="font-semibold text-blue-700">
                        {meterData.meter.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Type</p>
                      <p>{meterData.meter.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">User</p>
                      <p className="font-medium text-gray-800">
                        {meterData.user?.name || "—"}
                      </p>
                      <p className="text-gray-500 body-xs ">
                        {meterData.user?.email || ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Last Issue</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full body-xs  font-medium bg-red-100 text-red-700">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {latestIssue?.type || "—"}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Last Detected</p>
                      <p className="text-red-600">
                        {latestIssue?.lastDetected
                          ? formatDate(latestIssue.lastDetected)
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between body-sm   text-gray-600">
            <p>
              Showing {startIdx + 1} to{" "}
              {Math.min(startIdx + itemsPerPage, totalItems)} of {totalItems} items
            </p>
            <div className="flex items-center gap-1 mt-3 sm:mt-0">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    page === i + 1 ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemperedMeterList;
