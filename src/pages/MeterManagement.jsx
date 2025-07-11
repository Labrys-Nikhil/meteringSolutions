// import React from "react";

// const meterOptions = [
//   { title: "Add Meter", description: "Total Users & Active Meters" },
//   { title: "Update Meter Configurations", description: "Total Users & Active Meters" },
//   { title: "Check Meter Fault", description: "Total Users & Active Meters" },
//   { title: "Control Meter Remotely", description: "Total Users & Active Meters" },
// ];

// const MeterManagement = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Meter Management</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {meterOptions.map((option, index) => (
//           <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
//             <p className="text-sm text-gray-500">{option.description}</p>
//             <h2 className="text-xl font-bold">{option.title}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MeterManagement;

// import React, { useState } from "react";
// import { FaPowerOff, FaCog } from "react-icons/fa";

// const MeterManagement = () => {
//   const [meters, setMeters] = useState([
//     { id: "MTR-2025-001", location: "123 Main St, City", status: "Active", lastReading: "245.6 kWh", lastUpdated: "2 mins ago" },
//   ]);

//   const addMeter = () => {
//     const newMeter = {
//       id: `MTR-2025-00${meters.length + 1}`,
//       location: `Location ${meters.length + 1}`,
//       status: "Inactive",
//       lastReading: "0 kWh",
//       lastUpdated: "Never",
//     };
//     setMeters([...meters, newMeter]);
//   };

//   return (
//     <div>
//       <table className="w-full border-collapse bg-white rounded-lg shadow-md">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 text-left">Meter ID</th>
//             <th className="p-2">Location</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Last Reading</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {meters.map((meter) => (
//             <tr key={meter.id} className="border-b">
//               <td className="p-2">{meter.id}</td>
//               <td className="p-2">{meter.location}</td>
//               <td className="p-2">{meter.status}</td>
//               <td className="p-2">{meter.lastReading} ({meter.lastUpdated})</td>
//               <td className="p-2 flex space-x-2">
//                 <FaPowerOff className="text-green-500 cursor-pointer" />
//                 <FaCog className="text-gray-500 cursor-pointer" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MeterManagement;

// MeterManagement.js
// import React, { useState } from "react";
// import { FaBolt, FaTachometerAlt, FaExclamationTriangle, FaPlus, FaPowerOff, FaCog } from "react-icons/fa";

// const MeterManagement = () => {
//   const [meters, setMeters] = useState([
//     { id: "MTR-2025-001", location: "123 Main St, City", status: "Active", lastReading: "245.6 kWh", lastUpdated: "2 mins ago" },
//   ]);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Meter Management</h2>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center shadow-md">
//           <FaPlus className="mr-2" /> Add New Meter
//         </button>
//       </div>
//       <div className="grid grid-cols-3 gap-4 mb-4">
//         <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
//           <FaBolt className="text-blue-500 text-3xl mr-3" />
//           <div>
//             <p className="text-gray-600">Total Consumption</p>
//             <h3 className="text-xl font-bold">256.8 kWh</h3>
//             <p className="text-green-500 text-sm">+2.5% from yesterday</p>
//           </div>
//         </div>
//         <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
//           <FaTachometerAlt className="text-green-500 text-3xl mr-3" />
//           <div>
//             <p className="text-gray-600">Active Meters</p>
//             <h3 className="text-xl font-bold">1,234</h3>
//             <p className="text-green-500 text-sm">98% uptime</p>
//           </div>
//         </div>
//         <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
//           <FaExclamationTriangle className="text-red-500 text-3xl mr-3" />
//           <div>
//             <p className="text-gray-600">Alerts</p>
//             <h3 className="text-xl font-bold">12</h3>
//             <p className="text-red-500 text-sm">3 critical alerts</p>
//           </div>
//         </div>
//       </div>
//       <div className="overflow-hidden rounded-lg border shadow-md">
//         <table className="w-full bg-white">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Meter ID</th>
//               <th className="p-3">Location</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Last Reading</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {meters.map((meter) => (
//               <tr key={meter.id} className="border-b">
//                 <td className="p-3">{meter.id}</td>
//                 <td className="p-3">{meter.location}</td>
//                 <td className="p-3 text-green-500">{meter.status}</td>
//                 <td className="p-3">{meter.lastReading} ({meter.lastUpdated})</td>
//                 <td className="p-3 flex space-x-2">
//                   <FaPowerOff className="text-green-500 cursor-pointer" />
//                   <FaCog className="text-gray-500 cursor-pointer" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MeterManagement;

/////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import { FaBolt, FaTachometerAlt, FaExclamationTriangle, FaPlus, FaPowerOff, FaCog } from "react-icons/fa";
// import AddMeter from "../components/meter/AddMeter";

// const MeterManagement = () => {
//   const [meters, setMeters] = useState([
//     { id: "MTR-2025-001", location: "123 Main St, City", status: "Active", lastReading: "245.6 kWh", lastUpdated: "2 mins ago" },
//   ]);

//   const [isOpenAddMeter, setIsOpenAddMeter] = useState(false);

//   const handleCancel = () =>{
//     setIsOpenAddMeter(!isOpenAddMeter)
//   }
//   const openModal = () => setIsOpenAddMeter(true);
//   const closeModal = () => setIsOpenAddMeter(false);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Meter Management</h2>
//         {/* Add Meter Button */}
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded flex items-center shadow-md hover:bg-blue-700 transition"
//           onClick={openModal}
//         >
//           <FaPlus className="mr-2" /> Add New Meter
//         </button>
//       </div>

