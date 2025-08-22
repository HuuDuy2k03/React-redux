import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState,useEffect } from "react";
import TableUsers from "./TableUsers";
import { getAllUsers } from '../../../services/apiService'

const ManageUser = (props) => {

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    const data = await getAllUsers();
    if (data.EC === 0) {
      setListUsers(data.DT);
    }
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button className="btn btn-primary d-flex align-items-center gap-1" onClick={() => setShowModalCreateUser(true)}><FcPlus />Add new Users</button>
        </div>
        <div className="table-user-container">
          <TableUsers listUsers={listUsers} />
        </div>
        <ModelCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} fetchListUsers={fetchListUsers} />
      </div>
    </div>
  );
};

export default ManageUser;
