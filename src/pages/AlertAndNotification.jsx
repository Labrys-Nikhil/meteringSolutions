



// import React, { useState, useEffect } from "react";
// import {
//   Bell,
//   AlertTriangle,
//   Zap,
//   TrendingUp,
//   Battery,
//   User,
//   ToggleLeft,
//   ToggleRight,
//   Search,
//   ChevronDown,
//   ChevronRight,
//   CreditCard,
//   Shield,
//   Activity,
//   AlertCircle,
//   Gift,
//   BarChart3,
//   WifiOff,
//   Magnet,
//   User2,
//   Plus,
//   Edit,
//   Trash2,
//   X,
//   Mail,
//   MessageSquare,
//   Pencil,
//   HelpCircle,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Select from "react-select";
// import { selectUserId, selectUserRole } from "../redux/slice/authSlice";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import {
//   setSelectedUser,
//   selectUserNotifications,
//   selectAdminNotifications,
//   selectUsersList,
//   selectNotificationsLoading,
//   selectNotificationsError,
//   selectSelectedUser,
//   updateUserStatus,
// } from "../redux/slice/notificationSlice";
// import {
//   fetchAdminNotifications,
//   fetchUserNotifications,
//   toggleNotificationStatus,
// } from "../redux/thunks/notificationThunks";
// import {

//   createAlert,
//   deleteAlert,
//   fetchAlerts,
//   fetchAvailableMeters,
//   updateAlert,
// } from "../redux/thunks/alertThunk";
// import {  clearAlertError,}from "../redux/slice/alertSlice";
// import { Tooltip as ReactTooltip } from "react-tooltip";

// const SystemAlertCard = ({
//   alert,
//   toggleAlertStatus,
//   handleEditAlert,
//   handleDeleteAlert,
// }) => {
//   const userRole = useSelector((state) => state.auth.user.role);
//   const userId = useSelector((state) => state.auth.user.id);
 
//   // console.log("=====auth=======", auth);

//   // Check if current user can edit this alert
//   const canEdit =
//     userRole === "admin"
//       ? alert.editable // admin can edit any alert if editable
//       : userRole === "user" &&
//         alert.createdBy === "user" &&
//         alert.userId.toString() === userId.toString(); // user can edit only their own alerts

//   // Check if current user can delete this alert
//   const canDelete =
//     userRole === "admin"
//       ? alert.editable // admin can delete any alert if editable
//       : userRole === "user" &&
//         alert.createdBy === "user" &&
//         alert.userId.toString() === userId.toString(); // user can delete only their own alerts

//   const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
//   const [notificationModes, setNotificationModes] = useState({
//     email: alert.notificationModes.email,
//     sms: alert.notificationModes.sms,
//   });
//   const dispatch = useDispatch();

//   const conditionLabels = {
//     ">": "Greater than",
//     "<": "Less than",
//     ">=": "Greater than or equal",
//     "<=": "Less than or equal",
//     "==": "Equal to",
//     "!=": "Not equal to",
//   };

//   const handleNotificationModeChange = (e) => {
//     const { name, checked } = e.target;
//     setNotificationModes((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   const saveNotificationModes = () => {
//     dispatch(
//       updateAlert({
//         id: alert._id,
//         updateData: { notificationModes },
//       })
//     );
//     setIsNotificationModalOpen(false);
//   };

//   return (
//     <div className="bg-white shadow-md rounded-2xl p-5 w-full h-full min-h-[180px] max-w-md border border-gray-200 relative hover:shadow-lg transition-shadow flex flex-col">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-2">
//           <h2 className="text-medium font-semibold text-gray-900">
//             {alert.alertType}
//           </h2>

//           {/* {alert.createdBy === "user" && (
//   <span className="bg-green-100 text-green-800 body-xs  px-2 py-1 rounded-full">
//     User Created
//   </span>
// )}
// {alert.createdBy === "admin" && (
//   <span className="bg-blue-100 text-blue-800 body-xs  px-2 py-1 rounded-full">
//     Admin Created
//   </span>
// )} */}
//         </div>

//         <div className="flex items-center gap-3">
//           {canEdit && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleEditAlert(alert);
//               }}
//               className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
//               data-tooltip-id={`edit-btn-${alert._id}`}
//               data-tooltip-content="Edit alert"
//             >
//               <Edit className="w-5 h-5" />
//               <ReactTooltip
//                 id={`edit-btn-${alert._id}`}
//                 className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//               />
//             </button>
//           )}

//           {canDelete && !alert.isSystemAlert && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleDeleteAlert(alert._id);
//               }}
//               className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
//               data-tooltip-id={`delete-btn-${alert._id}`}
//               data-tooltip-content="Delete alert"
//             >
//               <Trash2 className="w-5 h-5" />
//               <ReactTooltip
//                 id={`delete-btn-${alert._id}`}
//                 className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//               />
//             </button>
//           )}

//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               toggleAlertStatus(alert._id, alert.isActive);
//             }}
//             className={`relative inline-flex items-center h-8 w-16 rounded-full transition-all duration-300 cursor-pointer shadow-sm border-2 ${
//               alert.isActive
//                 ? "bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700"
//                 : "bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
//             }`}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 toggleAlertStatus(alert._id, alert.isActive);
//               }
//             }}
//             data-tooltip-id={`toggle-btn-${alert._id}`}
//             data-tooltip-content={
//               alert.isActive ? "Turn alert off" : "Turn alert on"
//             }
//           >
//             {/* Toggle Circle */}
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleAlertStatus(alert._id, alert.isActive);
//               }}
//               className={`relative inline-flex items-center h-8 w-16 rounded-full transition-all duration-300 cursor-pointer shadow-sm border-2 ${
//                 alert.isActive
//                   ? "bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700"
//                   : "bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
//               }`}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   toggleAlertStatus(alert._id, alert.isActive);
//                 }
//               }}
//               data-tooltip-id={`toggle-btn-${alert._id}`}
//               data-tooltip-content={
//                 alert.isActive ? "Turn alert off" : "Turn alert on"
//               }
//             >
//               {/* Toggle Circle */}
//               <div
//                 className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center text-[10px] font-bold ${
//                   alert.isActive
//                     ? "translate-x-8 text-green-600"
//                     : "translate-x-0 text-red-500"
//                 }`}
//               >
//                 {alert.isActive ? "ON" : "OFF"}
//               </div>

//               {/* Status Text (alert name) */}
//               <span
//                 className={`absolute inset-0 flex items-center body-xs  font-medium transition-opacity duration-200 text-white px-2 ${
//                   alert.isActive ? "justify-end pr-3" : "justify-start pl-3"
//                 }`}
//               >
//                 {alert.name}
//               </span>

//               {/* Tooltip */}
//               <ReactTooltip
//                 id={`toggle-btn-${alert._id}`}
//                 className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//               />
//             </div>

//             {/* Status Text */}
//             <span
//               className={`absolute inset-0 flex items-center body-xs  font-medium transition-opacity duration-200 text-white px-2 ${
//                 alert.isActive ? "justify-end pr-3" : "justify-start pl-3"
//               }`}
//             >
//               {alert.name}
//             </span>

//             {/* Tooltip */}
//             <ReactTooltip
//               id={`toggle-btn-${alert._id}`}
//               className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4 body-sm   flex-grow">
//         <div className="flex flex-col">
//           <span className="text-gray-500">Condition</span>
//           <span className="font-medium text-gray-900">
//             {conditionLabels[alert.condition] || alert.condition}
//           </span>
//         </div>

//         <div className="flex flex-col">
//           <span className="text-gray-500">Value</span>
//           <span className="font-medium text-gray-900">{alert.value}</span>
//         </div>

//         <div className="flex flex-col col-span-2">
//           <span className="text-gray-500">Notification Type</span>
//           <button
//             onClick={() => setIsNotificationModalOpen(true)}
//             className="font-medium text-gray-900 flex space-x-2 items-center hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer"
//             data-tooltip-id={`notification-type-btn-${alert._id}`}
//             data-tooltip-content="Click to change notification types"
//           >
//             {Object.entries(alert.notificationModes)
//               .filter(([mode, enabled]) => enabled)
//               .map(([mode]) =>
//                 mode === "email" ? (
//                   <Mail
//                     key={mode}
//                     className="w-4 h-4 text-gray-700"
        
//                   />
//                 ) : (
//                   <MessageSquare
//                     key={mode}
//                     className="w-4 h-4 text-gray-700"
          
//                   />
//                 )
//               )}
//             {Object.values(alert.notificationModes).every((v) => !v) && (
//               <span
//                 data-tooltip-id={`${alert._id}-none`}
//                 data-tooltip-content="No notification types selected"
//               >
//                 None
//               </span>
//             )}

//             {/* Tooltips for the button and notification modes */}
//             <ReactTooltip
//               id={`notification-type-btn-${alert._id}`}
//               className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//             />
//             {Object.entries(alert.notificationModes)
//               .filter(([mode, enabled]) => enabled)
//               .map(([mode]) => (
//                 <ReactTooltip
//                   key={mode}
//                   id={`${alert._id}-${mode}`}
//                   className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                 />
//               ))}
//             {Object.values(alert.notificationModes).every((v) => !v) && (
//               <ReactTooltip
//                 id={`${alert._id}-none`}
//                 className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//               />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Notification Mode Modal */}
//       {isNotificationModalOpen && (
//         <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//             <div className="p-4 border-b flex justify-between items-center">
//               <h3 className="text-lg font-semibold">Notification Settings</h3>
//               <button
//                 onClick={() => setIsNotificationModalOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="p-4 space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Select Notification Modes
//                 </label>
//                 <div className="space-y-3">
//                   <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="email"
//                       checked={notificationModes.email}
//                       onChange={handleNotificationModeChange}
//                       className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
//                     />
//                     <div className="flex items-center space-x-2">
//                       <Mail className="h-5 w-5 text-gray-700" />
//                       <span className="text-gray-700">Email</span>
//                     </div>
//                   </label>
//                   <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="sms"
//                       checked={notificationModes.sms}
//                       onChange={handleNotificationModeChange}
//                       className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
//                     />
//                     <div className="flex items-center space-x-2">
//                       <MessageSquare className="h-5 w-5 text-gray-700" />
//                       <span className="text-gray-700">SMS</span>
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 border-t flex justify-end space-x-3">
//               <button
//                 onClick={() => setIsNotificationModalOpen(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={saveNotificationModes}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const AlertCondition = ({ meterId, onClose, isAdminView, searchTerm, onSearchChange }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const dispatch = useDispatch();
//   const { alerts, availableMeters, loading, error } = useSelector(
//     (state) => state.alerts
//   );

//   const userId = useSelector(selectUserId);
//   const userRole = useSelector(selectUserRole);
//   const isAdmin = userRole === "admin";
//   const isUser = userRole === "user";
//   const { id } = useSelector((state) => state.auth.user);

//   const [activeAlertTab, setActiveAlertTab] = useState("system");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentAlert, setCurrentAlert] = useState(null);
//   const [editingId, setEditingId] = useState(null);

//   // In your AlertCondition component, add debugging
//   console.log("User Role:", userRole);
//   console.log("User ID:", userId);
//   console.log("All Alerts:", alerts);
//   console.log("Available Meters:", availableMeters);
//   console.log("Active Tab:", activeAlertTab);
//   const conditionOptions = [
//     { value: ">", label: "Greater than" },
//     { value: "<", label: "Less than" },
//     { value: ">=", label: "Greater than or equal" },
//     { value: "<=", label: "Less than or equal" },
//     { value: "==", label: "Equal to" },
//     { value: "!=", label: "Not equal to" },
//   ];

//   const [formData, setFormData] = useState({
//     alertName: "",
//     alertType: null,
//     condition: conditionOptions[0],
//     value: "",
//     notificationModes: { email: false, sms: false },
//     meterIds: [],
//     isSystemAlert: false,
//     editable: true,
//   });

//   // Replace the current useEffect with this:
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let params = {};

