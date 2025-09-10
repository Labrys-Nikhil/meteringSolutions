// components/TokenExpirationChecker.jsx
import { useEffect } from "react";

const TokenExpirationChecker = () => {
  useEffect(() => {
    const checkTokenExpiration = () => {
    //   const expiryTime = localStorage.getItem("tokenExpiry");
       const authToken = localStorage.getItem("authToken");
    //   if (expiryTime && Date.now() > parseInt(expiryTime)) {
      if (!authToken) {
        // Token expired, redirect to login
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default TokenExpirationChecker;