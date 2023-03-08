import React from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { links } from '../../data/dataNav';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { logOut } from '../../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import { BiUser } from 'react-icons/bi';

const Sidebar = ({ showSidebar, closeSidebar }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  return (
    <nav
      className={`sidebar ${showSidebar ? 'sidebar-open' : 'sidebar-close'}`}
    >
      <button className="nav-toggle close-nav-btn" onClick={closeSidebar}>
        <HiMenuAlt3 />
      </button>
      <ul>
        {links.map((link) => {
          return (
            <li key={link.id}>
              <Link to={link.url} onClick={closeSidebar}>
                {link.text}
              </Link>
              <div className="separator-line"></div>
            </li>
          );
        })}
      </ul>
      <div className="nav-btns-sidebar">
        {user ? (
          <>
            <button
              className="logout-btn-sidebar"
              onClick={() => {
                dispatch(logOut());
                closeSidebar();
              }}
            >
              Logout
            </button>
            <button onClick={closeSidebar} className="login-btn-sidebar">
              <Link to="/orders">
                <BiUser /> {user.username}
              </Link>
            </button>
          </>
        ) : (
          <button onClick={closeSidebar} className="login-btn-sidebar">
            <Link to="/login">sign in</Link>
          </button>
        )}
        <Link to="/cart" className="icon-container" onClick={closeSidebar}>
          <BsCart3 className="icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
