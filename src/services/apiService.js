import axios from "../utilts/axiosCustomize";

// manager user
const postCreateNewUser = async (email, password, username, role, image) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);    
    return axios.post("api/v1/participant", data);
};

const getAllUsers = async () => {
    return axios.get("api/v1/participant/all");
};

const PutUpdateUser = async (id, username, role, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);    
    return axios.put("api/v1/participant", data);
};

const deleteUser = async (userId) => {
    return axios.delete(`api/v1/participant`, { data: { id: userId } });
};

const getAllUsersPaginate = async (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

//login

const postLogin = async (userEmail, userPassword) => {
    return axios.post("api/v1/login", { email: userEmail, password: userPassword, delay: 5000 });
};

const postRegister = async (userEmail, userPassword, userName) => {
    return axios.post("api/v1/register", { email: userEmail, password: userPassword, username: userName });
};

const getQuizByUser = async () => {
    return axios.get(`api/v1/quiz-by-participant`);
};

const getDataQuiz = async (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, {...data});
}

// manager Quiz
const postCreateNewQuiz = async (description, name, difficulty, image) => {
    const data = new FormData();
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);
    return axios.post('api/v1/quiz', data);
};

const getAllQuizzesForAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
};

const PutUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("name", name);
    data.append("description", description);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);
    return axios.put(`api/v1/quiz/`, data);
}

const deleteQuizForAdmin = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, image) =>{
    const data = new FormData();
    data.append("quiz_id", quiz_id);
    data.append("description", description);
    data.append("questionImage", image);
    
    return axios.post(`api/v1/question`, data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) =>{

    return axios.post(`api/v1/answer`, {
        description, correct_answer, question_id
    });
}

const postAssignQuiz = (quizId, userId) =>{
    return axios.post('api/v1/quiz-assign-to-user', {quizId, userId});
}

export { postCreateNewUser, getAllUsers, PutUpdateUser, 
    deleteUser, getAllUsersPaginate, postLogin, 
    postRegister, getQuizByUser, getDataQuiz, 
    postSubmitQuiz, postCreateNewQuiz, getAllQuizzesForAdmin, 
    PutUpdateQuizForAdmin, deleteQuizForAdmin, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,postAssignQuiz
};
