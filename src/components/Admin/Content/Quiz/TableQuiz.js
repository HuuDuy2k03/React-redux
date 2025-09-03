import { useState, useEffect } from "react";
import { getAllQuizzesForAdmin } from "../../../../services/apiService";
import ModelUpdateQuiz from "./ModelUpdateQuiz";
import ModalDeleteQuiz from "./ModelDeleteQuiz";

const TableQuiz = (({fetchTrigger}) => {

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
        <h2 className="text-center">List of Quizzes</h2>
      <table className="table table-hover table-striped table-bordered mt-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
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
                        <button className="btn btn-primary" onClick={() => handleUpdate(quiz)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(quiz)}>Delete</button>
                      </td>
                    </tr>
                )

              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No quizzes found</td>
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
