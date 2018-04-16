import update from 'immutability-helper'

const profileFormDefault = {
}

export default function profile(state = {

    profileForm: profileFormDefault,

}, action) {

    switch (action.type) {

        case 'PROFILE_FORM_UPDATE':
            return update(state, {profileForm: {[action.key]:{$set: action.value }} })
        case 'PROFILE_FORM_SET':
            return update(state, {profileForm: {$set: action.data } })
        case 'PROFILE_FORM_CLEAR':
            return update(state, {profileForm: {$set: profileFormDefault } })

        case 'SET_AVATAR':
            return update(state, {user: {$set: action.user } })

        case 'PROFILE_UPDATE':
            return update(state, {
                name: {$set: action.data.name},
                email: {$set: action.data.email},
                language: {$set: action.data.language}
            })

        default:
            return state
    }
}