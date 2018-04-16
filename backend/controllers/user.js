import User from '../models/user'
import jwt from 'jwt-simple'
import config from '../config/env'


function get(req, res) {
    User.get(req.params._id)
        .then((record) => {
            res.json(record)
        })
        .catch(e => next(e))
}

function create(req, res, next) {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        hash: req.body.password,
        avatar: req.body.avatar,
        language: req.body.language,
        userGroup: req.body.userGroup,
        permissions: req.body.permissions
    });
    
    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

function update(req, res, next) {
    
    if (req.params._id === config.systemUserId && req.user._id.toString() !== config.systemUserId) {
        res.json('cannot update system user')
        return
    }
    
    User.findById(req.params._id)
        .then((record) => {

            record.name = req.body.name
            record.email = req.body.email
            record.hash = req.body.password ? req.body.password : req.body.hash
            record.avatar = req.body.avatar
            record.language = req.body.language
            record.userGroup = req.body.userGroup
            record.permissions = req.body.permissions

            record.save()
                .then(savedUser => res.json(savedUser))
                .catch(e => next(e))

        })
        .catch(e => next(e))
}

function list(req, res, next) {
    User.list()
        .then(users => res.json(users))
        .catch(e => next(e));
}

function remove(req, res, next) {
    
    if (req.params._id === config.systemUserId) {
        res.json('cannot delete system user')
        return
    }
    
    User.findByIdAndRemove(req.params._id)
        .then(() => res.json('ok'))
        .catch(e => next(e))
}

function me(req, res) {

    let token = req.headers["x-access-token"];
    
    if (token) {
        try {
            let decoded = jwt.decode(token, config.jwtSecret)
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 401)
            }
            User.get(decoded.iss)
                .then((user) => {
                    if (!user) {
                        res.end('Not authorized', 401)
                    }
                    res.json({
                        info : user,
                        permissions: user.permissions,
                        userRole: {}
                    })
                })
                .catch(e => res.end(err, 401))
        } catch (err) {
            return res.end(err, 401)
        }
    } else {
        res.end('Access token not provided', 401)
    }
}


export default { get, create, update, list, remove, me };
