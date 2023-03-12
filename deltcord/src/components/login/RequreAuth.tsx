import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useDeltaStore from '../../store/store';
const RequreAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const {
    user,
  } = useDeltaStore((state) => state);
  console.log(user)
  if (!user.isloggedin ) {
    return <Navigate to='/auth' state={{ path: location.pathname }} />
  }
  return <div>{children}</div>;
}

export default RequreAuth