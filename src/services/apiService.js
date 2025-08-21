import axios from "axios";

const postCreateNewUser = async (email, password, username, role, image) => {
  //submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("http://localhost:8081/api/v1/participant", data);
};
export { postCreateNewUser };
