
import ReactPaginate from 'react-paginate';
import { useTranslation } from "react-i18next";

const TableUsersPaginate = ({ listUsers, handleClickBtnUpdate, handleClickBtnView, handleClickBtnDelete, fetchListUsersPaginate, pageCount, currentPage, setCurrentPage  }) => {

   const { t } = useTranslation();
  
    // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    fetchListUsersPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };

  return (
    <>
    <table className="table table-hover table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">{t("tableUser.headers.id")}</th>
          <th scope="col">{t("tableUser.headers.username")}</th>
          <th scope="col">{t("tableUser.headers.email")}</th>
          <th scope="col">{t("tableUser.headers.role")}</th>
            <th scope="col">{t("tableUser.headers.actions")}</th>
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
                    <button onClick={() => handleClickBtnView(item)} className="btn btn-info mx-1">{t("tableUser.actions.view")}</button>
                    <button onClick={() => handleClickBtnUpdate(item)} className="btn btn-warning mx-2">{t("tableUser.actions.edit")}</button>
                    <button onClick={() => handleClickBtnDelete(item)} className="btn btn-danger mx-1">{t("tableUser.actions.delete")}</button>
                </td>
            </tr>
            )
        })
        ) : (
          <tr>
            <td colSpan="5" className="text-center" >{t("tableUser.messages.noUsers")}</td>
          </tr>
        )}
      </tbody>
    </table>
    <div className='d-flex justify-content-center'>
      {pageCount > 0 && (
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={t("tableUser.pagination.prev")}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel={t("tableUser.pagination.break")}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage > 0 ? currentPage - 1 : 0}
        />
      )}
    </div>
    </>
  );
};



export default TableUsersPaginate;