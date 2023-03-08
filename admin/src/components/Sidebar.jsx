import React, { useState } from 'react';
import './css/sidebar.css';
import AppsIcon from '@mui/icons-material/Apps';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [active, setActive] = useState(1);
  return (
    <section className="sidebar">
      <div className="logo">
        <Link to={'/'}>
          <h3>Dashboard</h3>
        </Link>
      </div>
      <div className="categories">
        <h5 className="category-title">Main</h5>
        <ul className="sidebarList">
          <Link to={'/'} onClick={() => setActive(1)}>
            <li className={`sidebar-list-item ${active === 1 ? 'active' : ''}`}>
              <AppsIcon /> Home
            </li>
          </Link>
          <Link to={'/'} onClick={() => setActive(2)}>
            <li className={`sidebar-list-item ${active === 2 ? 'active' : ''}`}>
              <TrendingUpIcon /> Analitycs
            </li>
          </Link>
          <Link to={'/orders'} onClick={() => setActive(3)}>
            <li className={`sidebar-list-item ${active === 3 ? 'active' : ''}`}>
              <AttachMoneyIcon /> Orders
            </li>
          </Link>
        </ul>
        <div className="separator-line" />
        <h5 className="category-title">Data</h5>
        <ul className="sidebarList">
          <Link to={'/users'} onClick={() => setActive(4)}>
            <li className={`sidebar-list-item ${active === 4 ? 'active' : ''}`}>
              <AppsIcon /> Users
            </li>
          </Link>

          <Link to={'/products'} onClick={() => setActive(5)}>
            <li className={`sidebar-list-item ${active === 5 ? 'active' : ''}`}>
              <TrendingUpIcon /> Products
            </li>
          </Link>

          <Link to={'/products/add'} onClick={() => setActive(6)}>
            <li className={`sidebar-list-item ${active === 6 ? 'active' : ''}`}>
              <AttachMoneyIcon /> Add new product
            </li>
          </Link>
          {/* <Link to={'/articles/add'}>
            <li className="sidebar-list-item">
              <AttachMoneyIcon /> Add new article
            </li>
          </Link> */}
        </ul>
        <div className="separator-line" />
      </div>
    </section>
  );
};

export default Sidebar;
