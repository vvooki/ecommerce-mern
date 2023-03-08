import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { HiMenuAlt2 } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import { links } from '../data/dataNav';
import Sidebar from './Modals/Sidebar';
import { logOut } from '../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const [showSidebar, setShowSidebar] = useState(false);
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'unset';
  }, [showSidebar]);

  const dispatch = useDispatch();

  return (
    <header className="header">
      <Toaster />
      <div className="nav-center">
        <button className="nav-toggle" onClick={() => setShowSidebar(true)}>
          <HiMenuAlt2 />
        </button>

        <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />

        <nav className="nav">
          <ul className="nav-links">
            {links.map((link) => {
              return (
                <li key={link.id}>
                  <Link to={link.url}>{link.text}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <h2 className="logo">
          <Link to="/"> LOGOTYPE </Link>{' '}
        </h2>
        <div className="nav-btns">
          {/* <button onClick={() => handleTest()}>test token</button> */}
          {user ? (
            <>
              <button
                className="logout-btn"
                onClick={() => {
                  dispatch(logOut());
                  toast.error('Logged out');
                }}
              >
                Logout
              </button>
              <button className="login-btn">
                <Link to="/orders">
                  <BiUser /> {user.username}
                </Link>
              </button>
            </>
          ) : (
            <button className="login-btn">
              <Link to="/login">sign in</Link>
            </button>
          )}

          <Link to="/cart" className="icon-container">
            {quantity > 0 && <div className="cart-counter">{quantity}</div>}
            <BsCart3 className="icon" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
