import React, { useContext, useState } from 'react'
import Admin from './Admin/index'
import User from './User/index'
import Guest from './Guest/index'
import { GlobalContext } from './Context/Context'
import { decodeToken } from 'react-jwt'

const ComponentRole = {
  'admin': Admin,
  'user': User,
  'guest': Guest
}
const getUserRole = (params) => ComponentRole[params] || ComponentRole['guest']

export default function App() {

  const { state, dispatch } = useContext(GlobalContext)

  const decodeUser = (token) => {
    if (!token) {
      return undefined
    }
    else {
      const res = decodeToken(token)
      return res?.role
    }
  }

  const currentToken = decodeUser(state.token)
  const CurrentRole = getUserRole(currentToken)
  return <CurrentRole />
}