import Select from "react-select";
import { useState } from "react";
import './Questions.scss';
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai";
import {AiOutlineMinus} from "react-icons/ai";

const Questions = () => {

    const options = [
        { value: 'question1', label: 'Question 1' },
        { value: 'question2', label: 'Question 2' },
        { value: 'question3', label: 'Question 3' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});

    return(
        <div className="question-container">
            <div className="title">Manager Questions</div>
            <div className="add-new">
                <div className="col-6 form-group">
                    <label>Select Quiz: </label>
                    <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={options} />
                </div>
                <div className="mt-3">Add Question: </div>

                <div>
                    <div className="question-content">
                        <div className="form-floating description">
                            <input type="email" className="form-control"  placeholder="name@example.com" />
                            <label>Description</label>
                        </div>
                        <div className="group-upload">
                            <label className="label-upload">Upload Image</label>
                            <input type="file" hidden />
                            <span>0 file(s) selected</span>
                        </div>
                        <div className="btn-add">
                            <span><BsFillPatchPlusFill className="icon-add"/></span>
                            <span><BsFillPatchMinusFill className="icon-remove"/></span>
                        </div>
                    </div>
                    <div className="answer-content">
                        <input className="form-check-input iscorrect" type="checkbox" />
                        <div className="form-floating answer-description">
                            <input type="text" className="form-control"  placeholder="Answer 1" />
                            <label>Answer 1</label>
                        </div>
                        <div className="btn-add">
                            <span><AiOutlinePlus className="icon-add"/></span>
                            <span><AiOutlineMinus className="icon-remove"/></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions;   