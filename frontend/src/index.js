import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import history from './utils/history'
import {Router, Route } from 'react-router-dom'
import DevTools from './utils/DevTools'
import configureStore from './store/configureStore'

import App from './components/App'
import Items from './components/Item/Items'
import Users from './components/User/Users'

import NotFound from './components/general/NotFound'

const store = configureStore()

let rootElement = document.getElementById('root')

render(

    <Provider store={store}>
        <div>
            <Router history={history}>
                <App>
                    <Route exact path="/" component={Items}/>
                    <Route path="/items" component={Items}/>
                    <Route path="/users" component={Users}/>
                </App>
            </Router>
            {process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing' ? null : <DevTools />}
        </div>
    </Provider>,

    rootElement

)

