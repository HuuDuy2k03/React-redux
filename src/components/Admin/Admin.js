import SideBar from "./SideBar";
import './Admin.scss'; // Assuming you have some styles for the Admin component
import { FaBars } from 'react-icons/fa';
import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
        <div className="admin-header">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
          Admin Component
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Admin;