// {/* Stats Section */}
// <div className="grid grid-cols-3 gap-4 mb-4">
//   <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
//     <FaBolt className="text-blue-500 text-3xl mr-3" />
//     <div>
//       <p className="text-gray-600">Total Consumption</p>
//       <h3 className="text-xl font-bold">256.8 kWh</h3>
//       <p className="text-green-500 text-sm">+2.5% from yesterday</p>
//     </div>
//   </div>
//   <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
//     <FaTachometerAlt className="text-green-500 text-3xl mr-3" />
//     <div>
//       <p className="text-gray-600">Active Meters</p>
//       <h3 className="text-xl font-bold">1,234</h3>
//       <p className="text-green-500 text-sm">98% uptime</p>
//     </div>
//   </div>
//   <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
//     <FaExclamationTriangle className="text-red-500 text-3xl mr-3" />
//     <div>
//       <p className="text-gray-600">Alerts</p>
//       <h3 className="text-xl font-bold">12</h3>
//       <p className="text-red-500 text-sm">3 critical alerts</p>
//     </div>
//   </div>
// </div>

//       {/* Meters Table */}
//       <div className="overflow-hidden rounded-lg border shadow-md">
//         <table className="w-full bg-white">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Meter ID</th>
//               <th className="p-3">Location</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Last Reading</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {meters.map((meter) => (
//               <tr key={meter.id} className="border-b">
//                 <td className="p-3">{meter.id}</td>
//                 <td className="p-3">{meter.location}</td>
//                 <td className="p-3 text-green-500">{meter.status}</td>
//                 <td className="p-3">{meter.lastReading} ({meter.lastUpdated})</td>
//                 <td className="p-3 flex space-x-2">
//                   <FaPowerOff className="text-green-500 cursor-pointer" />
//                   <FaCog className="text-gray-500 cursor-pointer" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Meter Modal */}
//       <AddMeter isOpen={isOpenAddMeter} closeModal={closeModal} />
//     </div>
//   );
// };

// export default MeterManagement;

// import React, { useState, useEffect } from "react";
// import {
//   FaPlus,
//   FaBolt,
//   FaTachometerAlt,
//   FaExclamationTriangle,
// } from "react-icons/fa";
// import { MdOutlineDeleteForever, MdOutlineEditNote } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import Header from "../components/header/Header";
// import AddMeter from "../components/meter/AddMeter";

// const MeterManagement = () => {
//    const dispatch = useDispatch();
//   const [meters, setMeters] = useState([]);
//   const [isOpenAddMeter, setIsOpenAddMeter] = useState(false);

//   useEffect(() => {
//       dispatch(setHeaderTitle("Onboarding"));
//       dispatch(
//         setBreadcrumbs([
//           // { label: "Home", link: "/home" },  // Updated label for clarity
//           { label: "Meter Management" },
//         ])
//       );
//     }, []);

//   const handleCancel = () => {
//     setIsOpenAddMeter((prev) => !prev);
//   };

//   const addMeter = (newMeter) => {
//     setMeters((prevMeters) => [...prevMeters, newMeter]);
//     handleCancel();
//   };

//   return (
//     <div className="bg-white  rounded-lg shadow-md min-h-screen">
//       {/* Header */}
//       <Header />

//      <div className="p-4">
//       <div className="flex mt-4 flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
//         <h2 className="text-xl sm:text-xl font-semibold">Meter Management</h2>
//         <button
//           className="bg-cyan-600 text-white px-4 py-2 rounded flex items-center shadow-md hover:bg-cyan-700 transition"
//           onClick={handleCancel}
//         >
//           <FaPlus className="mr-2" /> Add New Meter
//         </button>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
//           <FaBolt className="text-blue-500 text-3xl mr-3" />
//           <div>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Total Consumption
//             </p>
//             <h3 className="text-lg sm:text-xl font-semibold">256.8 kWh</h3>
//             <p className="text-green-500 text-xs sm:text-sm">
//               +2.5% from yesterday
//             </p>
//           </div>
//         </div>
//         <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
//           <FaTachometerAlt className="text-green-500 text-3xl mr-3" />
//           <div>
//             <p className="text-gray-600 text-sm sm:text-base">Active Meters</p>
//             <h3 className="text-lg sm:text-xl font-semibold">1,234</h3>
//             <p className="text-green-500 text-xs sm:text-sm">98% uptime</p>
//           </div>
//         </div>
//         <div className="bg-gray-100 p-4 rounded-lg flex items-center shadow-sm">
//           <FaExclamationTriangle className="text-red-500 text-3xl mr-3" />
//           <div>
//             <p className="text-gray-600 text-sm sm:text-base">Alerts</p>
//             <h3 className="text-lg sm:text-xl font-semibold">12</h3>
//             <p className="text-red-500 text-xs sm:text-sm">3 critical alerts</p>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border shadow-md">
//         <table className="min-w-full bg-white text-sm sm:text-base">
//           <thead className="bg-gray-200">
//             <tr>
//               {/* <th className="p-3 text-left font-semibold whitespace-nowrap">Meter ID</th> */}
//               <th className="p-3 text-left font-semibold whitespace-nowrap">DeviceId</th>
//               <th className="p-3 text-left font-semibold whitespace-nowrap">Name</th>
//               <th className="p-3 text-left font-semibold whitespace-nowrap">Hardware Type</th>
//               <th className="p-3 text-left font-semibold whitespace-nowrap">Connectivity</th>
//               <th className="p-3 text-left font-semibold whitespace-nowrap">Network</th>
//               <th className="p-3 text-left font-semibold whitespace-nowrap">Manufacture</th>
//               <th className="p-3 text-left font-semibold whitespace-nowrap">Location</th>
//               <th className="p-3 text-left font-semibold whitespace-nowrap">Controller</th>
//               <th className="p-3 text-left font-semibold whitespace-nowrap">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {meters.map((meter) => (
//               <tr key={meter.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{meter.id}</td>
//                 <td className="p-3">{meter.devEui}</td>
//                 <td className="p-3">{meter.name}</td>
//                 <td className="p-3">{meter.energySensor}</td>
//                 <td className="p-3">{meter.connectivity}</td>
//                 <td className="p-3">{meter.network}</td>
//                 <td className="p-3">{meter.manufacture}</td>
//                 <td className="p-3">{meter.location}</td>
//                 <td className="p-3">{meter.controller}</td>
//                 <td className="p-3 flex gap-2">
//                   <MdOutlineEditNote className="text-cyan-600 cursor-pointer hover:text-cyan-700" />
//                   <MdOutlineDeleteForever className="text-cyan-600 cursor-pointer hover:text-cyan-700" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Meter Modal */}
//       <AddMeter
//         isOpen={isOpenAddMeter}
//         handleCancel={handleCancel}
//         addMeter={addMeter}
//       />
//       </div>
//     </div>
//   );
// };

