// src/components/user-management/EditUserModal.jsx
import React from 'react';
import Icons from '../icons/LucideIcons';
import PermissionItem from './PermissionItem';

const EditUserModal = ({
  user,
  editUserData,
  setEditUserData,
  setEditingUserId,
  saveEditedUser,
  departments,
  roleTemplates,
  permissionsList,
  togglePermission
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Edit User</h2>
            <button 
              onClick={() => setEditingUserId(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <Icons.X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={editUserData.firstName}
                onChange={(e) => setEditUserData(prev => ({...prev, firstName: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={editUserData.lastName}
                onChange={(e) => setEditUserData(prev => ({...prev, lastName: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={editUserData.email}
                onChange={(e) => setEditUserData(prev => ({...prev, email: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={editUserData.phone}
                onChange={(e) => setEditUserData(prev => ({...prev, phone: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={editUserData.department}
                onChange={(e) => setEditUserData(prev => ({...prev, department: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={editUserData.role}
                onChange={(e) => setEditUserData(prev => ({...prev, role: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.entries(roleTemplates).map(([key, role]) => (
                  <option key={key} value={key}>{role.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={editUserData.status}
                onChange={(e) => setEditUserData(prev => ({...prev, status: e.target.value}))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(permissionsList).map(([key, description]) => (
                <PermissionItem
                  key={key}
                  permission={key}
                  description={description}
                  isSelected={editUserData.permissions.includes(key)}
                  onClick={() => togglePermission(key)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setEditingUserId(null)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={saveEditedUser}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;