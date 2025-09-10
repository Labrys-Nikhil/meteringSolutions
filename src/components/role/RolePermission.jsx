



// // import React, { useEffect, useState } from "react";
// // import { toast } from "react-toastify";
// // import { roleApi } from "../../api/apiService";
// // import { useParams } from "react-router-dom";

// // const RolePermissionsViewer = () => {
// //   const [permissions, setPermissions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const { roleName } = useParams();

// //   useEffect(() => {
// //     const fetchPermissions = async () => {
// //       setLoading(true);
// //       try {
// //         // API now only depends on logged-in user (token middleware)
// //         const response = await roleApi.getPermissionsByRole(roleName);
// //         setPermissions(response.data);
// //       } catch (error) {
// //         console.error("Error fetching permissions:", error);
// //         toast.error("Failed to fetch permissions");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (roleName) {
// //       fetchPermissions();
// //     }
// //   }, [roleName]);

// //   const handleToggle = (moduleId, key) => {
// //     const updatePermissions = (modules) =>
// //       modules.map((mod) => {
// //         if (mod.module_id === moduleId) {
// //           return {
// //             ...mod,
// //             permissions: {
// //               ...mod.permissions,
// //               [key]: !mod.permissions[key],
// //             },
// //           };
// //         }
// //         if (mod.children && mod.children.length > 0) {
// //           return {
// //             ...mod,
// //             children: updatePermissions(mod.children),
// //           };
// //         }
// //         return mod;
// //       });

// //     setPermissions((prev) => updatePermissions(prev));
// //   };

// //   const handleSelectAll = (value) => {
// //     const updateAll = (modules) =>
// //       modules.map((mod) => ({
// //         ...mod,
// //         permissions: {
// //           read: value,
// //           create: value,
// //           update: value,
// //           delete: value,
// //         },
// //         children: mod.children ? updateAll(mod.children) : [],
// //       }));

// //     setPermissions((prev) => updateAll(prev));
// //     setSelectAll(value);
// //   };
// // // RolePermissionsViewer.jsx
// // const flattenPermissions = (modules, role) => {
// //   let flat = [];
// //   modules.forEach((mod) => {
// //     flat.push({
// //       module_id: mod.module_id,
// //       role,  // 🔑 Add target role here
// //       read: mod.permissions.read,
// //       create: mod.permissions.create,
// //       update: mod.permissions.update,
// //       delete: mod.permissions.delete,
// //     });
// //     if (mod.children && mod.children.length > 0) {
// //       flat = flat.concat(flattenPermissions(mod.children, role));
// //     }
// //   });
// //   return flat;
// // };

// // const handleSave = async () => {
// //   try {
// //     setSaving(true);
// //     const payload = {
// //       permissions: flattenPermissions(permissions, roleName), // pass roleName from useParams
// //     };
// //     const response = await roleApi.updatePermissionsInBulk(payload);
// //     toast.success(response.data.message);
// //   } catch (error) {
// //     toast.error(error?.response?.data?.message || "Failed to update permissions");
// //   } finally {
// //     setSaving(false);
// //   }
// // };

 
// //   const renderPermissions = (modules) =>
// //     modules.map((module) => (
// //       <div key={module.module_id} className="ml-4 border-l border-gray-300 pl-4">
// //         <div className="font-semibold text-blue-600 text-lg">{module.name}</div>
// //         <div className="ml-2 body-sm   mt-1">
// //           {["read", "create", "update", "delete"].map((permKey) => (
// //             <label key={permKey} className="mr-4">
// //               <input
// //                 type="checkbox"
// //                 className="mr-1 accent-blue-600"
// //                 checked={module.permissions[permKey]}
// //                 onChange={() => handleToggle(module.module_id, permKey)}
// //               />
// //               {permKey.charAt(0).toUpperCase() + permKey.slice(1)}
// //             </label>
// //           ))}
// //         </div>
// //         {module.children && module.children.length > 0 && (
// //           <div className="ml-4">{renderPermissions(module.children)}</div>
// //         )}
// //       </div>
// //     ));

// //   return (
// //     <div className="p-4 w-full">
// //       <h2 className="heading-xl   font-bold mb-4">Role Permissions</h2>

// //       {loading ? (
// //         <p>Loading permissions...</p>
// //       ) : permissions.length > 0 ? (
// //         <>
// //           <div className="mb-4">
// //             <button
// //               onClick={() => handleSelectAll(!selectAll)}
// //               className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded transition"
// //             >
// //               {selectAll ? "Deselect All" : "Select All"}
// //             </button>
// //           </div>
// //           <div>{renderPermissions(permissions)}</div>
// //         </>
// //       ) : (
// //         <p className="text-gray-500">No permissions found.</p>
// //       )}