// export default MeterManagement;


// import React, { useState, useEffect } from 'react';
// import { Send, Search, Wifi, Battery, Clock, CheckCircle, XCircle, AlertCircle, Loader2, Settings, Power, RefreshCw, Gauge } from 'lucide-react';

// const MeterManagement = () => {
//   const [selectedMeter, setSelectedMeter] = useState(null);
//   const [commandType, setCommandType] = useState('');
//   const [customPayload, setCustomPayload] = useState('');
//   const [port, setPort] = useState(1);
//   const [confirmed, setConfirmed] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sending, setSending] = useState(false);
//   const [commandHistory, setCommandHistory] = useState([]);
//   const [selectedParams, setSelectedParams] = useState({});

//   // Mock data for meters
//   const [meters] = useState([
//     {
//       id: 'MTR001',
//       devEUI: '70B3D57ED0000001',
//       name: 'Building A - Floor 1',
//       status: 'online',
//       lastSeen: '2025-06-25T10:30:00Z',
//       battery: 85,
//       signal: -67,
//       type: 'Smart Water Meter'
//     },
//     {
//       id: 'MTR002',
//       devEUI: '70B3D57ED0000002',
//       name: 'Building A - Floor 2',
//       status: 'online',
//       lastSeen: '2025-06-25T10:25:00Z',
//       battery: 92,
//       signal: -71,
//       type: 'Smart Gas Meter'
//     },
//     {
//       id: 'MTR003',
//       devEUI: '70B3D57ED0000003',
//       name: 'Building B - Basement',
//       status: 'offline',
//       lastSeen: '2025-06-24T15:45:00Z',
//       battery: 23,
//       signal: -89,
//       type: 'Smart Electric Meter'
//     },
//     {
//       id: 'MTR004',
//       devEUI: '70B3D57ED0000004',
//       name: 'Building C - Main',
//       status: 'online',
//       lastSeen: '2025-06-25T10:32:00Z',
//       battery: 67,
//       signal: -75,
//       type: 'Smart Water Meter'
//     }
//   ]);

//   // Command templates
//   const commandTemplates = {
//     'read_meter': {
//       name: 'Read Meter Data',
//       description: 'Request current meter readings',
//       payload: '010100',
//       params: []
//     },
//     'set_interval': {
//       name: 'Set Reporting Interval',
//       description: 'Change data reporting frequency',
//       payload: '020001{interval}',
//       params: [
//         { name: 'interval', type: 'select', options: [
//           { value: '3C', label: '1 minute' },
//           { value: '78', label: '2 minutes' },
//           { value: 'B4', label: '3 minutes' },
//           { value: '012C', label: '5 minutes' },
//           { value: '0258', label: '10 minutes' },
//           { value: '0708', label: '30 minutes' },
//           { value: '0E10', label: '1 hour' }
//         ]}
//       ]
//     },
//     'reset_meter': {
//       name: 'Reset Meter',
//       description: 'Perform meter reset operation',
//       payload: '030100',
//       params: []
//     },
//     'calibrate': {
//       name: 'Calibrate Meter',
//       description: 'Start calibration procedure',
//       payload: '040001{factor}',
//       params: [
//         { name: 'factor', type: 'number', min: 0.1, max: 2.0, step: 0.01, default: 1.0 }
//       ]
//     },
//     'set_threshold': {
//       name: 'Set Alert Threshold',
//       description: 'Configure alert thresholds',
//       payload: '050002{threshold}',
//       params: [
//         { name: 'threshold', type: 'number', min: 0, max: 10000, step: 1, default: 100 }
//       ]
//     },
//     'firmware_update': {
//       name: 'Firmware Update',
//       description: 'Initiate firmware update process',
//       payload: '060100',
//       params: []
//     },
//     'custom': {
//       name: 'Custom Command',
//       description: 'Send custom hex payload',
//       payload: '',
//       params: []
//     }
//   };

//   const filteredMeters = meters.filter(meter =>
//     meter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     meter.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     meter.devEUI.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'online': return 'text-green-500';
//       case 'offline': return 'text-red-500';
//       default: return 'text-yellow-500';
//     }
//   };

//   const getBatteryColor = (battery) => {
//     if (battery > 60) return 'text-green-500';
//     if (battery > 30) return 'text-yellow-500';
//     return 'text-red-500';
//   };

//   const getSignalBars = (signal) => {
//     if (signal > -70) return 4;
//     if (signal > -80) return 3;
//     if (signal > -90) return 2;
//     return 1;
//   };

//   const generatePayload = () => {
//     if (commandType === 'custom') return customPayload;

//     let payload = commandTemplates[commandType]?.payload || '';

