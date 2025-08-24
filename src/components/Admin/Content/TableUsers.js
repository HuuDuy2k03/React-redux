
const TableUsers = ({ listUsers, handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete }) => {

  return (
    <>
    <table className="table table-hover table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
            <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 ? (
          listUsers.map((item, idx) => {
            return(
            <tr key={`table-user-${idx}`}>
              <th>{item.id}</th>
              <td>{item.username }</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
                <td>
                    <button onClick={() => handleClickBtnView(item)} className="btn btn-info mx-1">View</button>
                    <button onClick={() => handleClickBtnUpdate(item)} className="btn btn-warning mx-2">Edit</button>
                    <button onClick={() => handleClickBtnDelete(item)} className="btn btn-danger mx-1">Delete</button>
                </td>
            </tr>
            )
        })
        ) : (
          <tr>
            <td colSpan="5" className="text-center" >No users found.</td>
          </tr>
        )}
      </tbody>
    </table>
    </>
  );
};

export default TableUsers;