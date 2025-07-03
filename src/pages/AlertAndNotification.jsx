// import React from 'react'

// const AlertAndNotification = () => {
//   return (
//     <div className='flex item-center justify-center'>
//       Alert and Notifications
//     </div>
//   )
// }

// export default AlertAndNotification

// import React, { useState } from "react";

// const AlertAndNotification = () => {
//   const [alerts, setAlerts] = useState([
//     { id: 1, type: "error", message: "Something went wrong!" },
//     { id: 2, type: "success", message: "Data saved successfully!" },
//     { id: 3, type: "warning", message: "You’re nearing your limit!" },
//   ]);

//   const [notifications, setNotifications] = useState([
//     { id: 1, title: "New Message", body: "You have 3 unread messages." },
//     { id: 2, title: "Update Available", body: "Version 2.0 is ready to install." },
//   ]);

//   const removeAlert = (id) => {
//     setAlerts((prev) => prev.filter((a) => a.id !== id));
//   };

//   const removeNotification = (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   const getAlertStyle = (type) => {
//     switch (type) {
//       case "error":
//         return "bg-red-100 border-red-500 text-red-700";
//       case "success":
//         return "bg-green-100 border-green-500 text-green-700";
//       case "warning":
//         return "bg-yellow-100 border-yellow-500 text-yellow-700";
//       default:
//         return "bg-gray-100 border-gray-500 text-gray-700";
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto space-y-6">
//       {/* Alerts Section */}
//       <div>
//         <h2 className="text-xl font-bold mb-2">Alerts</h2>
//         <div className="space-y-3">
//           {alerts.map((alert) => (
//             <div
//               key={alert.id}
//               className={`border-l-4 p-4 rounded-md shadow-sm flex justify-between items-center ${getAlertStyle(
//                 alert.type
//               )}`}
//             >
//               <span>{alert.message}</span>
//               <button
//                 onClick={() => removeAlert(alert.id)}
//                 className="ml-4 text-sm text-gray-500 hover:text-black"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Notifications Section */}
//       <div>
//         <h2 className="text-xl font-bold mb-2">Notifications</h2>
//         <div className="space-y-3">
//           {notifications.map((note) => (
//             <div
//               key={note.id}
//               className="border p-4 rounded-md shadow-sm bg-white flex justify-between items-start"
//             >
//               <div>
//                 <h4 className="font-semibold">{note.title}</h4>
//                 <p className="text-sm text-gray-600">{note.body}</p>
//               </div>
//               <button
//                 onClick={() => removeNotification(note.id)}
//                 className="ml-4 text-sm text-gray-400 hover:text-black"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertAndNotification;


// import React from 'react'

// const Chat = () => {
//   return (
//     <div>
//       Chat pages
//     </div>
//   )
// }

// export default Chat


import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
import Header from "../components/header/Header";

const AlertAndNotification = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("Alert And Notification"));
    dispatch(
      setBreadcrumbs([
        // { label: "Home", link: "" },  // Updated label for clarity
        { label: "Alert and Notification" },
      ])
    );
  }, []);

  return (
    <div className="w-full h-full">
      <Header />
      {/* Page content goes here */}
    </div>
  );
};

export default AlertAndNotification;

