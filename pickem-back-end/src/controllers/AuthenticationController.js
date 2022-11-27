// const {PickemUser} = require('../models')
const db = require("../models");
const PickemUser = db.pickemuser;
// const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser');


function generateAccessToken (user) {
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
                token: generateAccessToken(userJson)
            });
        } catch(err) {
            console.log("error:");
            console.log(err);
            // username email already exists
            return res.status(400).send({
                error: 'This username or email account is already in use.'
            });
        }
    }
    // , authenticateToken(req, res, next) {
    //     console.log(req.headers)
    //     const authHeader = req.headers['authorization']
    //     // token will return undefined or be the actual token
    //     const token = authHeader && authHeader.split(' ')[1]
    //     if (token == null) return res.sendStatus(401)
    
    //     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //         if (err) return res.sendStatus(403)
    //         req.user = user
    //         next()
    //     })
    // }
    // , refreshAppToken (req, res) {
    //     if (req.cookies?.jwt) {
    //         // Destructuring refreshToken from cookie
    //         const refreshToken = req.cookies.jwt;
    //         // Verifying refresh token
    //         jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, 
    //         (err, decoded) => {
    //             if (err) {
    //                 // Wrong Refesh Token
    //                 return res.status(406).json({ error: 'Unauthorized' });
    //             }
    //             else {
    //                 // Correct token we send a new access token
    //                 const accessToken = jwt.sign({
    //                     username: userCredentials.username,
    //                     email: userCredentials.email
    //                 }, process.env.ACCESS_TOKEN_SECRET, {
    //                     expiresIn: '10m'
    //                 });
    //                 return res.json({ accessToken });
    //             }
    //         })
    //     } else {
    //         return res.status(406).json({ error: 'Unauthorized' });
    //     }
    // }
    
    , async cookieJwtAuth (req, res, next) {
        // const {email, password} = req.body
        // const user = await PickemUser.findOne({
        //     where: {
        //         email: email
        //     }
        // })
        const token = req.cookies.token;
        // console.log(req.cookies.token);
        try {
            const user = jwt.verify(token,process.env.JWT_SECRET)
            req.user = user;
            next();
        } catch (err) {
            res.clearCookie('token')
            // return res.redirect()
        }
        
    }
        
    , async login (req, res) {
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
            const accessToken = generateAccessToken(userJson)
            const ONE_WEEK = 60*60*24*7
            const refreshToken = jwt.sign({user: user.email}, process.env.JWT_REFRESH_SECRET, {
                expiresIn: ONE_WEEK
            })
            const response = {
                user: userJson,
                token: accessToken,
                refresh_token: refreshToken
            }
            res.cookie('token', refreshToken, { httpOnly: true, 
                sameSite: 'None', secure: true, 
                maxAge: 24 * 60 * 60 * 1000 });
            return res.send(response);
            
        } catch(err) {
            console.log('catching the error')
            // username email already exists
            return res.status(500).send({
                error: 'An error has occured trying to log in.'
            });
            // console.log('caught the error')
            // return;

        }
    }
}