// //       {permissions.length > 0 && (
// //         <div className="h-auto mb-8">
// //           <button
// //             onClick={handleSave}
// //             className={`bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition ${
// //               saving ? "opacity-50 cursor-not-allowed" : ""
// //             }`}
// //             disabled={saving}
// //           >
// //             {saving ? "Saving..." : "Save Changes"}
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default RolePermissionsViewer;






//  import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { roleApi } from "../../api/apiService";
// import { useParams } from "react-router-dom";

// const RolePermissionsViewer = () => {
//   const [permissions, setPermissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [selectAll, setSelectAll] = useState(false);
//   const [expandedModules, setExpandedModules] = useState(new Set());
//   const { roleName } = useParams();

//   useEffect(() => {
//     const fetchPermissions = async () => {
//       setLoading(true);
//       try {
//         const response = await roleApi.getPermissionsByRole(roleName);
//         setPermissions(response.data);
//         // Auto-expand all modules by default
//         const allModuleIds = getAllModuleIds(response.data);
//         setExpandedModules(new Set(allModuleIds));
//       } catch (error) {
//         console.error("Error fetching permissions:", error);
//         toast.error("Failed to fetch permissions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (roleName) {
//       fetchPermissions();
//     }
//   }, [roleName]);

//   const getAllModuleIds = (modules) => {
//     let ids = [];
//     modules.forEach((mod) => {
//       ids.push(mod.module_id);
//       if (mod.children && mod.children.length > 0) {
//         ids = ids.concat(getAllModuleIds(mod.children));
//       }
//     });
//     return ids;
//   };

//   const toggleModule = (moduleId) => {
//     const newExpanded = new Set(expandedModules);
//     if (newExpanded.has(moduleId)) {
//       newExpanded.delete(moduleId);
//     } else {
//       newExpanded.add(moduleId);
//     }
//     setExpandedModules(newExpanded);
//   };

//   const handleToggle = (moduleId, key) => {
//     const updatePermissions = (modules) =>
//       modules.map((mod) => {
//         if (mod.module_id === moduleId) {
//           return {
//             ...mod,
//             permissions: {
//               ...mod.permissions,
//               [key]: !mod.permissions[key],
//             },
//           };
//         }
//         if (mod.children && mod.children.length > 0) {
//           return {
//             ...mod,
//             children: updatePermissions(mod.children),
//           };
//         }
//         return mod;
//       });

//     setPermissions((prev) => updatePermissions(prev));
//   };

//   const handleSelectAll = (value) => {
//     const updateAll = (modules) =>
//       modules.map((mod) => ({
//         ...mod,
//         permissions: {
//           read: value,
//           create: value,
//           update: value,
//           delete: value,
//         },
//         children: mod.children ? updateAll(mod.children) : [],
//       }));

//     setPermissions((prev) => updateAll(prev));
//     setSelectAll(value);
//   };

//   const flattenPermissions = (modules, role) => {
//     let flat = [];
//     modules.forEach((mod) => {
//       flat.push({
//         module_id: mod.module_id,
//         role,
//         read: mod.permissions.read,
//         create: mod.permissions.create,
//         update: mod.permissions.update,
//         delete: mod.permissions.delete,
//       });
//       if (mod.children && mod.children.length > 0) {
//         flat = flat.concat(flattenPermissions(mod.children, role));
//       }
//     });
//     return flat;
//   };

//   const handleSave = async () => {
//     try {
//       setSaving(true);
//       const payload = {
//         permissions: flattenPermissions(permissions, roleName),
//       };
//       const response = await roleApi.updatePermissionsInBulk(payload);
//       toast.success(response.data.message);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to update permissions");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getPermissionIcon = (permType) => {
//     const icons = {
//       read: "👁️",
//       create: "➕",
//       update: "✏️",
//       delete: "🗑️"
//     };
//     return icons[permType] || "•";
//   };

//   const getPermissionColor = (permType, isChecked) => {
//     const colors = {
//       read: isChecked ? "bg-green-100 border-green-300 text-green-700" : "bg-gray-100 border-gray-300 text-gray-500",
//       create: isChecked ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-gray-100 border-gray-300 text-gray-500",
//       update: isChecked ? "bg-yellow-100 border-yellow-300 text-yellow-700" : "bg-gray-100 border-gray-300 text-gray-500",
//       delete: isChecked ? "bg-red-100 border-red-300 text-red-700" : "bg-gray-100 border-gray-300 text-gray-500"
//     };
//     return colors[permType] || "bg-gray-100 border-gray-300 text-gray-500";
//   };

//   const renderPermissions = (modules, level = 0) =>
//     modules.map((module) => {
//       const isExpanded = expandedModules.has(module.module_id);
//       const hasChildren = module.children && module.children.length > 0;
      
