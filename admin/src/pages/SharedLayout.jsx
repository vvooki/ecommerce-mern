import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <section className="content">
          <Navbar />
          <main>
            <Outlet />
          </main>
        </section>
      </div>
    </>
  );
};

export default Home;
