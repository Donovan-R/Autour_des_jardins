import React, { useState, useEffect, useRef } from 'react';
import { linksPublic, linksPrivate } from '../src/data';
import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '.././assets/logo.png';
const Navbar = ({ token, setToken, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contRef = useRef(null);
  const linksRef = useRef(null);

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
    localStorage.removeItem('user');
    setToken('');
  };

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
                      >
                        {text}
                      </NavLink>
                    </li>
                  );
                })}
                {user.role === 2 && (
                  <li>
                    <NavLink
                      to='/dashboard'
                      className={({ isActive }) =>
                        isActive ? 'activeLink' : ''
                      }
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
