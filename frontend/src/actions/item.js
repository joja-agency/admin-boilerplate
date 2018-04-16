import { CALL_API } from '../middleware/api'
import {getFetchConfig, getDeleteConfig, getFileFetchConfig} from '../utils/helperFunctions'
import fetch from 'isomorphic-fetch'
import update from 'immutability-helper'


export function fetchItems() {
    return {
        [CALL_API]: {
            endpoint: 'items',
            types: ['ITEMS_REQUEST', 'ITEMS_SUCCESS', 'ITEMS_FAILURE']
        }
    }
}


export function itemFormUpdate(key, value) {

    return (dispatch) =>{

        if (key !== undefined) {
            dispatch({
                type: 'ITEM_FORM_UPDATE',
                key: key,
                value: value,
            })
        }
    }
}

export function itemFormSet(data) {

    let updated = update(data, {visible:{$set: true}})

    return {
        type: 'ITEM_FORM_SET',
        data: updated
    }
}

export function itemFormClear() {
    return {
        type: 'ITEM_FORM_CLEAR',
    }
}

export function itemSave(data){

    return dispatch => {

        if (!data.id) {

            fetch('/api/protected/items', getFetchConfig(data, 'POST'))
                .then((response) => {
                    if (!response.ok) return Promise.reject(response.statusText)
                    return response.json()
                })
                .then(item => {
                    if (item === 'error') {
                        window.addNotification({message: "Something went wrong!", level: 'error'})
                    } else {
                        dispatch({type: 'ITEM_NEW', item})
                        window.addNotification({message: lang.t("Saved successfully"), level: 'success'})
                    }
                }).catch(err => {
                window.addNotification({message: err, level: 'error'})
                console.log(err)
            })

        } else {

            fetch(`/api/protected/items/${data.id}`, getFetchConfig(data, 'PUT'))
                .then((response) => {
                    if (!response.ok) return Promise.reject(response.statusText)

                    return response.json()
                })
                .then(item => {
                    if (item === 'error') {
                        window.addNotification({message: "Something went wrong!", level: 'error'})
                    } else {
                        dispatch({type: 'ITEM_UPDATE', item})
                        window.addNotification({message: "Saved successfully", level: 'success'})



                    }
                }).catch(err => console.log(err))
        }
    }
}


export function itemDelete(id){

    return dispatch => {

        fetch(`/api/protected/items/${id}`, getDeleteConfig())
            .then((response) => {
                if (!response.ok) return Promise.reject(response.statusText)
                return response.json()
            })
            .then(response => {
                if (response === 'ok') {
                    dispatch({type: 'ITEM_DELETE', id})
                    window.addNotification({ message: "Removed", level: 'warning' })
                }

            }).catch(err => console.log(err))

    }

}