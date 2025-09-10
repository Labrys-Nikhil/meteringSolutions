

// import React, { useState, useEffect } from "react";
// import { Wifi, WifiOff, Link, Link2Off } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMeterListByAdmin } from "../redux/thunks/adminDashboardThunks";
// import { selectUserId } from "../redux/slice/authSlice";
// import { selectMeterList } from "../redux/slice/adminDashboardSlice";

// const StatusPill = ({ status }) => (
//   <span
//     className={`inline-block capitalize body-xs  sm:body-sm   px-3 py-1 rounded-full font-medium ${
//       status === "online"
//         ? "bg-green-100 text-green-700"
//         : "bg-red-100 text-red-600"
//     }`}
//   >
//     {status || "Offline"}
//   </span>
// );

// const AssignmentPill = ({ isAssigned }) => (
//   <span
//     className={`inline-flex items-center gap-1 px-3 py-1 rounded-full body-xs  sm:body-sm   font-medium ${
//       isAssigned ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
//     }`}
//   >
//     {isAssigned ? <Link className="w-3 h-3" /> : <Link2Off className="w-3 h-3" />}
//     {isAssigned ? "Assigned" : "Unassigned"}
//   </span>
// );

// const Offline = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();
//   const adminId = useSelector(selectUserId);
//   const adminMeterList = useSelector(selectMeterList);

//   useEffect(() => {
//     if (adminId) {
//       dispatch(fetchMeterListByAdmin(adminId));
//     }
//   }, [dispatch, adminId]);

//   const filteredMeters = adminMeterList.filter((meter) => {
//     const status = meter.status?.toLowerCase();
//     const isOffline = status === "offline";

//     const matchesSearch =
//       meter.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       meter.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       meter.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       meter.meterSerialNumber?.toString().includes(searchTerm);

//     return isOffline && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-blue-50 p-2 sm:p-4 md:p-6">
//       {/* Page Header */}
//       <div className="mb-2">
//         <h1 className="heading-xl   lg:text-2xl font-bold text-gray-800 mb-1">
//           Offline Meters
//         </h1>
//         <p className="body-sm   text-gray-600 hidden sm:block">
//           Search and filter meters that are currently offline.
//         </p>
//       </div>

//       {/* Search Filter */}
//       <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
//         <div className="flex flex-col sm:flex-row sm:items-end gap-4 flex-wrap">
//           <div className="w-full sm:w-auto">
//             <label className="body-sm   font-medium text-gray-700 mb-1 block">
//               Search
//             </label>
//             <input
//               type="text"
//               placeholder="Search by Name, Meter ID or Serial"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md body-sm   focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Results */}
//       <div className="space-y-4">
//         {filteredMeters.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
//             <WifiOff className="mx-auto h-12 w-12 text-gray-300 mb-4" />
//             <p>No offline meters found</p>
//           </div>
//         ) : (
//           filteredMeters.map((meter) => (
//             <div
//               key={meter._id}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5"
//             >
//               <div className="body-sm   w-full grid grid-cols-2 sm:grid-cols-6 gap-4 text-center">
//                 {/* Meter Name */}
//                 <div>
//                   <p className="body-md   font-semibold text-gray-500">Name</p>
//                   <p className="body-sm   sm:text-base font-medium text-blue-600">
//                     {meter.name}
//                   </p>
//                 </div>

//                 {/* Meter ID */}
//                 <div>
//                   <p className="body-md   font-semibold text-gray-500">Meter ID</p>
//                   <p className="body-sm   break-all">{meter.meterId}</p>
//                 </div>

//                 {/* Type */}
//                 <div>
//                   <p className="body-md   font-semibold text-gray-500">Type</p>
//                   <p className="body-sm  ">{meter.type}</p>
//                 </div>

//                 {/* Status */}
//                 <div>
//                   <p className="body-md   font-semibold text-gray-500">Status</p>
//                   <StatusPill status={meter.status} />
//                 </div>

//                 {/* Assignment */}
//                 <div>
//                   <p className="body-md   font-semibold text-gray-500">
//                     Assignment
//                   </p>
//                   <AssignmentPill isAssigned={meter.isAssigned} />
//                 </div>

