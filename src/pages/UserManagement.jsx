// // import React from "react";

// // const UserManagement = () => {
// //   const items = [
// //     "Live update",
// //     "Recharge",
// //     "pending update",
// //     "Recharge History",
// //     "Electricity bill",
// //     "Bill on mail",
// //     "Meter ON/OFF",
// //     "ALERT SMS",
// //     "ONLINE DATA",
// //   ];

// //   return (
// //     <div className="p-6 flex-1">
// //       {/* Breadcrumb */}
// //       <div className="text-gray-500 text-sm mb-4">
// //         <span className="font-semibold text-black">User Management</span> &gt; Overview
// //       </div>

// //       {/* Grid Layout */}
// //       <div className="grid grid-cols-3 gap-6">
// //         {items.map((item, index) => (
// //           <div key={index} className="relative bg-white p-6 rounded-xl shadow-md text-black font-bold text-lg">
// //             {item}
// //             <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full"></span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserManagement;

// /////////////////////////////////////////////////////////////////////////////////////////
// // import React, { useState } from "react";

// // const UserManagement = () => {
// //   const [users, setUsers] = useState([
// //     { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "Admin", status: "Active", lastActive: "2 minutes ago" },
// //   ]);

// //   const addUser = () => {
// //     const newUser = {
// //       id: users.length + 1,
// //       name: "New User",
// //       email: `user${users.length + 1}@example.com`,
// //       role: "User",
// //       status: "Inactive",
// //       lastActive: "Never",
// //     };
// //     setUsers([...users, newUser]);
// //   };

// //   return (
// //     <div className="p-4 bg-white rounded-lg shadow">
// //       <h2 className="text-xl font-bold mb-4">User Management</h2>
// //       <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={addUser}>
// //         + Add New User
// //       </button>
// //       <table className="w-full border-collapse">
// //         <thead>
// //           <tr className="bg-gray-200">
// //             <th className="p-2 text-left">User</th>
// //             <th className="p-2">Role</th>
// //             <th className="p-2">Status</th>
// //             <th className="p-2">Last Active</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map((user) => (
// //             <tr key={user.id} className="border-b">
// //               <td className="p-2">{user.name} ({user.email})</td>
// //               <td className="p-2">{user.role}</td>
// //               <td className="p-2">{user.status}</td>
// //               <td className="p-2">{user.lastActive}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default UserManagement;
// import React, { useState, useEffect } from 'react';
// import { Users, Search, Shield, Clock, CheckCircle, XCircle, AlertCircle, Loader2, Settings, UserPlus, Edit3, Trash2, Eye, EyeOff, Mail, Phone, Calendar, Activity } from 'lucide-react';

