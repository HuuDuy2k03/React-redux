import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div>
          <button>Add new Users</button>
        </div>
        <div>
          Table User
        </div>
        <ModelCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
