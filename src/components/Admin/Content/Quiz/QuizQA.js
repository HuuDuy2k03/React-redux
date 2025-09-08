import Select from "react-select";
import { useEffect, useState, useCallback } from "react";
import "./QuizQA.scss";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "yet-another-react-lightbox";
import { getAllQuizzesForAdmin, getQuizWithQA, postUpsertQA } from "../../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = () => {

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
  },[]);

  function urlToFile(url, filename, mimeType){
    return(fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename,{type:mimeType})})
    );
  }

  const fetchQuizWithQA = useCallback(async (quizId) => {
    if (!quizId) return;
    let res = await getQuizWithQA(quizId);
    if (res && res.EC === 0) {
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Questions-${q.id}.png`;
          q.imageFile = await urlToFile(
            `data:image/png;base64,${q.imageFile}`,
            `Questions-${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  }, []);

  useEffect(() => {
    if (selectedQuiz?.value) {
      fetchQuizWithQA(selectedQuiz.value);
    }
  }, [selectedQuiz, fetchQuizWithQA]);

  
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
      toast.error("Please choose a Quiz")
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
      toast.error(`Not empty description for Question ${indexQ1 + 1}`);
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

    // convert oject file to base64 string
    const toBase64 = file => new Promise((resolve, reject) => {
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onload = () => resolve(render.result);
      render.onerror = error => reject(error);
    })

    let questionsClone =  _.cloneDeep(questions);
    for(let i = 0; i < questionsClone.length; i++){
      if(questionsClone[i].imageFile){
        questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile);
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone
    });
    if(res && res.EC === 0){
      toast.success(res.EM);
      fetchQuizWithQA(selectedQuiz.value);
    }else{
      toast.error(res.EM);
    }
    
  }

  return (
    <div className="question-container">
      <div className="add-new">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
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
                    <span onClick={() => {if(question.imageFile) {setSelectedImage(question.imageFile); setOpen(true)}}}>{question.imageFile ? "1" : "0"} file(s) selected:{" "}
                      {question.imageName || ""}
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
            <button onClick={()=> handleSubmitQuestionsForQuiz()} className="btn btn-primary">Save Questions</button>
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

export default QuizQA;
