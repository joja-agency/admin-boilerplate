import update from 'immutability-helper'

export default function ui(state = {

    menuOpen: true,
    itemsPerPage: 20,

}, action) {
    switch (action.type) {

        case 'TOGGLE_MENU':
            return Object.assign({}, state, {
                menuOpen: !state.menuOpen
            })

        case 'SET_AVATAR':
            return update(state, {user: {$set: action.user } })

        default:
            return state
    }
}