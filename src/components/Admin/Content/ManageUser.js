import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState,useEffect } from "react";
// import TableUsers from "./TableUsers";
import { getAllUsers,getAllUsersPaginate } from '../../../services/apiService'
import ModelUpdateUser from "./ModelUpdateUser";
import ModelViewUser from "./ModelViewUser";
import ModelDeleteUser from "./ModelDeleteUser";
import TableUsersPaginate from "./TableUserPaginate";

const ManageUser = (props) => {

  const LIMIT_USERS = 6;

  const [pageCount, setPageCount] = useState(0);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersPaginate(1);
  }, []);

  const fetchListUsers = async () => {
    const data = await getAllUsers();
    if (data.EC === 0) {
      setListUsers(data.DT);
    }
  };

  const fetchListUsersPaginate = async (page) => {
    const data = await getAllUsersPaginate(page, LIMIT_USERS);
    if (data.EC === 0) {
      setListUsers(data.DT.users);
      setPageCount(data.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true)
    setDataUpdate(user);
  };
  const handleClickBtnView = (user) => {
    setShowModalViewUser(true);
    setDataUpdate(user);
  };
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
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
          {/* <TableUsers listUsers={listUsers} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnView={handleClickBtnView} handleClickBtnDelete={handleClickBtnDelete} /> */}
          <TableUsersPaginate listUsers={listUsers} handleClickBtnUpdate={handleClickBtnUpdate} handleClickBtnView={handleClickBtnView} handleClickBtnDelete={handleClickBtnDelete} fetchListUsersPaginate={fetchListUsersPaginate} pageCount={pageCount} />
        </div>
        <ModelCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} fetchListUsers={fetchListUsers} />
        <ModelUpdateUser show={showModalUpdateUser} setShow={setShowModalUpdateUser} dataUpdate={dataUpdate}  fetchListUsers={fetchListUsers} />
        <ModelViewUser show={showModalViewUser} setShow={setShowModalViewUser} dataUpdate={dataUpdate} />
        <ModelDeleteUser show={showModalDeleteUser} setShow={setShowModalDeleteUser} dataUpdate={dataUpdate} fetchListUsers={fetchListUsers} />
      </div>
    </div>
  );
};

export default ManageUser;
