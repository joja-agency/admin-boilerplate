import express from 'express'
import auth from './controllers/auth'
import user from './controllers/user'
import item from './controllers/item'


const secure = express.Router() // eslint-disable-line new-cap

secure.route('/*')
    .all(auth.jwtAuthenticate)

secure.route('/me')
    .get(user.me)

secure.route('/users')
    .get(user.list)
    .post(user.create)
secure.route('/users/:_id')
    .get(user.get)
    .put(user.update)
    .delete(user.remove)

secure.route('/items')
    .get(item.list)
    .post(item.create)
secure.route('/items/:_id')
    .get(item.get)
    .put(item.update)
    .delete(item.remove)


export default secure