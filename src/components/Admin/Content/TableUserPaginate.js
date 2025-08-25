
import ReactPaginate from 'react-paginate';

const TableUsersPaginate = ({ listUsers, handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete, fetchListUsersPaginate, pageCount, currentPage, setCurrentPage  }) => {

    // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    fetchListUsersPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
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
    <div className='d-flex justify-content-center'>
        <ReactPaginate
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< Prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
          />
    </div>
    </>
  );
};



export default TableUsersPaginate;