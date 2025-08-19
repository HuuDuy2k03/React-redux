import SideBar from "./SideBar";
import './Admin.scss'; // Assuming you have some styles for the Admin component
import { FaBars } from 'react-icons/fa';
import React, { useState } from 'react';

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar
          collapsed={collapsed}
        />
      </div>
      <div className="admin-content">
        <FaBars onClick={() => setCollapsed(!collapsed)} />
        Admin Component
      </div>
    </div>
  );
};

export default Admin;
