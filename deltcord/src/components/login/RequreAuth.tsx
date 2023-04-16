import React, { useEffect } from "react";
import useDeltaStore from "../../store/store";

import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";

const RequreAuth = () => {
  const location = useLocation();
  const navigate=useNavigate()
  const { user } = useDeltaStore((state) => state);
console.log(user)
  return user.isloggedin ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
  // ? <Navigate to="/unauthorized" state={{ from: location }} replace />
};

export default RequreAuth;