//                 {/* Assign Date */}
//                 <div>
//                   <p className="body-md   font-semibold text-gray-500">
//                     Assign Date
//                   </p>
//                   <p className="body-sm   text-gray-700">
//                     {meter.userAssignedTimestamp
//                       ? new Date(meter.userAssignedTimestamp).toLocaleString(
//                           "en-IN",
//                           {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           }
//                         )
//                       : "—"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Offline;

















import React, { useState, useEffect } from "react";
import { WifiOff, Link, Link2Off } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfflineOnlineFaultyMeter } from "../redux/thunks/adminDashboardThunks";
import { selectUserId } from "../redux/slice/authSlice";
import { selectFetchDashboardData, selectLoading } from "../redux/slice/adminDashboardSlice";

const AssignmentPill = ({ isAssigned }) => (
  <span
    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full body-xs  sm:body-sm   font-medium ${
      isAssigned ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
    }`}
  >
    {isAssigned ? <Link className="w-3 h-3" /> : <Link2Off className="w-3 h-3" />}
    {isAssigned ? "Assigned" : "Unassigned"}
  </span>
);

const Offline = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // ✅ dropdown control for 10/20/30
  const dispatch = useDispatch();
  const adminId = useSelector(selectUserId);
  const dashboardData = useSelector(selectFetchDashboardData);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (adminId) {
      dispatch(fetchOfflineOnlineFaultyMeter({ adminId, page, limit }));
    }
  }, [dispatch, adminId, page, limit]);

  const offlineMeters = dashboardData?.data?.offlineMeters || [];
  const pagination = dashboardData?.data?.pagination?.offline || { total: 0, totalPages: 0 };

  const filteredMeters = offlineMeters.filter((meter) =>
    meter.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.meterSerialNumber?.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-blue-50 p-2 sm:p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-2 flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="heading-xl   lg:text-2xl font-bold text-gray-800 mb-1">
            Offline Meters
          </h1>
          <p className="body-sm   text-gray-600 hidden sm:block">
            Search and filter meters that are currently offline.
          </p>
        </div>
        {/* Limit Selector */}
        <div>
          <label className="body-sm   font-medium text-gray-700 mr-2">Rows per page:</label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); // reset to first page on limit change
            }}
            className="px-2 py-1 border rounded-md body-sm  "
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>

      {/* Search Filter */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 flex-wrap">
          <div className="w-full sm:w-auto">
            <label className="body-sm   font-medium text-gray-700 mb-1 block">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by Name, Meter ID or Serial"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md body-sm   focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            <p>Loading offline meters...</p>
          </div>
        ) : filteredMeters.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            <WifiOff className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>No offline meters found</p>
          </div>
        ) : (
          filteredMeters.map((meter) => (
            <div
              key={meter._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5"
            >
              <div className="body-sm   w-full grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                {/* Meter Name */}
                <div>
                  <p className="body-md   font-semibold text-gray-500">Name</p>
                  <p className="body-sm   sm:text-base font-medium text-blue-600">
                    {meter.name}
                  </p>
                </div>

                {/* Meter ID */}
                <div>
                  <p className="body-md   font-semibold text-gray-500">Meter ID</p>
                  <p className="body-sm   break-all">{meter.meterId}</p>
                </div>

                {/* Type */}
                <div>
                  <p className="body-md   font-semibold text-gray-500">Type</p>
                  <p className="body-sm  ">{meter.type}</p>
                </div>

                {/* Assignment */}
                <div>
                  <p className="body-md   font-semibold text-gray-500">Assignment</p>
                  <AssignmentPill isAssigned={meter.isAssigned} />
                </div>

                {/* Assign Date */}
                <div>
                  <p className="body-md   font-semibold text-gray-500">Assign Date</p>
                  <p className="body-sm   text-gray-700">
                    {meter.userAssignedTimestamp
                      ? new Date(meter.userAssignedTimestamp).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 cursor-pointer bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 bg-white border rounded">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
            disabled={page === pagination.totalPages}
            className="px-3 cursor-pointer py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Offline;
