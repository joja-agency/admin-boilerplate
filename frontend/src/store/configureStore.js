import { createStore, applyMiddleware, compose } from 'redux'

import DevTools from '../utils/DevTools'
import thunkMiddleware from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers/root'


export default function configureStore(initialState){

    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware, api),
            DevTools.instrument()
        )
    )

}
