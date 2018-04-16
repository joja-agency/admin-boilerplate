import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../config/env'
import User from '../models/user'

function login(req, res, next) {
    
    if (req.body.email && req.body.password) {
        
        User.findOne({ email: req.body.email })
            .populate('permissions')
            .then(user => {

                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err) {
                        res.status(401).send('Error has occured checking the password '+ err)
                    }
                    if (isMatch) {

                        let expires = moment().add(config.jwtExpires, 'days').valueOf()
                        let token = jwt.encode({iss: user._id, exp: expires}, config.jwtSecret)
                        
                        res.json({
                            token : token,
                            expires : expires,
                            info : user.toJSON(),
                            permissions: user.permissions,
                            userRole: {}
                        })

                    } else {
                        res.status(401).send('The password is wrong')
                    }
                })
                
            })
            .catch(err => {
                if (err) {
                    res.status(401).send('User not found')
                    return
                }

            })

    } else {
        res.status(401).send('Authentication error1')
    }
}


function jwtAuthenticate(req, res, next){

    let token = req.headers["x-access-token"] || req.query.token

    if (token) {
        try {
            let decoded = jwt.decode(token, config.jwtSecret)

            if (decoded.exp <= Date.now()) {
                res.status(401).send('Access token has expired')
                return
            }
            
            User.get(decoded.iss)
                .then((user) => {
                    if (!user) {
                        res.status(401).send('User not found')
                        return
                    } else {
                        req.user = user
                        return next()
                    }
                })
                .catch(e => next(e))

        } catch (err) {
            return next(err)
        }

    } else {
        res.status(401).send('Token not provided')
        return
    }
}


export default { login, jwtAuthenticate }