// const UserManagement = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [actionType, setActionType] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const [actionHistory, setActionHistory] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   // Mock data for users
//   const [users, setUsers] = useState([
//     {
//       id: 'USR001',
//       username: 'john.doe',
//       email: 'john.doe@company.com',
//       firstName: 'John',
//       lastName: 'Doe',
//       role: 'admin',
//       status: 'active',
//       lastLogin: '2025-06-30T09:15:00Z',
//       createdAt: '2024-01-15T10:00:00Z',
//       phone: '+1-234-567-8901',
//       department: 'Engineering',
//       permissions: ['read_meters', 'write_meters', 'manage_users', 'system_admin'],
//       loginCount: 1247,
//       avatar: null
//     },
//     {
//       id: 'USR002',
//       username: 'sarah.wilson',
//       email: 'sarah.wilson@company.com',
//       firstName: 'Sarah',
//       lastName: 'Wilson',
//       role: 'operator',
//       status: 'active',
//       lastLogin: '2025-06-30T08:45:00Z',
//       createdAt: '2024-03-20T14:30:00Z',
//       phone: '+1-234-567-8902',
//       department: 'Operations',
//       permissions: ['read_meters', 'write_meters'],
//       loginCount: 892,
//       avatar: null
//     },
//     {
//       id: 'USR003',
//       username: 'mike.johnson',
//       email: 'mike.johnson@company.com',
//       firstName: 'Mike',
//       lastName: 'Johnson',
//       role: 'viewer',
//       status: 'inactive',
//       lastLogin: '2025-06-25T16:20:00Z',
//       createdAt: '2024-02-10T11:15:00Z',
//       phone: '+1-234-567-8903',
//       department: 'Maintenance',
//       permissions: ['read_meters'],
//       loginCount: 156,
//       avatar: null
//     },
//     {
//       id: 'USR004',
//       username: 'emily.davis',
//       email: 'emily.davis@company.com',
//       firstName: 'Emily',
//       lastName: 'Davis',
//       role: 'manager',
//       status: 'active',
//       lastLogin: '2025-06-30T07:30:00Z',
//       createdAt: '2024-01-05T09:45:00Z',
//       phone: '+1-234-567-8904',
//       department: 'Management',
//       permissions: ['read_meters', 'write_meters', 'manage_users'],
//       loginCount: 2034,
//       avatar: null
//     },
//     {
//       id: 'USR005',
//       username: 'alex.brown',
//       email: 'alex.brown@company.com',
//       firstName: 'Alex',
//       lastName: 'Brown',
//       role: 'operator',
//       status: 'suspended',
//       lastLogin: '2025-06-28T12:00:00Z',
//       createdAt: '2024-05-15T13:20:00Z',
//       phone: '+1-234-567-8905',
//       department: 'Operations',
//       permissions: ['read_meters'],
//       loginCount: 45,
//       avatar: null
//     }
//   ]);

//   // Role templates and permissions
//   const roleTemplates = {
//     'admin': {
//       name: 'System Administrator',
//       description: 'Full system access with all permissions',
//       permissions: ['read_meters', 'write_meters', 'manage_users', 'system_admin', 'manage_roles', 'view_reports'],
//       color: 'red'
//     },
//     'manager': {
//       name: 'Manager',
//       description: 'Management level access with user management',
//       permissions: ['read_meters', 'write_meters', 'manage_users', 'view_reports'],
//       color: 'purple'
//     },
//     'operator': {
//       name: 'Operator',
//       description: 'Operational access to meter management',
//       permissions: ['read_meters', 'write_meters'],
//       color: 'blue'
//     },
//     'viewer': {
//       name: 'Viewer',
//       description: 'Read-only access to meter data',
//       permissions: ['read_meters'],
//       color: 'green'
//     }
//   };

//   const permissionsList = {
//     'read_meters': 'View meter data and status',
//     'write_meters': 'Send commands to meters',
//     'manage_users': 'Create, edit, and delete users',
//     'system_admin': 'System administration access',
//     'manage_roles': 'Manage user roles and permissions',
//     'view_reports': 'Access to reports and analytics'
//   };

//   const actionTemplates = {
//     'update_role': {
//       name: 'Update User Role',
//       description: 'Change user role and permissions',
//       requiresConfirmation: true
//     },
//     'toggle_status': {
//       name: 'Toggle User Status',
//       description: 'Activate, deactivate, or suspend user',
//       requiresConfirmation: true
//     },
//     'reset_password': {
//       name: 'Reset Password',
//       description: 'Send password reset email to user',
//       requiresConfirmation: true
//     },
//     'update_permissions': {
//       name: 'Update Permissions',
//       description: 'Modify user permissions directly',
//       requiresConfirmation: true
//     },
//     'send_notification': {
//       name: 'Send Notification',
//       description: 'Send email notification to user',
//       requiresConfirmation: false
//     },
//     'view_activity': {
//       name: 'View Activity Log',
//       description: 'View user login and activity history',
//       requiresConfirmation: false
//     }
//   };

