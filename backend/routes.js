import express from 'express'
import apicache from 'apicache'

import auth from './controllers/auth'
import item from './controllers/item'

let cache = apicache.middleware

const routes = express.Router()

routes.route('/login')
    .post(auth.login)

routes.route('/items')
    .get(item.listPublic, cache('5 minutes'))
routes.route('/items/:_id')
    .get(item.getPublic, cache('5 minutes'))

export default routes