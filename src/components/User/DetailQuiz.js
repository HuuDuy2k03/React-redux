import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
      const fetchQuestions = async () => {
        const res = await getDataQuiz(params.id);
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
          setQuiz(data);
        }
      };
      fetchQuestions();
    }, [params.id]);

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">Quiz {params.id} : {location?.state?.quizTitle}</div>
        <div className="q-body">
          <img alt="Quiz" />
        </div>
        <div className="q-content">
          <div className="question"> Question 1: how to question?</div>
          <div className="answers">
            <div>A</div>
            <div>B</div>
            <div>C</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-secondary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">
        count down
      </div>
    </div>
  );
};

export default DetailQuiz;
