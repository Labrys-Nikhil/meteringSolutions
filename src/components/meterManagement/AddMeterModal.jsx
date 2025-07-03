// import React from 'react'

// function AddMeterModal() {
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100/30 backdrop-blur-sm">
//             <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-2xl max-h-screen">
//                 <div className="p-6 max-h-[80vh] flex flex-col overflow-hidden">

//                     {/* Modal Header */}
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold text-gray-900">Add New Meter</h2>
//                         <button
//                             onClick={() => setShowAddMeterModal(false)}
//                             className="text-gray-500 hover:text-gray-700"
//                         >
//                             <X className="h-5 w-5" />
//                         </button>
//                     </div>

//                     {/* Scrollable Body */}
//                     <div className="space-y-6 flex-1 overflow-y-auto p-1">

//                         {/* User Selection */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search users..."
//                                     value={userSearch}
//                                     onChange={(e) => setUserSearch(e.target.value)}
//                                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 />
//                             </div>

//                             <div className="mt-2 max-h-60 overflow-y-auto">
//                                 {filteredUsers.map(user => (
//                                     <div
//                                         key={user.id}
//                                         onClick={() => {
//                                             setSelectedUser(user.id);
//                                             setShowAddMeterModal(true);
//                                         }}
//                                         className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${selectedUser === user.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
//                                             }`}
//                                     >
//                                         <div className="flex items-center">
//                                             <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
//                                                 <User className="h-5 w-5 text-gray-500" />
//                                             </div>
//                                             <div>
//                                                 <div className="font-medium text-gray-900">{user.name}</div>
//                                                 <div className="text-sm text-gray-500">{user.email}</div>
//                                                 <div className="text-xs text-gray-500">Meters: {user.meters.length}</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                         </div>

//                         {/* Meter Fields */}
//                         <div>
//                             <div className="flex justify-between items-center mb-3 ">
//                                 <label className="block text-sm font-medium text-gray-700">Meter Details</label>
//                                 <button
//                                     onClick={handleAddMeterField}
//                                     className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
//                                 >
//                                     <Plus className="h-4 w-4 mr-1" />
//                                     Add Another Meter
//                                 </button>
//                             </div>

//                             {newMeters.map((meter, index) => (
//                                 <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg relative">
//                                     {newMeters.length > 1 && (
//                                         <button
//                                             onClick={() => handleRemoveMeterField(index)}
//                                             className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
//                                         >
//                                             <Trash2 className="h-4 w-4" />
//                                         </button>
//                                     )}

//                                     <h3 className="text-sm font-medium text-gray-700 mb-3">Meter {index + 1}</h3>

//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="block text-sm text-gray-600 mb-1">Meter ID</label>
//                                             <input
//                                                 type="text"
//                                                 value={meter.meterId}
//                                                 onChange={(e) => handleMeterFieldChange(index, 'meterId', e.target.value)}
//                                                 placeholder="Enter unique meter ID"
//                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                             />
//                                         </div>

//                                         <div>
//                                             <label className="block text-sm text-gray-600 mb-1">RS485 Communication ID</label>
//                                             <input
//                                                 type="text"
//                                                 value={meter.rs485Id}
//                                                 onChange={(e) => handleMeterFieldChange(index, 'rs485Id', e.target.value)}
//                                                 placeholder="Enter RS485 ID"
//                                                 className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Modal Footer */}
//                     <div className="flex justify-end space-x-3 pt-4">
//                         <button
//                             onClick={() => setShowAddMeterModal(false)}
//                             className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={handleAddNewMeters}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                         >
//                             Add Meters
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default AddMeterModal


// components/meterManagement/AddMeterModal.jsx
// import React from 'react';
// import { Search, User, Plus, Trash2, X } from 'lucide-react';

// const AddMeterModal = ({
//   setShowAddMeterModal,
//   filteredUsers,
//   userSearch,
//   setUserSearch,
//   selectedUser,
//   setSelectedUser,
//   newMeters,
//   handleAddMeterField,
//   handleRemoveMeterField,
//   handleMeterFieldChange,
//   handleAddNewMeters
// }) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100/30 backdrop-blur-sm">
//       <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-2xl max-h-screen">
//         <div className="p-6 max-h-[80vh] flex flex-col overflow-hidden">

