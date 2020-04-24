import {authAPI} from "../api/api";

const SET_USER = 'SET-USER';

const initialState = {
    isAuth: false,
    username: null,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: action.isAuth,
                username: action.username,
            }
        default:
            return state;
    }
};

export const setUserAC = (isAuth, username) => ({type:SET_USER, isAuth, username});

export const signInTC = (username, password) => (dispatch) => {
    authAPI.signIn(username, password).then(response => {
        if (response.status === 200) {
            localStorage.setItem('userToken', response.data.data.token);
            dispatch(setUserAC(true, response.data.data.user.username));
        }
    })
}

export const signUpTC = (username, password) => (dispatch) => {
    authAPI.signUp(username, password).then(response => {
        if (response.status === 200) {
            localStorage.setItem('userToken', response.data.data.token);
            dispatch(setUserAC(true, response.data.data.user.username));
        }
    })
}

export const getAuthUserDataTC = () => (dispatch) => {
    authAPI.me().then(response => {
        if (response.status === 200) {
            dispatch(setUserAC(true, response.data.data.user.username));
        }
    })
}

export const logoutTC = () => (dispatch) => {
    localStorage.removeItem('userToken');
    dispatch(setUserAC(false, null));
}

export default appReducer;