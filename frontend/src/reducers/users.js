import update from 'immutability-helper'

const userFormDefault = {
    visible: false,
    name: '',
    email: '',
    password: '',
    userGroup: '',
    permissions: [],
}

export default function users(state = {
    loaded: false,
    userList: [],
    formOpen: false,
    userForm: userFormDefault
}, action) {

    switch (action.type) {

        case 'USERS_SUCCESS':
            return Object.assign({}, state, {
                loaded: true,
                userList: JSON.parse(action.response),
            })

        case 'USER_FORM_UPDATE':
            return update(state, {userForm: {[action.key]:{$set: action.value }} })
        case 'USER_FORM_SET':
            return update(state, {userForm: {$set: action.data } })
        case 'USER_FORM_CLEAR':
            return update(state, {userForm: {$set: userFormDefault } })

        case 'USER_NEW':
            return update(state, {userList: {$push: [action.user]} })
        case 'USER_UPDATE':
            let updateUserIndex = state.userList.findIndex((el)=> el.id === action.user.id)
            return update(state, {userList: {[[updateUserIndex]]: {$set: action.user }}})
        case 'USER_DELETE':
            let userIndex = state.userList.findIndex((el)=> el.id === action.id)
            return update(state, {userList: {$splice: [[userIndex, 1]] } })

        default:
            return state
    }
}