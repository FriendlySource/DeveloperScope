'use strict';

module.exports = {
    error: {
        inUse: "{0} {1} is already in use",
        incorrectInput: "{0} is not correct",
        requiredProp: "{0} is required"
    },
    generateMessage: (messageType, args) => {
        let messageToReturn = messageType;

        args.forEach((arg, index) => {
            messageToReturn = messageToReturn.replace(`{${index}}`, arg)
        })
        
        return messageToReturn;
    }
};