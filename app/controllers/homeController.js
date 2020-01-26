const contentful = require('contentful')
const homeactive = 'nhsuk-header__navigation-active';

const client = contentful.createClient({
    space: process.env.space,
    accessToken: process.env.spaceapi
})

exports.index_get = function (req, res) {

    res.render('index', {
        homeactive
    });
}