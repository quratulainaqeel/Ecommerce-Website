import React, { createContext, useEffect, useReducer } from 'react'
import { reducer } from './reducer'

export const Cartcontext = createContext("Initial Value")

const getCartData = () => {
    let cartdata = localStorage.getItem('cart')
    if (cartdata == 'null' || cartdata == [] || cartdata == 'undefined') {
        return []
    }
    return JSON.parse(cartdata)
}

const cartdata = {
    cart: getCartData()
}

export default function CartContextProvider({ children }) {

    const [cart_state, cart_dispatch] = useReducer(reducer, cartdata)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart_state.cart))
    }, [cart_state.cart])

    return (
        <Cartcontext.Provider value={{ cart_state, cart_dispatch }}>
            {children}
        </Cartcontext.Provider>
    )
}
