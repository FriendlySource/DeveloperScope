module.exports = {
    index: (req, res) => {
        res.render('developer/scope', {
            mainTitle: 'Scope',
            activePage: 'scope'
        });
    }
};