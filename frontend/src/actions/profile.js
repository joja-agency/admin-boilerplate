import { CALL_API } from '../middleware/api'
import { getFetchConfig } from '../utils/helperFunctions'
import fetch from 'isomorphic-fetch'

export function profileFormUpdate(key, value) {

    return (dispatch) =>{

        if (key !== undefined) {
            dispatch({
                type: 'PROFILE_FORM_UPDATE',
                key: key,
                value: value,
            })
        }
    }
}

export function profileFormSet(data) {

    return {
        type: 'PROFILE_FORM_SET',
        data: data
    }
}

export function profileFormClear() {
    return {
        type: 'PROFILE_FORM_CLEAR',
    }
}

export function profileSave(profile) {

    return dispatch => {

        fetch(`/api/protected/user/${profile.userId}`, getFetchConfig(profile, 'PUT'))
            .then((response) => {
                if (!response.ok) return Promise.reject(response.statusText)
                return response.json()
            })
            .then(data => {
                dispatch({type: 'PROFILE_UPDATE', data})
                setLanguage(profile.language)

                window.addNotification({ message: 'Saved successfully', level: 'success' })

            }).catch(err => console.log(err))
    }
}

export function setLanguageAction(code){

    return({
        type: 'CHANGE_LANGUAGE',
        code
    })
}
