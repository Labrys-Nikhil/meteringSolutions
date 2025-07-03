// src/components/user-management/UserDetailsPanel.jsx
import React from 'react';
import Icons from '../icons/LucideIcons';
import PermissionItem from './PermissionItem';
import { 
  getInitials, 
  formatDate, 
  getStatusColor,
  getRoleBg
} from '../../utils/userUtils';

const UserDetailsPanel = ({
  selectedUser,
  actionType,
  setActionType,
  formData,
  handleFormChange,
  roleTemplates,
  permissionsList,
  actionTemplates,
  handleAction,
  processing
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="p-6">
        <h2 className="font-semibold text-gray-900 mb-4">User Actions</h2>
        
        {selectedUser ? (
          <div className="space-y-6">
            {/* Selected User Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium mr-4">
                    {getInitials(selectedUser.firstName, selectedUser.lastName)}
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">{selectedUser.firstName} {selectedUser.lastName}</h3>
                    <p className="text-sm text-blue-700">{selectedUser.email}</p>
                    <p className="text-sm text-blue-600">{selectedUser.department}</p>
                  </div>
                </div>
                <Icons.Users className="h-8 w-8 text-blue-600" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-blue-200">
                <div>
                  <div className="text-xs text-blue-600 uppercase tracking-wide">Status</div>
                  <div className={`text-sm font-medium ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-blue-600 uppercase tracking-wide">Role</div>
                  <div className="text-sm font-medium text-blue-900">
                    {roleTemplates[selectedUser.role]?.name || selectedUser.role}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-blue-600 uppercase tracking-wide">Last Login</div>
                  <div className="text-sm font-medium text-blue-900">
                    {selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : 'Never'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-blue-600 uppercase tracking-wide">Member Since</div>
                  <div className="text-sm font-medium text-blue-900">
                    {formatDate(selectedUser.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
              <select
                value={actionType}
                onChange={(e) => {
                  setActionType(e.target.value);
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an action...</option>
                {Object.entries(actionTemplates).map(([key, template]) => (
                  <option key={key} value={key}>{template.name}</option>
                ))}
              </select>
              {actionType && (
                <p className="mt-2 text-sm text-gray-600">{actionTemplates[actionType].description}</p>
              )}
            </div>

            {/* Action-Specific Forms */}
            {actionType === 'update_role' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Role</label>
                <select
                  value={formData.newRole || ''}
                  onChange={(e) => handleFormChange('newRole', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select new role...</option>
                  {Object.entries(roleTemplates).map(([key, role]) => (
                    <option key={key} value={key}>{role.name}</option>
                  ))}
                </select>
                {formData.newRole && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <div className="text-sm font-medium text-gray-700 mb-2">Permissions for this role:</div>
                    <div className="space-y-1">
                      {roleTemplates[formData.newRole].permissions.map((permission) => (
                        <div key={permission} className="flex items-center text-sm text-gray-600">
                          <Icons.CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {permissionsList[permission]}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {actionType === 'toggle_status' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
                <select
                  value={formData.newStatus || ''}
                  onChange={(e) => handleFormChange('newStatus', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select new status...</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
                {formData.newStatus && (
                  <div className="mt-2 text-sm text-gray-600">
                    {formData.newStatus === 'active' && 'User will have full access according to their role.'}
                    {formData.newStatus === 'inactive' && 'User will not be able to log in.'}
                    {formData.newStatus === 'suspended' && 'User account will be temporarily suspended.'}
                  </div>
                )}
              </div>
            )}

            {actionType === 'send_notification' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject || ''}
                    onChange={(e) => handleFormChange('subject', e.target.value)}
                    placeholder="Enter notification subject"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={formData.message || ''}
                    onChange={(e) => handleFormChange('message', e.target.value)}
                    placeholder="Enter notification message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Current Permissions Display */}
            {selectedUser && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Current Permissions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedUser.permissions.map((permission) => (
                    <div key={permission} className="flex items-center text-sm text-gray-600">
                      <Icons.CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {permissionsList[permission]}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execute Action Button */}
            <button
              onClick={handleAction}
              disabled={!actionType || processing}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? (
                <Icons.Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Icons.Settings className="h-5 w-5 mr-2" />
              )}
              {processing ? 'Processing...' : 'Execute Action'}
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <Icons.Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Select a user to manage their account</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPanel;