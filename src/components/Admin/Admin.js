import SideBar from "./SideBar";
const Admin = (props) => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar />
      </div>
      <div className="admin-content">
        <h2>Admin Component</h2>
      </div>
    </div>
  );
};

export default Admin;