//         if (userRole === "admin") {
//           params.isSystemAlert = activeAlertTab === "system";
//         } else if (userRole === "user") {
//           // For users, always fetch both system and their own alerts
//           // The backend will handle the filtering based on user ID
//           if (activeAlertTab === "system") {
//             params.isSystemAlert = true;
//           } else {
//             params.isSystemAlert = false;
//           }
//         }

//         await dispatch(fetchAlerts(params)).unwrap();

//         // Fetch available meters
//         if (userRole === "admin") {
//           await dispatch(
//             fetchAvailableMeters(activeAlertTab === "user")
//           ).unwrap();
//         } else if (userRole === "user") {
//           await dispatch(fetchAvailableMeters(false)).unwrap();
//         }
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };

//     fetchData();
//   }, [dispatch, meterId, activeAlertTab, userRole]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAlertError());
//     }
//   }, [error, dispatch]);

//   const meterOptions = availableMeters.map((meter) => ({
//     value: meter._id,
//     label: meter.name || meter.meterSerialNumber,
//   }));

//   const alertTypeOptions = [
//     { value: "Low Balance", label: "Low Balance" },
//     { value: "Balance Expired", label: "Balance Expired" },
//     { value: "High Load Usage", label: "High Load Usage" },
//     { value: "Over Voltage Warning", label: "Over Voltage Warning" },
//     { value: "Magnetic Interference", label: "Magnetic Interference" },
//     { value: "Reminder to Recharge", label: "Reminder to Recharge" },
//   ];

//   const toggleAlertStatus = (id, currentStatus) => {
//     dispatch(
//       updateAlert({
//         id,
//         updateData: { isActive: !currentStatus },
//       })
//     );
//   };

//   const normalizeMeterIds = (arr) =>
//     (arr || [])
//       .map((x) => {
//         // x can be "id" string, {_id: "id"}, or {value: "id"}
//         if (typeof x === "string") return x;
//         if (x && typeof x === "object") return x._id || x.value || "";
//         return "";
//       })
//       .filter(Boolean);

//   // Update the handleEditAlert function to check permissions
//   const handleEditAlert = (alert) => {
//     // Get user info directly from Redux state
//     const currentUserRole = userRole;
//     const currentUserId = userId;

//     // Check permissions
//     if (currentUserRole === "user") {
//       if (alert.createdBy !== "user" || alert.userId !== currentUserId) {
//         toast.error("You can only edit alerts you created");
//         return;
//       }
//     }

//     if (!alert.editable) {
//       toast.error("This alert type cannot be edited");
//       return;
//     }

//     // Convert meter IDs to the format expected by the form
//     const selectedIds = alert.meterIds
//       ? alert.meterIds.map((id) =>
//           typeof id === "object" ? id._id || id.value || id : id
//         )
//       : [];

//     setFormData({
//       alertName: alert.alertName,
//       alertType: { value: alert.alertType, label: alert.alertType },
//       condition:
//         conditionOptions.find((opt) => opt.value === alert.condition) ||
//         conditionOptions[0],
//       value: alert.value,
//       notificationModes: { ...alert.notificationModes },
//       meterIds: selectedIds,
//       isSystemAlert: alert.isSystemAlert,
//       editable: alert.editable,
//     });
//     setEditingId(alert._id);
//     setIsModalOpen(true);
//   };

//   const handleDeleteAlert = (id) => {
//     const alertToDelete = alerts.find((alert) => alert._id === id);
//     if (!alertToDelete) return;

//     // Check permissions using the already available userRole and userId
//     if (userRole === "user") {
//       if (
//         alertToDelete.createdBy !== "user" ||
//         alertToDelete.userId !== userId
//       ) {
//         toast.error("You can only delete alerts you created");
//         return;
//       }
//     } else if (userRole === "admin") {
//       if (alertToDelete.isSystemAlert) {
//         toast.error("System alerts cannot be deleted");
//         return;
//       }
//       if (
//         alertToDelete.createdBy === "user" &&
//         alertToDelete.adminId !== userId
//       ) {
//         toast.error("You can only delete alerts from your users");
//         return;
//       }
//     }

//     dispatch(deleteAlert(id));
//   };


//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === "email" || name === "sms") {
//       setFormData((prev) => ({
//         ...prev,
//         notificationModes: { ...prev.notificationModes, [name]: checked },
//       }));
//     } else if (name === "isSystemAlert") {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: checked,
//         meterIds: checked ? [] : prev.meterIds,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

 
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.alertName ||
//       !formData.alertType ||
//       (!formData.isSystemAlert && formData.meterIds.length === 0)
//     ) {
//       toast.error("Please fill all required fields");
//       return;
//     }
//     setIsSubmitting(true);
//     const alertData = {
//       alertName: formData.alertName,
//       alertType: formData.alertType.value,
//       condition: formData.condition.value,
//       value: formData.value,
//       notificationModes: formData.notificationModes,
//       meterIds: formData.meterIds,
//       isActive: true,
//       isSystemAlert: formData.isSystemAlert,
//       editable: formData.editable,
//     };

//     try {
//       if (editingId) {
//         await dispatch(
//           updateAlert({ id: editingId, updateData: alertData })
//         ).unwrap();
//         toast.success("Alert updated successfully");
//       } else {
//         await dispatch(createAlert(alertData)).unwrap();
//         toast.success("Alert created successfully");
//       }

//       resetForm();
//       setIsModalOpen(false);
//       setEditingId(null);
//     } catch (error) {
//       console.log("----errr-",error)
//       toast.error(error.message || "Failed to save alert");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   const resetForm = () => {
//     setFormData({
//       alertName: "",
//       alertType: null,
//       condition: conditionOptions[0],
//       value: "",
//       notificationModes: { email: false, sms: false },
//       meterIds: [],
//       isSystemAlert: false,
//       editable: true,
//     });
//   };



//   // Update alert filtering logic to be more accurate
//   const systemAlerts = alerts.filter(
//     (alert) => alert.isSystemAlert
//     // &&
//     // (userRole === "admin" || alert.adminId === userId)
//   );

//   let userAlerts = alerts.filter(
//     (alert) =>
//       !alert.isSystemAlert &&
//       (userRole === "admin" ||
//         (alert.userId === userId && alert.createdBy === "user"))
//   );



// //   let userAlerts = alerts.filter((alert) =>
// //   !alert.isSystemAlert &&
// //   (
// //     // Admin can see all non-system alerts
// //     userRole === "admin" ||

// //     // User-created alerts
// //     (alert.userId?.toString() === userId.toString() && alert.createdBy === "user") ||

// //     // Admin-created editable alerts linked to this user’s meters
// //     (
// //       alert.editable === true &&
// //       alert.createdBy === "admin" &&
// //       alert.meterIds?.some((m) => userMeterIds.includes(m._id?.toString?.() || m.toString()))
// //     )
// //   )
// // );


// // // console.log("==user=",user)
// //   userAlerts=alerts
  

// console.log("======alerts=====", alerts);
//   console.log("=====systemAlerts=====", systemAlerts);
//   console.log("=====userAlerts=====", userAlerts);



//     // Use the searchTerm from props instead of local state
//   const filteredAlerts = (activeAlertTab === "system" ? systemAlerts : userAlerts).filter(
//     (alert) => {
//       const matchesSearch =
//         searchTerm === "" ||
//         alert.alertName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         alert.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         alert.value?.toString().includes(searchTerm) ||
//         alert.condition?.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchesSearch;
//     }
//   );

//   if (loading && alerts.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg   ">
//       {/* <div className="mb-4 sticky top-20 bg-white z-10 border border-gray-200 rounded-lg shadow-sm p-2"> */}
//       <div className="mb-4 bg-white  border border-gray-200 rounded-lg shadow-sm p-2">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
//           <h2 className="heading-xl   font-semibold text-gray-900">
//             {activeAlertTab === "system" ? "System Alerts" : "User Alerts"}
//           </h2>
//           <button
//             onClick={() => {
//               resetForm();
//               setIsModalOpen(true);
//             }}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
//             data-tooltip-id="create-alert-btn"
//             data-tooltip-content="Create a new alert condition"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add New Alert
//             <ReactTooltip
//               id="create-alert-btn"
//               className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//             />
//           </button>
//         </div>

      
//         {searchTerm && (
//           <div className="mb-3 body-sm   text-gray-600">
//             Showing {filteredAlerts.length} alert(s) matching "{searchTerm}"
//             <button
//               onClick={() => onSearchChange("")}
//               className="ml-2 text-blue-600 hover:text-blue-800"
//             >
//               Clear search
//             </button>
//           </div>
//         )}
//         <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-inner">
//           <button
//             onClick={() => setActiveAlertTab("system")}
//             className={`px-4 py-2 rounded-md body-sm   font-medium transition-colors ${
//               activeAlertTab === "system"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
//             }`}
//             data-tooltip-id="system-alerts-tab"
//             data-tooltip-content="System-wide alerts"
//           >
//             System Alerts
//             <ReactTooltip
//               id="system-alerts-tab"
//               className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//             />
//           </button>
//           <button
//             onClick={() => setActiveAlertTab("user")}
//             className={`px-4 py-2 rounded-md body-sm   font-medium transition-colors ${
//               activeAlertTab === "user"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
//             }`}
//             data-tooltip-id="user-alerts-tab"
//             data-tooltip-content="User-specific alerts"
//           >
//             User Alerts
//             <ReactTooltip
//               id="user-alerts-tab"
//               className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//             />
//           </button>
//         </div>
//       </div>

//       {/* <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {(activeAlertTab === "system" ? systemAlerts : userAlerts).length >
//         0 ? (
//           (activeAlertTab === "system" ? systemAlerts : userAlerts).map(
//             (alert) => (
//               <SystemAlertCard
//                 key={alert._id}
//                 alert={alert}
//                 toggleAlertStatus={toggleAlertStatus}
//                 handleEditAlert={handleEditAlert}
//                 handleDeleteAlert={handleDeleteAlert}
//               />
//             )
//           )
//         ) : (
//           <div className="text-center py-12 col-span-full">
//             <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No alerts configured
//             </h3>
//             <p className="text-gray-600">Add a new alert to get started</p>
//           </div>
//         )}
//       </div> */}
//           <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredAlerts.length > 0 ? (
//           filteredAlerts.map((alert) => (
//             <SystemAlertCard
//               key={alert._id}
//               alert={alert}
//               toggleAlertStatus={toggleAlertStatus}
//               handleEditAlert={handleEditAlert}
//               handleDeleteAlert={handleDeleteAlert}
//             />
//           ))
//         ) : (
//           <div className="text-center py-12 col-span-full">
//             <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               {searchTerm ? "No alerts found" : "No alerts configured"}
//             </h3>
//             <p className="text-gray-600">
//               {searchTerm ? "Try adjusting your search criteria" : "Add a new alert to get started"}
//             </p>
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
//             {/* Header - Sticky */}
//             <div className="sticky top-0 bg-white flex justify-between items-center border-b border-gray-300 p-4 z-10 rounded-t-lg">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {editingId ? "Edit Alert" : "Create New Alert"}
//               </h3>
//               <button
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   setEditingId(null);
//                   resetForm();
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Scrollable Content */}
//             <div className="flex-1 overflow-y-auto p-4">
//               <form
//                 id="alertForm"
//                 onSubmit={handleSubmit}
//                 className="space-y-4"
//               >
//                 {/* Alert Name */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-1">
//                     Alert Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="alertName"
//                     value={formData.alertName}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                     placeholder="Enter alert name"
//                     required
//                   />
//                 </div>

//                 {/* Alert Type */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-1">
//                     Alert Type *
//                   </label>
//                   <Select
//                     options={alertTypeOptions}
//                     value={formData.alertType}
//                     onChange={(selected) =>
//                       setFormData({ ...formData, alertType: selected || null })
//                     }
//                     isSearchable
//                     className="basic-single"
//                     classNamePrefix="select"
//                     placeholder="Select alert type"
//                     required
//                   />
//                 </div>

