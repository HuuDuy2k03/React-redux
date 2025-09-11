import Select from "react-select";
import { useEffect, useState } from "react";
import "./Questions.scss";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "yet-another-react-lightbox";
import { getAllQuizzesForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from "../../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Questions = () => {

  const { t } = useTranslation();

  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        { id: uuidv4(), description: "", isCorrect: false },
      ],
    },
  ]
  const [questions, setQuestions] = useState(initQuestion);

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchQuiz();
  },[])

  const fetchQuiz = async () => {
        let res = await getAllQuizzesForAdmin();
        if (res && res.EC === 0) {
          let newListQuiz = res.DT.map((item) => {
            return{
              value: item.id,
              label: `${item.id} - ${item.description}`,
            }
          })
          setListQuiz(newListQuiz);
        }
  };

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

  const handleSubmitQuestionsForQuiz = async () => {
    // todo
    if(_.isEmpty(selectedQuiz)){
      toast.error(t("manageQuestions.validation.chooseQuiz"))
      return;
    }

    // validate Question
    let isValidQ = true;
    let indexQ1 = 0
    for(let i=0; i<questions.length; i++){
      if(!questions[i].description){
        isValidQ = false;
        indexQ1 = i;
        break;
      }
      
      if(isValidQ === false) break;
    }
    if(!isValidQ){
      toast.error(t("manageQuestions.validation.questionNotEmpty", { index: indexQ1 + 1 }));
      return;
    }

    // validate answer
    let isValidAnswer = true;
    let indexQ = 0, indexA = 0;
    for(let i=0; i<questions.length; i++){
      
      for(let j=0; j<questions[i].answers.length; j++){
        if(!questions[i].answers[j].description){
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if(isValidAnswer === false) break;
    }
    if(!isValidAnswer){
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    // submit question
    await Promise.all(questions.map(async (question) => {
      const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
      // submit answer
      await Promise.all(question.answers.map(async (answer) => {
          await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
      }));
    }));

    toast.success(t("manageQuestions.toast.success"));
    setQuestions(initQuestion);
  }

  return (
    <div className="question-container">
      <div className="title">{t("manageQuestions.title")}</div>
      <hr />
      <div className="add-new">
        <div className="col-6 form-group">
          <label className="mb-2">{t("manageQuestions.selectQuiz")}: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2">{t("manageQuestions.addQuestion")}: </div>
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
                    <label>{t("manageQuestions.questionDescription", { index: index + 1 })}</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={`upload-file-${question.id}`}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input id={`upload-file-${question.id}`} type="file" hidden onChange={(event) => handleOnChangeFileQuestion(question.id, event)} />
                    <span onClick={() => {if(question.imageFile) {setSelectedImage(question.imageFile); setOpen(true)}}}>{t("quizQA.fileSelected", {
                      count: question.imageFile ? 1 : 0,
                      name: question.imageName || "",
                    })}
                    </span>
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
            <button onClick={()=> handleSubmitQuestionsForQuiz()} className="btn btn-primary">{t("manageQuestions.saveQuestions")}</button>
          </div>
        )}
      </div>
      <Lightbox
        open={open}
        close={() => {
          setOpen(false);
          setSelectedImage(null);
        }}
        slides={
          selectedImage
            ? [{ src: URL.createObjectURL(selectedImage) }]
            : []
        }
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </div>
  );
};

export default Questions;
