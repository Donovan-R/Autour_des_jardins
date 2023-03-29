import React, { useState, useEffect, useRef } from 'react';
import { linksPublic, linksPrivate } from '../src/data';
import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '.././assets/logo.png';

const Navbar = ({
  token,
  setToken,
  userRole,
  setUserRole,
  setUserIdentity,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [userRole, setUserRole] = useState(1);
  // const [userIdentity, setuserIdentity] = useState({
  //   lastname: '',
  //   firstname: '',
  //   mail: '',
  // });
  const contRef = useRef(null);
  const linksRef = useRef(null);
  // const url = `${import.meta.env.VITE_URL}/account/`;

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;

    if (isOpen) {
      contRef.current.style.height = linksHeight + 'px';
    } else {
      contRef.current.style.height = '0px';
    }
  }, [isOpen]);

  const disconnectUser = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserRole(1);
    setUserIdentity({
      lastname: '',
      firstname: '',
      mail: '',
    });
  };

  // const getUserInfos = async () => {
  //   try {
  //     const {
  //       data: { user: user },
  //     } = await axios.get(url, {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setUserRole(user[0].role_id);
  //     setuserIdentity({
  //       lastname: user[0].lastname,
  //       firstname: user[0].firstname,
  //       mail: user[0].email,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUserInfos();
  // }, [token]);

  console.log(userRole);

  return (
    <>
      <nav>
        <div className='nav-center'>
          <div className='nav-header'>
            <img className='logo' src={logo} alt='logo jardins'></img>
            <button className='nav-toggle' onClick={() => setIsOpen(!isOpen)}>
              <FaBars />
            </button>
          </div>
          <div
            className='links-container'
            ref={contRef}
            onMouseLeave={() => setIsOpen(false)}
          >
            {!token ? (
              <ul className='links' ref={linksRef}>
                {linksPublic.map((link) => {
                  const { id, text, url } = link;
                  return (
                    <li key={id}>
                      <NavLink
                        to={url}
                        className={({ isActive }) =>
                          isActive ? 'activeLink' : ''
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        {text}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className='links' ref={linksRef}>
                {linksPrivate.map((link) => {
                  const { id, text, url } = link;
                  return (
                    <li key={id}>
                      <NavLink
                        to={url}
                        className={({ isActive }) =>
                          isActive ? 'activeLink' : ''
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        {text}
                      </NavLink>
                    </li>
                  );
                })}
                {userRole === 2 && (
                  <li>
                    <NavLink
                      to='/dashboard'
                      className={({ isActive }) =>
                        isActive ? 'activeLink' : ''
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      Espace admin
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    to='/'
                    onClick={disconnectUser}
                    className={({ isActive }) => (isActive ? 'activeLink' : '')}
                  >
                    se déconnecter
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