//           {/* Modal Header */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-900">Add New Meter</h2>
//             <button
//               onClick={() => setShowAddMeterModal(false)}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Scrollable Body */}
//           <div className="space-y-6 flex-1 overflow-y-auto p-1">

//             {/* User Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={userSearch}
//                   onChange={(e) => setUserSearch(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="mt-2 max-h-60 overflow-y-auto">
//                 {filteredUsers.map(user => (
//                   <div
//                     key={user.id}
//                     onClick={() => setSelectedUser(user.id)}
//                     className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
//                       selectedUser === user.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
//                     }`}
//                   >
//                     <div className="flex items-center">
//                       <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
//                         <User className="h-5 w-5 text-gray-500" />
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-900">{user.name}</div>
//                         <div className="text-sm text-gray-500">{user.email}</div>
//                         <div className="text-xs text-gray-500">Meters: {user.meters.length}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Meter Fields */}
//             <div>
//               <div className="flex justify-between items-center mb-3 ">
//                 <label className="block text-sm font-medium text-gray-700">Meter Details</label>
//                 <button
//                   onClick={handleAddMeterField}
//                   className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
//                 >
//                   <Plus className="h-4 w-4 mr-1" />
//                   Add Another Meter
//                 </button>
//               </div>

//               {newMeters.map((meter, index) => (
//                 <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg relative">
//                   {newMeters.length > 1 && (
//                     <button
//                       onClick={() => handleRemoveMeterField(index)}
//                       className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   )}

//                   <h3 className="text-sm font-medium text-gray-700 mb-3">Meter {index + 1}</h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">Meter ID</label>
//                       <input
//                         type="text"
//                         value={meter.meterId}
//                         onChange={(e) => handleMeterFieldChange(index, 'meterId', e.target.value)}
//                         placeholder="Enter unique meter ID"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">RS485 Communication ID</label>
//                       <input
//                         type="text"
//                         value={meter.rs485Id}
//                         onChange={(e) => handleMeterFieldChange(index, 'rs485Id', e.target.value)}
//                         placeholder="Enter RS485 ID"
//                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Modal Footer */}
//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               onClick={() => setShowAddMeterModal(false)}
//               className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleAddNewMeters}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               Add Meters
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddMeterModal;


import React from 'react';
import { Search, User, Plus, Trash2, X, CheckCircle } from 'lucide-react';

const AddMeterModal = ({
  userSearch,
  setUserSearch,
  filteredUsers,
  selectedUser,
  setSelectedUser,
  newMeters,
  setShowAddMeterModal,
  handleAddMeterField,
  handleRemoveMeterField,
  handleMeterFieldChange,
  handleAddNewMeters
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100/30 backdrop-blur-sm">
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-2xl max-h-screen">
        <div className="p-6 max-h-[80vh] flex flex-col overflow-hidden">

          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Add New Meter</h2>
            <button
              onClick={() => setShowAddMeterModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="space-y-6 flex-1 overflow-y-auto p-1">

            {/* User Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mt-2 max-h-60 overflow-y-auto">
                {filteredUsers.map(user => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user.id)}
                    className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedUser === user.id
                        ? 'bg-green-100 border-green-300'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-500">Meters: {user.meters.length}</div>
                        </div>
                      </div>

                      {selectedUser === user.id && (
                        <div className="flex items-center space-x-1 text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4" />
                          <span>✅ User selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meter Fields */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">Meter Details</label>
                <button
                  onClick={handleAddMeterField}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Another Meter
                </button>
              </div>

              {newMeters.map((meter, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg relative">
                  {newMeters.length > 1 && (
                    <button
                      onClick={() => handleRemoveMeterField(index)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}

                  <h3 className="text-sm font-medium text-gray-700 mb-3">Meter {index + 1}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Meter ID</label>
                      <input
                        type="text"
                        value={meter.meterId}
                        onChange={(e) => handleMeterFieldChange(index, 'meterId', e.target.value)}
                        placeholder="Enter unique meter ID"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">RS485 Communication ID</label>
                      <input
                        type="text"
                        value={meter.rs485Id}
                        onChange={(e) => handleMeterFieldChange(index, 'rs485Id', e.target.value)}
                        placeholder="Enter RS485 ID"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setShowAddMeterModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNewMeters}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Meters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeterModal;
