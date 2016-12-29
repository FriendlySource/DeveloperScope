module.exports = {
    password: {
        willMatchConfirm: function (password, confirmPassword) {
            return password == confirmPassword;
        },
        isWhitespace: (password) => {
            if (!password) {
                return false;
            }

            return password.trim().length > 0;
        },
        willPassRequiredLength: function (password, requiredLength) {
            if (this.isWhitespace(password) || password.length !== requiredLength) {
                return false;
            }

            return true;
        },
        willPassRequiredSymbols: function (password) {
            // TODO: NOT IMPLEMENTED
        }
    }
};