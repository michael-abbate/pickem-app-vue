const {User} = require('../models')
const jwt = require('jsonwebtoken')

function jwtSignUser (user) {
    const ONE_WEEK = 60*60*24*7
    return jwt.sign({user:user.email}, process.env.JWT_SECRET, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body);
            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            });
        } catch(err) {
            console.log("error:");
            console.log(err);
            // username email already exists
            res.status(400).send({
                error: 'This username or email account is already in use.'
            });
        }
    },

    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                res.status(403).send({
                    error: 'The email or password information was incorrect.'
                })
            }

            // const isPasswordValid = password === user.password
            const isPasswordValid = await user.comparePassword(password)

            if (!isPasswordValid) {
                res.status(403).send({
                    error: 'The email or password information was incorrect.'
                })
            }
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            });
        } catch(err) {
            // username email already exists
            res.status(500).send({
                error: 'An error has occured trying to log in.'
            });
        }
    }
}