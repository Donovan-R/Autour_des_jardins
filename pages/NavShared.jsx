import Navbar from '../components/Nav';
import { Outlet } from 'react-router-dom';

const SharedLayout = ({
  token,
  setToken,
  userRole,
  setUserRole,
  setUserIdentity,
}) => {
  return (
    <>
      <Navbar
        token={token}
        setToken={setToken}
        userRole={userRole}
        setUserRole={setUserRole}
        setUserIdentity={setUserIdentity}
      />
      <Outlet />
    </>
  );
};

export default SharedLayout;