//                 {/* Condition & Threshold */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-1">
//                       Condition *
//                     </label>
//                     <Select
//                       options={conditionOptions}
//                       value={formData.condition}
//                       onChange={(selected) =>
//                         setFormData({ ...formData, condition: selected })
//                       }
//                       className="basic-single"
//                       classNamePrefix="select"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 font-medium mb-1">
//                       Threshold Value *
//                     </label>
//                     <input
//                       type="number"
//                       name="value"
//                       value={formData.value}
//                       onChange={handleInputChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
//                       placeholder="Enter value"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Select Meters */}
  
//                 {/* 
//           // In your modal form, add this check: */}
//                 {(!formData.isSystemAlert ||
//                   (formData.editable && userRole === "admin")) && (
//                   <div>
//                     <div className="flex justify-between items-center px-2 mb-2">
//                       <label className="block text-gray-700 font-medium">
//                         Select Meter(s) {!formData.isSystemAlert && "*"}
//                       </label>
//                       {meterOptions.length > 0 && (
//                         <label className="flex items-center space-x-2">
//                           <input
//                             type="checkbox"
//                             checked={
//                               formData.meterIds.length === meterOptions.length
//                             }
//                             onChange={(e) => {
//                               setFormData((prev) => ({
//                                 ...prev,
//                                 meterIds: e.target.checked
//                                   ? meterOptions.map((m) => m.value)
//                                   : [],
//                               }));
//                             }}
//                             className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                           />
//                           <span className="text-gray-700 font-medium">
//                             Select All
//                           </span>
//                         </label>
//                       )}
//                     </div>

//                     <Select
//                       isMulti
//                       isSearchable
//                       name="meters"
//                       options={meterOptions}
//                       value={meterOptions.filter(
//                         (opt) =>
//                           formData.meterIds.includes(opt.value) ||
//                           formData.meterIds.includes(opt._id)
//                       )}
//                       onChange={(selected) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           meterIds: selected
//                             ? selected.map((opt) => opt.value)
//                             : [],
//                         }))
//                       }
//                       isDisabled={userRole === "user" && formData.isSystemAlert}
//                       className="basic-multi-select"
//                       classNamePrefix="select"
//                       placeholder="Search & select meters..."
//                     />
//                     {userRole === "user" && formData.isSystemAlert && (
//                       <p className="body-sm   text-gray-500 mt-1">
//                         System alerts apply to all meters automatically
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {/* Notification Modes */}
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">
//                     Notification Mode
//                   </label>
//                   <div className="flex space-x-6">
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         name="email"
//                         checked={formData.notificationModes.email}
//                         onChange={handleInputChange}
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       />
//                       <span className="body-sm   text-gray-700">Email</span>
//                     </label>
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         name="sms"
//                         checked={formData.notificationModes.sms}
//                         onChange={handleInputChange}
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       />
//                       <span className="body-sm   text-gray-700">SMS</span>
//                     </label>
//                   </div>
//                 </div>
//               </form>
//             </div>

//             {/* Footer - Sticky */}
//             <div className="sticky bottom-0 bg-white flex justify-end space-x-3 p-4 border-t border-gray-200 rounded-b-lg">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   setEditingId(null);
//                   resetForm();
//                 }}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               {/* <button
//           type="submit"
//           form="alertForm"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           {editingId ? "Update Alert" : "Create Alert"}
//         </button> */}

//               <button
//                 type="submit"
//                 form="alertForm"
//                 disabled={isSubmitting}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting
//                   ? "Processing..."
//                   : editingId
//                   ? "Update Alert"
//                   : "Create Alert"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const AlertAndNotification = () => {
//   const [viewAlertConditions, setViewAlertConditions] = useState(false);
//   const [selectedMeterForAlerts, setSelectedMeterForAlerts] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();

//   const userId = useSelector(selectUserId);
//   const userRole = useSelector(selectUserRole);
//   const isAdmin = userRole === "admin";
//   const isUser = userRole === "user";

//   const userNotifications = useSelector(selectUserNotifications);
//   const adminNotifications = useSelector(selectAdminNotifications);
//   const usersList = useSelector(selectUsersList);
//   const loading = useSelector(selectNotificationsLoading);
//   const error = useSelector(selectNotificationsError);
//   const selectedUser = useSelector(selectSelectedUser);

