module.exports = {
    index: (req, res) => {
        res.render('home', {
            mainTitle: 'Home',
            activePage: 'Home'
        });
    },
    about: (req, res) => {
        res.render('about', {
            mainTitle: 'About',
            activePage: 'About'
        });
    }
};