//   const filteredUsers = users.filter(user =>
//     user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return 'text-green-500';
//       case 'inactive': return 'text-gray-500';
//       case 'suspended': return 'text-red-500';
//       default: return 'text-yellow-500';
//     }
//   };

//   const getStatusBg = (status) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'inactive': return 'bg-gray-100 text-gray-800';
//       case 'suspended': return 'bg-red-100 text-red-800';
//       default: return 'bg-yellow-100 text-yellow-800';
//     }
//   };

//   const getRoleColor = (role) => {
//     return roleTemplates[role]?.color || 'gray';
//   };

//   const getRoleBg = (role) => {
//     const color = getRoleColor(role);
//     const colorMap = {
//       'red': 'bg-red-100 text-red-800',
//       'purple': 'bg-purple-100 text-purple-800',
//       'blue': 'bg-blue-100 text-blue-800',
//       'green': 'bg-green-100 text-green-800',
//       'gray': 'bg-gray-100 text-gray-800'
//     };
//     return colorMap[color] || colorMap.gray;
//   };

//   const handleFormChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleAction = async () => {
//     if (!selectedUser || !actionType) return;

//     setProcessing(true);

//     const action = {
//       id: Date.now(),
//       userId: selectedUser.id,
//       userName: `${selectedUser.firstName} ${selectedUser.lastName}`,
//       actionType: actionTemplates[actionType]?.name || 'Unknown Action',
//       details: formData,
//       timestamp: new Date().toISOString(),
//       status: 'pending',
//       performedBy: 'Admin User' // In real app, this would be the current user
//     };

//     // Simulate API call
//     setTimeout(() => {
//       action.status = Math.random() > 0.1 ? 'completed' : 'failed';
//       setActionHistory(prev => [action, ...prev]);
//       setProcessing(false);

//       // Update user data based on action
//       if (action.status === 'completed') {
//         setUsers(prevUsers => prevUsers.map(user => {
//           if (user.id === selectedUser.id) {
//             const updatedUser = { ...user };
//             if (actionType === 'update_role' && formData.newRole) {
//               updatedUser.role = formData.newRole;
//               updatedUser.permissions = roleTemplates[formData.newRole].permissions;
//             } else if (actionType === 'toggle_status' && formData.newStatus) {
//               updatedUser.status = formData.newStatus;
//             }
//             return updatedUser;
//           }
//           return user;
//         }));
//       }

//       // Reset form
//       setActionType('');
//       setFormData({});
//     }, 2000);
//   };

//   const formatTimestamp = (timestamp) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   const getInitials = (firstName, lastName) => {
//     return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management Center</h1>
//               <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
//             </div>
//             <button
//               onClick={() => setShowCreateForm(true)}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               <UserPlus className="h-5 w-5 mr-2" />
//               Add New User
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* User Selection Panel */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//               <div className="p-4 border-b border-gray-200">
//                 <h2 className="font-semibold text-gray-900 mb-3">Select User</h2>
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <input
//                     type="text"
//                     placeholder="Search users..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="max-h-96 overflow-y-auto">
//                 {filteredUsers.map((user) => (
//                   <div
//                     key={user.id}
//                     onClick={() => setSelectedUser(user)}
//                     className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
//                       selectedUser?.id === user.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
//                     }`}
//                   >
//                     <div className="flex items-center mb-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
//                         {getInitials(user.firstName, user.lastName)}
//                       </div>
//                       <div className="flex-1">
//                         <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
//                         <div className="text-sm text-gray-600">@{user.username}</div>
//                       </div>
//                       <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(user.status)}`}>
//                         {user.status}
//                       </div>
//                     </div>