//   const [activeTab, setActiveTab] = useState("users");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     dispatch(setHeaderTitle("Alert & Notification"));
//     dispatch(
//       setBreadcrumbs([
//         { label: "Alert & Notification", link: "/alertandnotification" },
//       ])
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     if (isAdmin && !selectedUser && activeTab === "users") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (isAdmin && activeTab === "adminNotifications") {
//       dispatch(fetchAdminNotifications(userId));
//     } else if (selectedUser) {
//       dispatch(fetchUserNotifications(selectedUser));
//     } else if (isUser) {
//       dispatch(fetchUserNotifications(userId));
//     }
//   }, [isAdmin, isUser, selectedUser, activeTab, userId, dispatch]);

//   const handleToggleGlobalNotificationStatus = async (newStatus) => {
//     const targetUserId = selectedUser || userId;
//     try {
//       dispatch(updateUserStatus({ userId: targetUserId, status: newStatus }));
//       await dispatch(
//         toggleNotificationStatus({
//           userId: targetUserId,
//           status: newStatus,
//         })
//       ).unwrap();
//     } catch (error) {
//       toast.error("Failed to update notification status");
//       dispatch(
//         updateUserStatus({
//           userId: targetUserId,
//           status: newStatus === "enabled" ? "disabled" : "enabled",
//         })
//       );
//     }
//   };

//   const handleToggleUserStatus = async (userId, currentStatus) => {
//     const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";
//     try {
//       dispatch(updateUserStatus({ userId, status: newStatus }));
//       await dispatch(
//         toggleNotificationStatus({
//           userId,
//           status: newStatus,
//         })
//       ).unwrap();
//     } catch (error) {
//       toast.error("Failed to update user notification status");
//       dispatch(
//         updateUserStatus({
//           userId,
//           status: currentStatus,
//         })
//       );
//     }
//   };

//   const handleUserSelection = (userId) => {
//     dispatch(setSelectedUser(userId));
//     setCurrentPage(1);
//     setViewAlertConditions(false);
//   };

//   const handleBackToList = () => {
//     dispatch(setSelectedUser(null));
//     setCurrentPage(1);
//     setViewAlertConditions(false);
//   };

//   useEffect(() => {
//     setViewAlertConditions(false);
//   }, [activeTab]);

//   const filteredNotifications =
//     (isUser || selectedUser ? userNotifications : adminNotifications)?.filter(
//       (notification) => {
//         const matchesSearch =
//           searchTerm === "" ||
//           notification.alertType
//             ?.toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           notification.value
//             ?.toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           notification.message
//             ?.toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           (isAdmin &&
//             !selectedUser &&
//             (notification.userName
//               ?.toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//               notification.meterId
//                 ?.toLowerCase()
//                 .includes(searchTerm.toLowerCase())));
//         return matchesSearch;
//       }
//     ) || [];

//   const filteredUsers = usersList?.filter((user) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.meterName?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   const currentItems =
//     isUser || selectedUser
//       ? filteredNotifications.slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         )
//       : activeTab === "adminNotifications"
//       ? filteredNotifications.slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         )
//       : filteredUsers.slice(
//           (currentPage - 1) * itemsPerPage,
//           currentPage * itemsPerPage
//         );

//   const totalPages = Math.ceil(
//     (isUser || selectedUser
//       ? filteredNotifications.length
//       : activeTab === "adminNotifications"
//       ? filteredNotifications.length
//       : filteredUsers.length) / itemsPerPage
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   const getPaginationRange = () => {
//     const totalPageCount = totalPages;
//     const currentPageNum = currentPage;
//     const siblingCount = 1;
//     const DOTS = "...";

//     // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
//     const totalPageNumbers = siblingCount + 5;

//     /*
//       Case 1:
//       If the number of pages is less than the page numbers we want to show in our
//       paginationComponent, we return the range [1..totalPageCount]
//     */
//     if (totalPageNumbers >= totalPageCount) {
//       return range(1, totalPageCount);
//     }

//     /*
//       Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
//     */
//     const leftSiblingIndex = Math.max(currentPageNum - siblingCount, 1);
//     const rightSiblingIndex = Math.min(
//       currentPageNum + siblingCount,
//       totalPageCount
//     );

//     /*
//       We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
//     */
//     const shouldShowLeftDots = leftSiblingIndex > 2;
//     const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

//     const firstPageIndex = 1;
//     const lastPageIndex = totalPageCount;

//     /*
//       Case 2: No left dots to show, but rights dots to be shown
//     */
//     if (!shouldShowLeftDots && shouldShowRightDots) {
//       let leftItemCount = 3 + 2 * siblingCount;
//       let leftRange = range(1, leftItemCount);

//       return [...leftRange, DOTS, totalPageCount];
//     }

//     /*
//       Case 3: No right dots to show, but left dots to be shown
//     */
//     if (shouldShowLeftDots && !shouldShowRightDots) {
//       let rightItemCount = 3 + 2 * siblingCount;
//       let rightRange = range(
//         totalPageCount - rightItemCount + 1,
//         totalPageCount
//       );
//       return [firstPageIndex, DOTS, ...rightRange];
//     }

//     /*
//       Case 4: Both left and right dots to be shown
//     */
//     if (shouldShowLeftDots && shouldShowRightDots) {
//       let middleRange = range(leftSiblingIndex, rightSiblingIndex);
//       return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
//     }
//   };

//   const range = (start, end) => {
//     let length = end - start + 1;
//     return Array.from({ length }, (_, idx) => idx + start);
//   };

//   const getAlertIcon = (alertType) => {
//     const iconMap = {
//       "Low Balance": <Battery className="h-5 w-5" />,
//       "Balance Expired": <AlertTriangle className="h-5 w-5" />,
//       "Recharge Successful": <CreditCard className="h-5 w-5" />,
//       "Recharge Failed": <AlertCircle className="h-5 w-5" />,
//       "High Load Usage": <Zap className="h-5 w-5" />,
//       "Spike in Usage": <TrendingUp className="h-5 w-5" />,
//       "Daily/Weekly Report": <BarChart3 className="h-5 w-5" />,
//       "No Usage Detected": <Activity className="h-5 w-5" />,
//       "Garbage Uplink Data": <AlertTriangle className="h-5 w-5" />,
//       "Reverse Polarity": <Shield className="h-5 w-5" />,
//       "Magnetic Interference": <Magnet className="h-5 w-5" />,
//       "Current Imbalance": <Zap className="h-5 w-5" />,
//       "Neutral Voltage Issue": <AlertTriangle className="h-5 w-5" />,
//       "Meter Offline": <WifiOff className="h-5 w-5" />,
//       "Reminder to Recharge": <Bell className="h-5 w-5" />,
//       "Festival Offer": <Gift className="h-5 w-5" />,
//       "High Load vs Previous": <TrendingUp className="h-5 w-5" />,
//       "System Alert": <Activity className="h-5 w-5" />,
//       "Security Alert": <Shield className="h-5 w-5" />,
//       "Maintenance Required": <AlertTriangle className="h-5 w-5" />,
//       "Over Voltage Warning": <AlertTriangle className="h-5 w-5" />,
//     };
//     return iconMap[alertType] || <Bell className="h-5 w-5" />;
//   };

//   const getAlertColors = (alertType) => {
//     const colorMap = {
//       "Low Balance": {
//         bg: "bg-orange-50",
//         icon: "text-orange-600",
//         border: "border-orange-200",
//       },
//       "Balance Expired": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Recharge Successful": {
//         bg: "bg-green-50",
//         icon: "text-green-600",
//         border: "border-green-200",
//       },
//       "Recharge Failed": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "High Load Usage": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//       "Spike in Usage": {
//         bg: "bg-yellow-50",
//         icon: "text-yellow-600",
//         border: "border-yellow-200",
//       },
//       "Over Voltage Warning": {
//         bg: "bg-red-50",
//         icon: "text-red-600",
//         border: "border-red-200",
//       },
//     };
//     return (
//       colorMap[alertType] || {
//         bg: "bg-gray-50",
//         icon: "text-gray-600",
//         border: "border-gray-200",
//       }
//     );
//   };

//   const showGlobalToggle = !(isAdmin && !selectedUser && activeTab === "users");

//   return (
//     <div className="bg-blue-200/10 min-h-screen p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="sticky top-0 z-10 bg-white shadow-sm rounded-lg mb-6">
//           <div className="p-4  rounded-t-lg">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <h1 className="heading-xl   font-semibold text-gray-900">
//                 Alert & Notification
//               </h1>

//               {isAdmin && (
//                 // <div className="flex-1 w-full max-w-md">
//                 //   <div className="relative">
//                 //     <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 //     <input
//                 //       type="text"
//                 //       placeholder={
//                 //         !selectedUser && activeTab === "users"
//                 //           ? "Search users..."
//                 //           : "Search notifications..."
//                 //       }
//                 //       value={searchTerm}
//                 //       onChange={(e) => setSearchTerm(e.target.value)}
//                 //       className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
//                 //     />
//                 //   </div>
//                 // </div>

//                         <div className="flex-1 w-full max-w-md">
//                 <div className="relative">
//                   <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder={
//                       viewAlertConditions
//                         ? "Search alerts..."
//                         : !selectedUser && activeTab === "users" && isAdmin
//                         ? "Search users..."
//                         : "Search notifications..."
//                     }
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
//                   />
//                 </div>
//               </div>
//               )}

//               {isUser && (
//                 <div className="flex-1 w-full max-w-md">
//                   <div className="relative">
//                     <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search notifications..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
//                     />
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-center space-x-4">
//                 {/* {showGlobalToggle && ( */}
//                 {isAdmin && (
//                   <div className="flex items-center gap-1">
//                     {/* Heading */}
//                     <label
//                       htmlFor="view-type-select"
//                       className="text-medium font-medium text-gray-700"
//                     >
//                       Notification Type:
//                     </label>

//                     {/* Select with tooltip */}
//                     <div className="relative">
//                       <select
//                         id="view-type-select"
//                         value={activeTab}
//                         onChange={(e) => setActiveTab(e.target.value)}
//                         className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 body-sm   focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         data-tooltip-id="view-type-select-tooltip"
//                         data-tooltip-content="Select view type"
//                       >
//                         <option value="users">Users</option>
//                         <option value="adminNotifications">Admin</option>
//                       </select>
//                       <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//                       <ReactTooltip
//                         id="view-type-select-tooltip"
//                         className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   onClick={() => {
//                     setViewAlertConditions(true);
//                     setSelectedMeterForAlerts(selectedUser || userId);
//                   }}
//                   className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
//                   data-tooltip-id="manage-alerts-btn"
//                   data-tooltip-content={
//                     isAdmin && !selectedUser
//                       ? " Click to Configure alerts "
//                       : " Click to Configure  alerts"
//                   }
//                 >
//                   Manage Alerts
//                   <ReactTooltip
//                     id="manage-alerts-btn"
//                     className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-4 sm:p-6">
//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading data...</p>
//               </div>
//             ) : viewAlertConditions ? (
//               // <AlertCondition
//               //   meterId={selectedMeterForAlerts}
//               //   onClose={() => setViewAlertConditions(false)}
//               //   isAdminView={isAdmin && !selectedUser}
//               // />

//                      <AlertCondition
//             meterId={selectedMeterForAlerts}
//             onClose={() => setViewAlertConditions(false)}
//             isAdminView={isAdmin && !selectedUser}
//             searchTerm={searchTerm} // Pass search term as prop
//             onSearchChange={setSearchTerm} // Pass setter function if needed
//           />
//             ) : (
//               <div className="space-y-4">
//                 {(isUser || selectedUser) && (
//                   <>
//                     {filteredNotifications.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((notification) => {
//                           const colors = getAlertColors(notification.alertType);
//                           return (
//                             <div
//                               key={notification._id}
//                               className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md cursor-pointer`}
//                               // data-tooltip-id={`notification-${notification._id}`}
//                               // data-tooltip-content="Click for details"
//                             >
//                               <ReactTooltip
//                                 id={`notification-${notification._id}`}
//                                 className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                               />
//                               <div className="flex items-start justify-between">
//                                 <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                   <div
//                                     className={`p-2 rounded-lg ${colors.bg}`}
//                                   >
//                                     <span className={colors.icon}>
//                                       {getAlertIcon(notification.alertType)}
//                                     </span>
//                                   </div>

//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                       <h3 className="font-semibold text-gray-900">
//                                         {notification.alertType}
//                                       </h3>
//                                       <span
//                                         className={`px-2 py-1 rounded-full body-xs  font-medium ${
//                                           notification.mode.includes("Text")
//                                             ? "text-blue-600 bg-blue-100"
//                                             : "text-purple-600 bg-purple-100"
//                                         }`}
//                                         data-tooltip-id={`notification-mode-${notification._id}`}
//                                         data-tooltip-content={
//                                           notification.mode.includes("Text")
//                                             ? "SMS notification"
//                                             : "Email notification"
//                                         }
//                                       >
//                                         {notification.mode}
//                                         <ReactTooltip
//                                           id={`notification-mode-${notification._id}`}
//                                           className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                                         />
//                                       </span>
//                                     </div>

//                                     <p className="text-gray-700 mb-3">
//                                       {notification.message}
//                                     </p>

//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 body-sm   mb-4">
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Value:
//                                         </span>
//                                         <div className="text-gray-900 font-semibold">
//                                           {notification.value}
//                                         </div>
//                                       </div>
//                                       <div>
//                                         <span className="font-medium text-gray-600">
//                                           Time:
//                                         </span>
//                                         <div className="text-gray-900">
//                                           {new Date(
//                                             notification.time
//                                           ).toLocaleString()}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No notifications found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "You're all caught up!"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {isAdmin &&
//                   !selectedUser &&
//                   activeTab === "adminNotifications" && (
//                     <>
//                       {filteredNotifications.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {currentItems.map((notification) => {
//                             const colors = getAlertColors(
//                               notification.alertType
//                             );
//                             return (
//                               <div
//                                 key={notification._id}
//                                 className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md cursor-pointer`}
//                                 data-tooltip-id={`admin-notification-${notification._id}`}
//                                 data-tooltip-content="Click for details"
//                               >
//                                 <ReactTooltip
//                                   id={`admin-notification-${notification._id}`}
//                                   className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                                 />
//                                 <div className="flex items-start justify-between">
//                                   <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
//                                     <div
//                                       className={`p-2 rounded-lg ${colors.bg}`}
//                                     >
//                                       <span className={colors.icon}>
//                                         {getAlertIcon(notification.alertType)}
//                                       </span>
//                                     </div>

//                                     <div className="flex-1 min-w-0">
//                                       <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
//                                         <h3 className="font-semibold text-gray-900">
//                                           {notification.alertType}
//                                         </h3>
//                                         <span
//                                           className="body-sm   text-gray-600"
//                                           data-tooltip-id={`user-name-${notification._id}`}
//                                           data-tooltip-content="User who received this notification"
//                                         >
//                                           User:{" "}
//                                           {notification.userName || "Unknown"}
//                                           <ReactTooltip
//                                             id={`user-name-${notification._id}`}
//                                             className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                                           />
//                                         </span>
//                                         <span
//                                           className={`px-2 py-1 rounded-full body-xs  font-medium ${
//                                             notification.mode.includes("Text")
//                                               ? "text-blue-600 bg-blue-100"
//                                               : "text-purple-600 bg-purple-100"
//                                           }`}
//                                           data-tooltip-id={`admin-notification-mode-${notification._id}`}
//                                           data-tooltip-content={
//                                             notification.mode.includes("Text")
//                                               ? "SMS notification"
//                                               : "Email notification"
//                                           }
//                                         >
//                                           {notification.mode}
//                                           <ReactTooltip
//                                             id={`admin-notification-mode-${notification._id}`}
//                                             className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                                           />
//                                         </span>
//                                       </div>

//                                       <p className="text-gray-700 mb-3">
//                                         {notification.message}
//                                       </p>

//                                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 body-sm   mb-4">
//                                         <div>
//                                           <span className="font-medium text-gray-600">
//                                             Value:
//                                           </span>
//                                           <div className="text-gray-900 font-semibold">
//                                             {notification.value}
//                                           </div>
//                                         </div>
//                                         <div>
//                                           <span className="font-medium text-gray-600">
//                                             Time:
//                                           </span>
//                                           <div className="text-gray-900">
//                                             {new Date(
//                                               notification.time
//                                             ).toLocaleString()}
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       ) : (
//                         <div className="text-center py-12">
//                           <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                           <h3 className="text-lg font-medium text-gray-900 mb-2">
//                             No admin notifications found
//                           </h3>
//                           <p className="text-gray-600">
//                             {searchTerm
//                               ? "Try adjusting your search criteria"
//                               : "No admin notifications available"}
//                           </p>
//                         </div>
//                       )}
//                     </>
//                   )}

//                 {isAdmin && !selectedUser && activeTab === "users" && (
//                   <>
//                     {filteredUsers.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {currentItems.map((user) => (
//                           <div
//                             key={user._id}
//                             className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//                             onClick={() => handleUserSelection(user.userId)}
//                             data-tooltip-id={`user-card-${user._id}`}
//                             data-tooltip-content="Click to view user notifications"
//                           >
//                             <ReactTooltip
//                               id={`user-card-${user._id}`}
//                               className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                             />
//                             <div className="flex flex-col">
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center space-x-3">
//                                   <div className="p-2 rounded-lg bg-gray-100">
//                                     <User className="h-6 w-6 text-gray-600" />
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-2 gap-4 body-sm  ">
//                                 <div>
//                                   <h3 className="font-semibold text-gray-900">
//                                     {user.userName}
//                                   </h3>
//                                   <p className="body-sm   text-gray-600">
//                                     ID: {user.userId}
//                                   </p>
//                                   <p className="mt-2 text-gray-500">
//                                     Last Sent
//                                   </p>
//                                   <p className="font-medium">
//                                     {user.lastNotificationDate
//                                       ? new Date(
//                                           user.lastNotificationDate
//                                         ).toLocaleDateString()
//                                       : "Never"}
//                                   </p>
//                                 </div>

//                                 <div>
//                                   <p className="text-gray-500">Meter ID</p>
//                                   <p className="font-medium">
//                                     {user.meterId || "M-0000"}
//                                   </p>
//                                   <p className="mt-2 text-gray-500">Count</p>
//                                   <p className="font-medium">
//                                     {user.notificationCount || 0}
//                                   </p>
//                                 </div>
//                               </div>
//                               <div className="flex justify-end items-center mt-4">
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleToggleUserStatus(
//                                       user.userId,
//                                       user.status
//                                     );
//                                   }}
//                                   className={`px-3 py-1 rounded-md body-xs  font-medium flex items-center justify-center ${
//                                     user.status === "enabled"
//                                       ? "bg-red-100 hover:bg-red-200 text-red-600"
//                                       : "bg-green-100 hover:bg-green-200 text-green-600"
//                                   }`}
//                                   data-tooltip-id={`toggle-status-${user._id}`}
//                                   data-tooltip-content={
//                                     user.status === "enabled"
//                                       ? "Disable notifications for this user"
//                                       : "Enable notifications for this user"
//                                   }
//                                 >
//                                   {user.status === "enabled"
//                                     ? "Disable"
//                                     : "Enable"}
//                                   <ReactTooltip
//                                     id={`toggle-status-${user._id}`}
//                                     className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                                   />
//                                 </button>
//                                 <ChevronRight
//                                   className="h-5 w-5 text-gray-400 ml-2"
//                                   data-tooltip-id={`view-user-${user._id}`}
//                                   data-tooltip-content="View user notifications"
//                                 />
//                                 <ReactTooltip
//                                   id={`view-user-${user._id}`}
//                                   className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <User2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">
//                           No users found
//                         </h3>
//                         <p className="text-gray-600">
//                           {searchTerm
//                             ? "Try adjusting your search criteria"
//                             : "No users available"}
//                         </p>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             )}

//             {!viewAlertConditions &&
//               (((isUser ||
//                 selectedUser ||
//                 activeTab === "adminNotifications") &&
//                 filteredNotifications.length > itemsPerPage) ||
//               (isAdmin &&
//                 !selectedUser &&
//                 activeTab === "users" &&
//                 filteredUsers.length > itemsPerPage) ? (
//                 <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
//                   <div className="body-sm   text-gray-600">
//                     Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                     {Math.min(
//                       currentPage * itemsPerPage,
//                       isAdmin && !selectedUser && activeTab === "users"
//                         ? filteredUsers.length
//                         : filteredNotifications.length
//                     )}{" "}
//                     of{" "}
//                     {isAdmin && !selectedUser && activeTab === "users"
//                       ? filteredUsers.length
//                       : filteredNotifications.length}{" "}
//                     {isAdmin && !selectedUser && activeTab === "users"
//                       ? "users"
//                       : "items"}
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     <button
//                       onClick={() => goToPage(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className={`px-3 py-1 rounded-md border ${
//                         currentPage === 1
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                           : "bg-white text-gray-700 hover:bg-gray-50"
//                       }`}
//                       data-tooltip-id="prev-page-btn"
//                       data-tooltip-content="Previous page"
//                     >
//                       Previous
//                       <ReactTooltip
//                         id="prev-page-btn"
//                         className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                       />
//                     </button>

//                     {getPaginationRange().map((pageNumber, index) => {
//                       if (pageNumber === "...") {
//                         return (
//                           <span key={index} className="px-3 py-1 text-gray-700">
//                             ...
//                           </span>
//                         );
//                       }

//                       return (
//                         <button
//                           key={index}
//                           onClick={() => goToPage(pageNumber)}
//                           className={`px-3 py-1 rounded-md ${
//                             currentPage === pageNumber
//                               ? "bg-blue-600 text-white"
//                               : "bg-white text-gray-700 hover:bg-gray-50 border"
//                           }`}
//                           data-tooltip-id={`page-${pageNumber}-btn`}
//                           data-tooltip-content={`Go to page ${pageNumber}`}
//                         >
//                           {pageNumber}
//                           <ReactTooltip
//                             id={`page-${pageNumber}-btn`}
//                             className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                           />
//                         </button>
//                       );
//                     })}

//                     <button
//                       onClick={() => goToPage(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className={`px-3 py-1 rounded-md border ${
//                         currentPage === totalPages
//                           ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                           : "bg-white text-gray-700 hover:bg-gray-50"
//                       }`}
//                       data-tooltip-id="next-page-btn"
//                       data-tooltip-content="Next page"
//                     >
//                       Next
//                       <ReactTooltip
//                         id="next-page-btn"
//                         className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
//                       />
//                     </button>
//                   </div>
//                 </div>
//               ) : null)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertAndNotification;











import React, { useState, useEffect } from "react";
import {
  Bell,
  AlertTriangle,
  Zap,
  TrendingUp,
  Battery,
  User,
  ToggleLeft,
  ToggleRight,
  Search,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Shield,
  Activity,
  AlertCircle,
  Gift,
  BarChart3,
  WifiOff,
  Magnet,
  User2,
  Plus,
  Edit,
  Trash2,
  X,
  Mail,
  MessageSquare,
  Pencil,
  HelpCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Select from "react-select";
import { selectUserId, selectUserRole } from "../redux/slice/authSlice";
import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
import {
  setSelectedUser,
  selectUserNotifications,
  selectAdminNotifications,
  selectUsersList,
  selectNotificationsLoading,
  selectNotificationsError,
  selectSelectedUser,
  updateUserStatus,
} from "../redux/slice/notificationSlice";
import {
  fetchAdminNotifications,
  fetchUserNotifications,
  toggleNotificationStatus,
} from "../redux/thunks/notificationThunks";
import {
  createAlert,
  deleteAlert,
  fetchAlerts,
  fetchAvailableMeters,
  updateAlert,
} from "../redux/thunks/alertThunk";
import {  clearAlertError,}from "../redux/slice/alertSlice";
import { Tooltip as ReactTooltip } from "react-tooltip";

const SystemAlertCard = ({
  alert,
  toggleAlertStatus,
  handleEditAlert,
  handleDeleteAlert,
}) => {
  const userRole = useSelector((state) => state.auth.user.role);
  const userId = useSelector((state) => state.auth.user.id);

  // Check if current user can edit this alert
  const canEdit =
    userRole === "admin"
      ? alert.editable // admin can edit any alert if editable
      : userRole === "user" &&
        alert.createdBy === "user" &&
        alert.userId.toString() === userId.toString(); // user can edit only their own alerts

  // Check if current user can delete this alert
  const canDelete =
    userRole === "admin"
      ? alert.editable // admin can delete any alert if editable
      : userRole === "user" &&
        alert.createdBy === "user" &&
        alert.userId.toString() === userId.toString(); // user can delete only their own alerts

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    user: {
      email: alert.notificationSettings?.user?.email || false,
      sms: alert.notificationSettings?.user?.sms || false,
    },
    admin: {
      email: alert.notificationSettings?.admin?.email || false,
      sms: alert.notificationSettings?.admin?.sms || false,
    },
  });
  const dispatch = useDispatch();

  const conditionLabels = {
    ">": "Greater than",
    "<": "Less than",
    ">=": "Greater than or equal",
    "<=": "Less than or equal",
    "==": "Equal to",
    "!=": "Not equal to",
  };

  const handleNotificationSettingChange = (recipient, mode, checked) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [recipient]: {
        ...prev[recipient],
        [mode]: checked,
      },
    }));
  };

  const saveNotificationSettings = () => {
    dispatch(
      updateAlert({
        id: alert._id,
        updateData: { notificationSettings },
      })
    );
    setIsNotificationModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-full h-full min-h-[180px] max-w-md border border-gray-200 relative hover:shadow-lg transition-shadow flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-medium font-semibold text-gray-900">
            {alert.alertType}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {canEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditAlert(alert);
              }}
              className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              data-tooltip-id={`edit-btn-${alert._id}`}
              data-tooltip-content="Edit alert"
            >
              <Edit className="w-5 h-5" />
              <ReactTooltip
                id={`edit-btn-${alert._id}`}
                className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
              />
            </button>
          )}

          {canDelete && !alert.isSystemAlert && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAlert(alert._id);
              }}
              className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
              data-tooltip-id={`delete-btn-${alert._id}`}
              data-tooltip-content="Delete alert"
            >
              <Trash2 className="w-5 h-5" />
              <ReactTooltip
                id={`delete-btn-${alert._id}`}
                className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
              />
            </button>
          )}

          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleAlertStatus(alert._id, alert.isActive);
            }}
            className={`relative inline-flex items-center h-8 w-16 rounded-full transition-all duration-300 cursor-pointer shadow-sm border-2 ${
              alert.isActive
                ? "bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700"
                : "bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                toggleAlertStatus(alert._id, alert.isActive);
              }
            }}
            data-tooltip-id={`toggle-btn-${alert._id}`}
            data-tooltip-content={
              alert.isActive ? "Turn alert off" : "Turn alert on"
            }
          >
            {/* Toggle Circle */}
            <div
              className={`absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center text-[10px] font-bold ${
                alert.isActive
                  ? "translate-x-8 text-green-600"
                  : "translate-x-0 text-red-500"
              }`}
            >
              {alert.isActive ? "ON" : "OFF"}
            </div>

            {/* Status Text */}
            <span
              className={`absolute inset-0 flex items-center body-xs  font-medium transition-opacity duration-200 text-white px-2 ${
                alert.isActive ? "justify-end pr-3" : "justify-start pl-3"
              }`}
            >
              {alert.name}
            </span>

            {/* Tooltip */}
            <ReactTooltip
              id={`toggle-btn-${alert._id}`}
              className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 body-sm   flex-grow">
        <div className="flex flex-col">
          <span className="text-gray-500">Condition</span>
          <span className="font-medium text-gray-900">
            {conditionLabels[alert.condition] || alert.condition}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Value</span>
          <span className="font-medium text-gray-900">{alert.value}</span>
        </div>

        {/* <div className="flex flex-col col-span-2">
          <span className="text-gray-500">Notification Settings</span>
          <button
            onClick={() => setIsNotificationModalOpen(true)}
            className="font-medium text-gray-900 flex space-x-2 items-center hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer"
            data-tooltip-id={`notification-settings-btn-${alert._id}`}
            data-tooltip-content="Click to change notification settings"
          >
            {Object.entries(alert.notificationSettings?.user || {})
              .filter(([mode, enabled]) => enabled)
              .map(([mode]) =>
                mode === "email" ? (
                  <Mail
                    key={mode}
                    className="w-4 h-4 text-gray-700"
                    data-tooltip-id={`${alert._id}-user-${mode}`}
                    data-tooltip-content={`User ${mode.toUpperCase()}`}
                  />
                ) : (
                  <MessageSquare
                    key={mode}
                    className="w-4 h-4 text-gray-700"
                    data-tooltip-id={`${alert._id}-user-${mode}`}
                    data-tooltip-content={`User ${mode.toUpperCase()}`}
                  />
                )
              )}
            {Object.entries(alert.notificationSettings?.admin || {})
              .filter(([mode, enabled]) => enabled)
              .map(([mode]) =>
                mode === "email" ? (
                  <Mail
                    key={mode}
                    className="w-4 h-4 text-blue-600"
                    data-tooltip-id={`${alert._id}-admin-${mode}`}
                    data-tooltip-content={`Admin ${mode.toUpperCase()}`}
                  />
                ) : (
                  <MessageSquare
                    key={mode}
                    className="w-4 h-4 text-blue-600"
                    data-tooltip-id={`${alert._id}-admin-${mode}`}
                    data-tooltip-content={`Admin ${mode.toUpperCase()}`}
                  />
                )
              )}
            {Object.values(alert.notificationSettings?.user || {}).every((v) => !v) &&
             Object.values(alert.notificationSettings?.admin || {}).every((v) => !v) && (
              <span
                data-tooltip-id={`${alert._id}-none`}
                data-tooltip-content="No notification settings configured"
              >
                None
              </span>
            )}

         
            <ReactTooltip
              id={`notification-settings-btn-${alert._id}`}
              className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
            />
            {Object.entries(alert.notificationSettings?.user || {})
              .filter(([mode, enabled]) => enabled)
              .map(([mode]) => (
                <ReactTooltip
                  key={mode}
                  id={`${alert._id}-user-${mode}`}
                  className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                />
              ))}
            {Object.entries(alert.notificationSettings?.admin || {})
              .filter(([mode, enabled]) => enabled)
              .map(([mode]) => (
                <ReactTooltip
                  key={mode}
                  id={`${alert._id}-admin-${mode}`}
                  className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                />
              ))}
            {Object.values(alert.notificationSettings?.user || {}).every((v) => !v) &&
             Object.values(alert.notificationSettings?.admin || {}).every((v) => !v) && (
              <ReactTooltip
                id={`${alert._id}-none`}
                className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
              />
            )}
          </button>
        </div> */}


{/* {heregy} */}
        <div className="flex flex-col col-span-2">
  <span className="text-gray-500">Notification Settings</span>
  <button
    onClick={() => setIsNotificationModalOpen(true)}
    className="font-medium text-gray-900 flex space-x-2 items-center hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer"
    data-tooltip-id={`notification-settings-btn-${alert._id}`}
    data-tooltip-content="Click to change notification settings"
  >
    {/* ✅ Show User modes always */}
    {Object.entries(alert.notificationSettings?.user || {})
      .filter(([mode, enabled]) => enabled)
      .map(([mode]) =>
        mode === "email" ? (
          <Mail
            key={mode}
            className="w-4 h-4 text-gray-700"
            data-tooltip-id={`${alert._id}-user-${mode}`}
            data-tooltip-content={`User ${mode.toUpperCase()}`}
          />
        ) : (
          <MessageSquare
            key={mode}
            className="w-4 h-4 text-gray-700"
            data-tooltip-id={`${alert._id}-user-${mode}`}
            data-tooltip-content={`User ${mode.toUpperCase()}`}
          />
        )
      )}

    {/* ✅ Show Admin modes ONLY if role === "admin" */}
    {userRole === "admin" &&
      Object.entries(alert.notificationSettings?.admin || {})
        .filter(([mode, enabled]) => enabled)
        .map(([mode]) =>
          mode === "email" ? (
            <Mail
              key={mode}
              className="w-4 h-4 text-blue-600"
              data-tooltip-id={`${alert._id}-admin-${mode}`}
              data-tooltip-content={`Admin ${mode.toUpperCase()}`}
            />
          ) : (
            <MessageSquare
              key={mode}
              className="w-4 h-4 text-blue-600"
              data-tooltip-id={`${alert._id}-admin-${mode}`}
              data-tooltip-content={`Admin ${mode.toUpperCase()}`}
            />
          )
        )}

    {/* ✅ Handle None case */}
    {Object.values(alert.notificationSettings?.user || {}).every((v) => !v) &&
     (userRole !== "admin" ||
      Object.values(alert.notificationSettings?.admin || {}).every((v) => !v)) && (
      <span
        data-tooltip-id={`${alert._id}-none`}
        data-tooltip-content="No notification settings configured"
      >
        None
      </span>
    )}

    {/* Tooltips */}
    <ReactTooltip
      id={`notification-settings-btn-${alert._id}`}
      className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
    />

    {Object.entries(alert.notificationSettings?.user || {})
      .filter(([mode, enabled]) => enabled)
      .map(([mode]) => (
        <ReactTooltip
          key={mode}
          id={`${alert._id}-user-${mode}`}
          className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
        />
      ))}

    {userRole === "admin" &&
      Object.entries(alert.notificationSettings?.admin || {})
        .filter(([mode, enabled]) => enabled)
        .map(([mode]) => (
          <ReactTooltip
            key={mode}
            id={`${alert._id}-admin-${mode}`}
            className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
          />
        ))}

    {Object.values(alert.notificationSettings?.user || {}).every((v) => !v) &&
     (userRole !== "admin" ||
      Object.values(alert.notificationSettings?.admin || {}).every((v) => !v)) && (
      <ReactTooltip
        id={`${alert._id}-none`}
        className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
      />
    )}
  </button>
</div>

      </div>

      {/* Notification Settings Modal */}
      {isNotificationModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-gray-500 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notification Settings</h3>
              <button
                onClick={() => setIsNotificationModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-3">User</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.user.email}
                      onChange={(e) => handleNotificationSettingChange("user", "email", e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-gray-700" />
                      <span className="text-gray-700">Email</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.user.sms}
                      onChange={(e) => handleNotificationSettingChange("user", "sms", e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-gray-700" />
                      <span className="text-gray-700">SMS</span>
                    </div>
                  </label>
                </div>
              </div>

           {userRole==="admin" && (   <div>
                <h4 className="font-medium text-gray-700 mb-3">Admin</h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.admin.email}
                      onChange={(e) => handleNotificationSettingChange("admin", "email", e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">Email</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.admin.sms}
                      onChange={(e) => handleNotificationSettingChange("admin", "sms", e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">SMS</span>
                    </div>
                  </label>
                </div>
              </div>)}
            </div>

            <div className="p-4 border-t border-gray-500 flex justify-end space-x-3">
              <button
                onClick={() => setIsNotificationModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveNotificationSettings}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AlertCondition = ({ meterId, onClose, isAdminView, searchTerm, onSearchChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { alerts, availableMeters, loading, error } = useSelector(
    (state) => state.alerts
  );

  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const isAdmin = userRole === "admin";
  const isUser = userRole === "user";
  const { id } = useSelector((state) => state.auth.user);

  const [activeAlertTab, setActiveAlertTab] = useState("system");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const conditionOptions = [
    { value: ">", label: "Greater than" },
    { value: "<", label: "Less than" },
    { value: ">=", label: "Greater than or equal" },
    { value: "<=", label: "Less than or equal" },
    { value: "==", label: "Equal to" },
    { value: "!=", label: "Not equal to" },
  ];

  const [formData, setFormData] = useState({
    alertName: "",
    alertType: null,
    condition: conditionOptions[0],
    value: "",
    notificationSettings: {
      user: { email: false, sms: false },
      admin: { email: true, sms: false }, // Default: admin email enabled
    },
    meterIds: [],
    isSystemAlert: false,
    editable: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = {};

        if (userRole === "admin") {
          params.isSystemAlert = activeAlertTab === "system";
        } else if (userRole === "user") {
          if (activeAlertTab === "system") {
            params.isSystemAlert = true;
          } else {
            params.isSystemAlert = false;
          }
        }

        await dispatch(fetchAlerts(params)).unwrap();

        if (userRole === "admin") {
          await dispatch(
            fetchAvailableMeters(activeAlertTab === "user")
          ).unwrap();
        } else if (userRole === "user") {
          await dispatch(fetchAvailableMeters(false)).unwrap();
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to fetch alerts data");
      }
    };

    fetchData();
  }, [dispatch, meterId, activeAlertTab, userRole]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAlertError());
    }
  }, [error, dispatch]);

  const meterOptions = availableMeters.map((meter) => ({
    value: meter._id,
    label: meter.name || meter.meterSerialNumber,
  }));

  const alertTypeOptions = [
    { value: "Low Balance", label: "Low Balance" },
    { value: "Balance Expired", label: "Balance Expired" },
    { value: "High Load Usage", label: "High Load Usage" },
    { value: "Over Voltage Warning", label: "Over Voltage Warning" },
    // { value: "Magnetic Interference", label: "Magnetic Interference" },
    { value: "Reminder to Recharge", label: "Reminder to Recharge" },
  ];

  const toggleAlertStatus = (id, currentStatus) => {
    dispatch(
      updateAlert({
        id,
        updateData: { isActive: !currentStatus },
      })
    );
  };

  const normalizeMeterIds = (arr) =>
    (arr || [])
      .map((x) => {
        if (typeof x === "string") return x;
        if (x && typeof x === "object") return x._id || x.value || "";
        return "";
      })
      .filter(Boolean);

  const handleEditAlert = (alert) => {
    const currentUserRole = userRole;
    const currentUserId = userId;

    if (currentUserRole === "user") {
      if (alert.createdBy !== "user" || alert.userId !== currentUserId) {
        toast.error("You can only edit alerts you created");
        return;
      }
    }

    if (!alert.editable) {
      toast.error("This alert type cannot be edited");
      return;
    }

    const selectedIds = alert.meterIds
      ? alert.meterIds.map((id) =>
          typeof id === "object" ? id._id || id.value || id : id
        )
      : [];

    setFormData({
      alertName: alert.alertName,
      alertType: { value: alert.alertType, label: alert.alertType },
      condition:
        conditionOptions.find((opt) => opt.value === alert.condition) ||
        conditionOptions[0],
      value: alert.value,
      notificationSettings: { ...alert.notificationSettings },
      meterIds: selectedIds,
      isSystemAlert: alert.isSystemAlert,
      editable: alert.editable,
    });
    setEditingId(alert._id);
    setIsModalOpen(true);
  };

  const handleDeleteAlert = (id) => {
    const alertToDelete = alerts.find((alert) => alert._id === id);
    if (!alertToDelete) return;

    if (userRole === "user") {
      if (
        alertToDelete.createdBy !== "user" ||
        alertToDelete.userId !== userId
      ) {
        toast.error("You can only delete alerts you created");
        return;
      }
    } else if (userRole === "admin") {
      if (alertToDelete.isSystemAlert) {
        toast.error("System alerts cannot be deleted");
        return;
      }
      if (
        alertToDelete.createdBy === "user" &&
        alertToDelete.adminId !== userId
      ) {
        toast.error("You can only delete alerts from your users");
        return;
      }
    }

    dispatch(deleteAlert(id));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "isSystemAlert") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        meterIds: checked ? [] : prev.meterIds,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleNotificationSettingChange = (recipient, mode, checked) => {
    setFormData((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [recipient]: {
          ...prev.notificationSettings[recipient],
          [mode]: checked,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.alertName ||
      !formData.alertType ||
      (!formData.isSystemAlert && formData.meterIds.length === 0)
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    setIsSubmitting(true);
    
    // Prepare notification settings based on user role
    let finalNotificationSettings;
    
    if (userRole === "user") {
      // For users: only set user notifications, admin notifications default to false
      finalNotificationSettings = {
        user: formData.notificationSettings.user,
        admin: { email: false, sms: false }
      };
    } else {
      // For admins: use the settings from the form
      finalNotificationSettings = formData.notificationSettings;
    }

    const alertData = {
      alertName: formData.alertName,
      alertType: formData.alertType.value,
      condition: formData.condition.value,
      value: formData.value,
      notificationSettings: finalNotificationSettings,
      meterIds: formData.meterIds,
      isActive: true,
      isSystemAlert: formData?.isSystemAlert ?? false,
      editable: formData.editable,
    };

    try {
      if (editingId) {
        await dispatch(
          updateAlert({ id: editingId, updateData: alertData })
        ).unwrap();
        toast.success("Alert updated successfully");
      } else {
        await dispatch(createAlert(alertData)).unwrap();
        toast.success("Alert created successfully");
      }

      resetForm();
      setIsModalOpen(false);
      setEditingId(null);
    } catch (error) {
      console.log("----errr-",error)
      toast.error(error.message || "Failed to save alert");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      alertName: "",
      alertType: null,
      condition: conditionOptions[0],
      value: "",
      notificationSettings: {
        user: { email: false, sms: false },
        admin: { email: true, sms: false }, // Default: admin email enabled
      },
      meterIds: [],
      isSystemAlert: false,
      editable: true,
    });
  };

  const systemAlerts = alerts.filter(
    (alert) => alert && alert.isSystemAlert
  );

  let userAlerts = alerts.filter(
    (alert) =>
      alert &&
      !alert.isSystemAlert &&
      (userRole === "admin" ||
        (alert.userId === userId && alert.createdBy === "user"))
  );

  const filteredAlerts = (activeAlertTab === "system" ? systemAlerts : userAlerts).filter(
    (alert) => {
      const matchesSearch =
        searchTerm === "" ||
        alert.alertName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.value?.toString().includes(searchTerm) ||
        alert.condition?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    }
  );

  if (loading && alerts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm p-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="heading-xl   font-semibold text-gray-900">
            {activeAlertTab === "system" ? "System Alerts" : "User Alerts"}
          </h2>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            data-tooltip-id="create-alert-btn"
            data-tooltip-content="Create a new alert condition"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Alert
            <ReactTooltip
              id="create-alert-btn"
              className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
            />
          </button>
        </div>

        {searchTerm && (
          <div className="mb-3 body-sm   text-gray-600">
            Showing {filteredAlerts.length} alert(s) matching "{searchTerm}"
            <button
              onClick={() => onSearchChange("")}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        )}
        <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-inner">
          <button
            onClick={() => setActiveAlertTab("system")}
            className={`px-4 py-2 rounded-md body-sm   font-medium transition-colors ${
              activeAlertTab === "system"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
            data-tooltip-id="system-alerts-tab"
            data-tooltip-content="System-wide alerts"
          >
            System Alerts
            <ReactTooltip
              id="system-alerts-tab"
              className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
            />
          </button>
          {/* <button
            onClick={() => setActiveAlertTab("user")}
            className={`px-4 py-2 rounded-md body-sm   font-medium transition-colors ${
              activeAlertTab === "user"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text */}


                 <button
              onClick={() => setActiveAlertTab("user")}
              className={`px-4 py-2 rounded-md body-sm   font-medium transition-colors ${
                activeAlertTab === "user"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
              data-tooltip-id="user-alerts-tab"
              data-tooltip-content="User-specific alerts"
            >
              User Alerts
              <ReactTooltip
                id="user-alerts-tab"
                className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
              />
            </button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <SystemAlertCard
                key={alert._id}
                alert={alert}
                toggleAlertStatus={toggleAlertStatus}
                handleEditAlert={handleEditAlert}
                handleDeleteAlert={handleDeleteAlert}
              />
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No alerts found" : "No alerts configured"}
              </h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search criteria" : "Add a new alert to get started"}
              </p>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
              {/* Header - Sticky */}
              <div className="sticky top-0 bg-white flex justify-between items-center border-b border-gray-300 p-4 z-10 rounded-t-lg">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingId ? "Edit Alert" : "Create New Alert"}
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <form
                  id="alertForm"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Alert Name */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Alert Name *
                    </label>
                    <input
                      type="text"
                      name="alertName"
                      value={formData.alertName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                      placeholder="Enter alert name"
                      required
                    />
                  </div>

                  {/* Alert Type */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Alert Type *
                    </label>
                    <Select
                      options={alertTypeOptions}
                      value={formData.alertType}
                      onChange={(selected) =>
                        setFormData({ ...formData, alertType: selected || null })
                      }
                      isSearchable
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select alert type"
                      required
                    />
                  </div>

                  {/* Condition & Threshold */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Condition *
                      </label>
                      <Select
                        options={conditionOptions}
                        value={formData.condition}
                        onChange={(selected) =>
                          setFormData({ ...formData, condition: selected })
                        }
                        className="basic-single"
                        classNamePrefix="select"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Threshold Value *
                      </label>
                      <input
                        type="number"
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                        placeholder="Enter value"
                        required
                      />
                    </div>
                  </div>

                  {/* Select Meters */}
                  {(!formData.isSystemAlert ||
                    (formData.editable && userRole === "admin")) && (
                    <div>
                      <div className="flex justify-between items-center px-2 mb-2">
                        <label className="block text-gray-700 font-medium">
                          Select Meter(s) {!formData.isSystemAlert && "*"}
                        </label>
                        {meterOptions.length > 0 && (
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={
                                formData.meterIds.length === meterOptions.length
                              }
                              onChange={(e) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  meterIds: e.target.checked
                                    ? meterOptions.map((m) => m.value)
                                    : [],
                                }));
                              }}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <span className="text-gray-700 font-medium">
                              Select All
                            </span>
                            </label>
                        )}
                      </div>

                      <Select
                        isMulti
                        isSearchable
                        name="meters"
                        options={meterOptions}
                        value={meterOptions.filter(
                          (opt) =>
                            formData.meterIds.includes(opt.value) ||
                            formData.meterIds.includes(opt._id)
                        )}
                        onChange={(selected) =>
                          setFormData((prev) => ({
                            ...prev,
                            meterIds: selected
                              ? selected.map((opt) => opt.value)
                              : [],
                          }))
                        }
                        isDisabled={userRole === "user" && formData.isSystemAlert}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Search & select meters..."
                      />
                      {userRole === "user" && formData.isSystemAlert && (
                        <p className="body-sm   text-gray-500 mt-1">
                          System alerts apply to all meters automatically
                        </p>
                      )}
                    </div>
                  )}

                  {/* Notification Settings */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                     Notification Settings
                    </label>
                    <div className="flex justify-between space-y-4 border border-gray-300 rounded-lg p-4 ">
                      <div>
                          {userRole === "admin" &&(<h4 className="font-medium text-gray-700 mb-2">User</h4>)}
                     
                        <div className="flex space-x-6">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.notificationSettings.user.email}
                              onChange={(e) => handleNotificationSettingChange("user", "email", e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="body-sm   text-gray-700">Email</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.notificationSettings.user.sms}
                              onChange={(e) => handleNotificationSettingChange("user", "sms", e.target.checked)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="body-sm   text-gray-700">SMS</span>
                          </label>
                        </div>
                      </div>

                      {userRole === "admin" && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Admin</h4>
                          <div className="flex space-x-6">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={formData.notificationSettings.admin.email}
                                onChange={(e) => handleNotificationSettingChange("admin", "email", e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="body-sm   text-gray-700">Email</span>
                            </label>
                                                       <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={formData.notificationSettings.admin.sms}
                                onChange={(e) => handleNotificationSettingChange("admin", "sms", e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="body-sm   text-gray-700">SMS</span>
                            </label>
                          </div>
                        </div>
                      )}
                      {/* {userRole === "user" && (
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="body-sm   text-gray-600">
                            <HelpCircle className="h-4 w-4 inline mr-1" />
                            Admin notifications will be set to default values
                          </p>
                        </div>
                      )} */}
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer - Sticky */}
              <div className="sticky bottom-0 bg-white flex justify-end space-x-3 p-4 border-t border-gray-200 rounded-b-lg">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="alertForm"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Processing..."
                    : editingId
                    ? "Update Alert"
                    : "Create Alert"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    // </div>
  )
};

const AlertAndNotification = () => {
  const [viewAlertConditions, setViewAlertConditions] = useState(false);
  const [selectedMeterForAlerts, setSelectedMeterForAlerts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const isAdmin = userRole === "admin";
  const isUser = userRole === "user";

  const userNotifications = useSelector(selectUserNotifications);
  const adminNotifications = useSelector(selectAdminNotifications);
  const usersList = useSelector(selectUsersList);
  const loading = useSelector(selectNotificationsLoading);
  const error = useSelector(selectNotificationsError);
  const selectedUser = useSelector(selectSelectedUser);

  const [activeTab, setActiveTab] = useState("users");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(setHeaderTitle("Alert & Notification"));
    dispatch(
      setBreadcrumbs([
        { label: "Alert & Notification", link: "/alertandnotification" },
      ])
    );
  }, [dispatch]);

  useEffect(() => {
    if (isAdmin && !selectedUser && activeTab === "users") {
      dispatch(fetchAdminNotifications(userId));
    } else if (isAdmin && activeTab === "adminNotifications") {
      dispatch(fetchAdminNotifications(userId));
    } else if (selectedUser) {
      dispatch(fetchUserNotifications(selectedUser));
    } else if (isUser) {
      dispatch(fetchUserNotifications(userId));
    }
  }, [isAdmin, isUser, selectedUser, activeTab, userId, dispatch]);

  const handleToggleGlobalNotificationStatus = async (newStatus) => {
    const targetUserId = selectedUser || userId;
    try {
      dispatch(updateUserStatus({ userId: targetUserId, status: newStatus }));
      await dispatch(
        toggleNotificationStatus({
          userId: targetUserId,
          status: newStatus,
        })
      ).unwrap();
    } catch (error) {
      toast.error("Failed to update notification status");
      dispatch(
        updateUserStatus({
          userId: targetUserId,
          status: newStatus === "enabled" ? "disabled" : "enabled",
        })
      );
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "enabled" ? "disabled" : "enabled";
    try {
      dispatch(updateUserStatus({ userId, status: newStatus }));
      await dispatch(
        toggleNotificationStatus({
          userId,
          status: newStatus,
        })
      ).unwrap();
    } catch (error) {
      toast.error("Failed to update user notification status");
      dispatch(
        updateUserStatus({
          userId,
          status: currentStatus,
        })
      );
    }
  };

  const handleUserSelection = (userId) => {
    dispatch(setSelectedUser(userId));
    setCurrentPage(1);
    setViewAlertConditions(false);
  };

  const handleBackToList = () => {
    dispatch(setSelectedUser(null));
    setCurrentPage(1);
    setViewAlertConditions(false);
  };

  useEffect(() => {
    setViewAlertConditions(false);
  }, [activeTab]);

  const filteredNotifications =
    (isUser || selectedUser ? userNotifications : adminNotifications)?.filter(
      (notification) => {
        const matchesSearch =
          searchTerm === "" ||
          notification.alertType
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          notification.value
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          notification.message
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (isAdmin &&
            !selectedUser &&
            (notification.userName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
              notification.meterId
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())));
        return matchesSearch;
      }
    ) || [];

  const filteredUsers = usersList?.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.meterId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.meterName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const currentItems =
    isUser || selectedUser
      ? filteredNotifications.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : activeTab === "adminNotifications"
      ? filteredNotifications.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : filteredUsers.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  const totalPages = Math.ceil(
    (isUser || selectedUser
      ? filteredNotifications.length
      : activeTab === "adminNotifications"
      ? filteredNotifications.length
      : filteredUsers.length) / itemsPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const getPaginationRange = () => {
    const totalPageCount = totalPages;
    const currentPageNum = currentPage;
    const siblingCount = 1;
    const DOTS = "...";

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPageNum - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPageNum + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  };

  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const getAlertIcon = (alertType) => {
    const iconMap = {
      "Low Balance": <Battery className="h-5 w-5" />,
      "Balance Expired": <AlertTriangle className="h-5 w-5" />,
      "Recharge Successful": <CreditCard className="h-5 w-5" />,
      "Recharge Failed": <AlertCircle className="h-5 w-5" />,
      "High Load Usage": <Zap className="h-5 w-5" />,
      "Spike in Usage": <TrendingUp className="h-5 w-5" />,
      "Daily/Weekly Report": <BarChart3 className="h-5 w-5" />,
      "No Usage Detected": <Activity className="h-5 w-5" />,
      "Garbage Uplink Data": <AlertTriangle className="h-5 w-5" />,
      "Reverse Polarity": <Shield className="h-5 w-5" />,
      "Magnetic Interference": <Magnet className="h-5 w-5" />,
      "Current Imbalance": <Zap className="h-5 w-5" />,
      "Neutral Voltage Issue": <AlertTriangle className="h-5 w-5" />,
      "Meter Offline": <WifiOff className="h-5 w-5" />,
      "Reminder to Recharge": <Bell className="h-5 w-5" />,
      "Festival Offer": <Gift className="h-5 w-5" />,
      "High Load vs Previous": <TrendingUp className="h-5 w-5" />,
      "System Alert": <Activity className="h-5 w-5" />,
      "Security Alert": <Shield className="h-5 w-5" />,
      "Maintenance Required": <AlertTriangle className="h-5 w-5" />,
      "Over Voltage Warning": <AlertTriangle className="h-5 w-5" />,
    };
    return iconMap[alertType] || <Bell className="h-5 w-5" />;
  };

  const getAlertColors = (alertType) => {
    const colorMap = {
      "Low Balance": {
        bg: "bg-orange-50",
        icon: "text-orange-600",
        border: "border-orange-200",
      },
      "Balance Expired": {
        bg: "bg-red-50",
        icon: "text-red-600",
        border: "border-red-200",
      },
      "Recharge Successful": {
        bg: "bg-green-50",
        icon: "text-green-600",
        border: "border-green-200",
      },
      "Recharge Failed": {
        bg: "bg-red-50",
        icon: "text-red-600",
        border: "border-red-200",
      },
      "High Load Usage": {
        bg: "bg-red-50",
        icon: "text-red-600",
        border: "border-red-200",
      },
      "Spike in Usage": {
        bg: "bg-yellow-50",
        icon: "text-yellow-600",
        border: "border-yellow-200",
      },
      "Over Voltage Warning": {
        bg: "bg-red-50",
        icon: "text-red-600",
        border: "border-red-200",
      },
    };
    return (
      colorMap[alertType] || {
        bg: "bg-gray-50",
        icon: "text-gray-600",
        border: "border-gray-200",
      }
    );
  };

  const showGlobalToggle = !(isAdmin && !selectedUser && activeTab === "users");

  return (
    <div className="bg-blue-200/10 min-h-screen p-4 sm:p-6">
      
      <div className="max-w-7xl mx-auto">
        {/* <div className="sticky top-0 left-0 right-0 z-10 bg-white shadow-sm rounded-lg mb-6">
          <div className="p-4 rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="heading-xl   font-semibold text-gray-900">
                Alert & Notification
              </h1>

              {isAdmin && (
                <div className="flex-1 w-full max-w-md">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder={
                        viewAlertConditions
                          ? "Search alerts..."
                          : !selectedUser && activeTab === "users" && isAdmin
                          ? "Search users..."
                          : "Search notifications..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
                    />
                  </div>
                </div>
              )}

              {isUser && (
                <div className="flex-1 w-full max-w-md">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <div className="flex items-center gap-1">
                    <label
                      htmlFor="view-type-select"
                      className="text-medium font-medium text-gray-700"
                    >
                      Notification Type:
                    </label>

                    <div className="relative">
                      <select
                        id="view-type-select"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 body-sm   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-tooltip-id="view-type-select-tooltip"
                        data-tooltip-content="Select view type"
                      >
                        <option value="users">Users</option>
                        <option value="adminNotifications">Admin</option>
                      </select>
                      <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <ReactTooltip
                        id="view-type-select-tooltip"
                        className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setViewAlertConditions(true);
                    setSelectedMeterForAlerts(selectedUser || userId);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  data-tooltip-id="manage-alerts-btn"
                  data-tooltip-content={
                    isAdmin && !selectedUser
                      ? "Click to Configure alerts"
                      : "Click to Configure alerts"
                  }
                >
                  Manage Alerts
                  <ReactTooltip
                    id="manage-alerts-btn"
                    className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                  />
                </button>
              </div>
            </div>
          </div>
        </div> */}



          <div className="sticky top-0 z-10 bg-white shadow-sm rounded-lg mb-6">
          <div className="p-4  rounded-t-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* <h1 className="heading-xl   font-semibold text-gray-900"> */}
                     <h1 className="body-md   sm:text-lg md:heading-xl   font-semibold text-gray-900">
                Alert & Notification
              </h1>

              {isAdmin && (
                // <div className="flex-1 w-full max-w-md">
                //   <div className="relative">
                //     <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                //     <input
                //       type="text"
                //       placeholder={
                //         !selectedUser && activeTab === "users"
                //           ? "Search users..."
                //           : "Search notifications..."
                //       }
                //       value={searchTerm}
                //       onChange={(e) => setSearchTerm(e.target.value)}
                //       className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
                //     />
                //   </div>
                // </div>

                        <div className="flex-1 w-full max-w-md">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={
                      viewAlertConditions
                        ? "Search alerts..."
                        : !selectedUser && activeTab === "users" && isAdmin
                        ? "Search users..."
                        : "Search notifications..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
                  />
                </div>
              </div>
              )}

              {isUser && (
                <div className="flex-1 w-full max-w-md">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent body-sm  "
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                {/* {showGlobalToggle && ( */}
                {isAdmin && (
                  <div className="flex items-center gap-1">
                    {/* Heading */}
                    <label
                      htmlFor="view-type-select"
                      className="text-medium font-medium text-gray-700"
                    >
                      Notification Type:
                    </label>

                    {/* Select with tooltip */}
                    <div className="relative">
                      <select
                        id="view-type-select"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                        className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 body-sm   focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-tooltip-id="view-type-select-tooltip"
                        data-tooltip-content="Select view type"
                      >
                        <option value="users">Users</option>
                        <option value="adminNotifications">Admin</option>
                      </select>
                      <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <ReactTooltip
                        id="view-type-select-tooltip"
                        className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setViewAlertConditions(true);
                    setSelectedMeterForAlerts(selectedUser || userId);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  data-tooltip-id="manage-alerts-btn"
                  data-tooltip-content={
                    isAdmin && !selectedUser
                      ? " Click to Configure alerts "
                      : " Click to Configure  alerts"
                  }
                >
                  Manage Alerts
                  <ReactTooltip
                    id="manage-alerts-btn"
                    className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading data...</p>
              </div>
            ) : viewAlertConditions ? (
              <AlertCondition
                meterId={selectedMeterForAlerts}
                onClose={() => setViewAlertConditions(false)}
                isAdminView={isAdmin && !selectedUser}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            ) : (
              <div className="space-y-4">
                {(isUser || selectedUser) && (
                  <>
                    {filteredNotifications.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentItems.map((notification) => {
                          const colors = getAlertColors(notification.alertType);
                          return (
                            <div
                              key={notification._id}
                              className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md cursor-pointer`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                                    <span className={colors.icon}>
                                      {getAlertIcon(notification.alertType)}
                                    </span>
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                                      <h3 className="font-semibold text-gray-900">
                                        {notification.alertType}
                                      </h3>
                                      <span
                                        className={`px-2 py-1 rounded-full body-xs  font-medium ${
                                          notification.mode.includes("Text")
                                            ? "text-blue-600 bg-blue-100"
                                            : "text-purple-600 bg-purple-100"
                                        }`}
                                        data-tooltip-id={`notification-mode-${notification._id}`}
                                        data-tooltip-content={
                                          notification.mode.includes("Text")
                                            ? "SMS notification"
                                            : "Email notification"
                                        }
                                      >
                                        {notification.mode}
                                        <ReactTooltip
                                          id={`notification-mode-${notification._id}`}
                                          className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                                        />
                                      </span>
                                    </div>

                                    <p className="text-sm text-gray-700 mb-3">
                                      {notification.message}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 body-sm   mb-4">
                                      <div>
                                        <span className="font-medium text-gray-600">
                                          Value:
                                        </span>
                                        <div className="text-gray-900 font-semibold">
                                          {notification.value}
                                        </div>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600">
                                          Time:
                                        </span>
                                        <div className="text-gray-900">
                                          {new Date(
                                            notification.time
                                          ).toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No notifications found
                        </h3>
                        <p className="text-gray-600">
                          {searchTerm
                            ? "Try adjusting your search criteria"
                            : "You're all caught up!"}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {isAdmin && !selectedUser && activeTab === "adminNotifications" && (
                  <>
                    {filteredNotifications.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentItems.map((notification) => {
                          const colors = getAlertColors(notification.alertType);
                          return (
                            <div
                              key={notification._id}
                              className={`${colors.bg} ${colors.border} border rounded-lg p-4 transition-all hover:shadow-md cursor-pointer`}
                              data-tooltip-id={`admin-notification-${notification._id}`}
                              data-tooltip-content="Click for details"
                            >
                              <ReactTooltip
                                id={`admin-notification-${notification._id}`}
                                className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                              />
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                                    <span className={colors.icon}>
                                      {getAlertIcon(notification.alertType)}
                                    </span>
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                                      <h3 className="font-semibold text-gray-900">
                                        {notification.alertType}
                                      </h3>
                                      <span
                                        className="body-sm   text-gray-600"
                                        data-tooltip-id={`user-name-${notification._id}`}
                                        data-tooltip-content="User who received this notification"
                                      >
                                        User: {notification.userName || "Unknown"}
                                        <ReactTooltip
                                          id={`user-name-${notification._id}`}
                                          className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                                        />
                                      </span>
                                      <span
                                        className={`px-2 py-1 rounded-full body-xs  font-medium ${
                                          notification.mode.includes("Text")
                                            ? "text-blue-600 bg-blue-100"
                                            : "text-purple-600 bg-purple-100"
                                        }`}
                                        data-tooltip-id={`admin-notification-mode-${notification._id}`}
                                        data-tooltip-content={
                                          notification.mode.includes("Text")
                                            ? "SMS notification"
                                            : "Email notification"
                                        }
                                      >
                                        {notification.mode}
                                        <ReactTooltip
                                          id={`admin-notification-mode-${notification._id}`}
                                          className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                                        />
                                      </span>
                                    </div>

                                    <p className="text-gray-700 mb-3">
                                      {notification.message}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 body-sm   mb-4">
                                      <div>
                                        <span className="font-medium text-gray-600">
                                          Value:
                                        </span>
                                        <div className="text-gray-900 font-semibold">
                                          {notification.value}
                                        </div>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600">
                                          Time:
                                        </span>
                                        <div className="text-gray-900">
                                          {new Date(
                                            notification.time
                                          ).toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No admin notifications found
                        </h3>
                        <p className="text-gray-600">
                          {searchTerm
                            ? "Try adjusting your search criteria"
                            : "No admin notifications available"}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {isAdmin && !selectedUser && activeTab === "users" && (
                  <>
                    {filteredUsers.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentItems.map((user) => (
                          <div
                            key={user._id}
                            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => handleUserSelection(user.userId)}
                            data-tooltip-id={`user-card-${user._id}`}
                            data-tooltip-content="Click to view user notifications"
                          >
                            <ReactTooltip
                              id={`user-card-${user._id}`}
                              className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                            />
                            <div className="flex flex-col">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 rounded-lg bg-gray-100">
                                    <User className="h-6 w-6 text-gray-600" />
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 body-sm  ">
                                <div>
                                  <h3 className="font-semibold text-gray-900">
                                    {user.userName}
                                  </h3>
                                  <p className="body-sm   text-gray-600">
                                    ID: {user.userId}
                                  </p>
                                  <p className="mt-2 text-gray-500">
                                    Last Sent
                                  </p>
                                  <p className="font-medium">
                                    {user.lastNotificationDate
                                      ? new Date(
                                          user.lastNotificationDate
                                        ).toLocaleDateString()
                                      : "Never"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-gray-500">Meter ID</p>
                                  <p className="font-medium">
                                    {user.meterId || "M-0000"}
                                  </p>
                                  <p className="mt-2 text-gray-500">Count</p>
                                  <p className="font-medium">
                                    {user.notificationCount || 0}
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-end items-center mt-4">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleUserStatus(
                                      user.userId,
                                      user.status
                                    );
                                  }}
                                  className={`px-3 py-1 rounded-md body-xs  font-medium flex items-center justify-center ${
                                    user.status === "enabled"
                                      ? "bg-red-100 hover:bg-red-200 text-red-600"
                                      : "bg-green-100 hover:bg-green-200 text-green-600"
                                  }`}
                                  data-tooltip-id={`toggle-status-${user._id}`}
                                  data-tooltip-content={
                                    user.status === "enabled"
                                      ? "Disable notifications for this user"
                                      : "Enable notifications for this user"
                                  }
                                >
                                  {user.status === "enabled"
                                    ? "Disable"
                                    : "Enable"}
                                  <ReactTooltip
                                    id={`toggle-status-${user._id}`}
                                    className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                                  />
                                </button>
                                <ChevronRight
                                  className="h-5 w-5 text-gray-400 ml-2"
                                  data-tooltip-id={`view-user-${user._id}`}
                                  data-tooltip-content="View user notifications"
                                />
                                <ReactTooltip
                                  id={`view-user-${user._id}`}
                                  className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <User2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No users found
                        </h3>
                        <p className="text-gray-600">
                          {searchTerm
                            ? "Try adjusting your search criteria"
                            : "No users available"}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {!viewAlertConditions &&
              (((isUser || selectedUser || activeTab === "adminNotifications") &&
                filteredNotifications.length > itemsPerPage) ||
              (isAdmin && !selectedUser && activeTab === "users" && filteredUsers.length > itemsPerPage)) && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                  <div className="body-sm   text-gray-600">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(
                      currentPage * itemsPerPage,
                      isAdmin && !selectedUser && activeTab === "users"
                        ? filteredUsers.length
                        : filteredNotifications.length
                    )}{" "}
                    of{" "}
                    {isAdmin && !selectedUser && activeTab === "users"
                      ? filteredUsers.length
                      : filteredNotifications.length}{" "}
                    {isAdmin && !selectedUser && activeTab === "users"
                      ? "users"
                      : "items"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md border ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      data-tooltip-id="prev-page-btn"
                      data-tooltip-content="Previous page"
                    >
                      Previous
                      <ReactTooltip
                        id="prev-page-btn"
                        className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                      />
                    </button>

                    {getPaginationRange().map((pageNumber, index) => {
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
                          onClick={() => goToPage(pageNumber)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === pageNumber
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-50 border"
                          }`}
                          data-tooltip-id={`page-${pageNumber}-btn`}
                          data-tooltip-content={`Go to page ${pageNumber}`}
                        >
                          {pageNumber}
                          <ReactTooltip
                            id={`page-${pageNumber}-btn`}
                            className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                          />
                        </button>
                      );
                    })}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md border ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                      data-tooltip-id="next-page-btn"
                      data-tooltip-content="Next page"
                    >
                      Next
                      <ReactTooltip
                        id="next-page-btn"
                        className="!bg-white !text-gray-700 !shadow-md !border !border-gray-200"
                      />
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertAndNotification;
