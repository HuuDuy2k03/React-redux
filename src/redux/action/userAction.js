export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const doLogin = (data) =>{
    return{ type: LOGIN_SUCCESS, payload: data }
}