import { createContext, useState } from "react";
//REMOVE THIS HOC!!!!!!!!!! USE BEFORE REDUX

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [token, setUser] = useState(null);


    const signin = (newtoken, cb) => {
        localStorage.setItem('manage_jwt', newtoken)
        setUser(newtoken)
        cb();
    }

    const signout = (cb) => {
        localStorage.setItem('manage_jwt', '')
        setUser();
        cb();
    }

    const value = {token, signin, signout}
    console.log("REMOVE AUTH PROVIDER")
    return (<AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}