import React, { useState } from "react"

const AuthContext = React.createContext({
    token: '',
    isLoggedin: false,
    login: (token) => { },
    logout: () => { }
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null)
    const userisloggedin = !!token
    const loginHandler = (token) => {
        setToken(token)
    }
    const logoutHandler = () => {
        setToken(null)
    }
    const ctxValue = {
        token: token,
        isLoggedin: userisloggedin,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={ctxValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;