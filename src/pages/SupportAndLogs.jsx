// import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// import { FiEye, FiFilter } from "react-icons/fi";
// import { FaDollarSign } from "react-icons/fa";
// import { AiOutlineAlert } from "react-icons/ai";
// export function SupportAndLogs() {
//     const [tickets, setTickets] = useState([
//       { id: "TKT-2025-001", title: "Smart meter not responding to commands", user: "James Brown", priority: "High Priority", time: "2 hours ago" },
//     ]);

//     return (
//       <div className="p-6 space-y-6 bg-white shadow rounded-lg mt-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-semibold">Support Center</h2>
//             <p className="text-gray-500">Manage customer support and inquiries</p>
//           </div>
//           <div className="flex space-x-2">
//             {/* <Button variant="outline" className="flex items-center space-x-1">
//               <FiFilter /> <span>Filter</span>
//             </Button>
//             <Button className="bg-blue-600 text-white">+ New Ticket</Button> */}
//           </div>
//         </div>

//         <table className="w-full border mt-4">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 text-left">Priority</th>
//               <th className="p-2 text-left">Ticket</th>
//               <th className="p-2 text-left">User</th>
//               <th className="p-2 text-left">Time</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tickets.map((ticket, index) => (
//               <tr key={index} className="border-t">
//                 <td className="p-2">
//                   {/* <Badge className="bg-red-500 text-white">{ticket.priority}</Badge> */}
//                 </td>
//                 <td className="p-2">{ticket.title}</td>
//                 <td className="p-2">{ticket.user}</td>
//                 <td className="p-2">{ticket.time}</td>
//                 <td className="p-2">
//                   {/* <Button variant="outline">View Details</Button> */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

const SupportAndLogs = () => {
  const [tickets, setTickets] = useState([
    {
      id: "TKT-2025-001",
      title: "Smart meter not responding to commands",
      user: "James Brown",
      priority: "High Priority",
      time: "2 hours ago",
    },
  ]);

  return (
    <div className="p-6 space-y-6 bg-white shadow rounded-lg mt-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Support Center</h2>
          <p className="text-gray-500">Manage customer support and inquiries</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-1 rounded flex items-center shadow-md">
          <FaPlus className="mr-2" /> New Ticket
        </button>
      </div>

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Priority</th>
            <th className="p-2 text-left">Ticket</th>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">
                <span
                  className={`px-2 py-1 text-white rounded ${
                    ticket.priority === "High Priority"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {ticket.priority}
                </span>
              </td>
              <td className="p-2">{ticket.title}</td>
              <td className="p-2">{ticket.user}</td>
              <td className="p-2">{ticket.time}</td>
              <td className="p-2">
                <FiEye className="cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportAndLogs;
