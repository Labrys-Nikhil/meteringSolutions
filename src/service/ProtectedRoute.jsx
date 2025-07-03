// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'

// const ProtectedRoute = ({isAuthenticated, allowedRoles, userRoles, redirectTo = "/AdminDashboard"}) => {
//     if(isAuthenticated){
//         return <Navigate to={redirectTo}/>
//     }
//     if(!isAuthenticated.includes(userRoles)){
//         return <Navigate to="/unauthorised"/>
//     }
//     return <Outlet/>
 
// }

// export default ProtectedRoute

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, allowedRoles, userRoles, redirectTo = "/login" }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />;
    }
    if (!allowedRoles.includes(userRoles)) {
        return <Navigate to="/unauthorised" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;

