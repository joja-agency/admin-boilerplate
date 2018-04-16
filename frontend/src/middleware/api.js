import fetch from 'isomorphic-fetch'

function callApi(endpoint) {

    let token = localStorage.getItem('token') || null
    let config = {}

    if(token) {
        config = {
            headers: {
                'x-access-token': `${token}`,
            }
        }
    } else {
        throw "No token saved!"
    }

    return fetch('/api/protected/' + endpoint, config)
        .then( response => response.text().then(text =>({ text, response })) )
        .then(({ text, response }) => {
            if (!response.ok) {
                return Promise.reject(text)
            }
            let refreshedToken = response.headers.get('x-access-token')
            if (refreshedToken !== null){
                localStorage.setItem('token', refreshedToken)
            }

            return text
        })
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

    const callAPI = action[CALL_API]

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, types } = callAPI
    const [ requestType, successType, errorType ] = types


    next({ type: requestType })

    return callApi(endpoint).then(
            response =>
                next({
                    response,
                    type: successType
                }),
            error => next({
                error: error.message || 'There was an error.',
                type: errorType
            })
    )
}