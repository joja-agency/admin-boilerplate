import { CALL_API } from '../middleware/api'
import {getFetchConfig, getDeleteConfig} from '../utils/helperFunctions'
import fetch from 'isomorphic-fetch'
import update from 'immutability-helper'


export function fetchUserGroups() {
    return {
        [CALL_API]: {
            endpoint: 'usergroup',
            types: ['USERGROUP_REQUEST', 'USERGROUP_SUCCESS', 'USERGROUP_FAILURE']
        }
    }
}

export function userGroupsFormUpdate(key, value) {

    return (dispatch) =>{

        if (key !== undefined) {
            dispatch({
                type: 'USERGROUP_FORM_UPDATE',
                key: key,
                value: value,
            })
        }
    }
}

export function userGroupsFormSet(data) {

    let updated = update(data, {visible:{$set: true}})

    return {
        type: 'USERGROUP_FORM_SET',
        data: updated
    }
}

export function userGroupsFormClear() {
    return {
        type: 'USERGROUP_FORM_CLEAR',
    }
}

export function userGroupsSave(userGroup) {

    return dispatch => {

        if (userGroup.newUserGroup) {
            fetch(`/api/protected/usergroup/`, getFetchConfig(userGroup, 'POST'))
                .then((response) => {
                    if (!response.ok) return Promise.reject(response.statusText)
                    return response.json()
                })
                .then(data =>{
                    dispatch({type: 'USERGROUP_NEW', data})
                    window.addNotification({ message: 'Saved successfully', level: 'success' })
                }).catch(err => console.log(err))

        } else {
            let id = userGroup.id
            fetch(`/api/protected/usergroup/${id}`, getFetchConfig(userGroup, 'PUT'))
                .then((response) => {
                    if (!response.ok) return Promise.reject(response.statusText)
                    return response.json()
                })
                .then(data =>{
                    dispatch({type: 'USERGROUP_UPDATE', data, id})
                    window.addNotification({ message: 'Saved successfully', level: 'success' })
                }).catch(err => console.log(err))
        }

    }
}

export function userGroupsDelete(id) {

    return dispatch => {

        fetch(`/api/protected/usergroup/${id}`, getDeleteConfig())
            .then((response) => {
                if (!response.ok) return Promise.reject(response.statusText)
                return response.json()
            })
            .then(data =>{
                if (data === 'ok') {
                    dispatch({type: 'USERGROUP_DELETE', id})
                    window.addNotification({ message: 'Removed', level: 'warning' })
                }

            }).catch(err => console.log(err))

    }
}

export function fetchPermissions() {
    return {
        [CALL_API]: {
            endpoint: 'permission',
            types: ['PERMISSIONS_REQUEST', 'PERMISSIONS_SUCCESS', 'PERMISSIONS_FAILURE']
        }
    }
}
