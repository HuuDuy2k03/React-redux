import { LOGIN_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
    account:{
        access_token: null,
        refresh_token: null,
        username: null,
        image: null,
        role: null
    },
    isAuthenticated: false
};

function loginReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, account: { 
                access_token: action?.payload?.DT?.access_token,
                refresh_token: action?.payload?.DT?.refresh_token,
                username: action?.payload?.DT?.username,
                image: action?.payload?.DT?.image,
                role: action?.payload?.DT?.role
            }, isAuthenticated: true };
        default:
            return state;
    }
}

export default loginReducer;
