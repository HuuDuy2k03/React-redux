import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaGem, FaGithub } from 'react-icons/fa';
import { SiReactivex } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import sidebarBg from '../../assets/bg2.jpg';
import "./SideBar.scss"; // Assuming you have some styles for the SideBar component
import { Link } from "react-router-dom";


const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <SiReactivex size={"3em"}  color={"#61DAFB"}/>
            QWQ
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdDashboard />}
            >
              Dashboard
              <Link to="/admins" />
            </MenuItem>
            
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              icon={<FaGem />}
              title="Features"
            >
              <MenuItem>Quản lý Users <Link to="/admins/manage-user" /></MenuItem>
              <MenuItem>Quản lý Quiz <Link to="/admins/manage-quiz" /></MenuItem>
              <MenuItem>Quản lý Questions <Link to="/admins/manage-questions" /></MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                view source
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
      ;
    </>
  );
};

export default SideBar;
