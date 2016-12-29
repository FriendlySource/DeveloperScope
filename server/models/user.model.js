'use strict';

const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const constantMsg = require('../utilities/messages-constants.js');

// ADMIN DEFAULTS
const defaultAdminPassword = 'password';
const defaultAdminUsername = 'admin';
const defaultAdminRoles = ['admin'];
const defaultAdminName = 'Admin';
const defaultAdminEmail = 'admin@developerscope.com';

// USER
let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: constantMsg.generateMessage(constantMsg.error.requiredProp, ["username"]),
        unique: true
    },
    salt: {
        type: String,
        required: constantMsg.generateMessage(constantMsg.error.requiredProp, ["salt"]),
    },
    password: {
        type: String,
        required: constantMsg.generateMessage(constantMsg.error.requiredProp, ["password"]),
    },
    roles: {
        type:  [String],
        default: ['user']
    },
    name: {
        type: String,
        required: constantMsg.generateMessage(constantMsg.error.requiredProp, ["name"])
    },
    email: {
        type: String,
        required: constantMsg.generateMessage(constantMsg.error.requiredProp, ["email"])
    }
},{
    timestamps: true
});

// AUTHENTICATE
userSchema.method({
    authenticate: function(passwordInput) {
        let possiblePassword = encryption.generateHashedPassword(this.salt, passwordInput);

        return possiblePassword === this.password;
    }
});

let User = mongoose.model('User', userSchema);

// SEED ADMIN
module.exports.seedAdminUser = (user) => {
    User.find({})
        .then(users => {
            if (!users.length) {
                let generatedSalt = encryption.generateSalt(),
                    generatedPassword = encryption.generateHashedPassword(generatedSalt, defaultAdminPassword);
                
                User.create({
                    username: defaultAdminUsername,
                    salt: generatedSalt,
                    password: generatedPassword,
                    roles: defaultAdminRoles,
                    name: defaultAdminName,
                    email: defaultAdminEmail
                });

                console.log('Seed Admin successful');
            }
        })
}