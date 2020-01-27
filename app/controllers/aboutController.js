const aboutActive = 'nhsuk-header__navigation-active';

const cms = require('../middleware/contentful');

exports.index_get = function (req, res) {

    res.render('about/index', {
        aboutActive
    });
}

exports.person_get = function (req, res) {

    res.render('about/person', {
        aboutActive
    });
}

exports.registerofinterest_get = function (req, res) {

    res.render('about/register-of-interest', {
        aboutActive
    });
}

