const researchActive = 'nhsuk-header__navigation-active';

const cms = require('../middleware/contentful');

exports.index_get = function (req, res) {

    res.render('research/index', {
        researchActive
    });
}
