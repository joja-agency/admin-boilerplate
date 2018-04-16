import { CALL_API } from '../middleware/api'
import fetch from 'isomorphic-fetch'
import {fetchSettings} from './settings'
import { getFileFetchConfig } from '../utils/helperFunctions'
import history from '../utils/history'



function requestLogin(creds) {
    return {
        type: 'LOGIN_REQUEST',
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

export function receiveLogin(user) {

    return {
        type: 'LOGIN_SUCCESS',
        isFetching: false,
        isAuthenticated: true,
        user: user.info,
        permissions: user.permissions,
        userRole: user.userRole
    }
}

function loginError(message) {
    return {
        type: 'LOGIN_FAILURE',
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

function receiveLogout() {
    return {
        type: 'LOGOUT_SUCCESS',
        isFetching: false,
        isAuthenticated: false
    }
}

export function storeUrl(url){

    return({
        type: 'STORE_URL',
        url: url
    })
}

export function toggleMenu(){

    return dispatch => {
         dispatch({type: 'TOGGLE_MENU'})
    }
}

// Calls the API to get a token and user info
export function loginUser(creds) {

    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({email:creds.username, password:creds.password})
    }

    //thunk middleware action
    return dispatch => {

        //notify the app we're starting log in process
        dispatch(requestLogin(creds))

        return fetch('/api/login', config)
            .then(response => {
                if (!response.ok) {
                    dispatch(loginError(lang.t('Wrong password or email')));
                    return Promise.reject(response.statusText);
                }
                return response.json() //got token - parse the json ant continue to get more info
            })
            .then(user => {
                localStorage.setItem('token', user.token)
                return user
            })
            .then((user) => dispatch(fetchSettings(user)))
            .catch(err => console.log("Error: ", err))

    }
}


export function getUserInfo(){

    return dispatch => {

        let token = localStorage.getItem('token');
        let config = {headers: { 'x-access-token': `${token}` }}

        fetch('/api/protected/me', config)
            .then((response)=>{
                if (!response.ok) {
                    dispatch(logoutUser())
                    return Promise.reject(response.statusText);
                }
                return response.json()
            })
            .then(user => {
                dispatch(fetchSettings(user))
            })
            .catch(err => console.log("Error: ", err))
    }

}

// Logs the user out
export function logoutUser() {

    return dispatch => {
        localStorage.removeItem('token')
        history.push('/')
        dispatch(receiveLogout())
    }
}

export function setUserAvatar(data, id) {

    return dispatch => {

        let fileData = new FormData
        fileData.append('file', data.file)
        fileData.append('userId', id)

        fetch(`/api/avatar`, getFileFetchConfig(fileData, 'POST'))
            .then((response) => {
                if (!response.ok) return Promise.reject(response.statusText)
                return response.json()
            })
            .then(user => {
                dispatch({type: 'SET_AVATAR', user})
            })
            .catch(err => console.log(err))
    }
}





