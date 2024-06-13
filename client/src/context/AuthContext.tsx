import React, { createContext, useEffect, useReducer } from "react";
import {AuthAction, AuthContext, AuthState, OnlyChildrenProps} from '../types'

const INITIAL_STATE: AuthContext = {
    user: JSON.parse(sessionStorage.getItem("userInfo")!) || null,
    isLoggedIn: sessionStorage.getItem("userInfo") ? true : false,
    error: null,
    dispatch: null,
}


export const UserInfoContext: React.Context<AuthContext>  = createContext(INITIAL_STATE);


const AuthReducer = (state :AuthState , action : AuthAction): any => {

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


export const UserInfoProvider: React.FC<OnlyChildrenProps> = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(state.user));

    }, [state.user])


    return (
        <UserInfoContext.Provider value={
            {
                dispatch,
                user: state.user,
                error: state.error,
                isLoggedIn: state.isLoggedIn
            }
        }>
            {children}
        </UserInfoContext.Provider>
    )
}