import ModelCreateUser from "./ModelCreateUser";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div>
          <button>Add new Users</button>
        </div>
        <div>
          <ModelCreateUser />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
