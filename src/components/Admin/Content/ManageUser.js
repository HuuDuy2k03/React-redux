import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState,useEffect } from "react";
import TableUsers from "./TableUsers";
import { getAllUsers } from '../../../services/apiService'
import ModelUpdateUser from "./ModelUpdateUser";

const ManageUser = (props) => {

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

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

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true)
    setDataUpdate(user);
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button className="btn btn-primary d-flex align-items-center gap-1" onClick={() => setShowModalCreateUser(true)}><FcPlus />Add new Users</button>
        </div>
        <div className="table-user-container">
          <TableUsers listUsers={listUsers} handleClickBtnUpdate={handleClickBtnUpdate} />
        </div>
        <ModelCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} fetchListUsers={fetchListUsers} />
        <ModelUpdateUser show={showModalUpdateUser} setShow={setShowModalUpdateUser} dataUpdate={dataUpdate}  fetchListUsers={fetchListUsers} />
      </div>
    </div>
  );
};

export default ManageUser;
