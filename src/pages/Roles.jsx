
// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
// import Header from "../components/header/Header";

// const Roles = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setHeaderTitle("Roles"));
//     dispatch(
//       setBreadcrumbs([
//         // { label: "Home", link: "/home" },  // Updated label for clarity
//         { label: "Roles" },
//       ])
//     );
//   }, []);

//   return (
//     <div className="w-full h-full">
//       <Header />
//       {/* Page content goes here */}
//     </div>
//   );
// };

// export default Roles;













// src/pages/Roles.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHeaderTitle, setBreadcrumbs } from "../redux/slice/headerSlice";
import Header from "../components/header/Header";
import { roleApi } from "../api/apiService";

const Roles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setHeaderTitle("Roles"));
    dispatch(setBreadcrumbs([{ label: "Roles" }]));
  }, [dispatch]);

  const getAllRoles = async () => {
    try {
      setLoading(true);
      const response = await roleApi.getAllRoles();
      if (response.status === 200 && response.data.success) {
        setRoles(response.data.roles);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const handleViewPermissions = (roleName) => {
    // navigate(`/roles/permissions/${roleName}`);
    navigate(`permissions/${roleName}`);
    // navigate(`${roles._id}/permissions/${roleName}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading roles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-bg-blue-200/10 min-h-screen">
      <Header />
      <div className="p-4 max-w-7xl mx-auto">
        <h2 className="heading-xl   sm:heading-xl   md:heading-xl   font-semibold text-gray-900 mb-2">
          Roles Management
        </h2>
        <p className="text-gray-600 mb-2">
          Manage user roles and their permissions.
        </p>

        {/* Roles Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          {roles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                    <th className="px-6 py-3 text-left  body-sm   font-semibold">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left body-sm   font-semibold">
                      Role Name
                    </th>
                    <th className="px-6 py-3 text-left body-sm   font-semibold">
                      Permissions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 body-sm   text-gray-700 border-b">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 body-sm   text-gray-700 border-b capitalize">
                        {role}
                      </td>
                      <td className="px-6 py-4 body-sm   text-gray-700 border-b">
                        <button
                          onClick={() => handleViewPermissions(role)}
                          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
                        >
                          View Permissions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-6">No roles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roles;

