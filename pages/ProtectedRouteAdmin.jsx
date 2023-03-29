import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ token, children, userRole }) => {
  if (userRole !== 2) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRouteAdmin;
