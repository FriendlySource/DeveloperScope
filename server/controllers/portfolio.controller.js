module.exports = {
    index: (req, res) => {
        res.render('developer/portfolio', {
            mainTitle: 'Portfolio',
            activePage: 'Portfolio'
        })
    }
};