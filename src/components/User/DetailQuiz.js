import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModelResult";
import RightContent from './Content/RightContent'

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [curQuestion, setCurQuestion] = useState(0);

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [resultData, setResultData] = useState({});

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
              item.answers.isSelected = false;
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

    const handleCheckboxChange = (aId, qId) => {
        // Handle checkbox change
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +qId);
        if (question && question.answers && question.answers.length > 0) {
          let answer = question.answers.find(item => item.id === +aId);
          if (answer) {
            answer.isSelected = !answer.isSelected;
          }
        }
        setDataQuiz(dataQuizClone);
    };
    
    const handleFinishQuiz = async () => {
      if ( dataQuiz && dataQuiz.length > 0) {
        // Submit the quiz data
        let payload = {
        quizId: +quizId,
        answers: dataQuiz.map(item => ({
          questionId: +item.questionId,
          userAnswerId: item.answers.filter(ans => ans.isSelected === true).map(ans => ans.id)
        }))
      };
      let res = await postSubmitQuiz(payload);
      if (res && res.EC === 0) {
        // Handle success
        setResultData(res.DT);
        setIsShowModalResult(true);
      }else {
        alert(res.EM);
      }
    }
  };

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">Quiz {quizId} : {location?.state?.quizTitle}</div>
        <hr />
        <div className="q-content">
          <Question handleCheckboxChange={handleCheckboxChange} curQuestion={curQuestion} data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[curQuestion] : []} />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</button>
          <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
          <button className="btn btn-warning" onClick={() => handleFinishQuiz()}>Finish</button>
        </div>
      </div>
      <div className="right-content">
        <RightContent dataQuiz={dataQuiz} handleFinishQuiz={handleFinishQuiz}/>
      </div>
      <ModalResult show={isShowModalResult} setShow={setIsShowModalResult} resultData={resultData} />
    </div>
  );
};

export default DetailQuiz;