//       return (
//  <div
//   key={module.module_id}
//   className={`mb-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200
//     w-full sm:w-[20%] md:w-[25%] lg:w-[50%]
//     ${level > 0 ? 'ml-4 sm:ml-6 md:ml-8' : 'ml-0'}
//   `}
// >
//           {/* Module Header */}
//           <div className="p-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 {hasChildren && (
//                   <button
//                     onClick={() => toggleModule(module.module_id)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
//                   >
//                     <svg
//                       className={`w-5 h-5 transition-transform duration-200 ${
//                         isExpanded ? 'rotate-90' : ''
//                       }`}
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 )}
//                 <div className={`w-2 h-2 rounded-full ${level === 0 ? 'bg-blue-500' : level === 1 ? 'bg-green-500' : 'bg-purple-500'}`}></div>
//                 <h3 className="body-sm   font-semibold text-gray-800">{module.name}</h3>
//               </div>
//               <div className="body-sm   text-gray-500">
//                 {hasChildren ? `${module.children.length} sub-modules` : ''}
//               </div>
//             </div>
//           </div>

//           {/* Permissions Grid */}
//           <div className="p-3">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {["read", "create", "update", "delete"].map((permKey) => (
//                 <label
//                   key={permKey}
//                   className={`relative flex items-center justify-center p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${getPermissionColor(permKey, module.permissions[permKey])}`}
//                 >
//                   <input
//                     type="checkbox"
//                     className="sr-only"
//                     checked={module.permissions[permKey]}
//                     onChange={() => handleToggle(module.module_id, permKey)}
//                   />
//                   <div className="flex items-center space-x-2">
//                     <span className="text-lg">{getPermissionIcon(permKey)}</span>
//                     <span className="font-medium body-sm   capitalize">{permKey}</span>
//                   </div>
//                   {module.permissions[permKey] && (
//                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
//                       <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Children Modules */}
//           {hasChildren && isExpanded && (
//             <div className="px-4 pb-4">
//               <div className="border-l-2 border-gray-200 pl-4">
//                 {renderPermissions(module.children, level + 1)}
//               </div>
//             </div>
//           )}
//         </div>
//       );
//     });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium">Loading permissions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="heading-xl   font-semibold text-gray-900">Role Permissions</h1>
//               <p className="mt-2 text-gray-600">Manage permissions for <span className="font-semibold text-blue-600">{roleName}</span></p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => handleSelectAll(!selectAll)}
//                 className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg body-sm   font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
//                 </svg>
//                 {selectAll ? "Deselect All" : "Select All"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
//         {permissions.length > 0 ? (
//           <>
//             <div className="space-y-2">
//               {renderPermissions(permissions)}
//             </div>

//             {/* Save Button */}
//             <div className=" flex justify-end">
//               <button
//                 onClick={handleSave}
//                 disabled={saving}
//                 className={`inline-flex items-center px-2 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform ${
//                   saving ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
//                 }`}
//               >
//                 {saving ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     Save Changes
//                   </>
//                 )}
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//             </svg>
//             <h3 className="mt-2 body-sm   font-medium text-gray-900">No permissions found</h3>
//             <p className="mt-1 body-sm   text-gray-500">There are no permissions available for this role.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RolePermissionsViewer;












import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { roleApi } from "../../api/apiService";
import { useParams } from "react-router-dom";

