export const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, token: action.token }
        case "LOGOUT":
            return {...state, token: undefined}
        default:
            return state
    }
}