//     // Replace parameters in payload
//     Object.entries(selectedParams).forEach(([key, value]) => {
//       if (key === 'interval') {
//         payload = payload.replace(`{${key}}`, value);
//       } else if (key === 'factor') {
//         const hexValue = Math.round(parseFloat(value) * 100).toString(16).padStart(4, '0').toUpperCase();
//         payload = payload.replace(`{${key}}`, hexValue);
//       } else if (key === 'threshold') {
//         const hexValue = parseInt(value).toString(16).padStart(4, '0').toUpperCase();
//         payload = payload.replace(`{${key}}`, hexValue);
//       }
//     });

//     return payload;
//   };

//   const handleSendCommand = async () => {
//     if (!selectedMeter || !commandType) return;

//     setSending(true);

//     const payload = generatePayload();
//     const command = {
//       id: Date.now(),
//       meterId: selectedMeter.id,
//       meterName: selectedMeter.name,
//       devEUI: selectedMeter.devEUI,
//       commandType: commandTemplates[commandType]?.name || 'Custom',
//       payload,
//       port,
//       confirmed,
//       timestamp: new Date().toISOString(),
//       status: 'pending'
//     };

//     // Simulate API call
//     setTimeout(() => {
//       command.status = Math.random() > 0.2 ? 'sent' : 'failed';
//       setCommandHistory(prev => [command, ...prev]);
//       setSending(false);

//       // Reset form
//       setCommandType('');
//       setCustomPayload('');
//       setSelectedParams({});
//     }, 2000);
//   };

//   const handleParamChange = (paramName, value) => {
//     setSelectedParams(prev => ({
//       ...prev,
//       [paramName]: value
//     }));
//   };

//   const formatTimestamp = (timestamp) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">LoRaWAN Meter Command Center</h1>
//           <p className="text-gray-600">Send commands to your smart meters via Loriot downlink</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Meter Selection Panel */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="font-semibold text-gray-900 mb-3">Select Meter</h2>
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <input
//                     type="text"
//                     placeholder="Search meters..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="max-h-96 overflow-y-auto">
//                 {filteredMeters.map((meter) => (
//                   <div
//                     key={meter.id}
//                     onClick={() => setSelectedMeter(meter)}
//                     className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
//                       selectedMeter?.id === meter.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
//                     }`}
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="font-medium text-gray-900">{meter.name}</div>
//                       <div className={`flex items-center ${getStatusColor(meter.status)}`}>
//                         <div className={`w-2 h-2 rounded-full mr-2 ${meter.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
//                         {meter.status}
//                       </div>
//                     </div>

//                     <div className="text-sm text-gray-600 mb-2">
//                       <div>ID: {meter.id}</div>
//                       <div>DevEUI: {meter.devEUI}</div>
//                       <div>{meter.type}</div>
//                     </div>

//                     <div className="flex items-center justify-between text-xs text-gray-500">
//                       <div className="flex items-center">
//                         <Battery className={`h-3 w-3 mr-1 ${getBatteryColor(meter.battery)}`} />
//                         {meter.battery}%
//                       </div>
//                       <div className="flex items-center">
//                         <Wifi className="h-3 w-3 mr-1" />
//                         {Array.from({ length: 4 }, (_, i) => (
//                           <div
//                             key={i}
//                             className={`w-1 h-2 mr-0.5 ${
//                               i < getSignalBars(meter.signal) ? 'bg-blue-500' : 'bg-gray-300'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="h-3 w-3 mr-1" />
//                         {new Date(meter.lastSeen).toLocaleTimeString()}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Command Configuration Panel */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//               <div className="p-6">
//                 <h2 className="font-semibold text-gray-900 mb-4">Command Configuration</h2>

//                 {selectedMeter ? (
//                   <div className="space-y-6">
//                     {/* Selected Meter Info */}
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h3 className="font-medium text-blue-900">{selectedMeter.name}</h3>
//                           <p className="text-sm text-blue-700">DevEUI: {selectedMeter.devEUI}</p>
//                         </div>
//                         <Gauge className="h-8 w-8 text-blue-600" />
//                       </div>
//                     </div>

//                     {/* Command Type Selection */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Command Type</label>
//                       <select
//                         value={commandType}
//                         onChange={(e) => {
//                           setCommandType(e.target.value);
//                           setSelectedParams({});
//                           setCustomPayload('');
//                         }}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="">Select a command...</option>
//                         {Object.entries(commandTemplates).map(([key, template]) => (
//                           <option key={key} value={key}>{template.name}</option>
//                         ))}
//                       </select>
//                       {commandType && (
//                         <p className="mt-2 text-sm text-gray-600">{commandTemplates[commandType].description}</p>
//                       )}
//                     </div>

//                     {/* Command Parameters */}
//                     {commandType && commandTemplates[commandType].params.length > 0 && (
//                       <div className="space-y-4">
//                         <h4 className="font-medium text-gray-700">Parameters</h4>
//                         {commandTemplates[commandType].params.map((param) => (
//                           <div key={param.name}>
//                             <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
//                               {param.name.replace('_', ' ')}
//                             </label>
//                             {param.type === 'select' ? (
//                               <select
//                                 value={selectedParams[param.name] || ''}
//                                 onChange={(e) => handleParamChange(param.name, e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               >
//                                 <option value="">Select {param.name}...</option>
//                                 {param.options.map((option) => (
//                                   <option key={option.value} value={option.value}>{option.label}</option>
//                                 ))}
//                               </select>
//                             ) : (
//                               <input
//                                 type={param.type}
//                                 min={param.min}
//                                 max={param.max}
//                                 step={param.step}
//                                 value={selectedParams[param.name] || param.default || ''}
//                                 onChange={(e) => handleParamChange(param.name, e.target.value)}
//                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               />
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* Custom Payload */}
//                     {commandType === 'custom' && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Custom Hex Payload</label>
//                         <input
//                           type="text"
//                           value={customPayload}
//                           onChange={(e) => setCustomPayload(e.target.value.toUpperCase())}
//                           placeholder="Enter hex payload (e.g., 010203FF)"
//                           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
//                         />
//                       </div>
//                     )}

