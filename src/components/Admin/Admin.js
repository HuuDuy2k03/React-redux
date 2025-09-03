import SideBar from "./SideBar";
import './Admin.scss'; // Assuming you have some styles for the Admin component
import { FaBars } from 'react-icons/fa';
import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
    const a = document.querySelector('.admin-content');
    const b = document.querySelector('.admin-header');
    a.style.marginLeft = collapsed ? '270px' : '80px';
    b.style.left = collapsed ? '270px' : '80px';
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar
          collapsed={collapsed}
        />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars onClick={handleToggleSidebar} />
          Admin Component
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
