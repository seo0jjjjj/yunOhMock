import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user: JSON.parse(sessionStorage.getItem("userInfo")) || null,
    isLoggedIn: sessionStorage.getItem("userInfo") ? true : false,
    error: null,
}


export const UserInfoContext = createContext(INITIAL_STATE);


const AuthReducer = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload,
                isLoggedIn: true,
                error: null,
            }
        case "LOGOUT":
            return {
                user: null,
                isLoggedIn: false,
                error: null,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isLoggedIn: false,
                error: action.payload,
            }
        case "UPDATE_USER_DATA":
            return {
                user: action.payload,
                isLoggedIn: false,
                error: null,
            }
        default:
            return state;
    }
}


export const UserInfoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        sessionStorage.setItem("userInfo", JSON.stringify(state.user));

    }, [state.user])


    return (
        <UserInfoContext.Provider value={
            {
                dispatch,
                userInfo: state.user,
                error: state.error,
                isLoggedIn: state.isLoggedIn
            }
        }>
            {children}
        </UserInfoContext.Provider>
    )
}