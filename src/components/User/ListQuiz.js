import { useState, useEffect } from "react";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const [loading, setLoading] = useState(true); // thêm state loading
  const navigate = useNavigate();

  useEffect(() => {
    const getQuizData = async () => {
      setLoading(true);
      const res = await getQuizByUser();
      if (res && res.EC === 0) {
        setArrQuiz(res.DT);
      }
      setLoading(false); // xong thì tắt loading
    };
    getQuizData();
  }, []);

  return (
    <div className="list-quiz-container container">
      {loading ? (
        <p>Loading quizzes...</p> // trạng thái đang load
      ) : arrQuiz && arrQuiz.length > 0 ? (
        arrQuiz.map((quiz, idx) => (
          <div className="card" style={{ width: "18rem" }} key={idx}>
            <img
              src={`data:image/jpeg;base64,${quiz.image}`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Quiz {idx + 1}</h5>
              <p className="card-text">{quiz.description}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                Start Quiz
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No quizzes found.</p> // trạng thái không có quiz
      )}
    </div>
  );
};

export default ListQuiz;