//                     {/* Port and Confirmation Settings */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
//                         <input
//                           type="number"
//                           min="1"
//                           max="255"
//                           value={port}
//                           onChange={(e) => setPort(parseInt(e.target.value))}
//                           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                       </div>
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id="confirmed"
//                           checked={confirmed}
//                           onChange={(e) => setConfirmed(e.target.checked)}
//                           className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         />
//                         <label htmlFor="confirmed" className="ml-2 text-sm text-gray-700">
//                           Require confirmation (ACK)
//                         </label>
//                       </div>
//                     </div>

//                     {/* Payload Preview */}
//                     {commandType && (
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h4 className="font-medium text-gray-700 mb-2">Payload Preview</h4>
//                         <div className="font-mono text-sm bg-white p-3 rounded border">
//                           {generatePayload() || 'No payload generated'}
//                         </div>
//                       </div>
//                     )}

//                     {/* Send Button */}
//                     <button
//                       onClick={handleSendCommand}
//                       disabled={!commandType || sending || selectedMeter?.status === 'offline'}
//                       className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                     >
//                       {sending ? (
//                         <Loader2 className="h-5 w-5 mr-2 animate-spin" />
//                       ) : (
//                         <Send className="h-5 w-5 mr-2" />
//                       )}
//                       {sending ? 'Sending...' : 'Send Command'}
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500">Select a meter to configure commands</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Command History */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//               <div className="p-6">
//                 <h2 className="font-semibold text-gray-900 mb-4">Command History</h2>

//                 {commandHistory.length > 0 ? (
//                   <div className="space-y-4">
//                     {commandHistory.slice(0, 10).map((cmd) => (
//                       <div key={cmd.id} className="border border-gray-200 rounded-lg p-4">
//                         <div className="flex items-center justify-between mb-2">
//                           <div className="flex items-center">
//                             {cmd.status === 'sent' ? (
//                               <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                             ) : cmd.status === 'failed' ? (
//                               <XCircle className="h-5 w-5 text-red-500 mr-2" />
//                             ) : (
//                               <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
//                             )}
//                             <span className="font-medium">{cmd.commandType}</span>
//                           </div>
//                           <span className="text-sm text-gray-500">
//                             {formatTimestamp(cmd.timestamp)}
//                           </span>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
//                           <div>Meter: {cmd.meterName}</div>
//                           <div>DevEUI: {cmd.devEUI}</div>
//                           <div>Payload: <span className="font-mono">{cmd.payload}</span></div>
//                           <div>Port: {cmd.port} | Confirmed: {cmd.confirmed ? 'Yes' : 'No'}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                     <p className="text-gray-500">No commands sent yet</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeterManagement;

