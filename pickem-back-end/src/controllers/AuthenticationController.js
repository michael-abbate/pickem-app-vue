// const {PickemUser} = require('../models')
const db = require("../models");
const PickemUser = db.pickemuser;
const jwt = require('jsonwebtoken')

function jwtSignUser (user) {
    console.log('Secret:');
    console.log(process.env.JWT_SECRET);
    const ONE_WEEK = 60*60*24*7
    return jwt.sign({user:user.email}, process.env.JWT_SECRET, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            // const user = await User.create(req.body);
            const user = await PickemUser.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            });
        } catch(err) {
            console.log("error:");
            console.log(err);
            // username email already exists
            return res.status(400).send({
                error: 'This username or email account is already in use.'
            });
        }
    },

    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await PickemUser.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: 'The email or password information was incorrect.'
                })
            }

            // const isPasswordValid = password === user.password
            const isPasswordValid = await user.comparePassword(password)

            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The email or password information was incorrect.'
                })
            }
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            });
        } catch(err) {
            console.log('catching the error')
            // username email already exists
            return res.status(500).send({
                error: 'An error has occured trying to log in.'
            });
            console.log('caught the error')
            return;

        }
    }
}