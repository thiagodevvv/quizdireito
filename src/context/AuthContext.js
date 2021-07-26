import { createContext, useState } from "react"
import { setCookie, destroyCookie } from "nookies"
import axios from 'axios'
import Router from 'next/router'

export const AuthContext = createContext({})

export function AuthProvider ({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    async function signIn (login, password) {

        const {data} =  await axios.post("/api/signin", {
            "login": login,
            "password": password
        })
        
        setCookie(undefined, 'token', data.token, {
            maxAge: 60 * 60 * 1
        })
        if(data.token) {
            Router.push('/painel')
        }else {
            return isAuthenticated
        }
    }

    function logout () {
        console.log('destruindo coookie')
        destroyCookie(undefined, 'token')
        Router.push('/login')

    }
    return (
        <AuthContext.Provider value={{signIn, logout}}>
            {children}
        </AuthContext.Provider>
    )
}