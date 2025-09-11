import { useState, useEffect } from "react";
import { getAllQuizzesForAdmin } from "../../../../services/apiService";
import ModelUpdateQuiz from "./ModelUpdateQuiz";
import ModalDeleteQuiz from "./ModelDeleteQuiz";
import { useTranslation } from "react-i18next";

const TableQuiz = (({fetchTrigger}) => {
  
  const { t } = useTranslation();

    const [listQuiz, setListQuiz] = useState([]);
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const fetchQuiz = async () => {
        let res = await getAllQuizzesForAdmin();
        if (res && res.EC === 0) {
          setListQuiz(res.DT);
        }
      };
    
    useEffect(() => {
      fetchQuiz();
    }, [fetchTrigger]);// mỗi lần fetchTrigger thay đổi thì load lại

    const handleUpdate = (quiz) => {
      setDataUpdate(quiz);
      setIsShowModalUpdate(true);
    };

    const handleDelete = (quiz) => {
      setDataDelete(quiz);
      setIsShowModalDelete(true);
    };

  return (
    <>
        <h2 className="text-center">{t("manageQuiz.tableQuiz.title")}</h2>
      <table className="table table-hover table-striped table-bordered mt-5">
        <thead>
          <tr>
            <th>{t("manageQuiz.tableQuiz.columns.id")}</th>
            <th>{t("manageQuiz.tableQuiz.columns.name")}</th>
            <th>{t("manageQuiz.tableQuiz.columns.description")}</th>
            <th>{t("manageQuiz.tableQuiz.columns.type")}</th>
            <th>{t("manageQuiz.tableQuiz.columns.actions")}</th>
          </tr>
        </thead>
        <tbody>
            {listQuiz && listQuiz.length > 0 ? (
              listQuiz.map((quiz, index) => {
                return(
                    <tr key={`quiz-${index}`}>
                      <th>{quiz.id}</th>
                      <td>{quiz.name}</td>
                      <td>{quiz.description}</td>
                      <td>{quiz.difficulty}</td>
                      <td className="d-flex gap-2">
                        <button className="btn btn-primary" onClick={() => handleUpdate(quiz)}>{t("manageQuiz.tableQuiz.buttons.edit")}</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(quiz)}>{t("manageQuiz.tableQuiz.buttons.delete")}</button>
                      </td>
                    </tr>
                )

              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">{t("manageQuiz.tableQuiz.noData")}</td>
              </tr>
            )}
        </tbody>
      </table>
      <ModelUpdateQuiz
        dataUpdate={dataUpdate}
        show={isShowModalUpdate}
        setShow={setIsShowModalUpdate}
        setDataUpdate={setDataUpdate}
        fetchQuiz={fetchQuiz}
      />
      <ModalDeleteQuiz
        dataDelete={dataDelete}
        show={isShowModalDelete}
        setShow={setIsShowModalDelete}
        setDataDelete={setDataDelete}
        fetchQuiz={fetchQuiz}
      />  
    </>
  );
});


export default TableQuiz;
