import _ from "lodash";

const Question = ({ data, curQuestion, handleCheckboxChange }) => {
    if (_.isEmpty(data)) {
        return null;
    }

    const handleCheckbox = (event, aId, qId) => {
        // Handle checkbox change
        handleCheckboxChange(aId, qId);
    };

    return (
    <>
        {data.image ? (
            <div className="q-image">
                <img alt="" src={`data:image/png;base64,${data.image}`} />
            </div>
        ) : <div className="q-image">

            </div>}
        <div className="question"> Question {curQuestion + 1}: {data.questionDescription}</div>
          <div className="answers">
            {data.answers && data.answers.length > 0 && 
                data.answers.map((answer, index) => {
                    return (
                        <div key={`answer-${index}`} className="answer">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox"
                                    checked={answer.isSelected}
                                    onChange={(e) => handleCheckbox(e, answer.id, data.questionId)}
                                /><label className="form-check-label">{answer.description}</label>
                            </div>
                        </div>
                    )
                })
            }
          </div>    
    </>
  );
};

export default Question;