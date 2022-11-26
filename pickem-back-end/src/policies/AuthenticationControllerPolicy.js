const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            firstname: Joi.string().pattern(
                new RegExp('^[a-zA-Z0-9]{1,255}$')
            ).required(),
            lastname: Joi.string().pattern(
                new RegExp('^[a-zA-Z0-9]{1,255}$')
            ).required(),
            username: Joi.string().pattern(
                new RegExp('^[a-zA-Z0-9-_]{1,255}$')
            ).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(
                // Password has at least one lowercase letter (?=.*[a-z]), one uppercase letter (?=.*[A-Z]), one digit (?=.*[0-9]), one special character (?=.*[^A-Za-z0-9]), and is at least eight characters long(?=.{8,})
                new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            ).required()
        })

        const {error, value} = schema.validate(req.body)
        
        if (error) {
           switch (error.details[0].context.key) {
            case 'firstname':
                res.status(400).send({
                    error: "You must provide a valid first name."
                });
                break
            case 'lastname':
                res.status(400).send({
                    error: "You must provide a valid last name."
                });
                break
            case 'username':
                res.status(400).send({
                    error: "You must provide a valid user name."
                });
                break
            case 'email':
                res.status(400).send({
                    error: "You must provide a valid email address."
                });
                break
            case 'password':
                res.status(400).send({
                    error: `The password provided failed to match the following rules:
                    <br>
                    Password must be at least 8 character long, have at least one lowercase letter, one uppercase letter, one digit and one special character.
                    `
                });
                break
            default:
                res.status(400).send({
                    error: 'Invalid registration information.'
                });
           } 
        } else{
            next()
        }
    }
}