const RolePermissionsViewer = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [expandedModules, setExpandedModules] = useState(new Set());
  const { roleName } = useParams();

  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const response = await roleApi.getPermissionsByRole(roleName);
        setPermissions(response.data);
        // Auto-expand all modules by default
        const allModuleIds = getAllModuleIds(response.data);
        setExpandedModules(new Set(allModuleIds));
      } catch (error) {
        console.error("Error fetching permissions:", error);
        toast.error("Failed to fetch permissions");
      } finally {
        setLoading(false);
      }
    };

    if (roleName) {
      fetchPermissions();
    }
  }, [roleName]);

  const getAllModuleIds = (modules) => {
    let ids = [];
    modules.forEach((mod) => {
      ids.push(mod.module_id);
      if (mod.children && mod.children.length > 0) {
        ids = ids.concat(getAllModuleIds(mod.children));
      }
    });
    return ids;
  };

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleToggle = (moduleId, key) => {
    const updatePermissions = (modules) =>
      modules.map((mod) => {
        if (mod.module_id === moduleId) {
          return {
            ...mod,
            permissions: {
              ...mod.permissions,
              [key]: !mod.permissions[key],
            },
          };
        }
        if (mod.children && mod.children.length > 0) {
          return {
            ...mod,
            children: updatePermissions(mod.children),
          };
        }
        return mod;
      });

    setPermissions((prev) => updatePermissions(prev));
  };

  const handleSelectAll = (value) => {
    const updateAll = (modules) =>
      modules.map((mod) => ({
        ...mod,
        permissions: {
          read: value,
          create: value,
          update: value,
          delete: value,
        },
        children: mod.children ? updateAll(mod.children) : [],
      }));

    setPermissions((prev) => updateAll(prev));
    setSelectAll(value);
  };

  const flattenPermissions = (modules, role) => {
    let flat = [];
    modules.forEach((mod) => {
      flat.push({
        module_id: mod.module_id,
        role,
        read: mod.permissions.read,
        create: mod.permissions.create,
        update: mod.permissions.update,
        delete: mod.permissions.delete,
      });
      if (mod.children && mod.children.length > 0) {
        flat = flat.concat(flattenPermissions(mod.children, role));
      }
    });
    return flat;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        permissions: flattenPermissions(permissions, roleName),
      };
      const response = await roleApi.updatePermissionsInBulk(payload);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update permissions"
      );
    } finally {
      setSaving(false);
    }
  };

  const getPermissionIcon = (permType) => {
    const icons = {
      read: "👁️",
      create: "➕",
      update: "✏️",
      delete: "🗑️",
    };
    return icons[permType] || "•";
  };

  const getPermissionColor = (permType, isChecked) => {
    const colors = {
      read: isChecked
        ? "bg-green-100 border-green-300 text-green-700"
        : "bg-gray-100 border-gray-300 text-gray-500",
      create: isChecked
        ? "bg-blue-100 border-blue-300 text-blue-700"
        : "bg-gray-100 border-gray-300 text-gray-500",
      update: isChecked
        ? "bg-yellow-100 border-yellow-300 text-yellow-700"
        : "bg-gray-100 border-gray-300 text-gray-500",
      delete: isChecked
        ? "bg-red-100 border-red-300 text-red-700"
        : "bg-gray-100 border-gray-300 text-gray-500",
    };
    return (
      colors[permType] || "bg-gray-100 border-gray-300 text-gray-500"
    );
  };

  // ✅ Labels for frontend display
  const permissionLabels = {
    read: "Show",
    create: "Create",
    update: "Edit",
    delete: "Remove",
  };

  const renderPermissions = (modules, level = 0) => {
    return (
      <div className={`grid gap-4 ${
        level === 0 
          ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2'
      }`}>
        {modules.map((module) => {
          const isExpanded = expandedModules.has(module.module_id);
          const hasChildren = module.children && module.children.length > 0;

          return (
            <div key={module.module_id} className="w-full">
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                {/* Module Header */}
                <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {hasChildren && (
                        <button
                          onClick={() => toggleModule(module.module_id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                      {/* <div
                        className={`w-2 h-2 rounded-full ${
                          level === 0
                            ? "bg-blue-500"
                            : level === 1
                            ? "bg-green-500"
                            : "bg-purple-500"
                        }`}
                      ></div> */}
                    </div>
                  </div>
                  <h3 className="body-sm   font-semibold text-gray-800 mt-2 truncate">
                    {module.name}
                  </h3>
                  {hasChildren && (
                    <div className="body-xs  text-gray-500 mt-1">
                      {module.children.length} sub-modules
                    </div>
                  )}
                </div>

                {/* Permissions - Only Show "Read" */}
                <div className="p-3">
                  <label
                    className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${getPermissionColor(
                      'read',
                      module.permissions.read
                    )}`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={module.permissions.read}
                      onChange={() =>
                        handleToggle(module.module_id, 'read')
                      }
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {getPermissionIcon('read')}
                      </span>
                      <span className="font-medium body-sm  ">
                        {permissionLabels.read}
                      </span>
                    </div>
                    {module.permissions.read && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-2 h-2 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Children Modules */}
              {hasChildren && isExpanded && (
                <div className="mt-4 ml-4">
                  <div className="border-l-2 border-gray-200 pl-4">
                    {renderPermissions(module.children, level + 1)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading permissions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="heading-xl   font-semibold text-gray-900">
                Role Permissions
              </h1>
              <p className="mt-2 text-gray-600">
                Manage permissions for{" "}
                <span className="font-semibold text-blue-600">
                  {roleName}
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleSelectAll(!selectAll)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg body-sm   font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                    clipRule="evenodd"
                  />
                </svg>
                {selectAll ? "Deselect All" : "Select All"}
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className={`inline-flex items-center px-4 py-2 border border-transparent body-sm   font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                  saving
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              >
                {saving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {permissions.length > 0 ? (
          <div className="space-y-6">
            {renderPermissions(permissions)}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h3 className="mt-2 body-sm   font-medium text-gray-900">
              No permissions found
            </h3>
            <p className="mt-1 body-sm   text-gray-500">
              There are no permissions available for this role.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolePermissionsViewer;