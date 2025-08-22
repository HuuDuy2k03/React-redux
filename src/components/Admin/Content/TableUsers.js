import { getAllUsers } from '../../../services/apiService'
import { useState, useEffect} from 'react';

const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);
    
    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        const data = await getAllUsers();
        if(data.EC === 0){
            setListUser(data.DT);
        }
    };

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
        {listUser && listUser.length > 0 ? (
          listUser.map((item, idx) => {
            return(
            <tr key={`table-user-${idx}`}>
              <th>{idx + 1}</th>
              <td>{item.username }</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
                <td>
                    <button data-id={item.id} className="btn btn-info mx-1">View</button>
                    <button data-id={item.id} className="btn btn-warning mx-2">Edit</button>
                    <button data-id={item.id} className="btn btn-danger mx-1">Delete</button>
                </td>
            </tr>
            )
        })
        ) : (
          <tr>
            <td colSpan="4" className="text-center">No users found.</td>
          </tr>
        )}
      </tbody>
    </table>
    </>
  );
};

export default TableUsers;