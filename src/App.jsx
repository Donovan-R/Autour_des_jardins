import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavShared from '../pages/NavShared';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Plantations from '../pages/Plantations';
import SinglePlant from '../pages/SinglePlant';
import ProtectedRoute from '../pages/ProtectedRoute';
import ProtectedRouteAdmin from '../pages/ProtectedRouteAdmin';
import Login from '../pages/Login';
import Tasks from '../pages/Tasks';
import Account from '../pages/Account';
import Dashboard from '../pages/Dashboard';
import Ressources from '../pages/Ressources';
import Error from '../pages/Error';

import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('token') ? localStorage.getItem('token') : '';
};
// const getUser = () => {
//   return localStorage.getItem('user')
//     ? JSON.parse(localStorage.getItem('user'))
//     : '';
// };

const App = () => {
  const url = `${import.meta.env.VITE_URL}/account/`;
  const [alert, setAlert] = useState({ msg: '', type: '', show: false });
  const [token, setToken] = useState(getToken());

  const showAlert = (msg = '', type = '', show = false) => {
    setAlert({
      msg,
      type,
      show,
    });
  };
  const [userRole, setUserRole] = useState(1);
  const [userIdentity, setuserIdentity] = useState({
    lastname: '',
    firstname: '',
    mail: '',
  });
  const getUserInfos = async () => {
    try {
      const {
        data: { user: user },
      } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUserRole(user[0].role_id);
      setuserIdentity({
        lastname: user[0].lastname,
        firstname: user[0].firstname,
        mail: user[0].email,
      });
    } catch (error) {
      console.log(error);
      setUserRole(1);
      setuserIdentity({
        lastname: '',
        firstname: '',
        mail: '',
      });
    }
  };

  useEffect(() => {
    getUserInfos();
  }, [token]);

  return (
    <Router>
      <h1>Autour des jardins de Chéreng</h1>
      <Routes>
        <Route
          path='/'
          element={
            <NavShared
              token={token}
              setToken={setToken}
              setUserRole={setUserRole}
              setuserIdentity={setuserIdentity}
              userIdentity={userIdentity}
              userRole={userRole}
            />
          }
        >
          <Route index element={<Home />} />

          <Route path='/about' element={<About />} />
          <Route path='/plantations' element={<Plantations />}></Route>
          <Route path='/plantations/:id' element={<SinglePlant />} />
          <Route
            path='/contact'
            element={
              <Contact
                alert={alert}
                showAlert={showAlert}
                setToken={setToken}
              />
            }
          ></Route>
          <Route
            path='/ressources'
            element={
              <ProtectedRoute token={token}>
                <Ressources alert={alert} showAlert={showAlert} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path='/login'
            element={
              <Login alert={alert} showAlert={showAlert} setToken={setToken} />
            }
          >
            {' '}
          </Route>

          <Route
            path='/todo'
            element={
              <ProtectedRoute token={token}>
                <Tasks
                  alert={alert}
                  showAlert={showAlert}
                  token={token}
                  userIdentity={userIdentity}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/account'
            element={
              <ProtectedRoute token={token}>
                <Account alert={alert} showAlert={showAlert} token={token} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRouteAdmin token={token} userRole={userRole}>
                <Dashboard
                  alert={alert}
                  showAlert={showAlert}
                  token={token}
                  userIdentity={userIdentity}
                  userRole={userRole}
                />
              </ProtectedRouteAdmin>
            }
          />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
