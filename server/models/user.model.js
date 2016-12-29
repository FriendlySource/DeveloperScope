'use strict';

const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const constantMsg = require('../utilities/messages-constants.js');

// ADMIN DEFAULTS
const defaultAdminPassword = 'admin';
const defaultAdminUsername = 'admin';
const defaultAdminRoles = ['admin'];
const defaultAdminName = 'Admin';
const defaultAdminEmail = 'admin@developerscope.com';

// USER
let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: constantMsg.requiredProp,
        unique: true
    },
    salt: {
        type: String,
        required: constantMsg.requiredProp,
    },
    password: {
        type: String,
        required: constantMsg.requiredProp,
    },
    roles: {
        type:  [String],
        default: ['user']
    },
    name: {
        type: String,
        required: constantMsg.requiredProp
    },
    email: {
        type: String,
        required: constantMsg.requiredProp
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