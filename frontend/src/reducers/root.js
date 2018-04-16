import { combineReducers } from 'redux'

import auth from './authorisation'
import users from './users'
import ui from './ui'
import profile from './profile'
import items from './items'


const rootReducer = combineReducers({
    auth,
    users,
    ui,
    profile,
    items,
})

export default rootReducer