import React, { useState, useEffect } from 'react';
import { Send, Search, Wifi, Battery, Clock, CheckCircle, XCircle, AlertCircle, Loader2, Settings, Plus, User, Trash2, X } from 'lucide-react';
import AddMeter from '../components/meterManagement/AddMeter';
import AddMeterModal from '../components/meterManagement/AddMeterModal';

 
const MeterManagement = () => {
  // State declarations
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [commandType, setCommandType] = useState('');
  const [customPayload, setCustomPayload] = useState('');
  const [port, setPort] = useState(1);
  const [confirmed, setConfirmed] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sending, setSending] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [selectedParams, setSelectedParams] = useState({});
  const [showAddMeterModal, setShowAddMeterModal] = useState(false);
  const [newMeters, setNewMeters] = useState([{ meterId: '', rs485Id: '' }]);
  const [selectedUser, setSelectedUser] = useState('');
  const [userSearch, setUserSearch] = useState('');

  // Mock data for meters
  const [meters, setMeters] = useState([
    {
      id: 'MTR001',
      devEUI: '70B3D57ED0000001',
      name: 'Building A - Floor 1',
      status: 'online',
      lastSeen: '2025-06-25T10:30:00Z',
      battery: 85,
      signal: -67,
      type: 'Smart Water Meter',
      userId: 'user001',
      rs485Id: 'RS485-001'
    },
    {
      id: 'MTR002',
      devEUI: '70B3D57ED0000002',
      name: 'Building A - Floor 2',
      status: 'online',
      lastSeen: '2025-06-25T10:25:00Z',
      battery: 92,
      signal: -71,
      type: 'Smart Gas Meter',
      userId: 'user001',
      rs485Id: 'RS485-002'
    },
    {
      id: 'MTR003',
      devEUI: '70B3D57ED0000003',
      name: 'Building B - Basement',
      status: 'offline',
      lastSeen: '2025-06-24T15:45:00Z',
      battery: 23,
      signal: -89,
      type: 'Smart Electric Meter',
      userId: 'user002',
      rs485Id: 'RS485-003'
    },
    {
      id: 'MTR004',
      devEUI: '70B3D57ED0000004',
      name: 'Building C - Main',
      status: 'online',
      lastSeen: '2025-06-25T10:32:00Z',
      battery: 67,
      signal: -75,
      type: 'Smart Water Meter',
      userId: 'user003',
      rs485Id: 'RS485-004'
    }
  ]);

  // Mock data for users
  const users = [
    { id: 'user001', name: 'John Smith', email: 'john@example.com', meters: ['MTR001', 'MTR002'] },
    { id: 'user002', name: 'Emma Johnson', email: 'emma@example.com', meters: ['MTR003'] },
    { id: 'user003', name: 'Michael Brown', email: 'michael@example.com', meters: ['MTR004'] },
    { id: 'user004', name: 'Sarah Davis', email: 'sarah@example.com', meters: [] },
    { id: 'user005', name: 'David Wilson', email: 'david@example.com', meters: [] },
  ];

  // Command templates
  // const commandTemplates = {
  //   'read_meter': {
  //     name: 'Read Meter Data',
  //     description: 'Request current meter readings',
  //     payload: '010100',
  //     params: []
  //   },
  //   'set_interval': {
  //     name: 'Set Reporting Interval',
  //     description: 'Change data reporting frequency',
  //     payload: '020001{interval}',
  //     params: [
  //       {
  //         name: 'interval', type: 'select', options: [
  //           { value: '3C', label: '1 minute' },
  //           { value: '78', label: '2 minutes' },
  //           { value: 'B4', label: '3 minutes' },
  //           { value: '012C', label: '5 minutes' },
  //           { value: '0258', label: '10 minutes' },
  //           { value: '0708', label: '30 minutes' },
  //           { value: '0E10', label: '1 hour' }
  //         ]
  //       }
  //     ]
  //   },
  //   'reset_meter': {
  //     name: 'Reset Meter',
  //     description: 'Perform meter reset operation',
  //     payload: '030100',
  //     params: []
  //   },
  //   'calibrate': {
  //     name: 'Calibrate Meter',
  //     description: 'Start calibration procedure',
  //     payload: '040001{factor}',
  //     params: [
  //       { name: 'factor', type: 'number', min: 0.1, max: 2.0, step: 0.01, default: 1.0 }
  //     ]
  //   },
  //   'set_threshold': {
  //     name: 'Set Alert Threshold',
  //     description: 'Configure alert thresholds',
  //     payload: '050002{threshold}',
  //     params: [
  //       { name: 'threshold', type: 'number', min: 0, max: 10000, step: 1, default: 100 }
  //     ]
  //   },
  //   'firmware_update': {
  //     name: 'Firmware Update',
  //     description: 'Initiate firmware update process',
  //     payload: '060100',
  //     params: []
  //   },
  //   'custom': {
  //     name: 'Custom Command',
  //     description: 'Send custom hex payload',
  //     payload: '',
  //     params: []
  //   }
  // };

  const commandTemplates = {
    forced_eb: {
      name: 'Force EB',
      description: 'Force switch to EB supply',
      payload: 'AA060010',
      params: []
    },
    forced_dg: {
      name: 'Force DG',
      description: 'Force switch to DG supply',
      payload: '',
      params: []
    },
    forced_eb_dg_reset: {
      name: 'Reset EB/DG Force State',
      description: 'Reset forced EB/DG state',
      payload: '',
      params: []
    },
    balance_deduct_random: {
      name: 'Random Balance Deduct',
      description: 'Deduct random balance',
      payload: '',
      params: []
    },
    run_eb_only: {
      name: 'Run EB Only',
      description: 'Switch to EB only mode',
      payload: 'AA0600140000D015',
      params: []
    },
    run_dg_only: {
      name: 'Run DG Only',
      description: 'Switch to DG only mode',
      payload: '',
      params: []
    },
    run_eb_dg_only_reset: {
      name: 'Reset EB/DG Only',
      description: 'Reset EB/DG only state',
      payload: '',
      params: []
    },
    set_happy_day: {
      name: 'Set Happy Day',
      description: 'Mark happy day for tariff',
      payload: '',
      params: []
    },
    set_happy_hour: {
      name: 'Set Happy Hour',
      description: 'Mark happy hour for tariff',
      payload: '',
      params: []
    },
    emergency_button_reset: {
      name: 'Reset Emergency Button',
      description: 'Reset emergency button state',
      payload: '',
      params: []
    },
    set_monthly_deduct_tariff: {
      name: 'Set Monthly Deduct Tariff',
      description: 'Configure monthly deduction',
      payload: 'AA06001A{tariff}',
      params: [
        { name: 'tariff', type: 'number', min: 0, max: 9999, step: 1, default: 100 }
      ]
    },
    set_meter_id: {
      name: 'Set Meter ID',
      description: 'Assign a meter ID',
      payload: 'AA06001B{meterId}',
      params: [
        { name: 'meterId', type: 'text', default: '0001' }
      ]
    },
    update_overload_dg: {
      name: 'Update Overload DG',
      description: 'Update overload setting for DG',
      payload: 'AA060021{value}',
      params: [
        { name: 'value', type: 'number', min: 0, max: 65535, step: 1, default: 1000 }
      ]
    },
    update_overload_eb: {
      name: 'Update Overload EB',
      description: 'Update overload setting for EB',
      payload: 'AA060022{value}',
      params: [
        { name: 'value', type: 'number', min: 0, max: 65535, step: 1, default: 1000 }
      ]
    },
    update_tariff_dg: {
      name: 'Update Tariff DG',
      description: 'Update unit tariff for DG supply',
      payload: 'AA060023{tariff}',
      params: [
        { name: 'tariff', type: 'number', min: 0, max: 9999, step: 1, default: 10 }
      ]
    },
    update_tariff_eb: {
      name: 'Update Tariff EB',
      description: 'Update unit tariff for EB supply',
      payload: 'AA060024{tariff}',
      params: [
        { name: 'tariff', type: 'number', min: 0, max: 9999, step: 1, default: 5 }
      ]
    },
    recharge_balance: {
      name: 'Recharge Balance',
      description: 'Recharge consumer balance',
      payload: 'AA060025{amount}',
      params: [
        { name: 'amount', type: 'number', min: 1, max: 10000, step: 1, default: 100 }
      ]
    },
    set_daily_deduct_tariff: {
      name: 'Set Daily Deduct Tariff',
      description: 'Set tariff for daily deduction',
      payload: 'AA060026{tariff}',
      params: [
        { name: 'tariff', type: 'number', min: 0, max: 9999, step: 1, default: 50 }
      ]
    },
    set_overload_max_attempt: {
      name: 'Set Overload Max Attempt',
      description: 'Set max retry count after overload',
      payload: 'AA060027{attempts}',
      params: [
        { name: 'attempts', type: 'number', min: 1, max: 10, step: 1, default: 3 }
      ]
    },
    set_overload_attempt_wait_time: {
      name: 'Set Overload Wait Time',
      description: 'Set wait time (in seconds) after overload',
      payload: 'AA060028{time}',
      params: [
        { name: 'time', type: 'number', min: 1, max: 3600, step: 1, default: 30 }
      ]
    },
    forced_relay_on: {
      name: 'Forced Relay ON',
      description: 'Turn on the relay manually',
      payload: 'AA060029000041D9',
      params: []
    },
    forced_relay_off: {
      name: 'Forced Relay OFF',
      description: 'Turn off the relay manually',
      payload: 'AA06002A00017019',
      params: []
    },
    forced_relay_clear: {
      name: 'Forced Relay Clear',
      description: 'Clear forced relay state',
      payload: '',
      params: []
    },
    forced_individual_relay_dg: {
      name: 'Forced Individual Relay DG',
      description: 'Control individual DG relay',
      payload: '',
      params: []
    },
    forced_individual_relay_eb: {
      name: 'Forced Individual Relay EB',
      description: 'Control individual EB relay',
      payload: '',
      params: []
    },
    clear_balance: {
      name: 'Clear Balance',
      description: 'Zero out the balance',
      payload: 'AA06003F0000A01D',
      params: []
    },
    clear_overload_fault: {
      name: 'Clear Overload Fault',
      description: 'Clear the overload trip/fault state',
      payload: 'AA06001C000051D7',
      params: []
    },
    custom: {
      name: 'Custom Command',
      description: 'Send raw HEX command manually',
      payload: '',
      params: [
        { name: 'payload', type: 'text', default: '' }
      ]
    }
  };

  // Filter meters based on search term
  const filteredMeters = meters.filter(meter =>
    meter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.devEUI.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.id.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 60) return 'text-green-500';
    if (battery > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSignalBars = (signal) => {
    if (signal > -70) return 4;
    if (signal > -80) return 3;
    if (signal > -90) return 2;
    return 1;
  };

  // Generate payload for commands
  const generatePayload = () => {
    if (commandType === 'custom') return customPayload;

    let payload = commandTemplates[commandType]?.payload || '';

    // Replace parameters in payload
    Object.entries(selectedParams).forEach(([key, value]) => {
      if (key === 'interval') {
        payload = payload.replace(`{${key}}`, value);
      } else if (key === 'factor') {
        const hexValue = Math.round(parseFloat(value) * 100).toString(16).padStart(4, '0').toUpperCase();
        payload = payload.replace(`{${key}}`, hexValue);
      } else if (key === 'threshold') {
        const hexValue = parseInt(value).toString(16).padStart(4, '0').toUpperCase();
        payload = payload.replace(`{${key}}`, hexValue);
      }
    });

    return payload;
  };

  // Handle sending command
  const handleSendCommand = async () => {
    if (!selectedMeter || !commandType) return;

    setSending(true);

    const payload = generatePayload();
    const command = {
      id: Date.now(),
      meterId: selectedMeter.id,
      meterName: selectedMeter.name,
      devEUI: selectedMeter.devEUI,
      commandType: commandTemplates[commandType]?.name || 'Custom',
      payload,
      port,
      confirmed,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Simulate API call
    setTimeout(() => {
      command.status = Math.random() > 0.2 ? 'sent' : 'failed';
      setCommandHistory(prev => [command, ...prev]);
      setSending(false);

      // Reset form
      setCommandType('');
      setCustomPayload('');
      setSelectedParams({});
    }, 2000);
  };

  // Handle parameter changes
  const handleParamChange = (paramName, value) => {
    setSelectedParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  // Handle adding a new meter field
  const handleAddMeterField = () => {
    setNewMeters([...newMeters, { meterId: '', rs485Id: '' }]);
  };

  // Handle removing a meter field
  const handleRemoveMeterField = (index) => {
    if (newMeters.length <= 1) return;
    const updatedMeters = [...newMeters];
    updatedMeters.splice(index, 1);
    setNewMeters(updatedMeters);
  };

  // Handle meter field changes
  const handleMeterFieldChange = (index, field, value) => {
    const updatedMeters = [...newMeters];
    updatedMeters[index][field] = value;
    setNewMeters(updatedMeters);
  };

  // Handle adding new meters
  const handleAddNewMeters = () => {
    if (!selectedUser) {
      alert('Please select a user');
      return;
    }

    const user = users.find(u => u.id === selectedUser);
    if (!user) return;

    // Create new meters
    const newMeterObjects = newMeters.map((meter, index) => {
      const meterId = `MTR${(meters.length + index + 1).toString().padStart(3, '0')}`;
      return {
        id: meterId,
        devEUI: `70B3D57ED0000${(meters.length + index + 1).toString().padStart(4, '0')}`,
        name: `${user.name}'s Meter ${index + 1}`,
        status: 'online',
        lastSeen: new Date().toISOString(),
        battery: Math.floor(Math.random() * 80) + 20,
        signal: -Math.floor(Math.random() * 40) - 50,
        type: ['Smart Water Meter', 'Smart Gas Meter', 'Smart Electric Meter'][Math.floor(Math.random() * 3)],
        userId: selectedUser,
        rs485Id: meter.rs485Id || `RS485-${(meters.length + index + 1).toString().padStart(3, '0')}`
      };
    });

    // Add to meters list
    setMeters([...meters, ...newMeterObjects]);

    // Reset form and close modal
    setNewMeters([{ meterId: '', rs485Id: '' }]);
    setSelectedUser('');
    setShowAddMeterModal(false);

    alert(`Successfully added ${newMeterObjects.length} new meters!`);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meter Management</h1>
            <p className="text-gray-600">Send commands to your smart meters via downlink</p>
          </div>
          <button
            onClick={() => setShowAddMeterModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Meter
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meter Selection Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900 mb-3">Select Meter</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search meters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredMeters.map((meter) => (
                  <div
                    key={meter.id}
                    onClick={() => setSelectedMeter(meter)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedMeter?.id === meter.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900">{meter.name}</div>
                      <div className={`flex items-center ${getStatusColor(meter.status)}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${meter.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                        {meter.status}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-2">
                      <div>ID: {meter.id}</div>
                      <div>DevEUI: {meter.devEUI}</div>
                      <div>RS485: {meter.rs485Id}</div>
                      <div>{meter.type}</div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Battery className={`h-3 w-3 mr-1 ${getBatteryColor(meter.battery)}`} />
                        {meter.battery}%
                      </div>
                      <div className="flex items-center">
                        <Wifi className="h-3 w-3 mr-1" />
                        {Array.from({ length: 4 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-2 mr-0.5 ${i < getSignalBars(meter.signal) ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(meter.lastSeen).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Command Configuration Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Command Configuration</h2>

                {selectedMeter ? (
                  <div className="space-y-6">
                    {/* Selected Meter Info */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">{selectedMeter.name}</h3>
                          <p className="text-sm text-blue-700">DevEUI: {selectedMeter.devEUI}</p>
                          <p className="text-sm text-blue-700">RS485 ID: {selectedMeter.rs485Id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Command Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Command Type</label>
                      <select
                        value={commandType}
                        onChange={(e) => {
                          setCommandType(e.target.value);
                          setSelectedParams({});
                          setCustomPayload('');
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a command...</option>
                        {Object.entries(commandTemplates).map(([key, template]) => (
                          <option key={key} value={key}>{template.name}</option>
                        ))}
                      </select>
                      {commandType && (
                        <p className="mt-2 text-sm text-gray-600">{commandTemplates[commandType].description}</p>
                      )}
                    </div>

                    {/* Command Parameters */}
                    {commandType && commandTemplates[commandType].params.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">Parameters</h4>
                        {commandTemplates[commandType].params.map((param) => (
                          <div key={param.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                              {param.name.replace('_', ' ')}
                            </label>
                            {param.type === 'select' ? (
                              <select
                                value={selectedParams[param.name] || ''}
                                onChange={(e) => handleParamChange(param.name, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="">Select {param.name}...</option>
                                {param.options.map((option) => (
                                  <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={param.type}
                                min={param.min}
                                max={param.max}
                                step={param.step}
                                value={selectedParams[param.name] || param.default || ''}
                                onChange={(e) => handleParamChange(param.name, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Custom Payload */}
                    {commandType === 'custom' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Custom Hex Payload</label>
                        <input
                          type="text"
                          value={customPayload}
                          onChange={(e) => setCustomPayload(e.target.value.toUpperCase())}
                          placeholder="Enter hex payload (e.g., 010203FF)"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                        />
                      </div>
                    )}

                    {/* Port and Confirmation Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                        <input
                          type="number"
                          min="1"
                          max="255"
                          value={port}
                          onChange={(e) => setPort(parseInt(e.target.value))}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="confirmed"
                          checked={confirmed}
                          onChange={(e) => setConfirmed(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="confirmed" className="ml-2 text-sm text-gray-700">
                          Require confirmation (ACK)
                        </label>
                      </div>
                    </div>

                    {/* Payload Preview */}
                    {commandType && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">Payload Preview</h4>
                        <div className="font-mono text-sm bg-white p-3 rounded border">
                          {generatePayload() || 'No payload generated'}
                        </div>
                      </div>
                    )}

                    {/* Send Button */}
                    <button
                      onClick={handleSendCommand}
                      disabled={!commandType || sending || selectedMeter?.status === 'offline'}
                      className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {sending ? (
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5 mr-2" />
                      )}
                      {sending ? 'Sending...' : 'Send Command'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a meter to configure commands</p>
                  </div>
                )}
              </div>
            </div>

            {/* Command History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Command History</h2>

                {commandHistory.length > 0 ? (
                  <div className="space-y-4">
                    {commandHistory.slice(0, 10).map((cmd) => (
                      <div key={cmd.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {cmd.status === 'sent' ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : cmd.status === 'failed' ? (
                              <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                            )}
                            <span className="font-medium">{cmd.commandType}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(cmd.timestamp).toLocaleString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>Meter: {cmd.meterName}</div>
                          <div>DevEUI: {cmd.devEUI}</div>
                          <div>Payload: <span className="font-mono">{cmd.payload}</span></div>
                          <div>Port: {cmd.port} | Confirmed: {cmd.confirmed ? 'Yes' : 'No'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No commands sent yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Meter Modal */}
      {showAddMeterModal && (
        <AddMeterModal
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          filteredUsers={filteredUsers}
          newMeters={newMeters}
          handleMeterFieldChange={handleMeterFieldChange}
          handleAddMeterField={handleAddMeterField}
          handleRemoveMeterField={handleRemoveMeterField}
          handleAddNewMeters={handleAddNewMeters}
          setShowAddMeterModal={setShowAddMeterModal} />
      )}
    </div>
  );
};

export default MeterManagement;