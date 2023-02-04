import { createContext, useState } from "react";


export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [token, setUser] = useState(null);

    const signin = (newtoken, cb) => {
        setUser(newtoken)
        localStorage.setItem('manage_jwt', newtoken)
        cb();
    }

    const signout = (cb) => {
        localStorage.setItem('manage_jwt', '')
        setUser();
        cb();
    }

    const value = {token, signin, signout}

    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}