//                     <div className="space-y-1 text-sm text-gray-600">
//                       <div className="flex items-center">
//                         <Mail className="h-3 w-3 mr-2" />
//                         {user.email}
//                       </div>
//                       <div className="flex items-center">
//                         <Shield className="h-3 w-3 mr-2" />
//                         <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRoleBg(user.role)}`}>
//                           {roleTemplates[user.role]?.name || user.role}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
//                       <div className="flex items-center">
//                         <Activity className="h-3 w-3 mr-1" />
//                         {user.loginCount} logins
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="h-3 w-3 mr-1" />
//                         {new Date(user.lastLogin).toLocaleDateString()}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* User Action Configuration Panel */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//               <div className="p-6">
//                 <h2 className="font-semibold text-gray-900 mb-4">User Actions</h2>

//                 {selectedUser ? (
//                   <div className="space-y-6">
//                     {/* Selected User Info */}
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium mr-4">
//                             {getInitials(selectedUser.firstName, selectedUser.lastName)}
//                           </div>
//                           <div>
//                             <h3 className="font-medium text-blue-900">{selectedUser.firstName} {selectedUser.lastName}</h3>
//                             <p className="text-sm text-blue-700">{selectedUser.email}</p>
//                             <p className="text-sm text-blue-600">{selectedUser.department}</p>
//                           </div>
//                         </div>
//                         <Users className="h-8 w-8 text-blue-600" />
//                       </div>

//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-blue-200">
//                         <div>
//                           <div className="text-xs text-blue-600 uppercase tracking-wide">Status</div>
//                           <div className={`text-sm font-medium ${getStatusColor(selectedUser.status)}`}>
//                             {selectedUser.status}
//                           </div>
//                         </div>
//                         <div>
//                           <div className="text-xs text-blue-600 uppercase tracking-wide">Role</div>
//                           <div className="text-sm font-medium text-blue-900">
//                             {roleTemplates[selectedUser.role]?.name || selectedUser.role}
//                           </div>
//                         </div>
//                         <div>
//                           <div className="text-xs text-blue-600 uppercase tracking-wide">Last Login</div>
//                           <div className="text-sm font-medium text-blue-900">
//                             {formatDate(selectedUser.lastLogin)}
//                           </div>
//                         </div>
//                         <div>
//                           <div className="text-xs text-blue-600 uppercase tracking-wide">Member Since</div>
//                           <div className="text-sm font-medium text-blue-900">
//                             {formatDate(selectedUser.createdAt)}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Action Type Selection */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
//                       <select
//                         value={actionType}
//                         onChange={(e) => {
//                           setActionType(e.target.value);
//                           setFormData({});
//                         }}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="">Select an action...</option>
//                         {Object.entries(actionTemplates).map(([key, template]) => (
//                           <option key={key} value={key}>{template.name}</option>
//                         ))}
//                       </select>
//                       {actionType && (
//                         <p className="mt-2 text-sm text-gray-600">{actionTemplates[actionType].description}</p>
//                       )}
//                     </div>

