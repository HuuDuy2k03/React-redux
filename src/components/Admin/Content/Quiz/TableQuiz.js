import { useState, useEffect } from "react";
import { getAllQuizzesForAdmin } from "../../../../services/apiService";

const TableQuiz = () => {

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
      const fetchQuizzes = async () => {
        let res = await getAllQuizzesForAdmin();
        if (res && res.EC === 0) {
          setListQuiz(res.DT);
        }
      };
      fetchQuizzes();
    }, []);

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
                      <td>
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                )

              })
            ) : (
              <tr className="d-flex gap-3">
                <td colSpan="5" className="text-center">No quizzes found</td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
