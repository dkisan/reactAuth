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

    useEffect(() => {
        const t = new Date().getTime()
        if (t > localStorage.getItem('autologout')) {
            logoutHandler()
        }
    }, [])

    const loginHandler = (token) => {
        setToken(token)
        let time = new Date().getTime()
        time = time + 300000
        localStorage.setItem('idToken', token)
        localStorage.setItem('autologout', time)
    }
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('idToken')
        localStorage.removeItem('autologout')
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