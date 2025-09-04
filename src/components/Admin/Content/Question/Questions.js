import Select from "react-select";
import { useState } from "react";
import "./Questions.scss";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const Questions = () => {
  const options = [
    { value: "question1", label: "Question 1" },
    { value: "question2", label: "Question 2" },
    { value: "question3", label: "Question 3" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [
        { id: uuidv4(), description: "answer 1", isCorrect: false },
        { id: uuidv4(), description: "answer 2", isCorrect: false },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, questionId) => {
    if (type === "ADD") {
      let newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          { id: uuidv4(), description: "", isCorrect: false },
        ],
      };
      setQuestions([...questions, newQuestion]);
    } else if (type === "REMOVE") {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    let question = questionsClone.find((q) => q.id === questionId);
    if (type === "ADD") {
      question.answers.push({ id: uuidv4(), description: "", isCorrect: false });
      setQuestions(questionsClone);
    } else if (type === "REMOVE") {
      question.answers = question.answers.filter((a) => a.id !== answerId);
      setQuestions(questionsClone);
    }
  };

  return (
    <div className="question-container">
      <div className="title">Manager Questions</div>
      <hr />
      <div className="add-new">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">Add Question: </div>
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div className="q-main mb-4 " key={question.id}>
                <div className="question-content">
                  <div className="form-floating description">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                        value={question.description}
                    />
                    <label>Question {index + 1}'s Description</label>
                  </div>
                  <div className="group-upload">
                    <label>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input type="file" hidden />
                    <span>0 file(s) selected</span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", null)}>
                      <BsFillPatchPlusFill className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                        <span onClick={() => handleAddRemoveQuestion("REMOVE", question.id)}>
                          <BsFillPatchMinusFill className="icon-remove" />
                        </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                        <div key={answer.id} className="answer-content">
                            <input
                                className="form-check-input iscorrect"
                                type="checkbox"
                            />
                            <div className="form-floating answer-description">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Answer 1"
                                    value={answer.description}
                                />
                                <label>Answer {index + 1}</label>
                            </div>
                            <div className="btn-add">
                                <span onClick={() => handleAddRemoveAnswer("ADD", question.id, null)}>
                                <AiOutlinePlus className="icon-add" />
                                </span>
                                {question.answers.length > 1 && (
                                    <span onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}>
                                    <AiOutlineMinus className="icon-remove" />
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
