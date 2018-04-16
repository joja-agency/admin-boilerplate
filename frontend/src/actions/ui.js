
import {getFileFetchConfig} from '../utils/helperFunctions'
import fetch from 'isomorphic-fetch'

export function toggleMenu(){
    return dispatch => {
         dispatch({type: 'TOGGLE_MENU'})
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