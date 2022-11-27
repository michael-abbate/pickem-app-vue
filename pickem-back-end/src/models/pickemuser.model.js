const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {

    console.log("salting password")
    const SALT_FACTOR = 8;
    if (!user.changed('password')) {
        return;
    }
    console.log("password salted!")
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash=> {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, Sequelize) => {
    const PickemUser = sequelize.define('pickemuser', {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
            // unique: true
        },
        email: {
            type: Sequelize.STRING,
            // unique: true,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            // beforeSave: hashPassword
        }
    });

    PickemUser.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }

    return PickemUser;
};