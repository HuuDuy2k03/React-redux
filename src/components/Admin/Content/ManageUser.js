import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUsers from "./TableUsers";


const ManageUser = (props) => {

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button className="btn btn-primary d-flex align-items-center gap-1" onClick={() => setShowModalCreateUser(true)}><FcPlus />Add new Users</button>
        </div>
        <div className="table-user-container">
          <TableUsers />
        </div>
        <ModelCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} />
      </div>
    </div>
  );
};

export default ManageUser;
