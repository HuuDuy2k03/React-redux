import SideBar from "./SideBar";
import './Admin.scss'; // Assuming you have some styles for the Admin component
import { FaBars } from 'react-icons/fa';
import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import Language from "../Header/Languages";
import { useTranslation } from "react-i18next";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const { t } = useTranslation();

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
          <span onClick={handleToggleSidebar}><FaBars className="left-side"/></span>
          <div className="right-side">
            <NavDropdown title={t("admin.settings")}  id="basic-nav-dropdown">
                <NavDropdown.Item >{t("admin.profile")}</NavDropdown.Item>
                <NavDropdown.Item >{t("admin.logout")}</NavDropdown.Item>
            </NavDropdown>
            <Language/>
          </div>
          
        </div>
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
