import _ from "lodash";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { useTranslation } from "react-i18next";

const Question = ({ data, curQuestion, handleCheckboxChange }) => {
    
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const { t } = useTranslation();
    
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
                <img style={{cursor: "pointer"}} alt="" src={`data:image/png;base64,${data.image}`} onClick={() => setOpen(true)}/>
                <Lightbox
                    open={open}
                    close={() => {
                    setOpen(false);
                    setSelectedImage(null);
                    }}
                    slides={
                    [{ src: `data:image/png;base64,${data.image}` }]
                    }
                    render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                    }}
                />
            </div>
        ) : <div className="q-image">

            </div>}
        <div className="question">{
            t("Question.title", {
            index: curQuestion + 1,
            description: data.questionDescription,
            })}
        </div>
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