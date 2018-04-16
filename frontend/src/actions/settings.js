import history  from '../utils/history'
import {fetchItems} from './item'

import {receiveLogin} from './authorisation'


export function fetchSettings(user) {
    return (dispatch, getState) => {


        Promise.all([
            dispatch(fetchItems()),

        ]).then(resolve=> {

            //log in after all has been fetched

            //login transition
            Promise.resolve(dispatch(receiveLogin(user))).then(resolve=> {
                //transition to initial url
                let auth = getState().auth
                if (auth.entryURL !== undefined && auth.permissions !== undefined) {
                    history.push(auth.entryURL)
                }
            }, reject => {
                console.log(reject)
                window.addNotification({message: reject, level: 'error'});
            })


        }, reject=> {
            console.log(reject)
            window.addNotification({message: reject, level: 'error'});
        })
    }
}