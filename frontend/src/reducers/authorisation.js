import update from 'immutability-helper'
import jwt_decode from 'jwt-decode'


function checkIfHasUnexpiredToken(){

    let token = localStorage.getItem('token');
    if (!token) return false

    let decoded = jwt_decode(token);

    // jwt is in seconds, js Date in miliseconds
    return decoded.exp > Math.round(Date.now()/1000)
}


export default function auth(state = {

    isFetching: false,
    isAuthenticated: checkIfHasUnexpiredToken(),
    hasUserData: false,

}, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
            })
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                hasUserData: true,
                errorMessage: '',
                user: action.user,
                permissions: action.permissions,
                userRole: action.userRole
            })
        case 'LOGIN_FAILURE':
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case 'LOGOUT_SUCCESS':
            return Object.assign({}, {
                isFetching: false,
                isAuthenticated: false
            })
        case 'STORE_URL':
            return Object.assign({}, {
               entryURL: action.url
            })

        case 'SET_AVATAR':
            return update(state, {user: {$set: action.user } })

        default:
            return state
    }
}