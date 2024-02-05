import React, { useEffect, useState } from "react"

const AuthContext = React.createContext({
    token: '',
    isLoggedin: false,
    login: (token) => { },
    logout: () => { }
})

export const AuthContextProvider = (props) => {
    const ltoken = localStorage.getItem('idToken')
    const [token, setToken] = useState(ltoken)
    const userisloggedin = !!token

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('idToken', token)
    }
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('idToken')
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