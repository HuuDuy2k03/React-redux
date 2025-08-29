import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [curQuestion, setCurQuestion] = useState(0);

    useEffect(() => {
      const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
          let raw = res.DT;
          let data = _.chain(raw)
          .groupBy("id")
          .map((value, key) =>{
            let answers = [];
            let questionDescription, image = null;
            value.forEach((item,idx) => {
              if(idx === 0) {
                questionDescription = item.description;
                image = item.image;
              }
              answers.push(item.answers);
            });
            return  {questionId: key, answers, questionDescription, image};
          })
          .value();
          setDataQuiz(data);
        }
      };
      fetchQuestions();
    }, [quizId]);

    const handlePrev = () => {
      if (curQuestion > 0) {
        setCurQuestion(curQuestion - 1);
      }
    };

    const handleNext = () => {
      if (curQuestion + 1 < dataQuiz.length) {
        setCurQuestion(curQuestion + 1);
      }
    };

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">Quiz {quizId} : {location?.state?.quizTitle}</div>
        <div className="q-content">
          <Question curQuestion={curQuestion} data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[curQuestion] : []} />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
          <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
        </div>
      </div>
      <div className="right-content">
        count down
      </div>
    </div>
  );
};

export default DetailQuiz;
