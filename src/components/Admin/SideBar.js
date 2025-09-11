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
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

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
            <SiReactivex size={"3em"}  color={"#61DAFB"}/> <span onClick={() => navigate("/")} >QWQ</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdDashboard />}
            >
              {t("sidebar.dashboard")}
              <Link to="/admins" />
            </MenuItem>
            
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              icon={<FaGem />}
              title={t("sidebar.features")}
            >
              <MenuItem>{t("sidebar.manageUsers")} <Link to="/admins/manage-user" /></MenuItem>
              <MenuItem>{t("sidebar.manageQuiz")} <Link to="/admins/manage-quiz" /></MenuItem>
              <MenuItem>{t("sidebar.manageQuestions")} <Link to="/admins/manage-questions" /></MenuItem>
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
                {t("sidebar.viewSource")}
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
