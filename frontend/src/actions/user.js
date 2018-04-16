import { CALL_API } from '../middleware/api'
import {getFetchConfig, getDeleteConfig} from '../utils/helperFunctions'
import fetch from 'isomorphic-fetch'
import update from 'immutability-helper'


export function fetchUsers() {
    return {
        [CALL_API]: {
            endpoint: 'users',
            types: ['USERS_REQUEST', 'USERS_SUCCESS', 'USERS_FAILURE']
        }
    }
}


export function userFormUpdate(key, value) {

    return (dispatch) =>{

        if (key !== undefined) {
            dispatch({
                type: 'USER_FORM_UPDATE',
                key: key,
                value: value,
            })
        }
    }
}

export function userFormSet(data) {

    let updated = update(data, {visible:{$set: true}})

    return {
        type: 'USER_FORM_SET',
        data: updated
    }
}

export function userFormClear() {
    return {
        type: 'USER_FORM_CLEAR',
    }
}


export function userSave(data){

    return dispatch => {

        if (!data.id) {

            fetch('/api/protected/users', getFetchConfig(data, 'POST'))
                .then((response) => {
                    if (!response.ok) return Promise.reject(response.statusText)
                    return response.json()
                })
                .then(user => {
                    if (user === 'error') {
                        window.addNotification({message: "Email already exists!", level: 'error'});
                    } else {
                        dispatch({type: 'USER_NEW', user})
                        window.addNotification({message: "Saved successfully", level: 'success'});
                    }
                }).catch(err => {
                    window.addNotification({message: err, level: 'error'});
                console.log(err)
                })
            
        } else {

            fetch(`/api/protected/users/${data.id}`, getFetchConfig(data, 'PUT'))
                .then((response) => {
                    if (!response.ok) return Promise.reject(response.statusText)

                    return response.json()
                })
                .then(user => {
                    if (user === 'error') {
                        window.addNotification({message: "Email already exists!", level: 'error'});
                    } else {
                        dispatch({type: 'USER_UPDATE', user})
                        window.addNotification({message:"Saved successfully", level: 'success'});
                    }
                }).catch(err => console.log(err))
        }
    }
}

export function userDelete(id){

    return dispatch => {

        fetch(`/api/protected/users/${id}`, getDeleteConfig())
            .then((response) => {
                if (!response.ok) return Promise.reject(response.statusText)
                return response.json()
            })
            .then(response => {
                if (response === 'ok') {
                    dispatch({type: 'USER_DELETE', id})
                    window.addNotification({ message: "Removed", level: 'warning' });
                }

            }).catch(err => console.log(err))

    }

}


