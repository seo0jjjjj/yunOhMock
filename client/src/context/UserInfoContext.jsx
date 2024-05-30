import { createContext } from "react";

const INITIAL_STATE = {
    ...localStorage.getItem("userInfo") || null
}


export const UserInfoContext = createContext({});

export const UserInfoProvider = ({ children }) => {
    return (
        <UserInfoContext.Provider value={
            username,
            email,
            password,
            nickname,
            record,

        }>
            {children}
        </UserInfoContext.Provider>
    )
}