//                     {/* Action-Specific Forms */}
//                     {actionType === 'update_role' && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">New Role</label>
//                         <select
//                           value={formData.newRole || ''}
//                           onChange={(e) => handleFormChange('newRole', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                           <option value="">Select new role...</option>
//                           {Object.entries(roleTemplates).map(([key, role]) => (
//                             <option key={key} value={key}>{role.name}</option>
//                           ))}
//                         </select>
//                         {formData.newRole && (
//                           <div className="mt-3 p-3 bg-gray-50 rounded-md">
//                             <div className="text-sm font-medium text-gray-700 mb-2">Permissions for this role:</div>
//                             <div className="space-y-1">
//                               {roleTemplates[formData.newRole].permissions.map((permission) => (
//                                 <div key={permission} className="flex items-center text-sm text-gray-600">
//                                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                                   {permissionsList[permission]}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {actionType === 'toggle_status' && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
//                         <select
//                           value={formData.newStatus || ''}
//                           onChange={(e) => handleFormChange('newStatus', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                           <option value="">Select new status...</option>
//                           <option value="active">Active</option>
//                           <option value="inactive">Inactive</option>
//                           <option value="suspended">Suspended</option>
//                         </select>
//                         {formData.newStatus && (
//                           <div className="mt-2 text-sm text-gray-600">
//                             {formData.newStatus === 'active' && 'User will have full access according to their role.'}
//                             {formData.newStatus === 'inactive' && 'User will not be able to log in.'}
//                             {formData.newStatus === 'suspended' && 'User account will be temporarily suspended.'}
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {actionType === 'send_notification' && (
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
//                           <input
//                             type="text"
//                             value={formData.subject || ''}
//                             onChange={(e) => handleFormChange('subject', e.target.value)}
//                             placeholder="Enter notification subject"
//                             className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//                           <textarea
//                             value={formData.message || ''}
//                             onChange={(e) => handleFormChange('message', e.target.value)}
//                             placeholder="Enter notification message"
//                             rows={4}
//                             className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           />
//                         </div>
//                       </div>
//                     )}

//                     {/* Current Permissions Display */}
//                     {selectedUser && (
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h4 className="font-medium text-gray-700 mb-3">Current Permissions</h4>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                           {selectedUser.permissions.map((permission) => (
//                             <div key={permission} className="flex items-center text-sm text-gray-600">
//                               <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                               {permissionsList[permission]}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Execute Action Button */}
//                     <button
//                       onClick={handleAction}
//                       disabled={!actionType || processing}
//                       className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                     >
//                       {processing ? (
//                         <Loader2 className="h-5 w-5 mr-2 animate-spin" />
//                       ) : (
//                         <Settings className="h-5 w-5 mr-2" />
//                       )}
//                       {processing ? 'Processing...' : 'Execute Action'}
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500">Select a user to manage their account</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Action History */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//               <div className="p-6">
//                 <h2 className="font-semibold text-gray-900 mb-4">Action History</h2>

//                 {actionHistory.length > 0 ? (
//                   <div className="space-y-4">
//                     {actionHistory.slice(0, 10).map((action) => (
//                       <div key={action.id} className="border border-gray-200 rounded-lg p-4">
//                         <div className="flex items-center justify-between mb-2">
//                           <div className="flex items-center">
//                             {action.status === 'completed' ? (
//                               <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                             ) : action.status === 'failed' ? (
//                               <XCircle className="h-5 w-5 text-red-500 mr-2" />
//                             ) : (
//                               <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
//                             )}
//                             <span className="font-medium">{action.actionType}</span>
//                           </div>
//                           <span className="text-sm text-gray-500">
//                             {formatTimestamp(action.timestamp)}
//                           </span>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
//                           <div>User: {action.userName}</div>
//                           <div>Performed by: {action.performedBy}</div>
//                           {action.details.newRole && <div>New Role: {roleTemplates[action.details.newRole]?.name}</div>}
//                           {action.details.newStatus && <div>New Status: {action.details.newStatus}</div>}
//                           {action.details.subject && <div>Subject: {action.details.subject}</div>}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                     <p className="text-gray-500">No actions performed yet</p>
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

// export default UserManagement;


// src/pages/UserManagement.jsx


import React, { useState } from 'react';
import UserCard from '../components/userManagement/UserCard';
import UserDetailsPanel from '../components/userManagement/UserDetailsPanel';
import ActionHistory from '../components/userManagement/ActionHistory';
import CreateUserModal from '../components/userManagement/CreateUserModal';
import EditUserModal from '../components/userManagement/EditUserModal';
import DeleteConfirmation from '../components/userManagement/DeleteConfirmation';
import Icons from '../components/icons/LucideIcons';

const UserManagement = () => {
  // State declarations
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [processing, setProcessing] = useState(false);
  const [actionHistory, setActionHistory] = useState([]);
  const [formData, setFormData] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createUserData, setCreateUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    department: '',
    role: 'viewer',
    status: 'active',
    sendWelcomeEmail: true,
    requirePasswordReset: true
  });
  const [createUserErrors, setCreateUserErrors] = useState({});
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    status: '',
    permissions: []
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // // Mock data
  // const [users, setUsers] = useState([
  //   // ... same as original mock data
  // ]);

  // // Role templates and permissions
  // const roleTemplates = {
  //   // ... same as original roleTemplates
  // };

  // const permissionsList = {
  //   // ... same as original permissionsList
  // };

  // const departments = [
  //   // ... same as original departments
  // ];

  // const actionTemplates = {
  //   // ... same as original actionTemplates
  // };

  const actionTemplates = {
    update_role: {
      name: 'Update Role',
      description: 'Change the role of the selected user',
      fields: [
        {
          name: 'newRole',
          label: 'New Role',
          type: 'select',
          options: ['admin', 'editor', 'viewer']
        }
      ]
    },
    toggle_status: {
      name: 'Toggle User Status',
      description: 'Activate or deactivate a user account',
      fields: [
        {
          name: 'newStatus',
          label: 'Status',
          type: 'select',
          options: ['active', 'inactive']
        }
      ]
    },
    send_password_reset: {
      name: 'Send Password Reset Email',
      description: 'Trigger a password reset email for the user',
      fields: []
    },
    force_logout: {
      name: 'Force Logout',
      description: 'Log the user out of all active sessions',
      fields: []
    },
    update_department: {
      name: 'Update Department',
      description: 'Move user to a different department',
      fields: [
        {
          name: 'newDepartment',
          label: 'Department',
          type: 'select',
          options: ['Engineering', 'Marketing', 'HR', 'Finance', 'Operations']
        }
      ]
    }
  };


  const [users, setUsers] = useState([
    {
      id: 'USR001',
      username: 'john.doe',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      department: 'Engineering',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-06-30T12:00:00Z',
      createdAt: '2025-06-01T08:30:00Z',
      permissions: ['view_users', 'edit_users', 'delete_users'],
      loginCount: 12,
      avatar: null
    },
    {
      id: 'USR002',
      username: 'jane.smith',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1987654321',
      department: 'Marketing',
      role: 'editor',
      status: 'inactive',
      lastLogin: '2025-06-25T15:45:00Z',
      createdAt: '2025-05-20T10:00:00Z',
      permissions: ['view_users', 'edit_users'],
      loginCount: 8,
      avatar: null
    },
    {
      id: 'USR003',
      username: 'alex.johnson',
      email: 'alex.johnson@example.com',
      firstName: 'Alex',
      lastName: 'Johnson',
      phone: '+1123456789',
      department: 'HR',
      role: 'viewer',
      status: 'active',
      lastLogin: '2025-06-29T09:00:00Z',
      createdAt: '2025-04-15T13:20:00Z',
      permissions: ['view_users'],
      loginCount: 20,
      avatar: null
    }
  ]);

  const roleTemplates = {
    admin: {
      name: 'Admin',
      permissions: ['view_users', 'edit_users', 'delete_users', 'manage_roles']
    },
    editor: {
      name: 'Editor',
      permissions: ['view_users', 'edit_users']
    },
    viewer: {
      name: 'Viewer',
      permissions: ['view_users']
    }
  };

  const permissionsList = {
    view_users: 'View Users',
    edit_users: 'Edit Users',
    delete_users: 'Delete Users',
    manage_roles: 'Manage Roles'
  };

  const departments = [
    'Engineering',
    'Marketing',
    'HR',
    'Finance',
    'Operations'
  ];


  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form change for actions
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle create user form change
  const handleCreateUserChange = (field, value) => {
    setCreateUserData(prev => ({
      ...prev,
      [field]: value
    }));

    if (createUserErrors[field]) {
      setCreateUserErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validate create user form
  const validateCreateUserForm = () => {
    const errors = {};

    if (!createUserData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!createUserData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!createUserData.username.trim()) {
      errors.username = 'Username is required';
    } else if (users.some(user => user.username === createUserData.username.trim())) {
      errors.username = 'Username already exists';
    }

    if (!createUserData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createUserData.email)) {
      errors.email = 'Please enter a valid email address';
    } else if (users.some(user => user.email === createUserData.email.trim())) {
      errors.email = 'Email already exists';
    }

    if (!createUserData.department) {
      errors.department = 'Department is required';
    }

    if (createUserData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(createUserData.phone.replace(/[-\s]/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    setCreateUserErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Create a new user
  const handleCreateUser = async () => {
    if (!validateCreateUserForm()) {
      return;
    }

    setIsCreatingUser(true);

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: `USR${String(users.length + 1).padStart(3, '0')}`,
        username: createUserData.username.trim(),
        email: createUserData.email.trim(),
        firstName: createUserData.firstName.trim(),
        lastName: createUserData.lastName.trim(),
        role: createUserData.role,
        status: createUserData.status,
        lastLogin: null,
        createdAt: new Date().toISOString(),
        phone: createUserData.phone.trim(),
        department: createUserData.department,
        permissions: roleTemplates[createUserData.role].permissions,
        loginCount: 0,
        avatar: null
      };

      setUsers(prev => [...prev, newUser]);

      // Add to action history
      const action = {
        id: Date.now(),
        userId: newUser.id,
        userName: `${newUser.firstName} ${newUser.lastName}`,
        actionType: 'User Created',
        details: {
          role: newUser.role,
          department: newUser.department,
          sendWelcomeEmail: createUserData.sendWelcomeEmail,
          requirePasswordReset: createUserData.requirePasswordReset
        },
        timestamp: new Date().toISOString(),
        status: 'completed',
        performedBy: 'Admin User'
      };

      setActionHistory(prev => [action, ...prev]);

      // Reset form and close modal
      setCreateUserData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        department: '',
        role: 'viewer',
        status: 'active',
        sendWelcomeEmail: true,
        requirePasswordReset: true
      });
      setCreateUserErrors({});
      setShowCreateForm(false);
      setIsCreatingUser(false);

      // Auto-select the new user
      setSelectedUser(newUser);
    }, 2000);
  };

  // Handle user actions
  const handleAction = async () => {
    if (!selectedUser || !actionType) return;

    setProcessing(true);

    const action = {
      id: Date.now(),
      userId: selectedUser.id,
      userName: `${selectedUser.firstName} ${selectedUser.lastName}`,
      actionType: actionTemplates[actionType]?.name || 'Unknown Action',
      details: formData,
      timestamp: new Date().toISOString(),
      status: 'pending',
      performedBy: 'Admin User'
    };

    // Simulate API call
    setTimeout(() => {
      action.status = Math.random() > 0.1 ? 'completed' : 'failed';
      setActionHistory(prev => [action, ...prev]);
      setProcessing(false);

      // Update user data based on action
      if (action.status === 'completed') {
        setUsers(prevUsers => prevUsers.map(user => {
          if (user.id === selectedUser.id) {
            const updatedUser = { ...user };
            if (actionType === 'update_role' && formData.newRole) {
              updatedUser.role = formData.newRole;
              updatedUser.permissions = roleTemplates[formData.newRole].permissions;
            } else if (actionType === 'toggle_status' && formData.newStatus) {
              updatedUser.status = formData.newStatus;
            }
            return updatedUser;
          }
          return user;
        }));
      }

      // Reset form
      setActionType('');
      setFormData({});
    }, 2000);
  };

  // Handle user edit
  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setEditUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      department: user.department,
      role: user.role,
      status: user.status,
      permissions: [...user.permissions]
    });
  };

  // Save edited user
  const saveEditedUser = () => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === editingUserId ? {
          ...user,
          firstName: editUserData.firstName,
          lastName: editUserData.lastName,
          email: editUserData.email,
          phone: editUserData.phone,
          department: editUserData.department,
          role: editUserData.role,
          status: editUserData.status,
          permissions: editUserData.permissions
        } : user
      )
    );

    // Add to action history
    const user = users.find(u => u.id === editingUserId);
    const action = {
      id: Date.now(),
      userId: editingUserId,
      userName: `${editUserData.firstName} ${editUserData.lastName}`,
      actionType: 'User Updated',
      details: {
        changedFields: Object.keys(editUserData)
          .filter(key => editUserData[key] !== user[key])
          .map(key => ({
            field: key,
            oldValue: user[key],
            newValue: editUserData[key]
          }))
      },
      timestamp: new Date().toISOString(),
      status: 'completed',
      performedBy: 'Admin User'
    };

    setActionHistory(prev => [action, ...prev]);
    setEditingUserId(null);
  };

  // Toggle permission in edit form
  const togglePermission = (permission) => {
    setEditUserData(prev => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];

      return {
        ...prev,
        permissions: newPermissions
      };
    });
  };

  // Confirm user deletion
  const confirmDelete = () => {
    if (!deletingUserId) return;

    setIsDeleting(true);

    // Simulate API call
    setTimeout(() => {
      const userToDelete = users.find(user => user.id === deletingUserId);

      setUsers(prev => prev.filter(user => user.id !== deletingUserId));

      // Add to action history
      const action = {
        id: Date.now(),
        userId: deletingUserId,
        userName: `${userToDelete.firstName} ${userToDelete.lastName}`,
        actionType: 'User Deleted',
        details: {
          username: userToDelete.username,
          email: userToDelete.email
        },
        timestamp: new Date().toISOString(),
        status: 'completed',
        performedBy: 'Admin User'
      };

      setActionHistory(prev => [action, ...prev]);

      if (selectedUser?.id === deletingUserId) {
        setSelectedUser(null);
      }

      setShowDeleteConfirm(false);
      setDeletingUserId(null);
      setIsDeleting(false);
    }, 1500);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management Center</h1>
              <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Icons.UserPlus className="h-5 w-5 mr-2" />
              Add New User
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Selection Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900 mb-3">Select User</h2>
                <div className="relative">
                  <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isSelected={selectedUser?.id === user.id}
                    onSelect={() => setSelectedUser(user)}
                    onEdit={() => handleEditUser(user)}
                    onDelete={() => {
                      setDeletingUserId(user.id);
                      setShowDeleteConfirm(true);
                    }}
                    roleTemplates={roleTemplates}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* User Action Configuration Panel and Action History */}
          <div className="lg:col-span-2">
            <UserDetailsPanel
              selectedUser={selectedUser}
              actionType={actionType}
              setActionType={setActionType}
              formData={formData}
              handleFormChange={handleFormChange}
              roleTemplates={roleTemplates}
              permissionsList={permissionsList}
              actionTemplates={actionTemplates}
              handleAction={handleAction}
              processing={processing}
            />

            <div className="mt-6">
              <ActionHistory actionHistory={actionHistory} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateForm && (
        <CreateUserModal
          createUserData={createUserData}
          createUserErrors={createUserErrors}
          setShowCreateForm={setShowCreateForm}
          handleCreateUserChange={handleCreateUserChange}
          handleCreateUser={handleCreateUser}
          isCreatingUser={isCreatingUser}
          departments={departments}
          roleTemplates={roleTemplates}
        />
      )}

      {editingUserId && (
        <EditUserModal
          user={users.find(u => u.id === editingUserId)}
          editUserData={editUserData}
          setEditUserData={setEditUserData}
          setEditingUserId={setEditingUserId}
          saveEditedUser={saveEditedUser}
          departments={departments}
          roleTemplates={roleTemplates}
          permissionsList={permissionsList}
          togglePermission={togglePermission}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          user={users.find(u => u.id === deletingUserId)}
          setShowDeleteConfirm={setShowDeleteConfirm}
          confirmDelete={confirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default UserManagement;