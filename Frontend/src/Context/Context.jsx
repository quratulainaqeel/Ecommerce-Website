import React, { createContext, useEffect, useReducer } from 'react'
import { reducer } from './Reducer'
import Cookies from 'js-cookie'


const InitialDate = {
    token: Cookies.get('token') || undefined
}

export const GlobalContext = createContext("Initial Value")

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, InitialDate)

    useEffect(() => {
        Cookies.set('token', state.token)
    }, [state.token])

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}