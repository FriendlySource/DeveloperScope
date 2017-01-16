module.exports = {
    index: (req, res) => {
        res.render('developer/scope', {
            mainTitle: 'Scope',
            activePage: 'Scope'
        });
    },
    user: (req, res) => {
        res.render('developer/scope/preview', {
            mainTitle: 'Scope',
            activePage: 'Scope'
        });
    }
};