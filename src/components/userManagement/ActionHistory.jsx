// src/components/user-management/ActionHistory.jsx
import React from 'react';
import Icons from '../icons/LucideIcons';
import { formatTimestamp } from '../../utils/userUtils';

const ActionHistory = ({ actionHistory }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Action History</h2>
        
        {actionHistory.length > 0 ? (
          <div className="space-y-4">
            {actionHistory.slice(0, 10).map((action) => (
              <div key={action.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {action.status === 'completed' ? (
                      <Icons.CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : action.status === 'failed' ? (
                      <Icons.XCircle className="h-5 w-5 text-red-500 mr-2" />
                    ) : (
                      <Icons.AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    )}
                    <span className="font-medium">{action.actionType}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTimestamp(action.timestamp)}
                  </span>
                </div>
                
                <div className="text-sm text-gray-700 mb-1">
                  User: {action.userName} (ID: {action.userId})
                </div>
                
                <div className="text-sm text-gray-700">
                  Performed by: {action.performedBy}
                </div>
                
                {action.details && Object.keys(action.details).length > 0 && (
                  <div className="mt-2">
                    <div className="text-xs font-medium text-gray-500">Details:</div>
                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded mt-1">
                      {Object.entries(action.details).map(([key, value]) => (
                        <div key={key} className="flex">
                          <span className="font-medium w-28">{key.replace(/_/g, ' ')}:</span>
                          <span>
                            {Array.isArray(value) 
                              ? value.join(', ') 
                              : typeof value === 'object'
                                ? JSON.stringify(value, null, 2)
                                : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icons.Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No actions recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionHistory;