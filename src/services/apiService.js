import axios from "../utilts/axiosCustomize";

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

export { postCreateNewUser, getAllUsers, PutUpdateUser };
