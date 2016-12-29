module.exports = {
    password: {
        willMatchConfirm: function (password, confirmPassword) {
            return password == confirmPassword;
        },
        isWhitespace: (password) => {
            if (!password || password === '') {
                return true;
            }

            return password.trim().length < 1;
        },
        willPassRequiredLength: function (password, requiredLength) {
            if (this.isWhitespace(password) || password.length < requiredLength) {
                return false;
            }

            return true;
        },
        willPassRequiredSymbols: function (password) {
            // TODO: NOT IMPLEMENTED
        }
    }
};