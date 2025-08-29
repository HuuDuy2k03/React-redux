import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";

const DetailQuiz = () => {
    const params = useParams();
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
    <div className="detail-quiz-container">
      <h1>Detail Quiz:</h1>
    </div>
  );
};

export default DetailQuiz;
