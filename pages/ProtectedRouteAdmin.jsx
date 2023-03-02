import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ token, children, user }) => {
  if (user.role !== 2) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRouteAdmin;
