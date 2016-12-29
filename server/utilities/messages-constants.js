'use strict';

module.exports = {
    error: {
        fieldsRequired: "Please fill out all required fields",
        incorrectInput: "{0} is not correct",
        invalidCredentials: "Invalid password or username",
        internal: "Server Internal Error: 500",
        inUse: "{0} {1} is already in use",
        requiredProp: "{0} is required",
        minLength: "{0} must be atleast {1} characters long",
        notMatch: "{0} does not match {1}",
        whiteSpace: "{0} cannot be whitspace"
    },
    generateMessage: (messageType, args) => {
        let messageToReturn = messageType;

        args.forEach((arg, index) => {
            messageToReturn = messageToReturn.replace(`{${index}}`, arg)
        })
        
        return messageToReturn;
    }
};