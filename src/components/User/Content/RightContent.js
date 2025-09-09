import CountDown from "./CountDown";
import { useRef } from "react";

const RightContent = ({dataQuiz,handleFinishQuiz,setCurQuestion}) => {

    const refDiv = useRef([]);

    const onTimeUp = () =>{
        handleFinishQuiz();
    }

    const getClassQuestion = (index, question) =>{
        // check answered
        if(question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if(isAnswered){
                return "question selected"
            }
        }
        return "question";
    }

    const handleClickQuestion = (question, index) => {
        setCurQuestion(index);

        // reset className cho toàn bộ
        refDiv.current.forEach((el, i) => {
        if (el) {
            el.className = getClassQuestion(i, dataQuiz[i]);
        }
        });

        if(question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if(isAnswered){
                return ;
            }
        }

        // set class clicked cho phần tử vừa chọn
        if (refDiv.current[index]) {
        refDiv.current[index].className = "question clicked";
        }
    };

    return(
        <>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp}/>
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0
                && dataQuiz.map((item,index) => {
                    return(
                        <div key={`question-${index}`} className={getClassQuestion(index, item)} onClick={()=>handleClickQuestion(item, index)} ref={(el) => (refDiv.current[index] = el)}>{index + 1}</div>
                    );
                })
                }
            </div>
        </>
    );
}    
export default RightContent;