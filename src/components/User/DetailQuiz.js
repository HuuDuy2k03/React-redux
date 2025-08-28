import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";

const DetailQuiz = () => {
    const params = useParams();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
      const fetchQuestions = async () => {
        const res = await getDataQuiz(params.id);
        if (res && res.EC === 0) {
          setQuiz(res.DT);
        }
      };
      fetchQuestions();
    }, [params.id]);

  return (
    <div className="detail-quiz-container">
      <h1>Detail Quiz:</h1>
    </div>
  );
};

export default DetailQuiz;
