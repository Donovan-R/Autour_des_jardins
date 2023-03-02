import Navbar from '../components/Nav';
import { Outlet } from 'react-router-dom';

const SharedLayout = ({ token, setToken, user }) => {
  return (
    <>
      <Navbar token={token} setToken={setToken} user={user} />
      <Outlet />
    </>
  );
};

export default SharedLayout;
