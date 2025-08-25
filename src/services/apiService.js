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
    return axios.post("api/v1/login", { email: userEmail, password: userPassword });
};

const postRegister = async (userEmail, userPassword, userName) => {
    return axios.post("api/v1/register", { email: userEmail, password: userPassword, username: userName });
};

export { postCreateNewUser, getAllUsers, PutUpdateUser, deleteUser, getAllUsersPaginate, postLogin, postRegister };
