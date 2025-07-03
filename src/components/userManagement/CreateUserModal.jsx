// src/components/user-management/CreateUserModal.jsx
import React from 'react';
import Icons from '../icons/LucideIcons';

const CreateUserModal = ({
    createUserData,
    createUserErrors,
    setShowCreateForm,
    handleCreateUserChange,
    handleCreateUser,
    isCreatingUser,
    departments,
    roleTemplates
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100/30 backdrop-blur-sm">
            <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
                <div className="p-6" >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Create New User</h2>
                        <button
                            onClick={() => setShowCreateForm(false)}
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
                                value={createUserData.firstName}
                                onChange={(e) => handleCreateUserChange('firstName', e.target.value)}
                                className={`w-full p-2 border ${createUserErrors.firstName ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md`}
                            />
                            {createUserErrors.firstName && (
                                <p className="mt-1 text-xs text-red-500">{createUserErrors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                value={createUserData.lastName}
                                onChange={(e) => handleCreateUserChange('lastName', e.target.value)}
                                className={`w-full p-2 border ${createUserErrors.lastName ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md`}
                            />
                            {createUserErrors.lastName && (
                                <p className="mt-1 text-xs text-red-500">{createUserErrors.lastName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                value={createUserData.username}
                                onChange={(e) => handleCreateUserChange('username', e.target.value)}
                                className={`w-full p-2 border ${createUserErrors.username ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md`}
                            />
                            {createUserErrors.username && (
                                <p className="mt-1 text-xs text-red-500">{createUserErrors.username}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={createUserData.email}
                                onChange={(e) => handleCreateUserChange('email', e.target.value)}
                                className={`w-full p-2 border ${createUserErrors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md`}
                            />
                            {createUserErrors.email && (
                                <p className="mt-1 text-xs text-red-500">{createUserErrors.email}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                value={createUserData.phone}
                                onChange={(e) => handleCreateUserChange('phone', e.target.value)}
                                className={`w-full p-2 border ${createUserErrors.phone ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md`}
                            />
                            {createUserErrors.phone && (
                                <p className="mt-1 text-xs text-red-500">{createUserErrors.phone}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select
                                value={createUserData.department}
                                onChange={(e) => handleCreateUserChange('department', e.target.value)}
                                className={`w-full p-2 border ${createUserErrors.department ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md`}
                            >
                                <option value="">Select department</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                            {createUserErrors.department && (
                                <p className="mt-1 text-xs text-red-500">{createUserErrors.department}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                                value={createUserData.role}
                                onChange={(e) => handleCreateUserChange('role', e.target.value)}
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
                                value={createUserData.status}
                                onChange={(e) => handleCreateUserChange('status', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="sendWelcomeEmail"
                                checked={createUserData.sendWelcomeEmail}
                                onChange={(e) => handleCreateUserChange('sendWelcomeEmail', e.target.checked)}
                                className="h-4 w-4 text-blue-600 rounded"
                            />
                            <label htmlFor="sendWelcomeEmail" className="ml-2 text-sm text-gray-700">
                                Send welcome email
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="requirePasswordReset"
                                checked={createUserData.requirePasswordReset}
                                onChange={(e) => handleCreateUserChange('requirePasswordReset', e.target.checked)}
                                className="h-4 w-4 text-blue-600 rounded"
                            />
                            <label htmlFor="requirePasswordReset" className="ml-2 text-sm text-gray-700">
                                Require password reset on first login
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setShowCreateForm(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCreateUser}
                            disabled={isCreatingUser}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {isCreatingUser ? (
                                <span className="flex items-center">
                                    <Icons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Creating...
                                </span>
                            ) : 'Create User'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUserModal;