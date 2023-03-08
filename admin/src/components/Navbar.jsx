import React from 'react';
// import styled from 'styled-components';
import './css/navbar.css';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/userRedux';
const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <header>
      <section className="navbar">
        <div className="nav-left">
          <div className="title">
            <h3>Overview</h3>
          </div>
        </div>

        <div className="nav-right">
          <button onClick={() => dispatch(logOut())}>
            <LoginIcon />
          </button>
          <div className="profile-image">
            <img
              src="https://www.stockvault.net//data/2018/08/28/254043/thumb16.jpg"
              alt="profile-image"
            />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Topbar;
