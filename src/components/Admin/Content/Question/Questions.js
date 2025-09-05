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
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        { id: uuidv4(), description: "", isCorrect: false },
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

  const handleOnChange = (type, questionId, answerId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let question = questionsClone.find((q) => q.id === questionId);
      question.description = value;
      setQuestions(questionsClone);
    }

    if (type === "ANSWER") {
      let questionsClone = _.cloneDeep(questions);
      let question = questionsClone.find((q) => q.id === questionId);
      let answer = question.answers.find((a) => a.id === answerId);
      answer.description = value;
      setQuestions(questionsClone);
    }

    if (type === "CHECKBOX") {
      let questionsClone = _.cloneDeep(questions);
      let question = questionsClone.find((q) => q.id === questionId);
      let answer = question.answers.find((a) => a.id === answerId);
      answer.isCorrect = value;
      setQuestions(questionsClone);
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let question = questionsClone.find((q) => q.id === questionId);
    if (event.target && event.target.files && event.target.files[0]) {
      question.imageFile = event.target.files[0];
      question.imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionsForQuiz = () => {
    console.log(">>> check submit: ", selectedQuiz, questions);
  }

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
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                      onChange={(event) => handleOnChange("QUESTION", question.id, null, event.target.value)}
                    />
                    <label>Question {index + 1}'s Description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`upload-file-${question.id}`}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input id={`upload-file-${question.id}`} type="file" hidden onChange={(event) => handleOnChangeFileQuestion(question.id, event)} />
                    <span>{question.imageFile ? '1' : "0"} file(s) selected: {question.imageName ? question.imageName : ""}</span>
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
                                checked={answer.isCorrect}
                                onChange={(event) => handleOnChange("CHECKBOX", question.id, answer.id, event.target.checked)}
                            />
                            <div className="form-floating answer-description">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Answer 1"
                                    value={answer.description}
                                    onChange={(event) => handleOnChange("ANSWER", question.id, answer.id, event.target.value)}
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
        {questions && questions.length > 0 && (
          <div>
            <button onClick={()=> handleSubmitQuestionsForQuiz()} className="btn btn-primary">Save Questions</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
